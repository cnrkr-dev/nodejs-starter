/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';

class AppController {
  static async showHomePage(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      res.send("Express + TypeScript Server");
    } catch (error) {
      console.error(error);
    }
  }
}

export default AppController;
