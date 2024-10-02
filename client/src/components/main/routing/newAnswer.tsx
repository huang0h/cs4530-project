import React from 'react';
import PageClass, { PageClassProps } from '.';
import NewAnswer from '../newAnswer';

/**
 * Interface representing the props for the NewAnswerPageClass component.
 * It includes all properties from PageClassProps except for qid and handleAnswer
 *
 * qid - The ID of the question for which a new answer is being created.
 * handleAnswer - A function to handle actions related to answering a question based on question id.
 */
interface NewAnswerPageClassProps extends Omit<PageClassProps, 'qid' | 'handleAnswer'> {
  qid: string;
  handleAnswer: (id: string) => void;
}

/**
 * Page class for creating a new answer.
 * It inherits all the properties, methods, and behaviors from PageClass.
 * It sets up the required properties and methods and renders the NewAnswer component.
 *
 * qid - The ID of the question for which a new answer is being created.
 * handleAnswer - A function to handle actions related to answering a question based on question id.
 */
export default class NewAnswerPageClass extends PageClass {
  qid: string;
  handleAnswer: (id: string) => void;

  constructor(props: NewAnswerPageClassProps) {
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
    this.handleAnswer = props.handleAnswer;
  }

  /**
   * It returns the NewAnswer component
   */
  getContent(): React.ReactNode {
    return <NewAnswer qid={this.qid} handleAnswer={this.handleAnswer} />;
  }

  /**
   * It represents the current page or state. By default, it returns an empty string.
   */
  getSelected(): string {
    return '';
  }
}
