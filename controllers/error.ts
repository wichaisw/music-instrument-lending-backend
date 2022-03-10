import { Request, Response } from "express";

const get404 = (req: Request, res: Response) => {

  res.status(404).json({ 
    pageTitle: 'Page Not Found',
    path: '/404'
  });
}

export {
  get404,
}