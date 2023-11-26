import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {Message} from "../message/message.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ length: 255 })
  username: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ default: false }) // Adding a new column for online/offline status with a default value of false
  isOnline: boolean;

  @Column({ nullable: true }) // Adding a new column for the image URL with the ability to be null
  imageUrl: string | null;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

  @Column({ type: 'boolean', default: false })
  public isDeleted: boolean;

  @OneToMany(() => Message, message => message.user)
  messages: Message[];
}