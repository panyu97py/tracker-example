import {Cron} from '@nestjs/schedule';
import {DataSource, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {EventDataMinuteAggregationEntity} from "./event-data-minute-aggregation.entity";
import {EventDataRepository} from "@/modules/event-data/event-data.repository";
import {Injectable, Logger} from "@nestjs/common";
import * as moment from "moment";

@Injectable()
export class EventDataMinuteAggregationService {

    private readonly logger = new Logger(EventDataMinuteAggregationService.name);  // 创建日志实例

    private readonly eventDataRepository: EventDataRepository;

    @InjectRepository(EventDataMinuteAggregationEntity)
    private readonly eventMinuteTrendRepository: Repository<EventDataMinuteAggregationEntity>

    constructor(dataSource: DataSource) {
        this.eventDataRepository = new EventDataRepository(dataSource);
    }

    // 每分钟执行聚合
    @Cron('0 * * * * *')  // 每分钟的第0秒执行
    async aggregateMinuteEventData() {
        const lastMinute = moment().subtract(1, 'minute'); // 上一分钟
        const minuteStart = lastMinute.startOf('minute').valueOf();
        const minuteEnd = lastMinute.endOf('minute').valueOf();
        const timeFormat = (timestamp:number)=>moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
        this.logger.log(`开始聚合${timeFormat(minuteStart)}~${timeFormat(minuteEnd)}的数据`);
        const minuteData = await this.eventDataRepository.aggregateEventDataByMinute(minuteStart, minuteEnd);
        const minuteAggregationData = this.eventMinuteTrendRepository.create(minuteData);
        await this.eventMinuteTrendRepository.save(minuteAggregationData);
        this.logger.log(`聚合${timeFormat(minuteStart)}~${timeFormat(minuteEnd)}的数据完成`);
        this.logger.log(`成功插入${minuteAggregationData.length}条聚合数据`);
    }
}