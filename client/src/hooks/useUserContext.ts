import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

// TODO: jsdoc
export default function useUserContext() {
  return useContext(UserContext);
}
