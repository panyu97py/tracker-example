import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EventConfigEntity} from "./event-config.entity";
import {EventConfigService} from "./event-config.service";
import {EventConfigController} from "./event-config.controller";

@Module({
    imports: [TypeOrmModule.forFeature([EventConfigEntity])],
    providers: [EventConfigService],
    controllers: [EventConfigController],
})
export class EventConfigModule {}