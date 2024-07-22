// chaves para desestruturar e não precisar usar express.Router()
import { Router } from 'express';
const router = Router();

import { login } from "../controllers/auth.controller.js";

router.post("/", login);

export default router;