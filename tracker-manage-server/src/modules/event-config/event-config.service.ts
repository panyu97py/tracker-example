import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {EventConfigEntity} from "./event-config.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {PaginationReqDto, PaginationResDto} from "@/shared/dtos";
import {CreateEventConfigDto} from "@/modules/event-config/dtos";


@Injectable()
export class EventConfigService {

    @InjectRepository(EventConfigEntity)
    private EventConfigRepository: Repository<EventConfigEntity>;

    public async getEventConfig(id: string): Promise<EventConfigEntity> {
        return await this.EventConfigRepository.findOneBy({id});
    }

    public async createEventConfig(params: CreateEventConfigDto): Promise<void> {
        const eventConfig = this.EventConfigRepository.create(params);
        await this.EventConfigRepository.save(eventConfig);
    }

    public async getEventConfigByPage(params: PaginationReqDto): Promise<PaginationResDto<EventConfigEntity>> {
        const {pageNum = 1, pageSize = 10} = params || {};
        const skip = (pageNum - 1) * pageSize;
        const take = pageSize;
        const [data, total] = await this.EventConfigRepository.findAndCount({skip, take})
        return {data, total, pageNum, pageSize}
    }
}