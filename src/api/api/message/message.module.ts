import { Module } from '@nestjs/common';
import {MessageController} from "./message.controller";
import {MessageService} from "./message.service";

@Module({
    imports: [],
    providers: [MessageService],
    controllers: [MessageController],
    exports: [MessageService],
})
export class MessageModule {}
