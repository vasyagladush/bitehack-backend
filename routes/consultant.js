import { Router } from "express";
import { isAuth } from "../middleware/is-auth.js";
import { calculate } from "../controllers/user.js";
import { getConsultants } from "../controllers/consultant.js";

const router = Router();

router.get("/calculate", isAuth, calculate);

router.get("/", isAuth, getConsultants);

export default router;
