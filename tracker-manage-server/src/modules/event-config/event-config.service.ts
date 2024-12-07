import {HttpException, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {EventConfigEntity} from "./event-config.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {PaginationReqDto, PaginationResDto} from "@/shared/dtos";
import {CreateEventConfigDto, UpdateEventConfigDto} from "@/modules/event-config/dtos";
import {CustomHttpException} from "@/shared/exceptions";


@Injectable()
export class EventConfigService {

    @InjectRepository(EventConfigEntity)
    private eventConfigRepository: Repository<EventConfigEntity>;

    public async getEventConfig(id: string): Promise<EventConfigEntity> {
        return await this.eventConfigRepository.findOneBy({id});
    }

    public async createEventConfig(params: CreateEventConfigDto): Promise<void> {
        // 检查是否已经存在相同 eventName 且 deleteFlag 为 0
        const {eventName} = params;
        const existingEvent = await this.eventConfigRepository.findOne({where: {eventName, deleteFlag: 0}});
        if (existingEvent) throw new CustomHttpException(`${eventName} is exit`);
        const eventConfig = this.eventConfigRepository.create(params);
        await this.eventConfigRepository.save(eventConfig);
    }

    public async updateEventConfig(params: UpdateEventConfigDto): Promise<void> {
        const {id} = params;
        await this.eventConfigRepository.update({id}, params);
    }

    public async deleteEventConfig(id: string): Promise<void> {
        await this.eventConfigRepository.update({id}, {deleteFlag: 1});
    }

    public async getEventConfigByPage(params: PaginationReqDto): Promise<PaginationResDto<EventConfigEntity>> {
        const {pageNum = 1, pageSize = 10} = params || {};
        const skip = (pageNum - 1) * pageSize;
        const take = pageSize;
        const [data, total] = await this.eventConfigRepository.findAndCount({skip, take})
        return {data, total, pageNum, pageSize}
    }
}