import {IsOptional, IsString} from 'class-validator';
import {PaginationReqDto} from "@/shared/dtos";

export class EventConfigQueryDto extends PaginationReqDto {
    @IsString()
    @IsOptional()
    eventType: string;

    @IsString()
    @IsOptional()
    eventName: string;
}