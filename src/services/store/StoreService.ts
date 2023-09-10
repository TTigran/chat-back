import {Injectable} from '@nestjs/common';
import * as fs from 'fs';
import * as readline from "readline";

@Injectable()
export class StoreService {
    private readonly dataFilePath: string = 'data.txt';

    async writeDataToFile(data: any): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const stream = fs.createWriteStream(this.dataFilePath, {flags: 'a'}); // 'a' flag for appending

            stream.once('open', () => {
                stream.write(data + '\n'); // Append data with a newline
                stream.end(); // Close the stream
                resolve();
            });

            stream.on('error', (err) => {
                reject(err);
            });
        });
    }

    async readDataFromFile(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            const data: string[] = [];
            const fileStream = fs.createReadStream(this.dataFilePath);

            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity,
            });

            rl.on('line', (line) => {
                try {
                    const jsonData = line.replace(/\\/g, "");

                    data.push(jsonData);
                } catch (error) {
                    // Handle JSON parsing errors here
                    console.error('Error parsing JSON:', error);
                }
            });

            rl.on('close', () => {
                resolve(data);
            });

            rl.on('error', (err) => {
                reject(err);
            });
        });
    }
}