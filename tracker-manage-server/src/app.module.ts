import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {EventConfigModule} from "@/modules/event-config/event-config.module";
import {DatabaseModule} from "@/database/database.module";
import {EventDataModule} from "@/modules/event-data/event-data.module";
import {CacheModule} from '@nestjs/cache-manager';
import {EventDataMinuteAggregationModule} from "@/modules/event-data-minute-aggregation/event-data-minute-aggregation.module";
import {ScheduleModule} from "@nestjs/schedule";

@Module({
    imports: [
        EventConfigModule,
        EventDataModule,
        DatabaseModule,
        EventDataMinuteAggregationModule,
        ScheduleModule.forRoot(),
        CacheModule.register({ttl: 5})
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
