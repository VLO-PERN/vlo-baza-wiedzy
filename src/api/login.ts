import express from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "../../" });

const router = express.Router();

router.post('/', async (req, res) => {
  if (!process.env.TOKEN) {
    res.sendStatus(500);
    return;
  }
  if (req.body.username && req.body.password) {
    const user = await req.db.getUserByUsername(req.body.username);
    if (user === null) {
      res.statusCode = 401;
      res.json({message: "Username or password is incorrect!"});
    } else {
      const passwordMatches = await argon2.verify(user.password, req.body.password);
      if (passwordMatches) {
        const token = jwt.sign({ "username": user.username }, process.env.TOKEN, { expiresIn: 60 * 60 * 72, algorithm: 'HS256'});
        res.statusCode = 201;
        res.json({ token: token });
      } else {
        res.statusCode = 401;
        res.json({message: "Username or password is incorrect!"});
      }
    }
  } else {
    res.statusCode = 400;
    res.json({message: "You must provide username and password!"});
  }
});

export default router;