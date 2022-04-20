import { NextFunction, Request, Response } from "express"
import AppError from "../errors/AppError"
// import winston from './logger';

// const logger = winston(module);

// function logErrors (err: AppError, req: Request, res: Response, next: NextFunction) {
//   // if(err.message) logger.log('error m', err.message)
//   // if(err.stack) logger.error('error s', err.stack)
//   console.log("error handler")

//   next(err)
// }

function errorHandler (err: AppError, req: Request, res: Response, next: NextFunction) {
  res.status(err.statusCode).json(err.message)
}

export {
  // logErrors,
  errorHandler
}