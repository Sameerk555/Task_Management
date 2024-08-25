import { Router } from 'express';
import { registerUser, loginUser } from '../controller/authController';
import { checkRole } from '../middleware/role';
import { UserRole } from '../entity/User';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Example of a protected route that only admins can access
router.get('/admin', checkRole([UserRole.ADMIN]), (req, res) => {
    res.json({ message: 'Welcome, Admin!' });
});

export default router;
