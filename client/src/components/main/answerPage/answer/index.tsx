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
  // TODO: Task 2 - Add field(s) to the AnswerProps interface
}

/**
 * Answer component that displays the content of an answer with the author's name and metadata.
 * The content is processed to handle hyperlinks.
 *
 * @param text The content of the answer.
 * @param ansBy The username of the answer's author.
 * @param meta Additional metadata related to the answer.
 */
const AnswerView = ({ text, ansBy, meta }: AnswerProps) => (
  // TODO: Task 2 - Add the CommentSection component to the AnswerView
  <div className='answer right_padding'>
    <div id='answerText' className='answerText'>
      {handleHyperlink(text)}
    </div>
    <div className='answerAuthor'>
      <div className='answer_author'>{ansBy}</div>
      <div className='answer_question_meta'>{meta}</div>
    </div>
  </div>
);

export default AnswerView;
