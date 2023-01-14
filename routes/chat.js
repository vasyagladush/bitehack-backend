import { Router } from "express";
import { isAuth } from "../middleware/is-auth.js";
import { sendMessage, getChats, updateChat } from "../controllers/chat.js";
const router = Router();

router.post("/message", isAuth, sendMessage);

router.get("/", isAuth, getChats);

router.put("/:chatId", isAuth, updateChat);

export default router;
