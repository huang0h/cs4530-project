import { useContext } from 'react';
import LoginContext from '../contexts/LoginContext';

// TODO: jsdoc
export default function useLoginContext() {
  return useContext(LoginContext);
}
