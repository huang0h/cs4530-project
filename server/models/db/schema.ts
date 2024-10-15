import { unique } from 'drizzle-orm/mysql-core';
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
    .text('updated_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
  createdAt: t
    .text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
};

export const users = sqliteTable('users', {
  id: t.int('id').primaryKey({ autoIncrement: true }),
  username: t.text('username').notNull(),
  password: t.text('password').notNull(),
  ...dateFields,
});

export const questions = sqliteTable('questions', {
  id: t.int().primaryKey({ autoIncrement: true }),
  title: t.text().notNull(),
  text: t.text().notNull(),
  askerId: t.int().references(() => users.id),
  viewCount: t.int().default(0),
  ...dateFields,
});

export const answers = sqliteTable('answers', {
  id: t.int().primaryKey({ autoIncrement: true }),
  questionId: t.int().references(() => questions.id),
  text: t.text().notNull(),
  answererId: t.int().references(() => users.id),
  ...dateFields,
});

const commentFields = {
  id: t.int('id').primaryKey({ autoIncrement: true }),
  text: t.text().notNull(),
  commentedBy: t.int().references(() => users.id),
  ...dateFields,
};

export const questionComments = sqliteTable('question_comments', {
  ...commentFields,
  questionId: t.int().references(() => questions.id),
});

export const answerComments = sqliteTable('answer_comments', {
  ...commentFields,
  questionId: t.int().references(() => questions.id),
});

const versionFields = {
  id: t.int().primaryKey({ autoIncrement: true }),
  text: t.text().notNull(),
  editorId: t.int().references(() => users.id),
  ...dateFields,
};

export const questionVersions = sqliteTable('question_versions', {
  ...versionFields,
  questionId: t.int().references(() => questions.id),
});

export const answerVersions = sqliteTable('answer_versions', {
  ...versionFields,
  answerId: t.int().references(() => answers.id),
});

export const tags = sqliteTable('tags', {
  id: t.int().primaryKey({ autoIncrement: true }),
  name: t.text(),
  description: t.text(),
  ...dateFields,
});

export const questionTags = sqliteTable(
  'questionTags',
  {
    questionId: t.int().references(() => questions.id),
    tagId: t.int().references(() => tags.id),
  },
  // table => ({
  //   pk: t.primaryKey({ columns: [table.questionId, table.tagId] }),
  // }),
);

export const votes = sqliteTable(
  'votes',
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    questionId: t.int().references(() => questions.id),
    voterId: t.int().references(() => users.id),
    value: t.int().notNull(),
    ...dateFields,
  },
  table => ({
    uniqQuestionIdVotedBy: unique().on(table.questionId, table.voterId),
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
    relationName: 'question_to_user',
  }),
  votes: many(votes),
  answers: many(answers),
  questionComments: many(questionComments),
  tags: many(questionTags),
  version: many(questionVersions),
}));

export const answerRelations = relations(answers, ({ one, many }) => ({
  answererId: one(users, {
    fields: [answers.answererId],
    references: [users.id],
    relationName: 'answer_to_user',
  }),
  questionId: one(questions, {
    fields: [answers.questionId],
    references: [questions.id],
    relationName: 'answer_to_question',
  }),
  comments: many(answerComments),
  versions: many(answerVersions),
}));

export const questionsCommentsRelations = relations(questionComments, ({ one }) => ({
  question: one(questions, {
    fields: [questionComments.questionId],
    references: [questions.id],
    relationName: 'questionComment_to_question',
  }),
  asker: one(users, {
    fields: [questionComments.commentedBy],
    references: [users.id],
    relationName: 'questionComment_to_user',
  }),
}));

export const answersCommentsRelations = relations(answerComments, ({ one }) => ({
  answers: one(answers, {
    fields: [answerComments.questionId],
    references: [answers.id],
    relationName: 'answerComment_to_answer',
  }),
  asker: one(users, {
    fields: [answerComments.commentedBy],
    references: [users.id],
    relationName: 'answerComment_to_user',
  }),
}));

export const questionVersionsRelations = relations(questionVersions, ({ one }) => ({
  question: one(questions, {
    fields: [questionVersions.questionId],
    references: questions.id,
    relationName: 'questionVersion_to_question',
  }),
  editor: one(users, {
    fields: [questionVersions.editorId],
    references: users.id,
    relationName: 'questionVersion_to_user',
  }),
}));

export const answerVersionsRelations = relations(answerVersions, ({ one }) => ({
  answer: one(answers, {
    fields: [answerVersions.answerId],
    references: answers.id,
    relationName: 'answerVersion_to_answer',
  }),
  editor: one(users, {
    fields: [answerVersions.editorId],
    references: users.id,
    relationName: 'answerVersion_to_user',
  }),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  questionTags: many(questionTags),
}));

export const questionTagsRelations = relations(questionTags, ({ one }) => ({
  question: one(questions, {
    fields: [questionTags.questionId],
    references: questions.id,
    relationName: 'questionTag_to_question',
  }),
  tag: one(tags, {
    fields: [questionTags.tagId],
    references: tags.id,
    relationName: 'questionTag_to_tag',
  }),
}));
