import {DataSource, Repository} from "typeorm";
import {EventDataEntity} from "./event-data.entity";

export interface MinuteAggregationResult {
    startTimestamp: number;
    endTimestamp: number;
    eventType: string;
    eventName: string;
    pvCount: number; // 新增代表页面浏览量（PV）的字段
    uvCount: number; // 新增代表独立访客数（UV）的字段
}

export class EventDataRepository extends Repository<EventDataEntity> {

    constructor(dataSource: DataSource) {
        super(EventDataEntity, dataSource.createEntityManager());  // 使用 dataSource 初始化 Repository
    }

    async aggregateEventDataByMinute(startTimestamp: number, endTimestamp: number): Promise<MinuteAggregationResult[]> {
        const rawResults = await this.createQueryBuilder("event")
            .select([
                "event.eventType as eventType",
                "event.eventName as eventName",
                "COUNT(event.id) as pvCount",
                "COUNT(DISTINCT event.deviceId) as uvCount"
            ])
            .where("event.startTime >= :startTimestamp AND event.startTime <= :endTimestamp", {startTimestamp, endTimestamp})
            .groupBy("DATE_FORMAT(event.startTime, '%Y-%m-%d %H:%i')")
            .groupBy("event.eventType")
            .groupBy("event.eventName")
            .getRawMany();

        return rawResults.map((rawResult: any) => {
            const {pvCount, uvCount,eventType,eventName} = rawResult
            return {eventType,eventName,startTimestamp, endTimestamp, pvCount, uvCount};
        });
    }
}