import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EventDataMinuteAggregationEntity} from "./event-data-minute-aggregation.entity";
import {EventDataMinuteAggregationService} from "./event-data-minute-aggregation.service";
import {EventDataModule} from "@/modules/event-data/event-data.module";


@Module({
    imports: [EventDataModule,TypeOrmModule.forFeature([EventDataMinuteAggregationEntity])],
    providers: [EventDataMinuteAggregationService],
})
export class EventDataMinuteAggregationModule {}