import React from 'react';
import './index.css';

/**
 * Interface representing the props for the SideBarNav component.
 *
 * selected - An optional text showing the selected menu item which determines the highlighted item
 * handleQuestions - Function to handle the action when "Questions" is selected
 * handleTags - Function to handle the action when "Tags" is selected
 */
interface SideBarNavProps {
  selected?: string;
  handleQuestions: () => void;
  handleTags: () => void;
}

/**
 * The SideBarNav component has two menu items: "Questions" and "Tags".
 * It highlights the currently selected item based on the `selected` prop and
 * triggers corresponding functions when the menu items are clicked.
 *
 * @param selected - The currently selected menu item. Default is an empty string
 * @param handleQuestions - Function to handle selection of "Questions".
 * @param handleTags - Function to handle selection of "Tags".
 */
const SideBarNav = ({ selected = '', handleQuestions, handleTags }: SideBarNavProps) => (
  <div id='sideBarNav' className='sideBarNav'>
    <div
      id='menu_question'
      className={`menu_button ${selected === 'q' ? 'menu_selected' : ''}`}
      onClick={() => {
        handleQuestions();
      }}>
      Questions
    </div>
    <div
      id='menu_tag'
      className={`menu_button ${selected === 't' ? 'menu_selected' : ''}`}
      onClick={() => {
        handleTags();
      }}>
      Tags
    </div>
  </div>
);

export default SideBarNav;
