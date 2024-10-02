import React from 'react';
import PageClass from '.';
import QuestionPage from '../questionPage';

/**
 * HomePageClass to represent a specific page for displaying questions based on the current state and props.
 * It inherits all the properties, methods, and behaviors from PageClass.
 * It also overrides or extends inherited properties and methods.
 */
export default class HomePageClass extends PageClass {
  /**
   * Returns QuestionPage component.
   */
  getContent(): React.ReactNode {
    return (
      <QuestionPage
        title_text={this.title}
        order={this.questionOrder}
        search={this.search}
        setQuestionOrder={this.setQuestionOrder}
        clickTag={this.clickTag}
        handleAnswer={this.handleAnswer}
        handleNewQuestion={this.handleNewQuestion}
      />
    );
  }

  /**
   * Returns the selected state or identifier for the page.
   * It returns 'q' to indicate that this is a questions page.
   */
  getSelected(): string {
    return 'q';
  }
}
