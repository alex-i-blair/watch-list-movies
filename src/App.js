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
      data && setCurrentUser(data);
    }
    getUserObject();
  }, []);

  async function handleLogout() {
    await logout();
    setCurrentUser('');
  }

  return (
    <Router>
      <div>
        {currentUser && (
          <ul>
            <li>
              <NavLink activeClassName="active-class" to="/search">
                Search
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active-class" to="/watchlist">
                Watchlist
              </NavLink>
            </li>
          </ul>
        )}
      </div>
      <div className="App">
        <header>{currentUser && <button onClick={handleLogout}>Logout</button>}</header>
        <main>
          <Switch>
            <Route exact path="/">
              {currentUser ? <Redirect to="/search" /> : <AuthPage setUser={setCurrentUser} />}
            </Route>
            <Route exact path="/watchlist">
              {!currentUser ? <Redirect to="/" /> : <WatchListPage />}
            </Route>
            <Route exact path="/search">
              {!currentUser ? <Redirect to="/" /> : <SearchPage />}
            </Route>
          </Switch>
        </main>
      </div>
      ;
    </Router>
  );
}

export default App;
