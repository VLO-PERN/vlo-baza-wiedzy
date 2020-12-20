import express from 'express';
import Database from './db/dbLogic';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import user from './interfaces/user';
import jwtUser from './interfaces/jwtUser';
dotenv.config({ path: __dirname + "../" });

const dbInstance = new Database();

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      db: Database,
      user: user | null
    }
  }
}

const notFound = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: Error , req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
}

const databaseHandler = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  req.db = dbInstance;
  next();
}

const checkIfLoggedIn = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
  if (req.headers.authorization) {
    const tokenToVerify = req.headers.authorization.toString().split(" ")[1];
    if (!process.env.TOKEN) {
      res.sendStatus(500);
      return;
    }
    try {
      const decoded: jwtUser = (<jwtUser>jwt.verify(tokenToVerify, process.env.TOKEN, { algorithms: ['HS256'] }));
      const user = await req.db.getUserByUsername(decoded.username);
      if (user === null) {
        res.sendStatus(401);
        return;
      }
      req.user = user;
      next();
  } catch {
      res.sendStatus(401);
  }
  } else {
    req.user = null;
    next();
  }
}

export default {
  notFound,
  errorHandler,
  databaseHandler,
  checkIfLoggedIn
};
