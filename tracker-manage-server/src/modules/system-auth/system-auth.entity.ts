import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('system-auth')
export class SystemAuthEntity {
  /**
   * 主键
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * 事件类型
   */
  @Column('text')
  username: string;

  /**
   * 事件类型
   */
  @Column('text')
  password: string;
}
