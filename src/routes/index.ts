import { Router } from "./internals/router.js";
import { router as healthRouter } from "./health-route.js";

export const router = Router();

router.use(healthRouter);
