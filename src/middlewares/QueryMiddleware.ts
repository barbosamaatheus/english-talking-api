import { Request, Response, NextFunction } from "express";

class QueryMiddleware
{
  public async exec(req: Request, res: Response, next: NextFunction): Promise<void>
  {
    const { speech, answer, id } = req.query;
    req.where = {};
    
    if(speech) req.where.speech = speech.toString().toLowerCase();
    if(answer) req.where.answer = answer.toString().toLowerCase();
    if(id) req.where.id = id.toString().toLowerCase();

    next();
  }
}

export default new QueryMiddleware();