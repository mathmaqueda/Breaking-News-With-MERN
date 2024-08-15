import { Router } from 'express';
const newsRouter = Router();

import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validAuthenticatedUser, validId } from '../middlewares/global.middleware.js';
import { create, findAll, topNews, findById, searchByTitle, byUser, update, erase, likeNews, addComment, deleteComment } from '../controllers/news.controller.js';
import app from '../../app.js';

newsRouter.get('/', findAll);
newsRouter.get("/top", topNews);
newsRouter.get("/search", searchByTitle);

newsRouter.use(authMiddleware);
newsRouter.post('/', create);
newsRouter.get("/byUser", byUser);

newsRouter.use(validId);
newsRouter.get("/:newsId", findById);
newsRouter.patch("/:newsId", validAuthenticatedUser, update);
newsRouter.delete("/:newsId", validAuthenticatedUser, erase);
newsRouter.patch("/like/:newsId", likeNews);
newsRouter.patch("/comment/:newsId", addComment);
newsRouter.patch("/comment/:newsId/:idComment", deleteComment);
// quando a rota tem parâmetro, tem que ficar por último
 
export default newsRouter;