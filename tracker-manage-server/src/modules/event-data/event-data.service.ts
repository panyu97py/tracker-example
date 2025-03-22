import { DataSource } from 'typeorm';
import { EventDataDto } from './event-data.dto';
import { EventDataRepository } from './event-data.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventDataService {
  private readonly eventDataRepository: EventDataRepository;

  constructor(dataSource: DataSource) {
    this.eventDataRepository = new EventDataRepository(dataSource);
  }

  public async appendEventData(eventDataDtoList: EventDataDto[]): Promise<void> {
    const eventDataList = this.eventDataRepository.create(eventDataDtoList);
    await this.eventDataRepository.save(eventDataList);
  }

  public async aggregateMinuteEventData(startTimestamp: number, endTimestamp: number) {
    return this.eventDataRepository.aggregateEventDataByMinute(startTimestamp, endTimestamp);
  }
}
