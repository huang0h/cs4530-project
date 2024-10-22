import { sqliteTable } from 'drizzle-orm/sqlite-core';
import * as t from 'drizzle-orm/sqlite-core';
import { sql, relations } from 'drizzle-orm';

/*
  ===============================
              TABLES
  ===============================
*/

const dateFields = {
  updatedAt: t
    .integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
  createdAt: t
    .integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`)
};

export const users = sqliteTable('users', {
  id: t.int().primaryKey({ autoIncrement: true }),
  username: t.text('username').notNull(),
  password: t.text('password').notNull(),
  ...dateFields,
});

export const questions = sqliteTable('questions', {
  id: t.int().primaryKey({ autoIncrement: true }),
  title: t.text().notNull(),
  text: t.text().notNull(),
  askerId: t
    .int()
    .notNull()
    .references(() => users.id),
  viewCount: t.int().notNull().default(0),
  ...dateFields,
});

export const answers = sqliteTable('answers', {
  id: t.int().primaryKey({ autoIncrement: true }),
  questionId: t
    .int()
    .notNull()
    .references(() => questions.id),
  text: t.text().notNull(),
  answererId: t
    .int()
    .notNull()
    .references(() => users.id),
  ...dateFields,
});

const commentFields = {
  id: t.int('id').primaryKey({ autoIncrement: true }),
  text: t.text().notNull(),
  commenterId: t
    .int()
    .notNull()
    .references(() => users.id),
  ...dateFields,
};

export const questionComments = sqliteTable('question_comments', {
  ...commentFields,
  questionId: t
    .int()
    .notNull()
    .references(() => questions.id),
});

export const answerComments = sqliteTable('answer_comments', {
  ...commentFields,
  questionId: t
    .int()
    .notNull()
    .references(() => questions.id),
});

const versionFields = {
  id: t.int().primaryKey({ autoIncrement: true }),
  text: t.text().notNull(),
  editorId: t
    .int()
    .notNull()
    .references(() => users.id),
  ...dateFields,
};

export const questionVersions = sqliteTable('question_versions', {
  ...versionFields,
  questionId: t
    .int()
    .notNull()
    .references(() => questions.id),
});

export const answerVersions = sqliteTable('answer_versions', {
  ...versionFields,
  answerId: t
    .int()
    .notNull()
    .references(() => answers.id),
});

export const tags = sqliteTable('tags', {
  id: t.int().primaryKey({ autoIncrement: true }),
  name: t.text().notNull(),
  description: t.text().notNull(),
  ...dateFields,
});

export const questionTags = sqliteTable(
  'questionTags',
  {
    questionId: t.integer().references(() => questions.id),
    tagId: t.integer().references(() => tags.id),
  },
  table => ({
    pk: t.primaryKey({ columns: [table.questionId, table.tagId] }),
  }),
);

export const votes = sqliteTable(
  'votes',
  {
    questionId: t
      .int()
      .notNull()
      .references(() => questions.id),
    voterId: t
      .int()
      .notNull()
      .references(() => users.id),
    value: t.int().notNull(),
    ...dateFields,
  },
  table => ({
    pk: t.primaryKey({ columns: [table.questionId, table.voterId] }),
  }),
);

/*
  ===============================
             RELATIONS
  ===============================
*/

export const usersRelations = relations(users, ({ many }) => ({
  questions: many(questions),
  answers: many(answers),
  questionComments: many(questionComments),
  answerComments: many(answerComments),
  votes: many(votes),
  questionVersions: many(questionVersions),
  answerVersions: many(answerVersions),
}));

export const questionsRelations = relations(questions, ({ one, many }) => ({
  askedByUser: one(users, {
    fields: [questions.askerId],
    references: [users.id],
  }),
  votes: many(votes),
  answers: many(answers),
  questionComments: many(questionComments),
  tags: many(questionTags),
  versions: many(questionVersions),
}));

export const answerRelations = relations(answers, ({ one, many }) => ({
  answererId: one(users, {
    fields: [answers.answererId],
    references: [users.id],
  }),
  questionId: one(questions, {
    fields: [answers.questionId],
    references: [questions.id],
  }),
  comments: many(answerComments),
  versions: many(answerVersions),
}));

export const questionsCommentsRelations = relations(questionComments, ({ one }) => ({
  question: one(questions, {
    fields: [questionComments.questionId],
    references: [questions.id],
  }),
  commenter: one(users, {
    fields: [questionComments.commenterId],
    references: [users.id],
  }),
}));

export const answersCommentsRelations = relations(answerComments, ({ one }) => ({
  answers: one(answers, {
    fields: [answerComments.questionId],
    references: [answers.id],
  }),
  commenterId: one(users, {
    fields: [answerComments.commenterId],
    references: [users.id],
  }),
}));

export const questionVersionsRelations = relations(questionVersions, ({ one }) => ({
  question: one(questions, {
    fields: [questionVersions.questionId],
    references: [questions.id],
  }),
  editor: one(users, {
    fields: [questionVersions.editorId],
    references: [users.id],
  }),
}));

export const answerVersionsRelations = relations(answerVersions, ({ one }) => ({
  answer: one(answers, {
    fields: [answerVersions.answerId],
    references: [answers.id],
  }),
  editor: one(users, {
    fields: [answerVersions.editorId],
    references: [users.id],
  }),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  questionTags: many(questionTags),
}));

export const questionTagsRelations = relations(questionTags, ({ one }) => ({
  question: one(questions, {
    fields: [questionTags.questionId],
    references: [questions.id],
  }),
  tag: one(tags, {
    fields: [questionTags.tagId],
    references: [tags.id],
  }),
}));

export const votesRelations = relations(votes, ({ one }) => ({
  voterId: one(users, {
    fields: [votes.voterId],
    references: [users.id],
  }),
  question: one(questions, {
    fields: [votes.questionId],
    references: [questions.id],
  }),
}));
