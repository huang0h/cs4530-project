// eslint-disable-next-line import/no-extraneous-dependencies
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/connect';

const db = await drizzle('libsql', { connection: process.env.DATABASE_URL, casing: 'snake_case' });

export default db;
