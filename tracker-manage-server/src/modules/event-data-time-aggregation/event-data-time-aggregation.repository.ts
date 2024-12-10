import {DataSource, Repository} from "typeorm";
import {EventDataTimeAggregationEntity} from "./event-data-time-aggregation.entity";

export class EventDataTimeAggregationRepository extends Repository<EventDataTimeAggregationEntity> {

    constructor(dataSource: DataSource) {
        super(EventDataTimeAggregationEntity, dataSource.createEntityManager());  // 使用 dataSource 初始化 Repository
    }

    async aggregateEventData(eventType: string, eventName: string, startTimestamp: number, endTimestamp: number) {
        // 按天聚合 pvCount 和 uvCount
        const queryBuilder = this.createQueryBuilder('event')
            .select([
                "event.eventType as eventType",
                "event.eventName as eventName",
                "SUM(event.pvCount) AS pvCount",
                "SUM(event.uvCount) AS uvCount"
            ])
            .where('event.startTimestamp >= :startTimestamp', {startTimestamp})
            .andWhere('event.endTimestamp <= :endTimestamp', {endTimestamp})

        if (eventType) queryBuilder.andWhere('event.eventType = :eventType', {eventType});

        if (eventName) queryBuilder.andWhere('event.eventName = :eventName', {eventName});

        return queryBuilder.groupBy('event.eventType, event.eventName').getRawOne();
    }

    async getMinuteEventData(eventType: string, eventName: string, startTimestamp: number, endTimestamp: number) {
        const queryBuilder = this.createQueryBuilder('event')
            .select('event.pvCount, event.uvCount,event.startTimestamp, event.endTimestamp')
            .select([
                "event.pvCount as pvCount",
                "event.uvCount as uvCount",
                "event.startTimestamp as startTimestamp",
                "event.endTimestamp as endTimestamp",
            ])
            .where('event.startTimestamp >= :startTimestamp', {startTimestamp})
            .andWhere('event.endTimestamp <= :endTimestamp', {endTimestamp})
            .andWhere('event.eventType = :eventType', {eventType})
            .andWhere('event.eventName = :eventName', {eventName});
        return queryBuilder.getRawMany();
    }
}