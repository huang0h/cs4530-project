import React from 'react';
import { handleHyperlink } from '../../../../tool';
import CommentSection from '../../commentSection';
import './index.css';
import { Comment } from '../../../../types';

/**
 * Interface representing the props for the Answer component.
 *
 * - text - The content of the answer
 * - ansBy - The username of the user who wrote the answer
 * - meta - Additional metadata related to the answer
 */
interface AnswerProps {
  text: string;
  ansBy: string;
  meta: string;
  comments: Comment[];
  handleNewComment: (comment: Comment) => void;
}

/**
 * Answer component that displays the content of an answer with the author's name and metadata.
 * The content is processed to handle hyperlinks.
 *
 * @param text The content of the answer.
 * @param ansBy The username of the answer's author.
 * @param meta Additional metadata related to the answer.
 * @param comments The comments left on the answer
 * @param handleNewComment A function to run that adds a new comment
 */
const AnswerView = ({ text, ansBy, meta, comments, handleNewComment }: AnswerProps) => (
  <div className='answer right_padding'>
    <div id='answerText' className='answerText'>
      {handleHyperlink(text)}
    </div>
    <div className='answerAuthor'>
      <div className='answer_author'>{ansBy}</div>
      <div className='answer_question_meta'>{meta}</div>
    </div>
    <CommentSection comments={comments} handleAddComment={handleNewComment} />
  </div>
);

export default AnswerView;
