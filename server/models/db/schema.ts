import { unique } from 'drizzle-orm/mysql-core';
import { sqliteTable } from 'drizzle-orm/sqlite-core';
import * as t from 'drizzle-orm/sqlite-core';

// TODO move this into types.ts
const POST_TYPES = ['question', 'answer'] as const;
export type PostType = (typeof POST_TYPES)[number];

const commonDateFields = {
  updatedAt: t
    .text('updated_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
  createdAt: t
    .text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
};
// FIXME: postID and postType
export const users = sqliteTable('users', {
  id: t.int('id').primaryKey({ autoIncrement: true }),
  username: t.text('username').notNull(),
  password: t.text('password').notNull(),
  ...commonDateFields,
});

export const usersRelations = relations(users, ({ many }) => ({
  questions: many(questions),
  answers: many(answers),
}));

export const questions = sqliteTable('questions', {
  id: t.int().primaryKey({ autoIncrement: true }),
  title: t.text().notNull(),
  text: t.text().notNull(),
  askerId: t.int().references(() => users.id),
  viewCount: t.int().default(0),
  ...commonDateFields,
});

export const questionsRelations = relations(questions, ({ one }) => ({
  askedByUser: one(users, {
    fields: [questions.askedBy],
    references: [users.id],
    relationName: 'question_to_user',
  }),
}));

export const answers = sqliteTable('answers', {
  id: t.int().primaryKey({ autoIncrement: true }),
  questionId: t.int().references(() => questions.id),
  text: t.text().notNull(),
  answererId: t.int().references(() => users.id),
  ...commonDateFields,
});

export const answerRelations = relations(answers, ({ one }) => ({
  answererId: one(users, {
    fields: [answers.answererId],
    references: [users.id],
    relationName: 'answer_to_user',
  }),
}));

export const comments = sqliteTable('comments', {
  id: t.int().primaryKey({ autoIncrement: true }),
  postType: t.text({ enum: POST_TYPES }).notNull(),
  postId: t.int(), // TODO fk for multi table?
  text: t.text().notNull(),
  commented_by: t.int().references(() => users.id),
  ...commonDateFields,
});

export const tags = sqliteTable('tags', {
  id: t.int().primaryKey({ autoIncrement: true }),
  name: t.text(),
  description: t.text(),
  ...commonDateFields,
});

export const questionTags = sqliteTable('questionTags', {
  questionId: t.int().references(() => questions.id),
  tagId: t.int().references(() => tags.id),
});

export const votes = sqliteTable(
  'votes',
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    questionId: t.int().references(() => questions.id),
    voterId: t.int().references(() => users.id),
    value: t.int().notNull(),
    ...commonDateFields,
  },
  table => ({
    uniqQuestionIdVotedBy: unique().on(table.questionId, table.voterId),
  }),
);

export const postVersions = sqliteTable('post_versions', {
  id: t.int().primaryKey({ autoIncrement: true }),
  ...commonDateFields,
  postType: t.text({ enum: POST_TYPES }),
  postId: t.int().notNull(),
});
