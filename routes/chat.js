import { Router } from "express";
import { isAuth } from "../middleware/is-auth.js";
import { sendMessage, getChats } from "../controllers/chat.js";
const router = Router();

router.post("/message", isAuth, sendMessage);

router.get("/", isAuth, getChats);

export default router;
