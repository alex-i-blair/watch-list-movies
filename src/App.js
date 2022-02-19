import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, NavLink } from 'react-router-dom';
import AuthPage from './AuthPage';
import SearchPage from './SearchPage';
import WatchListPage from './WatchListPage';
import { logout, getUser } from './services/fetch-utils';

function App() {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('supabase.auth.token'));

  useEffect(() => {
    async function getUserObject() {
      const data = await getUser();
      setCurrentUser(data);
    }
    getUserObject();
  }, []);

  async function handleLogout() {
    logout();
    setCurrentUser('');
  }

  return (
    <Router>
      <div className="App">
        <header>{currentUser && <button onClick={handleLogout}>Logout</button>}</header>
        <main>
          <Switch>
            <Route exact path="/">
              {currentUser ? <Redirect to="/watch-list" /> : <AuthPage setUser={setCurrentUser} />}
            </Route>
            <Route exact path="/watch-list">
              {!currentUser ? <Redirect to="/" /> : <WatchListPage />}
            </Route>
          </Switch>
        </main>
      </div>
      ;
    </Router>
  );
}

export default App;
