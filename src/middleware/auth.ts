import { NextFunction, Request, Response } from 'express';

export function requireUser(req: Request, res: Response, next: NextFunction): void {
  const userId = Number(req.header('x-user-id'));

  if (!Number.isInteger(userId) || userId <= 0) {
    res.status(401).json({ error: 'A valid x-user-id header is required.' });
    return;
  }

  req.user = { id: userId };
  next();
}