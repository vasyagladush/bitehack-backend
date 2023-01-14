import { Router } from "express";
import { isAuth } from "../middleware/is-auth.js";
import { calculate } from "../controllers/user.js";

const router = Router();

router.post("/calculate", isAuth, calculate);

export default router;
