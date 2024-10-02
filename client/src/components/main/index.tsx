/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import './index.css';
import SideBarNav from './sideBarNav';
import HomePageClass from './routing/home';
import NewAnswerPageClass from './routing/newAnswer';
import NewQuestionPageClass from './routing/newQuestion';
import AnswerPageClass from './routing/answer';
import TagPageClass from './routing/tag';
import { OrderType } from '../../types';

/**
 * Interface represents the props for the MainPage Component.
 *
 * search - an optional string representing the current search query.
 * title - a string representing the title of the main page.
 * setQuestionPage - a function that updates the page to display the question content, optionally accepting a search query and a title.
 */
interface MainProps {
  search?: string;
  title: string;
  setQuestionPage: (search?: string, title?: string) => void;
}

/**
 * Main component represents the layout of the main page, including a sidebar and the main content area.
 *
 * @param search - optional search query,  defaults to an empty string if not provided.
 * @param title - the title of the main page.
 * @param setQuestionPage - a function to set the current question page based on the search query and title.
 */
const Main = ({ search = '', title, setQuestionPage }: MainProps) => {
  // TODO: Task 1 - Refactor the Main component to use the useMainPage hook
  // You may also move the eslint-disable @typescript-eslint/no-use-before-define comment to the new custom hook file.
  const [questionOrder, setQuestionOrder] = useState<OrderType>('newest');
  const [qid, setQid] = useState<string>('');

  const handleQuestions = () => {
    setQuestionPage();
    setPageInstance(
      new HomePageClass({
        search,
        title,
        setQuestionPage,
        questionOrder,
        setQuestionOrder,
        qid,
        handleQuestions,
        handleTags,
        handleAnswer,
        clickTag,
        handleNewQuestion,
        handleNewAnswer,
      }),
    );
  };

  const handleTags = () => {
    setPageInstance(
      new TagPageClass({
        search,
        title,
        setQuestionPage,
        questionOrder,
        setQuestionOrder,
        qid,
        handleQuestions,
        handleTags,
        handleAnswer,
        clickTag,
        handleNewQuestion,
        handleNewAnswer,
      }),
    );
  };

  const handleAnswer = (questionID: string) => {
    setQid(questionID);
    setPageInstance(
      new AnswerPageClass({
        search,
        title,
        setQuestionPage,
        questionOrder,
        setQuestionOrder,
        qid: questionID,
        handleQuestions,
        handleTags,
        handleAnswer,
        clickTag,
        handleNewQuestion,
        handleNewAnswer,
      }),
    );
  };

  const clickTag = (tname: string) => {
    setQuestionPage(`[${tname}]`, tname);
    setPageInstance(
      new HomePageClass({
        search,
        title,
        setQuestionPage,
        questionOrder,
        setQuestionOrder,
        qid,
        handleQuestions,
        handleTags,
        handleAnswer,
        clickTag,
        handleNewQuestion,
        handleNewAnswer,
      }),
    );
  };

  const handleNewQuestion = () => {
    setPageInstance(
      new NewQuestionPageClass({
        search,
        title,
        setQuestionPage,
        questionOrder,
        setQuestionOrder,
        qid,
        handleQuestions,
        handleTags,
        handleAnswer,
        clickTag,
        handleNewQuestion,
        handleNewAnswer,
      }),
    );
  };

  const handleNewAnswer = () => {
    setPageInstance(
      new NewAnswerPageClass({
        search,
        title,
        setQuestionPage,
        questionOrder,
        setQuestionOrder,
        qid,
        handleQuestions,
        handleTags,
        handleAnswer,
        clickTag,
        handleNewQuestion,
        handleNewAnswer,
      }),
    );
  };

  const [pageInstance, setPageInstance] = useState(
    new HomePageClass({
      search,
      title,
      setQuestionPage,
      questionOrder,
      setQuestionOrder,
      qid,
      handleQuestions,
      handleTags,
      handleAnswer,
      clickTag,
      handleNewQuestion,
      handleNewAnswer,
    }),
  );

  pageInstance.search = search;
  pageInstance.questionOrder = questionOrder;
  pageInstance.qid = qid;

  return (
    <div id='main' className='main'>
      <SideBarNav
        selected={pageInstance.getSelected()}
        handleQuestions={handleQuestions}
        handleTags={handleTags}
      />
      <div id='right_main' className='right_main'>
        {pageInstance.getContent()}
      </div>
    </div>
  );
};

export default Main;
