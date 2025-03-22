import { Controller, Get, Inject, Query } from '@nestjs/common';
import { EventDataTimeAggregationService } from './event-data-time-aggregation.service';
import { EventDataTimeAggregationTrendReqDto } from '@/modules/event-data-time-aggregation/event-data-time-aggregation.dto';
import * as moment from 'moment';

@Controller('eventDataTimeAggregation')
export class EventDataTimeAggregationController {
  @Inject()
  private readonly eventDataTimeAggregationService: EventDataTimeAggregationService;

  @Get('/count')
  async getEventDataAggregateCount(@Query('eventId') eventId: string) {
    const startTimestamp = moment().startOf('day').valueOf();
    const endTimestamp = moment().endOf('day').valueOf();
    return this.eventDataTimeAggregationService.aggregateEventData(eventId, startTimestamp, endTimestamp);
  }

  @Get('/trend')
  async getEventDataAggregateTrend(@Query() params: EventDataTimeAggregationTrendReqDto) {
    const { eventId, endTimestamp, startTimestamp } = params;
    return this.eventDataTimeAggregationService.getMinuteEventTrendData(eventId, startTimestamp, endTimestamp);
  }
}
