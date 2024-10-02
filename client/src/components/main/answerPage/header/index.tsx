import React from 'react';
import './index.css';

/**
 * Interface representing the props for the AnswerHeader component.
 *
 * - ansCount - The number of answers to display in the header.
 * - title - The title of the question or discussion thread.
 * - handleNewQuestion - Callback function to handle a new question
 */
interface AnswerHeaderProps {
  ansCount: number;
  title: string;
  handleNewQuestion: () => void;
}

/**
 * AnswerHeader component that displays a header section for the answer page.
 * It includes the number of answers, the title of the question, and a button to ask a new question.
 *
 * @param ansCount The number of answers to display.
 * @param title The title of the question or discussion thread.
 * @param handleNewQuestion Callback function to handle asking a new question.
 */
const AnswerHeader = ({ ansCount, title, handleNewQuestion }: AnswerHeaderProps) => (
  <div id='answersHeader' className='space_between right_padding'>
    <div className='bold_title'>{ansCount} answers</div>
    <div className='bold_title answer_question_title'>{title}</div>
    <button
      className='bluebtn'
      onClick={() => {
        handleNewQuestion();
      }}>
      Ask a Question
    </button>
  </div>
);

export default AnswerHeader;
