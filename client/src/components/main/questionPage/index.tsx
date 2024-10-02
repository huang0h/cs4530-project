import React, { useContext, useEffect, useState } from 'react';
import './index.css';
import QuestionHeader from './header';
import QuestionView from './question';
import { getQuestionsByFilter } from '../../../services/questionService';
import { Answer, OrderType, Question } from '../../../types';
import UserContext from '../../../contexts/UserContext';

/**
 * Interface representing the props for the QuestionPage component.
 *
 * title_text - Optional title text to display at the top of the question page.
 * order - Text specifies the order in which questions should be displayed.
 * search - The search term to filter questions.
 * setQuestionOrder - A function to set the order of questions based on the input order.
 * clickTag - A function that handles clicking on a tag.
 * handleAnswer - A function that handles actions of asnwering the question based on the input question id.
 * handleNewQuestion - A function that handles the action of creating a new question.
 */
export interface QuestionPageProps {
  title_text?: string;
  order: OrderType;
  search: string;
  setQuestionOrder: (order: OrderType) => void;
  clickTag: (tagName: string) => void;
  handleAnswer: (id: string) => void;
  handleNewQuestion: () => void;
}

/**
 * QuestionPage component renders a page displaying a list of questions
 * based on filters such as order and search terms.
 * It includes a header with order buttons and a button to ask a new question.
 *
 * @param title_text - Title text for the page. Defaults to 'All Questions'.
 * @param order - Text specifies the ordering of questions.
 * @param search - Search term used to filter questions.
 * @param setQuestionOrder - Function to set the order of questions based on the order text.
 * @param clickTag - Function to handle clicks on tags.
 * @param handleAnswer - Function that handles actions of asnwering the question
 * @param handleNewQuestion - Function to handle the action of asking a new question.
 */
const QuestionPage = ({
  title_text = 'All Questions',
  order,
  search,
  setQuestionOrder,
  clickTag,
  handleAnswer,
  handleNewQuestion,
}: QuestionPageProps) => {
  // TODO: Task 1 - Refactor the QuestionPage component to use the useUserContext hook
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('User context is null.');
  }
  const { socket } = context;
  const [qlist, setQlist] = useState<Question[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getQuestionsByFilter(order, search);
        setQlist(res || []);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };

    const handleQuestionUpdate = async (question: Question) => {
      await fetchData();
    };

    const handleAnswerUpdate = ({ qid, answer }: { qid: string; answer: Answer }) => {
      setQlist(prevQlist =>
        prevQlist.map(q => (q._id === qid ? { ...q, answers: [...q.answers, answer] } : q)),
      );
    };

    const handleViewsUpdate = (question: Question) => {
      setQlist(prevQlist => prevQlist.map(q => (q._id === question._id ? question : q)));
    };

    fetchData();

    socket.on('questionUpdate', handleQuestionUpdate);
    socket.on('answerUpdate', handleAnswerUpdate);
    socket.on('viewsUpdate', handleViewsUpdate);

    return () => {
      socket.off('questionUpdate', handleQuestionUpdate);
      socket.off('answerUpdate', handleAnswerUpdate);
      socket.off('viewsUpdate', handleViewsUpdate);
    };
  }, [order, search, socket]);

  return (
    <>
      <QuestionHeader
        title_text={title_text}
        qcnt={qlist.length}
        setQuestionOrder={setQuestionOrder}
        handleNewQuestion={handleNewQuestion}
      />
      <div id='question_list' className='question_list'>
        {qlist.map((q, idx) => (
          <QuestionView q={q} key={idx} clickTag={clickTag} handleAnswer={handleAnswer} />
        ))}
      </div>
      {title_text === 'Search Results' && !qlist.length && (
        <div className='bold_title right_padding'>No Questions Found</div>
      )}
    </>
  );
};

export default QuestionPage;
