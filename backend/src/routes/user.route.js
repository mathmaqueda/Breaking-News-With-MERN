import {Router} from 'express';
import userController from '../controllers/user.controller.js';
import { validId, validUser } from '../middlewares/global.middleware.js';

const userRouter = Router();

userRouter.post('/', userController.create);
userRouter.get('/', userController.findAll);
userRouter.get('/:id', validId, validUser, userController.findById);
userRouter.patch('/:id', validId, validUser, userController.update);
userRouter.delete('/erase/:id', validId, validUser, userController.erase);
userRouter.patch('/updatePassword/:id', validId, validUser, userController.updatePassword); 

export default userRouter;