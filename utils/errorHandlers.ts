import { NextFunction, Request, Response } from "express"

function logErrors (err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack)
  next(err)
}

function clientErrorHandler (err: Error, req: Request, res: Response, next: NextFunction) {
  if (req.xhr) {
    res.status(500).send({ error: 'unexpected error' })
  } else {
    next(err)
  }
}

function errorHandler (err: Error, req: Request, res: Response, next: NextFunction) {
  res.status(500)
  res.render('error', { error: err })
}

export {
  logErrors,
  clientErrorHandler,
  errorHandler
}