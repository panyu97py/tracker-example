import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventDataTimeAggregationEntity } from './event-data-time-aggregation.entity';
import { EventDataTimeAggregationService } from './event-data-time-aggregation.service';
import { EventDataModule } from '@/modules/event-data/event-data.module';
import { EventConfigModule } from '@/modules/event-config/event-config.module';
import { EventDataTimeAggregationController } from './event-data-time-aggregation.controller';
import { EventDataTimeAggregationRepository } from './event-data-time-aggregation.repository';

@Module({
  imports: [
    EventDataModule,
    forwardRef(() => EventConfigModule),
    TypeOrmModule.forFeature([EventDataTimeAggregationEntity, EventDataTimeAggregationRepository])
  ],
  providers: [EventDataTimeAggregationService],
  controllers: [EventDataTimeAggregationController],
  exports: [EventDataTimeAggregationService]
})
export class EventDataTimeAggregationModule {}
