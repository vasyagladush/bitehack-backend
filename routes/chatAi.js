import { Router } from "express";
import { isAuth } from "../middleware/is-auth.js";
import { sendMessage } from "../controllers/chatAi.js";

const router = Router();

router.post("/message",isAuth,sendMessage);

router.get("/chat",isAuth);

export default router;