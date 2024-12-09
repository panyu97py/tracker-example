import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {PaginationResDto} from "@/shared/dtos";
import {CustomHttpException} from "@/shared/exceptions";
import {plainToClass} from "class-transformer";
import {EventConfigCreateDto, EventConfigUpdateDto} from "./dtos";
import {EventConfigEntity} from "./event-config.entity";
import {EventConfigQueryDto} from "@/modules/event-config/dtos/event-config-query.dto";


@Injectable()
export class EventConfigService {

    @InjectRepository(EventConfigEntity)
    private eventConfigRepository: Repository<EventConfigEntity>;

    public async getEventConfigById(id: string): Promise<EventConfigUpdateDto> {
        const eventConfig = await this.eventConfigRepository.findOne({where: {id}});
        return plainToClass(EventConfigUpdateDto, eventConfig, {excludeExtraneousValues: true});
    }

    public async createEventConfig(params: EventConfigCreateDto): Promise<void> {
        const {eventName} = params;
        const existingEvent = await this.eventConfigRepository.findOne({where: {eventName, deleteFlag: 0}});
        if (existingEvent) throw new CustomHttpException(`${eventName} is exit`);
        const eventConfig = this.eventConfigRepository.create(params);
        await this.eventConfigRepository.save(eventConfig);
    }

    public async updateEventConfig(params: EventConfigUpdateDto): Promise<void> {
        const {id} = params;
        await this.eventConfigRepository.update({id}, params);
    }

    public async deleteEventConfig(id: string): Promise<void> {
        await this.eventConfigRepository.update({id}, {deleteFlag: 1});
    }

    public async getEventConfigByPage(params: EventConfigQueryDto): Promise<PaginationResDto<EventConfigEntity>> {
        const {pageNum = 1, pageSize = 10, ...other} = params || {};
        const skip = (pageNum - 1) * pageSize;
        const take = pageSize;
        const where = {...other, deleteFlag: 0}
        const [data, total] = await this.eventConfigRepository.findAndCount({where, skip, take})
        return {data, total, pageNum, pageSize}
    }
}