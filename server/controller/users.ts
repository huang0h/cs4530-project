import express, { Request, Response } from 'express';
import { Server } from 'socket.io';
import { eq } from 'drizzle-orm';
import { users } from '../models/db/schema';
import db from '../models/db/db';

const userController = (socket: Server) => {
  const router = express.Router();

  /**
   * Signs up a new user if the username is unique and the password meets criteria.
   *
   * @param req The HTTP request object containing username and password in the body.
   * @param res The HTTP response object used to send back the result of the operation.
   *
   * @returns A Promise that resolves to void.
   */
  const signUp = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    // Check if username and password are provided and password length is sufficient
    if (!username || !password || password.length < 8) {
      res.status(400).send('Invalid username or password. Password must be at least 8 characters.');
      return;
    }

    try {
      const existingUser = await db.select().from(users).where(eq(users.username, username)).get();

      if (existingUser) {
        res.status(409).send('Username already exists');
        return;
      }

      // Insert the new user with plain text password
      await db.insert(users).values({
        username,
        password,
      });

      res.status(201).send('User created successfully');
    } catch (err) {
      res.status(500).send(`Error when signing up: ${(err as Error).message}`);
    }
  };

  /**
   * Signs in an existing user by verifying the username and password.
   *
   * @param req The HTTP request object containing username and password in the body.
   * @param res The HTTP response object used to send back the result of the operation.
   *
   * @returns A Promise that resolves to void.
   */
  const signIn = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).send('Invalid request');
      return;
    }

    try {
      const user = await db.select().from(users).where(eq(users.username, username)).get();

      if (!user) {
        res.status(404).send('User not found');
        return;
      }

      // Check if the password matches
      if (user.password !== password) {
        res.status(401).send('Invalid password');
        return;
      }

      // Calculate session expiration time (e.g., 30 minutes from now)
      const sessionDuration = 30 * 60 * 1000; // 30 minutes
      const sessionExpiry = new Date(Date.now() + sessionDuration);

      res.status(200).json({
        username: user.username,
        sessionExpiry,
      });
    } catch (err) {
      res.status(500).send(`Error when signing in: ${(err as Error).message}`);
    }
  };

  // Add appropriate HTTP verbs and their endpoints to the router
  router.post('/signUp', signUp);
  router.post('/signIn', signIn);

  return router;
};

export default userController;
