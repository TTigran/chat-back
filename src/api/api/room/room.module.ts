import { Module } from '@nestjs/common';
import {RoomController} from "./room.controller";
import {RoomService} from "./room.service";

@Module({
    imports: [],
    providers: [RoomService],
    controllers: [RoomController],
    exports: [RoomService],
})
export class RoomModule {}
