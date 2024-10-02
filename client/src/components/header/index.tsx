import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import './index.css';

/**
 * Interface representing the props for the Header component.
 *
 * - search - The initial search query string used to populate the input field.
 * - setQuestionPage - Callback function that navigates to the search results page.
 *                           It takes the search query and a title as arguments.
 */
interface HeaderProps {
  search: string;
  setQuestionPage: (query: string, title: string) => void;
}

/**
 * Header component that renders the main title and a search bar.
 * The search bar allows the user to input a query and navigate to the search results page
 * when they oress Enter.
 *
 * @param search The initial search query string used to populate the input field.
 * @param setQuestionPage Callback function that navigates to the search results page.
 */
const Header = ({ search, setQuestionPage }: HeaderProps) => {
  // TODO: Task 1 - Refactor the Header component to use the useHeader hook
  const [val, setVal] = useState<string>(search);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setQuestionPage(e.currentTarget.value, 'Search Results');
    }
  };

  return (
    <div id='header' className='header'>
      <div></div>
      <div className='title'>Fake Stack Overflow</div>
      <input
        id='searchBar'
        placeholder='Search ...'
        type='text'
        value={val}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Header;
