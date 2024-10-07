import { useState } from 'react';
import useUserContext from './useUserContext';
import { validateHyperlink } from '../tool';
import addAnswer from '../services/answerService';
import { Answer } from '../types';

// TODO: jsdoc
export default function useAnswerForm(qid: string, handleAnswer: (qid: string) => void) {
  const context = useUserContext();

  if (context === null) {
    throw new Error('User context is null.');
  }
  const { user } = context;
  const [text, setText] = useState<string>('');
  const [textErr, setTextErr] = useState<string>('');

  const postAnswer = async () => {
    let isValid = true;

    if (!text) {
      setTextErr('Answer text cannot be empty');
      isValid = false;
    }

    // Hyperlink validation
    if (!validateHyperlink(text)) {
      setTextErr('Invalid hyperlink format.');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const answer: Answer = {
      text,
      ansBy: user.username,
      ansDateTime: new Date(),
    };

    const res = await addAnswer(qid, answer);
    if (res && res._id) {
      handleAnswer(qid);
    }
  };

  return { text, setText, textErr, postAnswer };
}
