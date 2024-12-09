import {IsDate, IsOptional, IsString} from 'class-validator';
import {PaginationReqDto} from "@/shared/dtos";
import {Expose, Transform} from "class-transformer";
import * as moment from 'moment';

export class EventConfigQueryParamsDto extends PaginationReqDto {
    @IsString()
    @IsOptional()
    eventType: string;

    @IsString()
    @IsOptional()
    eventName: string;
}

export class EventConfigQueryResultDto {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsString()
    eventType: string;

    @Expose()
    @IsString()
    eventName: string;

    @Expose()
    @IsString()
    @IsOptional()
    eventDesc?: string;

    /**
     * 事件创建时间
     */
    @Expose()
    @IsDate()
    @Transform(({ value }) => moment.utc(value).local().format('YYYY-MM-DD HH:mm:ss'))
    createTime: number;

    /**
     * 事件更新时间
     */
    @Expose()
    @IsDate()
    @Transform(({ value }) => moment.utc(value).local().format('YYYY-MM-DD HH:mm:ss'))
    updateTime: number;
}