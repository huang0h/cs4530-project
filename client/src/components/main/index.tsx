/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import './index.css';
import SideBarNav from './sideBarNav';
import useMainPage from '../../hooks/useMainPage';

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
  const { pageInstance, handleQuestions, handleTags } = useMainPage(search, title, setQuestionPage);

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
