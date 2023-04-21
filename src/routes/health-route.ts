import { Router } from "./internals/router.js";

export const router = Router();

router.route("/health").get<{}, { message: string }>((_, res) => {
  return res.status(200).json({ message: "Server up and running" }).end();
});
