import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {EventConfigModule} from "@/modules/event-config/event-config.module";
import {DatabaseModule} from "@/database/database.module";

@Module({
  imports: [EventConfigModule,DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
