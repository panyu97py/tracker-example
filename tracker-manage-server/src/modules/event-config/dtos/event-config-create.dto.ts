import { IsOptional, IsString } from 'class-validator';

export class EventConfigCreateDto {
  @IsString()
  eventType: string;

  @IsString()
  eventName: string;

  @IsString()
  @IsOptional()
  eventDesc?: string;
}
