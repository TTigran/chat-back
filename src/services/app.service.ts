import { Injectable } from '@nestjs/common';
import { StoreService } from "./store/StoreService";

@Injectable()
export class AppService {
  constructor(private readonly storeService: StoreService) {}
  async getStoredData(): Promise<string[]>  {
    return await this.storeService.readDataFromFile();
  }
}
