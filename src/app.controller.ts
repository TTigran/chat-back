import { Controller, Get } from '@nestjs/common';
import { AppService } from './services/app.service';

@Controller('messages')
export class AppController {
  constructor(
      private readonly appService: AppService,
  ) {}

  @Get()
  async getHello(): Promise<string[]> {
    return await this.appService.getStoredData();
  }

  @Get()
   getHello(): string {
    return "hello world";
  }
}
