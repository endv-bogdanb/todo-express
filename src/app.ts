import Express from "express";

export const makeApp = (): Express.Express => {
  const app = Express();

  return app;
};
