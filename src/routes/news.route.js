import { Router } from 'express';
const router = Router();

import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validAuthenticatedUser } from '../middlewares/global.middleware.js';
import { create, findAll, topNews, findById, searchByTitle, byUser, update, erase, likeNews, addComment, deleteComment } from '../controllers/news.controller.js';

router.post('/', authMiddleware, create);
router.get('/', findAll);
router.get("/top", topNews);
router.get("/search", searchByTitle);
router.get("/byUser", authMiddleware, byUser)
router.get("/:id", authMiddleware, findById);
router.patch("/:id", authMiddleware, validAuthenticatedUser, update);
router.delete("/:id", authMiddleware, validAuthenticatedUser, erase);
router.patch("/like/:id", authMiddleware, likeNews);
router.patch("/comment/:id", authMiddleware, addComment);
router.patch("/comment/:id/:idComment", authMiddleware, deleteComment);
// quando a rota tem parâmetro, tem que ficar por último

export default router;