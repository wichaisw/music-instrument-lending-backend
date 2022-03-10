import { NextFunction, Request, Response } from "express"

function logErrors (err: Error, req: Request, res: Response, next: NextFunction) {
  
  if(err.message) console.log(err.message)
  if(err.stack) console.error(err.stack)
  next(err)
}

function errorHandler (err: Error, req: Request, res: Response, next: NextFunction) {
  res.status(400).json({ error: err })
}

export {
  logErrors,
  errorHandler
}