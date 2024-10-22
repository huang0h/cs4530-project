import { Request } from 'express';
import { Answer, CreateAnswer, Question, Tag, WithRelations } from './db/types';

export interface AddQuestionRequest extends Request {
  body: {
    title: string;
    text: string;
    tags: Pick<Tag, 'name' | 'description'>[];
    askerId: number;
  };
}

export interface AddAnswerRequest extends Request {
  body: CreateAnswer
}

export type AnswerResponse = Answer | { error: string };
