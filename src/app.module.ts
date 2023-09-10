import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { ChatGateway } from './chat/chat.gateway';
import { StoreService } from "./services/store/StoreService";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ChatGateway, StoreService], // Add WebSocketGateway to providers
})
export class AppModule {}
