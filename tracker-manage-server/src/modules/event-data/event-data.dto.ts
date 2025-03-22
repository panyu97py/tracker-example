import { IsJSON, IsNumber, IsOptional, IsString } from 'class-validator';

export class EventDataDto {
  /**
   * 会话id
   */
  @IsString()
  @IsOptional()
  sessionId: string;

  /**
   * 设备id
   */
  @IsString()
  @IsOptional()
  deviceId: string;

  /**
   * 事件id
   */
  @IsString()
  eventId: string;

  /**
   * 来源事件id
   */
  @IsString()
  @IsOptional()
  referrerEventId: string;

  /**
   * 事件类型
   */
  @IsString()
  eventType: string;

  /**
   * 事件名称
   */
  @IsString()
  eventName: string;

  /**
   * 当前页面路径
   */
  @IsString()
  @IsOptional()
  curPagePath: string;

  /**
   * 上一页面路径
   */
  @IsString()
  @IsOptional()
  prePagePath: string;

  /**
   * 事件开始事件
   */
  @IsNumber()
  startTime: number;

  /**
   * 事件结束事件
   */
  @IsNumber()
  endTime: number;

  /**
   * 事件持续事件
   */
  @IsNumber()
  duration: number;

  /**
   * 事件拓展数据
   */
  @IsJSON()
  extendData: Record<string, any>;
}
