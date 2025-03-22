import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventConfigEntity } from './event-config.entity';
import { EventConfigService } from './event-config.service';
import { EventConfigController } from './event-config.controller';
import { EventDataTimeAggregationModule } from '@/modules/event-data-time-aggregation/event-data-time-aggregation.module';

@Module({
  imports: [forwardRef(() => EventDataTimeAggregationModule), TypeOrmModule.forFeature([EventConfigEntity])],
  providers: [EventConfigService],
  controllers: [EventConfigController],
  exports: [EventConfigService]
})
export class EventConfigModule {}
