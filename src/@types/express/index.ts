declare namespace Express {
  export interface Request {
    userId: string;
    where: {
      speech?: string;
      answer?: string;
      id?: string;
    };
  }
};