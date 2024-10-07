import './index.css';
import React from 'react';
import Form from '../baseComponents/form';
import TextArea from '../baseComponents/textarea';
import useAnswerForm from '../../../hooks/useAnswerForm';

/**
 * Interface representing the props for the NewAnswer component.
 *
 * - qid - The unique identifier of the question that the answer is associated with.
 * - handleAnswer - A function that handles the submitted answer.
 *                - It takes the question ID as a parameter and performs the required action
 */
interface NewAnswerProps {
  qid: string;
  handleAnswer: (qid: string) => void;
}

/**
 * NewAnswer component allows users to submit an answer to a specific question.
 *
 * @param qid - The unique identifier of the question being answered.
 * @param handleAnswer - Function to handle the submission.
 */
const NewAnswer = ({ qid, handleAnswer }: NewAnswerProps) => {
  const { text, setText, textErr, postAnswer } = useAnswerForm(qid, handleAnswer);

  return (
    <Form>
      <TextArea
        title={'Answer Text'}
        id={'answerTextInput'}
        val={text}
        setState={setText}
        err={textErr}
      />
      <div className='btn_indicator_container'>
        <button className='form_postBtn' onClick={postAnswer}>
          Post Answer
        </button>
        <div className='mandatory_indicator'>* indicates mandatory fields</div>
      </div>
    </Form>
  );
};

export default NewAnswer;
