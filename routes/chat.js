import { Router } from "express";
import { isAuth } from "../middleware/is-auth.js";
import {sendMessage} from "../controllers/chat.js";
const router = Router();

router.post("/message", isAuth,sendMessage);

router.get("/chat", isAuth);

router.get("/consultants", isAuth);

export default router;
