import {Module} from '@nestjs/common';
import {DatabaseModule} from "@/database/database.module";
import {EventDataTimeAggregationModule, EventDataModule, EventConfigModule} from "@/modules";
import {CacheModule} from '@nestjs/cache-manager';
import {ScheduleModule} from "@nestjs/schedule";
import {AppController} from './app.controller';
import {AppService} from './app.service';

@Module({
    imports: [
        EventConfigModule,
        EventDataModule,
        DatabaseModule,
        EventDataTimeAggregationModule,
        ScheduleModule.forRoot(),
        CacheModule.register({ttl: 5})
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
