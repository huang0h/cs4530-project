import React from 'react';
import Form from '../baseComponents/form';
import Input from '../baseComponents/input';
import TextArea from '../baseComponents/textarea';
import './index.css';
import useNewQuestion from '../../../hooks/useNewQuestion';

/**
 * Interface representing the props for the NewQuestion component.
 *
 * - handleQuestions - A function that handles the actions after a question is submitted.
 *                   - It is used to update the list of questions
 *                     or refresh the state of the component after a new question has been added.
 */
interface NewQuestionProps {
  handleQuestions: () => void;
}

/**
 * NewQuestion component allows users to submit a new question with a title, description, tags, and username.
 *
 * @param handleQuestions - Function to handle the action after a question is successfully submitted.
 */
const NewQuestion = ({ handleQuestions }: NewQuestionProps) => {
  const {
    title,
    setTitle,
    titleErr,
    text,
    setText,
    textErr,
    tagNames,
    setTagNames,
    tagErr,
    postQuestion,
  } = useNewQuestion(handleQuestions);

  return (
    <Form>
      <Input
        title={'Question Title'}
        hint={'Limit title to 100 characters or less'}
        id={'formTitleInput'}
        val={title}
        setState={setTitle}
        err={titleErr}
      />
      <TextArea
        title={'Question Text'}
        hint={'Add details'}
        id={'formTextInput'}
        val={text}
        setState={setText}
        err={textErr}
      />
      <Input
        title={'Tags'}
        hint={'Add keywords separated by whitespace'}
        id={'formTagInput'}
        val={tagNames}
        setState={setTagNames}
        err={tagErr}
      />
      <div className='btn_indicator_container'>
        <button
          className='form_postBtn'
          onClick={() => {
            postQuestion();
          }}>
          Post Question
        </button>
        <div className='mandatory_indicator'>* indicates mandatory fields</div>
      </div>
    </Form>
  );
};

export default NewQuestion;
