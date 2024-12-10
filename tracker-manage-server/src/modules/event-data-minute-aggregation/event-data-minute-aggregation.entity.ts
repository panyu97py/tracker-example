import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";

@Entity('event-data-minute-aggregation')
@Unique(['eventType', 'eventName', 'startTimestamp', 'endTimestamp'])
export class EventDataMinuteAggregationEntity {
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

    @CreateDateColumn({type: 'bigint'})
    createTime: number;
}