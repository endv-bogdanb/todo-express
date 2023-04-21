import Express from "express";
import asyncify from "express-asyncify";
import { errorMiddleware } from "./internals/error-middleware.js";
import { router } from "../routes/index.js";

export const makeApp = (): Express.Express => {
  const app = asyncify(Express());

  app.use(Express.json({ limit: "100kb" }));
  app.use(router);
  app.use(errorMiddleware);

  return app;
};
