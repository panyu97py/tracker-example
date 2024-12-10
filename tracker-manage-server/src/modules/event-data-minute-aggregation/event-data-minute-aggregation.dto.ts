import {IsNumber, IsString} from "class-validator";

export class EventDataMinuteAggregationDto {

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