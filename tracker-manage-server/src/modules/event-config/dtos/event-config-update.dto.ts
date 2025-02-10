import { IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class EventConfigUpdateDto {
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
}
