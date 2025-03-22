import { Cron } from '@nestjs/schedule';
import { DataSource } from 'typeorm';
import { Inject, Injectable, Logger } from '@nestjs/common';
import * as moment from 'moment';
import { EventDataService } from '@/modules/event-data/event-data.service';
import { EventConfigService } from '@/modules/event-config/event-config.service';
import { EventDataTimeAggregationRepository } from './event-data-time-aggregation.repository';

@Injectable()
export class EventDataTimeAggregationService {
  @Inject()
  private readonly eventDataService: EventDataService;

  @Inject()
  private readonly eventConfigService: EventConfigService;

  private readonly eventDataTimeAggregationRepository: EventDataTimeAggregationRepository;

  private readonly logger = new Logger(EventDataTimeAggregationService.name); // 创建日志实例

  constructor(dataSource: DataSource) {
    this.eventDataTimeAggregationRepository = new EventDataTimeAggregationRepository(dataSource);
  }

  // 每分钟执行聚合
  @Cron('0 * * * * *') // 每分钟的第0秒执行
  async aggregateMinuteEventData() {
    const lastMinute = moment().subtract(1, 'minute'); // 上一分钟
    const minuteStart = lastMinute.startOf('minute').valueOf();
    const minuteEnd = lastMinute.endOf('minute').valueOf();
    const timeFormat = (timestamp: number) => moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
    this.logger.log(`开始聚合${timeFormat(minuteStart)}~${timeFormat(minuteEnd)}的数据`);
    const minuteData = await this.eventDataService.aggregateMinuteEventData(minuteStart, minuteEnd);
    const minuteAggregationData = this.eventDataTimeAggregationRepository.create(minuteData);
    await this.eventDataTimeAggregationRepository.save(minuteAggregationData);
    this.logger.log(`聚合${timeFormat(minuteStart)}~${timeFormat(minuteEnd)}的数据完成`);
    this.logger.log(`成功插入${minuteAggregationData.length}条聚合数据`);
  }

  async aggregateEventData(eventId: string, startTimestamp: number, endTimestamp: number) {
    const eventConfig = await this.eventConfigService.getEventConfigById(eventId);
    const { eventType, eventName } = eventConfig;
    return this.eventDataTimeAggregationRepository.aggregateEventData(
      eventType,
      eventName,
      startTimestamp,
      endTimestamp
    );
  }

  async getMinuteEventTrendData(eventId: string, startTimestamp: number, endTimestamp: number) {
    const eventConfig = await this.eventConfigService.getEventConfigById(eventId);
    const { eventType, eventName } = eventConfig;
    return this.eventDataTimeAggregationRepository.getMinuteEventData(
      eventType,
      eventName,
      startTimestamp,
      endTimestamp
    );
  }
}
