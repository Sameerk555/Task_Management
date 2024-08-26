import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Task } from './entity/Task';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'db',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'task_management',
    synchronize: true,
    logging: false,
    entities: [User, Task],
});
