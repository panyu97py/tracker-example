import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class EventConfigEntity {

    /**
     * 主键
     */
    @PrimaryGeneratedColumn()
    id: number;

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
     * 事件描述
     */
    @Column('string')
    eventDesc: string;

    /**
     * 事件创建时间
     */
    @CreateDateColumn('timestamp')
    createTime: number;

    /**
     * 事件更新时间
     */
    @UpdateDateColumn('timestamp')
    updateTime: number;

    /**
     * 事件删除标识
     */
    @Column('number', {default: 0})
    deleteFlag: number;
}