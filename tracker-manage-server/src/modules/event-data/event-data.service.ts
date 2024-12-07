import {Repository} from "typeorm";
import {EventDataEntity} from "./event-data.entity";
import {EventDataDto} from "./event-data.dto";
import {InjectRepository} from "@nestjs/typeorm";

export class EventDataService {
    @InjectRepository(EventDataEntity)
    private readonly eventDataRepository: Repository<EventDataEntity>;

    public async appendEventData(eventDataDtoList: EventDataDto[]): Promise<void> {
        const eventDataList = this.eventDataRepository.create(eventDataDtoList);
        await this.eventDataRepository.save(eventDataList);
    }
}