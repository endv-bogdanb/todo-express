import Express from "express";

export const errorMiddleware: Express.ErrorRequestHandler = (
  error,
  _req,
  res,
  _next
) => {
  console.log("error middleware ", error);
  return res.status(500).json({ message: "Internal server error" }).end();
};
