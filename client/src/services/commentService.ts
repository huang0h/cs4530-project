import api from './config';
import { Comment } from '../types';

const COMMENT_API_URL = `${process.env.REACT_APP_SERVER_URL}/comment`;

/**
 * Adds a new comment to a specific question.
 *
 * @param id - The ID of the question to which the comment is being added.
 * @param type - The type of the comment, either 'question' or 'answer'.
 * @param comment - The comment object containing the comment details.
 * @throws Error Throws an error if the request fails or the response status is not 200.
 */
const addComment = async (
  id: string,
  type: 'question' | 'answer',
  comment: Comment,
): Promise<Comment> => {
  // TODO: Task 2 - Implement the addComment function
  // It should call the `COMMENT_API_URL/addComment` to add the comment to the backend database.
  throw new Error('Not implemented');
};

export default addComment;
