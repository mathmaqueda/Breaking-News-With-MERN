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
newsRouter.post('/', authMiddleware, create);

newsRouter.use(validId);
newsRouter.get("/byUser", byUser);
newsRouter.get("/:id", findById);
newsRouter.patch("/:id", validAuthenticatedUser, update);
newsRouter.delete("/:id", validAuthenticatedUser, erase);
newsRouter.patch("/like/:id", likeNews);
newsRouter.patch("/comment/:id", addComment);
newsRouter.patch("/comment/:id/:idComment", deleteComment);
// quando a rota tem parâmetro, tem que ficar por último

export default newsRouter;