import { useState, useEffect } from 'react';
import { Question, VoteData } from '../types';
import useUserContext from './useUserContext';
import { upvoteQuestion, downvoteQuestion } from '../services/questionService';

// TODO: jsdoc
export default function useVoteStatus(question: Question) {
  const context = useUserContext();
  if (context === null) {
    throw new Error('User context is null.');
  }
  const { user, socket } = context;
  const [count, setCount] = useState<number>(0);
  const [voted, setVoted] = useState<number>(0);

  useEffect(() => {
    const getVoteValue = () => {
      if (user.username && question?.upVotes?.includes(user.username)) {
        return 1;
      }
      if (user.username && question?.downVotes?.includes(user.username)) {
        return -1;
      }
      return 0;
    };

    // Set the initial count and vote value
    setCount((question.upVotes || []).length - (question.downVotes || []).length);
    setVoted(getVoteValue());

    const handleVoteUpdate = (voteData: VoteData) => {
      // TODO: Task 3 - Complete function to handle vote updates from the socket
    };

    // TODO: Task 3 - Setup appropriate socket listener(s) for vote updates
  }, [question, user.username]);

  const handleVote = async (type: string) => {
    try {
      if (question._id) {
        if (type === 'upvote') {
          await upvoteQuestion(question._id, user.username);
        } else if (type === 'downvote') {
          await downvoteQuestion(question._id, user.username);
        }
      }
    } catch (error) {
      // Handle error
    }
  };

  return { voted, count, handleVote };
}
