import { Request, Response, NextFunction } from "express";

class QueryMiddleware
{
  public async exec(req: Request, res: Response, next: NextFunction): Promise<void>
  {
    const { speech, answer } = req.query;
    req.where = {};
    
    if(speech) req.where.speech = speech.toString().toLowerCase();
    if(answer) req.where.answer = answer.toString().toLowerCase();
    
    next();
  }
}

export default new QueryMiddleware();