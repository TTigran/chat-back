import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './services/app.service';
import {ChatGateway} from './chat/chat.gateway';
import {StoreService} from "./services/store/StoreService";
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {getEnvPath} from "./api/common/helper/env.helper";
import {TypeOrmConfigService} from "./api/shared/typeorm/typeorm.service";
import {ApiModule} from "./api/api/api.module";

const envFilePath: string = getEnvPath(`src/api/common/envs`);

@Module({
    imports: [
        ConfigModule.forRoot({envFilePath, isGlobal: true}),
        TypeOrmModule.forRootAsync({imports: undefined, useClass: TypeOrmConfigService}),
        ApiModule,
    ],

    controllers: [AppController],
    providers: [AppService, ChatGateway, StoreService], // Add WebSocketGateway to providers
})
export class AppModule {
}
