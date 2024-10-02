import React, { ChangeEvent, useContext, useState } from 'react';
import './index.css';
import LoginContext from '../../contexts/LoginContext';

/**
 * Login Component contains a form that allows the user to input their username, which is then submitted
 * to the application's context through the useLoginContext hook.
 */
const Login = () => {
  const [username, setUsername] = useState<string>('');

  // TODO: Task 1 - Refactor the Login component to use the useLoginContext hook
  const context = useContext(LoginContext);
  if (context === null) {
    throw new Error('User context is null.');
  }
  const { setUser } = context;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUser({ username });
  };

  return (
    <div className='container'>
      <h2>Welcome to FakeStackOverflow!</h2>
      <h4>Please enter your username.</h4>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={username}
          onChange={handleInputChange}
          placeholder='Enter your username'
          required
          className='input-text'
        />
        <button type='submit' className='login-button'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
