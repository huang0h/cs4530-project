import { OrderType } from '../../../types';

/**
 * Interface representing the props for the PageClass component.
 *
 * This interface defines the required properties for components that extend PageClass.
 * It includes various methods and state variables needed to handle questions, tags, and page navigation.
 *
 * search - The current search query.
 * title - The title of the page.
 * setQuestionPage - A function to set the question page, with optional search and title parameters.
 * questionOrder - The current order for displaying questions.
 * setQuestionOrder - A function to set the order of questions.
 * qid - The id of the current question .
 * handleQuestions - A function to handle question-related actions.
 * handleTags - A function to handle tag-related actions.
 * handleAnswer - A function to handle actions related to answering the question based on the question id.
 * clickTag - A function to handle tag clicks.
 * handleNewQuestion - A function to handle the creation of a new question.
 * handleNewAnswer - A function to handle the creation of a new answer.
 */
export interface PageClassProps {
  search: string;
  title: string;
  setQuestionPage: (search?: string, title?: string) => void;
  questionOrder: OrderType;
  setQuestionOrder: (order: OrderType) => void;
  qid: string;
  handleQuestions: () => void;
  handleTags: () => void;
  handleAnswer: (id: string) => void;
  clickTag: (tagName: string) => void;
  handleNewQuestion: () => void;
  handleNewAnswer: () => void;
}

/**
 * The PageClass provides common properties and methods that can be inherited
 * and extended by specific page components.
 */
class PageClass {
  search: string;
  title: string;
  setQuestionPage: (search?: string, title?: string) => void;
  questionOrder: OrderType;
  setQuestionOrder: (order: OrderType) => void;
  qid: string;
  handleQuestions: () => void;
  handleTags: () => void;
  handleAnswer: (id: string) => void;
  clickTag: (tagName: string) => void;
  handleNewQuestion: () => void;
  handleNewAnswer: () => void;

  /**
   * An instance of PageClass.
   */
  constructor(props: PageClassProps) {
    this.search = props.search;
    this.title = props.title;
    this.setQuestionPage = props.setQuestionPage;
    this.questionOrder = props.questionOrder;
    this.setQuestionOrder = props.setQuestionOrder;
    this.qid = props.qid;
    this.handleQuestions = props.handleQuestions;
    this.handleTags = props.handleTags;
    this.handleAnswer = props.handleAnswer;
    this.clickTag = props.clickTag;
    this.handleNewQuestion = props.handleNewQuestion;
    this.handleNewAnswer = props.handleNewAnswer;
  }

  /**
   * Returns the content to be rendered by the page.
   * By default, it returns null.
   */
  getContent(): React.ReactNode {
    return null;
  }

  /**
   * Returns the identifier or state for the current page.
   * By default, it returns an empty string.
   */
  getSelected(): string {
    return '';
  }
}

export default PageClass;
