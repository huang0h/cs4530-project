import React, { useEffect, useState } from 'react';
import './index.css';
import TagView from './tag';
import { getTagsWithQuestionNumber } from '../../../services/tagService';
import { TagData } from '../../../types';

/**
 * Interface represents the props for the TagPage component.
 *
 * clickTag - Function to handle the click event for a tag. I
 *          - It receives the name of the clicked tag as an argument.
 * handleNewQuestion - Function to handle the event of asking a new question.
 */
interface TagPageProps {
  clickTag: (tagName: string) => void;
  handleNewQuestion: () => void;
}

/**
 * Represents the TagPage component which displays a list of tags
 * and provides functionality to handle tag clicks and ask a new question.
 *
 * @param clickTag - Function to handle the click event for a tag.
 *                 - It receives the name of the clicked tag as an argument.
 * @param handleNewQuestion - Function to handle the event of asking a new question.
 */
const TagPage = ({ clickTag, handleNewQuestion }: TagPageProps) => {
  const [tlist, setTlist] = useState<TagData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTagsWithQuestionNumber();
        setTlist(res || []);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className='space_between right_padding'>
        <div className='bold_title'>{tlist.length} Tags</div>
        <div className='bold_title'>All Tags</div>
        <button
          className='bluebtn'
          onClick={() => {
            handleNewQuestion();
          }}>
          Ask a Question
        </button>
      </div>
      <div className='tag_list right_padding'>
        {tlist.map((t, idx) => (
          <TagView key={idx} t={t} clickTag={clickTag} />
        ))}
      </div>
    </>
  );
};

export default TagPage;
