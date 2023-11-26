import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import {User} from "../user/users.entity";
import {ChatRoom} from "../room/room.entity";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    message_id: number;

    @ManyToOne(() => User, user => user.messages)
    user: User;

    @ManyToOne(() => ChatRoom, room => room.messages)
    room: ChatRoom;

    @Column('text')
    content: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    timestamp: Date;
}