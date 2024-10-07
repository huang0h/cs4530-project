import { useState, ChangeEvent, KeyboardEvent } from 'react';

// TODO: jsdoc
export default function useHeader(
  search: string,
  setQuestionPage: (query: string, title: string) => void,
) {
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

  return { val, handleInputChange, handleKeyDown };
}
