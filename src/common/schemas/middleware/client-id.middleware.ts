import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ClientIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const clientId = req.headers['client-id'];
    if (!clientId) {
      return res.status(403).json({ message: 'No client-id provided' });
    } else {
      req['clientId'] = clientId;
    }
    next();
  }
}
