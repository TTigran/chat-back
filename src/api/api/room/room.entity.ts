import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {Message} from "../message/message.entity";

@Entity()
export class ChatRoom {
    @PrimaryGeneratedColumn()
    room_id: number;

    @Column({ length: 255 })
    name: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @OneToMany(() => Message, message => message.room)
    messages: Message[];
}