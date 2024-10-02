import React from 'react';
import './index.css';
import OrderButton from './orderButton';
import { OrderType, orderTypeDisplayName } from '../../../../types';

/**
 * Interface representing the props for the QuestionHeader component.
 *
 * title_text - The title text displayed at the top of the header.
 * qcnt - The number of questions to be displayed in the header.
 * setQuestionOrder - A function that sets the order of questions based on the selected message.
 * handleNewQuestion - A function that is called when the "Ask a Question" button is clicked.
 */
interface QuestionHeaderProps {
  title_text: string;
  qcnt: number;
  setQuestionOrder: (order: OrderType) => void;
  handleNewQuestion: () => void;
}

/**
 * QuestionHeader component displays the header section for a list of questions.
 * It includes the title, a button to ask a new question, the number of the quesions,
 * and buttons to set the order of questions.
 *
 * @param title_text - The title text to display in the header.
 * @param qcnt - The number of questions displayed in the header.
 * @param setQuestionOrder - Function to set the order of questions based on input message.
 * @param handleNewQuestion - Function to handle the action of asking a new question.
 */
const QuestionHeader = ({
  title_text,
  qcnt,
  setQuestionOrder,
  handleNewQuestion,
}: QuestionHeaderProps) => (
  <div>
    <div className='space_between right_padding'>
      <div className='bold_title'>{title_text}</div>
      <button
        className='bluebtn'
        onClick={() => {
          handleNewQuestion();
        }}>
        Ask a Question
      </button>
    </div>
    <div className='space_between right_padding'>
      <div id='question_count'>{qcnt} questions</div>
      <div className='btns'>
        {Object.keys(orderTypeDisplayName).map((order, idx) => (
          <OrderButton
            key={idx}
            orderType={order as OrderType}
            setQuestionOrder={setQuestionOrder}
          />
        ))}
      </div>
    </div>
  </div>
);

export default QuestionHeader;
