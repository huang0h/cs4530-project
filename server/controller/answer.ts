import express, { Response } from 'express';
import { Server } from 'socket.io';
import { addAnswerToQuestion, populateDocument, saveAnswer } from '../models/application';
import { CreateAnswer, WithRelations, Answer } from '../models/db/types';
import { AddAnswerRequest } from '../models/dtos';
import db from '../models/db/db';

const answerController = (socket: Server) => {
  const router = express.Router();

  /**
   * Checks if the provided answer request contains the required fields.
   *
   * @param req The request object containing the answer data.
   *
   * @returns `true` if the request is valid, otherwise `false`.
   */
  function isRequestValid(req: AddAnswerRequest): boolean {
    return !!req.body.questionId && !!req.body.text && !!req.body.answererId;
  }

  /**
   * Checks if the provided answer contains the required fields.
   *
   * @param ans The answer object to validate.
   *
   * @returns `true` if the answer is valid, otherwise `false`.
   */
  function isAnswerValid(ans: CreateAnswer): boolean {
    return !!ans.text && !!ans.answererId && !!ans.text;
  }

  /**
   * Adds a new answer to a question in the database. The answer request and answer are
   * validated and then saved. If successful, the answer is associated with the corresponding
   * question. If there is an error, the HTTP response's status is updated.
   *
   * @param req The AnswerRequest object containing the question ID and answer data.
   * @param res The HTTP response object used to send back the result of the operation.
   *
   * @returns A Promise that resolves to void.
   */
  const addAnswer = async (req: AddAnswerRequest, res: Response): Promise<void> => {
    if (!isRequestValid(req)) {
      res.status(400).send('Invalid request');
      return;
    }
    if (!isAnswerValid(req.body)) {
      res.status(400).send('Invalid answer');
      return;
    }

    const answer = req.body;

    try {
      const ansFromDb = await saveAnswer(answer);

      if ('error' in ansFromDb) {
        throw new Error(ansFromDb.error as string);
      }

      // const status = await addAnswerToQuestion(answer.questionId, ansFromDb);

      // if (status && 'error' in status) {
      //   throw new Error(status.error as string);
      // }

      const fullAnswer: undefined | WithRelations<Answer, 'question'> =
        await db.query.answers.findFirst({ with: { question: true } });

      if (fullAnswer)
        socket.emit('answerUpdate', {
          qid: fullAnswer.questionId,
          answer: fullAnswer,
        });
      res.json(ansFromDb);
    } catch (err) {
      res.status(500).send(`Error when adding answer: ${(err as Error).message}`);
    }
  };

  // add appropriate HTTP verbs and their endpoints to the router.
  router.post('/addAnswer', addAnswer);

  return router;
};

export default answerController;
