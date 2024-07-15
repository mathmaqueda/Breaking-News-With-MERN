import { Router } from 'express';
const router = Router();

import { authMiddleware } from '../middlewares/auth.middleware.js';
import { create, findAll, topNews, findById, searchByTitle } from '../controllers/news.controller.js';

router.post('/', authMiddleware, create);
router.get('/', findAll);
router.get("/top", topNews);
router.get("/search", searchByTitle);

router.get("/:id", findById);

// quando a rota tem parâmetro, tem que ficar por último

export default router;