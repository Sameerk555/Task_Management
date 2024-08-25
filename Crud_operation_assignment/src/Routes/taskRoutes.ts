import { Router } from 'express';
import { TaskController } from '../controller/TaskController';
import { checkRole } from '../middleware/role';

const router = Router();

router.get('/tasks', checkRole(['admin', 'user']), TaskController.getTasks);
router.post('/tasks', checkRole(['admin', 'user']), TaskController.createTask);
router.put('/tasks/:taskId', checkRole(['admin', 'user']), TaskController.updateTask);
router.delete('/tasks/:id', checkRole(['admin']), TaskController.deleteTask);

export default router;
