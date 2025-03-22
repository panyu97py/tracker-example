import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { EventConfigService } from './event-config.service';
import { EventConfigCreateDto, EventConfigUpdateDto, EventConfigQueryParamsDto } from './dtos';
import { EventDataTimeAggregationService } from '@/modules/event-data-time-aggregation/event-data-time-aggregation.service';
import * as moment from 'moment';
@Controller('eventConfig')
export class EventConfigController {
  @Inject()
  private readonly eventConfigService: EventConfigService;

  @Inject()
  private readonly eventDataTimeAggregationService: EventDataTimeAggregationService;

  @Get('/queryByPage')
  async getEventConfigByPage(@Query() params: EventConfigQueryParamsDto) {
    const eventConfigPageData = await this.eventConfigService.getEventConfigByPage(params);
    const { data: eventConfigData } = eventConfigPageData;
    const startTime = moment().startOf('day').valueOf();
    const endTime = moment().endOf('day').valueOf();
    const trendQuery = eventConfigData.map(async (item) => {
      const trendData = await this.eventDataTimeAggregationService.aggregateEventData(item.id, startTime, endTime);
      const { pvCount, uvCount } = trendData || {};
      return { ...item, pvCount, uvCount };
    });
    const data = await Promise.all(trendQuery);
    return { ...eventConfigPageData, data };
  }

  @Get('/detail')
  async getEventConfigDetail(@Query('id') id: string) {
    return await this.eventConfigService.getEventConfigById(id);
  }

  @Post('/create')
  async createEventConfig(@Body() body: EventConfigCreateDto) {
    await this.eventConfigService.createEventConfig(body);
    return true;
  }

  @Post('/update')
  async updateEventConfig(@Body() body: EventConfigUpdateDto) {
    await this.eventConfigService.updateEventConfig(body);
    return true;
  }

  @Post('/delete')
  async deleteEventConfig(@Body('id') id: string) {
    await this.eventConfigService.deleteEventConfig(id);
    return true;
  }
}
