import React from 'react';
import PageClass, { PageClassProps } from '.';
import AnswerPage from '../answerPage';

/**
 * Interface representing the props for the AnswerPageClass component.
 * It includes all properties from PageClassProps except for handleNewQuestion and handleNewAnswer
 *
 * qid - The unique identifier for the question related to this answer page.
 * handleNewQuestion - A function to handle the action of creating a new question.
 * handleNewAnswer - A function to handle the action of creating a new answer.
 */
interface AnswerPageClassProps
  extends Omit<PageClassProps, 'handleNewQuestion' | 'handleNewAnswer'> {
  qid: string;
  handleNewQuestion: () => void;
  handleNewAnswer: () => void;
}

/**
 * AnswerPageClass component represents a specific page for viewing and managing answers.
 * It inherits all the properties, methods, and behaviors from PageClass.
 *
 * qid - The unique identifier for the question.
 * handleNewQuestion - Function to handle creating a new question.
 * handleNewAnswer - Function to handle creating a new answer.
 */
export default class AnswerPageClass extends PageClass {
  qid: string;
  handleNewQuestion: () => void;
  handleNewAnswer: () => void;

  constructor(props: AnswerPageClassProps) {
    super({
      search: props.search,
      title: props.title,
      setQuestionPage: props.setQuestionPage,
      questionOrder: props.questionOrder,
      setQuestionOrder: props.setQuestionOrder,
      qid: props.qid,
      handleQuestions: props.handleQuestions,
      handleTags: props.handleTags,
      handleAnswer: props.handleAnswer,
      clickTag: props.clickTag,
      handleNewQuestion: props.handleNewQuestion,
      handleNewAnswer: props.handleNewAnswer,
    });

    this.qid = props.qid;
    this.handleNewQuestion = props.handleNewQuestion;
    this.handleNewAnswer = props.handleNewAnswer;
  }

  /**
   * Returns the AnswerPage component.
   */
  getContent(): React.ReactNode {
    return (
      <AnswerPage
        qid={this.qid}
        handleNewQuestion={this.handleNewQuestion}
        handleNewAnswer={this.handleNewAnswer}
      />
    );
  }

  /**
   * It represents the current page or state.
   * By default, it returns an empty string.
   */
  getSelected(): string {
    return '';
  }
}
