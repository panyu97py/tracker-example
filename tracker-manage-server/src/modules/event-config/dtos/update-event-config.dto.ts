import {IsOptional, IsString} from "class-validator";

export class UpdateEventConfigDto {
    @IsString()
    id: string;

    @IsString()
    @IsOptional()
    eventDesc?: string;
}