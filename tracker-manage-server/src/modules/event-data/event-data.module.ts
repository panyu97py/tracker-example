import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EventDataEntity} from "./event-data.entity";
import {EventDataController} from "./event-data.controller";
import {EventDataService} from "./event-data.service";

@Module({
    imports: [TypeOrmModule.forFeature([EventDataEntity])],
    providers: [EventDataService],
    controllers: [EventDataController],
})
export class EventDataModule {}