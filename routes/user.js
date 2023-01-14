import { Router } from "express";
import { isAuth } from "../middleware/is-auth.js";
import { calculate, getUser } from "../controllers/user.js";

const router = Router();

router.post("/calculate", isAuth, calculate);

router.get("/:userId", isAuth, getUser);

export default router;
