// eslint-disable-next-line import/no-extraneous-dependencies
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

const client = createClient({ url: process.env.DB_FILE_NAME! });
const db = drizzle(client, { schema });

export default db;
