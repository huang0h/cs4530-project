// eslint-disable-next-line import/no-extraneous-dependencies
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/connect';

const db = drizzle('libsql', process.env.DB_FILE_NAME as string);

export default db;
