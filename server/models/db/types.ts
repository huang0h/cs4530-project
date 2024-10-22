import {
  answerComments,
  answers,
  answerVersions,
  questionComments,
  questions,
  questionVersions,
  tags,
  users,
  votes,
} from './schema';

// Types of database tables and their columns
type UserColumns = typeof users.$inferSelect;
type QuestionColumns = typeof questions.$inferSelect;
type AnswerColumns = typeof answers.$inferSelect;
type QuestionCommentColumns = typeof questionComments.$inferSelect;
type AnswerCommentColumns = typeof answerComments.$inferSelect;
type QuestionVersionColumns = typeof questionVersions.$inferSelect;
type AnswerVersionColumns = typeof answerVersions.$inferSelect;
type TagColumns = typeof tags.$inferSelect;
type VoteColumns = typeof votes.$inferSelect;

// Public types: database columns and their relations
export interface Question extends QuestionColumns {
  askedByUser?: UserColumns;
  votes?: VoteColumns[];
  answers?: AnswerColumns[];
  questionComments?: QuestionCommentColumns[];
  tags?: TagColumns[];
  versions?: QuestionVersionColumns[];
}

export interface QuestionComment extends QuestionCommentColumns {
  question?: QuestionColumns;
  commenter?: UserColumns;
}

export interface Answer extends AnswerColumns {
  answerer?: UserColumns;
  question?: QuestionColumns;
}

export interface AnswerComment extends AnswerCommentColumns {
  answer?: AnswerColumns;
  commenter?: UserColumns;
}

export type CreateAnswer = Pick<Answer, 'answererId' | 'text' | 'questionId'>;

export interface Tag extends TagColumns {
  question?: QuestionColumns;
}

export type WithRelations<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
