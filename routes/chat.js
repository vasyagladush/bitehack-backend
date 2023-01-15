import { Router } from "express";
import { isAuth } from "../middleware/is-auth.js";
import { sendMessage, getChats, updateChat,getInfoAboutMe,getConsultantChat,getUserChat } from "../controllers/chat.js";
const router = Router();

router.post("/message", isAuth, sendMessage);

router.get("/", isAuth, getChats);

router.get("/info/me",isAuth,getInfoAboutMe);

router.get("/:consultantId",isAuth,getConsultantChat);

router.put("/:chatId",isAuth,updateChat);

router.get("/user/:userId",isAuth,getUserChat);

export default router;
