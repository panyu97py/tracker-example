import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('event-data')
export class EventDataEntity {
  /**
   * 主键
   */
  @PrimaryGeneratedColumn('uuid')
  id: number;

  /**
   * 事件创建时间
   */
  @CreateDateColumn({ type: 'bigint' })
  createTime: number;

  /**
   * 来源事件id
   */
  @Column('text')
  deviceId: string;

  /**
   * 来源事件id
   */
  @Column('text')
  sessionId: string;

  /**
   * 事件id
   */
  @Column('text')
  eventId: string;

  /**
   * 来源事件id
   */
  @Column('text', { nullable: true })
  referrerEventId: string;

  /**
   * 事件类型
   */
  @Column('text')
  eventType: string;

  /**
   * 事件名称
   */
  @Column('text')
  eventName: string;

  /**
   * 当前页面路径
   */
  @Column('text', { nullable: true })
  currentPagePath: string;

  /**
   * 上一页面路径
   */
  @Column('text', { nullable: true })
  referrerPagePath: string;

  /**
   * 事件开始事件
   */
  @Column('integer')
  startTime: number;

  /**
   * 事件结束事件
   */
  @Column('integer')
  endTime: number;

  /**
   * 事件持续事件
   */
  @Column('integer')
  duration: number;

  /**
   * 事件拓展数据
   */
  @Column('json', { nullable: true })
  extendData: Record<string, any>;
}
