import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('event-data-time-aggregation')
@Unique(['eventType', 'eventName', 'startTimestamp', 'endTimestamp'])
export class EventDataTimeAggregationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  eventType: string;

  @Column('text')
  eventName: string;

  @Column('integer')
  startTimestamp: number;

  @Column('integer')
  endTimestamp: number;

  @Column('integer')
  pvCount: number;

  @Column('integer')
  uvCount: number;

  @CreateDateColumn({ type: 'bigint' })
  createTime: number;
}
