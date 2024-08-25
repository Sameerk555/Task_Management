import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Task } from './Task';

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    username!: string;

    @Column()
    password!: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role!: UserRole;

    @OneToMany(() => Task, task => task.user)
    tasks!: Task[];
}
