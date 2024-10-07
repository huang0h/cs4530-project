import React from 'react';
import './index.css';
import useHeader from '../../hooks/useHeader';

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
  const { val, handleInputChange, handleKeyDown } = useHeader(search, setQuestionPage);

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
