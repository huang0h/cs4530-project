import { useState } from 'react';
import { getMetaData } from '../../../tool';
import { Comment } from '../../../types';
import './index.css';

/**
 * Interface representing the props for the Comment Section component.
 *
 * - comments - list of the comment components
 * - handleAddComment - a function that handles adding a new comment, taking a Comment object as an argument
 */
interface CommentSectionProps {
  comments: Comment[];
  handleAddComment: (comment: Comment) => void;
}

/**
 * CommentSection component shows the users all the comments and allows the users add more comments.
 *
 * @param comments: an array of Comment objects
 * @param handleAddComment: function to handle the addition of a new comment
 */
const CommentSection = ({ comments, handleAddComment }: CommentSectionProps) => (
  // TODO: Task 2 - Implement the CommentSection component

  // Add the necessary state variables and functions to handle the comment input and display
  // Hint: you can get the current user from the useUserContext hook

  // Add the necessary handlers to show/hide comments and add new comments

  /**
   * For the HTML structure, you should be able to:
   *
   * - Toggle Comments:
   *  - Create a button labeled "Show Comments" that, when clicked, displays a list of comments.
   *    If comments are visible, the button label should change to "Hide Comments."
   *  - Implement a showComments state that toggles between showing and hiding the comment list.
   * - Display Comments:
   *  - When showComments is true, display a list of comments.
   *  - Each comment should include:
   *   - The comment text.
   *   - The name of the person who commented.
   *   - The date and time the comment was added, formatted using `getMetaData`
   *   - If no comments exist, display a message saying "No comments yet."
   * - Add Comment:
   *  - Display a text area for users to input a new comment.
   *  - Display an "Add Comment" button that, when clicked, adds the comment to the list of comments.
   *  - If the comment text is empty, display an error message saying "Comment cannot be empty."
   *  - When a comment is added, clear the text area.
   */
  <div className='comment-section'></div>
);
export default CommentSection;
