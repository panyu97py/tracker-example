import { Controller, Get, Inject, Query } from '@nestjs/common';
import { EventDataTimeAggregationService } from './event-data-time-aggregation.service';
import { EventDataTimeAggregationTrendReqDto } from '@/modules/event-data-time-aggregation/event-data-time-aggregation.dto';

@Controller('eventDataTimeAggregation')
export class EventDataTimeAggregationController {
  @Inject()
  private readonly eventDataTimeAggregationService: EventDataTimeAggregationService;

  @Get('/trend')
  async getEventDataAggregateTrend(@Query() params: EventDataTimeAggregationTrendReqDto) {
    const { eventId, endTimestamp, startTimestamp } = params;
    const aggregateEventData = await this.eventDataTimeAggregationService.aggregateEventData(
      eventId,
      startTimestamp,
      endTimestamp
    );
    const aggregateEventTrendData = await this.eventDataTimeAggregationService.getMinuteEventTrendData(
      eventId,
      startTimestamp,
      endTimestamp
    );
    return { ...aggregateEventData, trendData: aggregateEventTrendData };
  }
}
