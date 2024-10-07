import { useState, useEffect } from 'react';
import { getTagByName } from '../services/tagService';
import { Tag, TagData } from '../types';

// TODO: jsdoc
export default function useTagSelected(t: TagData) {
  const [tag, setTag] = useState<Tag>({
    name: '',
    description: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTagByName(t.name);
        setTag(res || { name: 'Error', description: 'Error' });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    };
    fetchData();
  }, [t.name]);

  return tag;
}
