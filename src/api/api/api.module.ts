import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';
import {MessageModule} from "./message/message.module";
import {RoomModule} from "./room/room.module";
@Module({
  imports: [AuthModule, UsersModule, MessageModule, RoomModule],
})

export class ApiModule {}
