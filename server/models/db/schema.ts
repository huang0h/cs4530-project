import { sqliteTable } from 'drizzle-orm/sqlite-core';
import * as t from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: t.int('id').primaryKey({ autoIncrement: true }),
  username: t.text().notNull(),
  password: t.text().notNull(),
});
