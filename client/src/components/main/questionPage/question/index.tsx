import React from 'react';
import './index.css';
import { getMetaData } from '../../../../tool';
import { Question } from '../../../../types';

/**
 * Interface representing the props for the Question component.
 *
 * q - The question object containing details about the question.
 * clickTag - Function to handle clicking on a tag based on the input tagName
 * handleAnswer - Function to handle the actions when the answer is submitted.
 */
interface QuestionProps {
  q: Question;
  clickTag: (tagName: string) => void;
  handleAnswer: (id: string) => void;
}

/**
 * Question component renders the details of a question including its title, tags, author, answers, and views.
 * Clicking on the component triggers the handleAnswer function,
 * and clicking on a tag triggers the clickTag function.
 *
 * @param q - The question object containing question details.
 * @param clickTag - Function to handle actions when clicking on a tag.
 * @param handleAnswer - Function to handle actions of answering the question.
 */
const QuestionView = ({ q, clickTag, handleAnswer }: QuestionProps) => (
  <div
    className='question right_padding'
    onClick={() => {
      if (q._id) {
        handleAnswer(q._id);
      }
    }}>
    <div className='postStats'>
      <div>{q.answers.length || 0} answers</div>
      <div>{q.views} views</div>
    </div>
    <div className='question_mid'>
      <div className='postTitle'>{q.title}</div>
      <div className='question_tags'>
        {q.tags.map((tag, idx) => (
          <button
            key={idx}
            className='question_tag_button'
            onClick={e => {
              e.stopPropagation();
              clickTag(tag.name);
            }}>
            {tag.name}
          </button>
        ))}
      </div>
    </div>
    <div className='lastActivity'>
      <div className='question_author'>{q.askedBy}</div>
      <div>&nbsp;</div>
      <div className='question_meta'>asked {getMetaData(new Date(q.askDateTime))}</div>
    </div>
  </div>
);

export default QuestionView;
