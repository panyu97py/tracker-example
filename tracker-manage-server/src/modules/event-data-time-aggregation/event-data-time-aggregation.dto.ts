import {IsNumber, IsString} from "class-validator";

export class EventDataTimeAggregationDto {

    @IsString()
    eventType: string;

    @IsString()
    eventName: string;

    @IsNumber()
    startTimestamp: number;

    @IsNumber()
    endTimestamp: number;

    @IsNumber()
    pvCount: number;

    @IsNumber()
    uvCount: number;
}
export class EventDataTimeAggregationTrendReqDto {
    @IsString()
    eventId: string;
    @IsString()
    startTimestamp: number;
    @IsString()
    endTimestamp: number;
}