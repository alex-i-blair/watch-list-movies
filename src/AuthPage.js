import { useState } from 'react';
import { getUser, signInUser, signUpUser } from './services/fetch-utils';

export default function AuthPage({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn(e) {
    e.preventDefault();
    const user = await signInUser(email, password);
    setUser(user);
  }
  async function handleSignUp() {
    const user = await signUpUser(email, password);
    setUser(user);
  }
  return (
    <div>
      <h1>Watch List</h1>
      <h3>Select and save movies you want to watch</h3>
      <form onSubmit={handleSignIn}>
        <label>
          Email
          <input type="email" required onChange={(e) => setEmail(e.target.value)} name="email" />
        </label>
        <label>
          Password
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
        </label>
        <button>Sign In</button>
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
