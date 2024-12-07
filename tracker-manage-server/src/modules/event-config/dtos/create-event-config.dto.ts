import {IsOptional, IsString} from 'class-validator';

export class CreateEventConfigDto {
    @IsString()
    eventType: string;

    @IsString()
    eventName: string;

    @IsString()
    @IsOptional()
    eventDesc?: string;
}