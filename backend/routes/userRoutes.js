import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';

const userRouter = express.Router();

// User Login Route
userRouter.post('/login', loginUser);   
// User Registration Route
userRouter.post('/register', registerUser);

export default userRouter;