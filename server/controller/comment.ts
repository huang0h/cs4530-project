import express, { Response } from 'express';
import { ObjectId } from 'mongodb';
import { Server } from 'socket.io';
import { Comment, AddCommentRequest } from '../types';
import { addComment, populateDocument, saveComment } from '../models/application';

const commentController = (socket: Server) => {
  const router = express.Router();

  /**
   * Checks if the provided answer request contains the required fields.
   *
   * @param req The request object containing the answer data.
   *
   * @returns `true` if the request is valid, otherwise `false`.
   */
  const isRequestValid = (req: AddCommentRequest): boolean => {
    // TODO: Task 2 - Implement the `isRequestValid` function
    throw new Error('Not implemented');
  };

  /**
   * Validates the comment object to ensure it is not empty.
   *
   * @param comment The comment to validate.
   *
   * @returns `true` if the coment is valid, otherwise `false`.
   */
  const isCommentValid = (comment: Comment): boolean => {
    // TODO: Task 2 - Implement the `isCommentValid` function
    throw new Error('Not implemented');
  };

  /**
   * Handles adding a new comment to the specified question or answer. The comment is first validated and then saved.
   * If the comment is invalid or saving fails, the HTTP response status is updated.
   *
   * @param req The AddCommentRequest object containing the comment data.
   * @param res The HTTP response object used to send back the result of the operation.
   * @param type The type of the comment, either 'question' or 'answer'.
   *
   * @returns A Promise that resolves to void.
   */
  const addCommentRoute = async (req: AddCommentRequest, res: Response): Promise<void> => {
    // TODO: Task 2 - Implement the `addCommentRoute` function
    // Hint: Refer to the addAnswer function in answer.ts for guidance

    // TODO: Task 3 - Emit the object updated with the comment to all connected clients
    // Hint: View the database to see how the data is stored and compare with the data expected
    // What might you need to do with the result from addComment?

    throw new Error('Not implemented');
  };

  router.post('/addComment', addCommentRoute);

  return router;
};

export default commentController;
