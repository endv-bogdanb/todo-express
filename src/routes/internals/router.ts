import Express from "express";
import asyncify from "express-asyncify";

export const Router: typeof Express.Router = (options) =>
  asyncify(Express.Router(options));
