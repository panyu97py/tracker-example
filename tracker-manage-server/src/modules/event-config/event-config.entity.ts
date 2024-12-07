import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity('event-config')
export class EventConfigEntity {

    /**
     * 主键
     */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * 事件类型
     */
    @Column('text')
    eventType: string;

    /**
     * 事件名称
     */
    @Column('text', {nullable: false })
    eventName: string;

    /**
     * 事件描述
     */
    @Column('text', {nullable: true})
    eventDesc: string;

    /**
     * 事件创建时间
     */
    @CreateDateColumn({type: 'bigint'})
    createTime: number;

    /**
     * 事件更新时间
     */
    @UpdateDateColumn({type: 'bigint'})
    updateTime: number;

    /**
     * 事件删除标识
     */
    @Column('int', {default: 0})
    deleteFlag: number;
}