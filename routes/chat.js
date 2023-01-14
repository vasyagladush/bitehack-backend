import { Router } from "express";
import { isAuth } from "../middleware/is-auth.js";

const router = Router();

router.post("/message", isAuth);

router.get("/chat", isAuth);

router.get("/consultants", isAuth);

export default router;
