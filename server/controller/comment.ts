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
  const isRequestValid = (req: AddCommentRequest): boolean =>
    !!(req.body.id && req.body.comment && req.body.type);

  /**
   * Validates the comment object to ensure it is not empty.
   *
   * @param comment The comment to validate.
   *
   * @returns `true` if the coment is valid, otherwise `false`.
   */
  const isCommentValid = (comment: Comment): boolean =>
    !!(comment.text && comment.commentBy && comment.commentDateTime);

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
    if (!isRequestValid(req)) {
      res.status(400).send('Invalid request');
      return;
    }

    const { id, type, comment } = req.body;

    if (!isCommentValid(comment)) {
      res.status(400).send('Invalid comment');
      return;
    }

    try {
      const savedComment = await saveComment(comment);

      if ('error' in savedComment) {
        throw new Error(savedComment.error as string);
      }

      const status = await addComment(id, type, savedComment);

      if (status && 'error' in status) {
        throw new Error(status.error as string);
      }

      res.json(savedComment);
    } catch (err) {
      res.status(500).send(`Error when adding comment: ${(err as Error).message}`);
    }

    // TODO: Task 3 - Emit the object updated with the comment to all connected clients
    // Hint: View the database to see how the data is stored and compare with the data expected
    // What might you need to do with the result from addComment?
  };

  router.post('/addComment', addCommentRoute);

  return router;
};

export default commentController;
