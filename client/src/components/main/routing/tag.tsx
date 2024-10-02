import React from 'react';
import PageClass from '.';
import TagPage from '../tagPage';

/**
 * Page class for displaying and interacting with tags.
 */
export default class TagPageClass extends PageClass {
  getContent(): React.ReactNode {
    return <TagPage clickTag={this.clickTag} handleNewQuestion={this.handleNewQuestion} />;
  }

  /**
   * It provides a specific identifier for the Tag Page,
   * By default, it returns 't'.
   */
  getSelected(): string {
    return 't';
  }
}
