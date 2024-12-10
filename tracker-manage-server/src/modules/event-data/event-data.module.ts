import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EventDataEntity} from "./event-data.entity";
import {EventDataController} from "./event-data.controller";
import {EventDataService} from "./event-data.service";
import {EventDataRepository} from "./event-data.repository";

@Module({
    imports: [TypeOrmModule.forFeature([EventDataEntity,EventDataRepository])],
    providers: [EventDataService],
    controllers: [EventDataController],
    exports: [TypeOrmModule]
})
export class EventDataModule {
}