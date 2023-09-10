import { Logger } from '@nestjs/common';
import { Socket }  from "socket.io";
import { MessageData } from "../@types";
import { StoreService } from "../services/store/StoreService";
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';


@WebSocketGateway(3040, {cors: "*"})
export class ChatGateway {
    @WebSocketServer()
    server;

    clientId: string;
    roomId: string;
    imageURL: string;
    username: string;

    constructor(private readonly storeService: StoreService) {}

    private readonly logger: Logger = new Logger(ChatGateway.name);
    private rooms: Map<string, Set<Socket>> = new Map<string, Set<Socket>>();

    handleConnection(client: Socket): void {
        this.clientId = client.id
        this.logger.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket): void {
        this.logger.log(`Client disconnected: ${client.id}`);
        this.rooms.forEach((clients: Set<Socket>, room: string): void => {
            if (clients.has(client)) {
                clients.delete(client);
                this.server.to(room).emit('userLeft', client.id);
            }
        });
    }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(client: Socket, JsonForJoining: any): void {
        this.username = JsonForJoining.username
        this.roomId = JsonForJoining.joinedRoomId;
        this.imageURL = JsonForJoining.imageURL
        let room: string = this.roomId
        this.logger.log(`Client: ${client.id} joined ${room} room`);
        client.join(room); // Join the specified room
        this.rooms.set(room, this.rooms.get(room) || new Set<Socket>());
        this.rooms.get(room)?.add(client);
        this.server.to(room).emit('userJoined', client.id);
    }

    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(client: Socket, room: string) {
        this.logger.log(`Client: ${client.id} leave ${room} room`);
        client.leave(room);
        this.rooms.get(room)?.delete(client);
        this.server.to(room).emit('userLeft', client.id);
    }

    @SubscribeMessage('message')
   async handleMessage(@MessageBody() message: string): Promise<void> {
        const messageData: MessageData = {
            imageURL: this.imageURL,
            username: this.username,
            roomId: this.roomId,
            clientId: this.clientId,
            date: new Date().toLocaleString(),
            message,
        }
        let messageJson: string = JSON.stringify(messageData)
        this.storeService.writeDataToFile(messageJson)
        this.logger.log(`Stored this data ${messageJson}`)
        this.server.emit('message', messageJson)
    }
}
