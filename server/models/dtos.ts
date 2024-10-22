import { Request } from 'express';
import { Question, Tag, WithRelations } from './db/types';

export interface AddQuestionRequest extends Request {
  body: {
    title: string;
    text: string;
    tags: Tag[];
    askerId: number;
  };
};
