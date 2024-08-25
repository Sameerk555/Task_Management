import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Task } from '../entity/Task';
import { User } from '../entity/User';

export class TaskController {
  static async createTask(req: Request, res: Response) {
    const { title, description, status, priority, due_date } = req.body;
    const taskRepository = AppDataSource.getRepository(Task);
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id: (req as any).userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = status;
    task.priority = priority;
    task.due_date = new Date(due_date);
    task.user = user;

    await taskRepository.save(task);
    res.status(201).json({ message: 'Task created successfully' });
  }

  static async getTasks(req: Request, res: Response) {
    const taskRepository = AppDataSource.getRepository(Task);
    const tasks = await taskRepository.find({ where: { user: { id: (req as any).userId } } });
    res.json(tasks);
  }

  static async updateTask(req: Request, res: Response) {
    try {
      const taskId = parseInt(req.params.taskId, 10);
      console.log(taskId)
      if (isNaN(taskId)) {
        return res.status(400).json({ message: 'Invalid task ID' });
      }
  
      const { title, description, status, priority, due_date } = req.body;
  
      const taskRepository = AppDataSource.getRepository(Task);
  
      if (!title || !description || !status || !priority) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      let task = await taskRepository.findOne({
        where: { id: taskId, user: { id: (req as any).userId } }
      });
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found or not authorized' });
      }
  
      task.title = title;
      task.description = description;
      task.status = status;
      task.priority = priority;
      // task.due_date = new Date(due_date);
      // if (isNaN(task.due_date.getTime())) {
      //   return res.status(400).json({ message: 'Invalid due date format' });
      // }
  
      await taskRepository.save(task);
      res.json({ message: 'Task updated successfully' });
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ message: 'An error occurred while updating the task' });
    }
  }
  
  static async deleteTask(req: Request, res: Response) {
    try {
      // Extract the taskId from the URL parameters and parse it to an integer
      const taskId = parseInt(req.params.id, 10);
      if (isNaN(taskId)) {
        return res.status(400).json({ message: 'Invalid task ID' });
      }

      // Get the Task repository
      const taskRepository = AppDataSource.getRepository(Task);

      // Find the task by ID and ensure it belongs to the authenticated user
      const task = await taskRepository.findOne({
        where: { id: taskId, user: { id: (req as any).userId } },
        relations: ['user'],
      });

      if (!task) {
        return res.status(404).json({ message: 'Task not found or not authorized' });
      }

      // Remove the task from the database
      await taskRepository.remove(task);
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ message: 'An error occurred while deleting the task' });
    }
  }
}
