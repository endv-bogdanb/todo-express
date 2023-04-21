import { Router } from "./internals/router.js";
import { router as healthRouter } from "./health-route.js";
import { router as todoRouter } from "./todo-route.js";

export const router = Router();

router.use(healthRouter);
router.use(todoRouter);
