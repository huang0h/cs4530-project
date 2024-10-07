/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';
import { OrderType } from '../types';
import HomePageClass from '../components/main/routing/home';
import TagPageClass from '../components/main/routing/tag';
import AnswerPageClass from '../components/main/routing/answer';
import NewAnswerPageClass from '../components/main/routing/newAnswer';
import NewQuestionPageClass from '../components/main/routing/newQuestion';

// TODO: jsdoc
export default function useMainPage(
  search: string,
  title: string,
  setQuestionPage: (search?: string, title?: string) => void,
) {
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

  return { pageInstance, handleQuestions, handleTags };
}
