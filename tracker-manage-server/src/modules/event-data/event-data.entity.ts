import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class EventDataEntity {

    /**
     * 主键
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * 事件创建时间
     */
    @CreateDateColumn()
    createTime: number;

    /**
     * 事件id
     */
    @Column('string')
    eventId: string;

    /**
     * 来源事件id
     */
    @Column('string')
    referrerEventId: string;

    /**
     * 事件类型
     */
    @Column('string')
    eventType: string;

    /**
     * 事件名称
     */
    @Column('string')
    eventName: string;

    /**
     * 当前页面路径
     */
    @Column('string')
    curPagePath: string;


    /**
     * 上一页面路径
     */
    @Column('string')
    prePagePath: string

    /**
     * 事件开始事件
     */
    @Column('timestamp')
    startTime: number;

    /**
     * 事件结束事件
     */
    @Column('timestamp')
    endTime: number;

    /**
     * 事件持续事件
     */
    @Column('number')
    duration: number

    /**
     * 事件拓展数据
     */
    @Column('json')
    extendData: string;

}