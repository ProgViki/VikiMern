import { ErrorRequestHandler } from "express";


const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
//   console.error(err.stack);
    console.log(`PATH: ${req.path}`, error);
    return

  res.status(500).send("Internal Server Error");
};

export default errorHandler;