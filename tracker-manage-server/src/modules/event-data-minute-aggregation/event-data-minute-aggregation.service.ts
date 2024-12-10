import {Cron} from '@nestjs/schedule';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {EventDataMinuteAggregationEntity} from "./event-data-minute-aggregation.entity";
import {Inject, Injectable, Logger} from "@nestjs/common";
import * as moment from "moment";
import {EventDataService} from "@/modules/event-data/event-data.service";

@Injectable()
export class EventDataMinuteAggregationService {

    @Inject()
    private readonly eventDataService: EventDataService;

    @InjectRepository(EventDataMinuteAggregationEntity)
    private readonly eventMinuteTrendRepository: Repository<EventDataMinuteAggregationEntity>

    private readonly logger = new Logger(EventDataMinuteAggregationService.name);  // 创建日志实例

    // 每分钟执行聚合
    @Cron('0 * * * * *')  // 每分钟的第0秒执行
    async aggregateMinuteEventData() {
        const lastMinute = moment().subtract(1, 'minute'); // 上一分钟
        const minuteStart = lastMinute.startOf('minute').valueOf();
        const minuteEnd = lastMinute.endOf('minute').valueOf();
        const timeFormat = (timestamp:number)=>moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
        this.logger.log(`开始聚合${timeFormat(minuteStart)}~${timeFormat(minuteEnd)}的数据`);
        const minuteData = await this.eventDataService.aggregateMinuteEventData(minuteStart, minuteEnd);
        const minuteAggregationData = this.eventMinuteTrendRepository.create(minuteData);
        await this.eventMinuteTrendRepository.save(minuteAggregationData);
        this.logger.log(`聚合${timeFormat(minuteStart)}~${timeFormat(minuteEnd)}的数据完成`);
        this.logger.log(`成功插入${minuteAggregationData.length}条聚合数据`);
    }
}