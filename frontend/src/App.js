import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import Home from './views/Home';
import Landing from './views/Landing';
import Albums from './views/Albums';
import { Lists, ListForm, ListPage } from './views/Lists';
import LoginForm from './components/LoginFormModal/LoginForm';
import { restoreUser } from './store/session';
import { fetchAlbums } from './store/albumsReducer';
import Navigation from './components/Navigation';
import Review from './views/Reviews';
import NotFound from './views/NotFound';
import { User } from './views/User';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory();

  useEffect(() => {
    dispatch(restoreUser())
      .then(() => dispatch(fetchAlbums()))
      .then(() => setIsLoaded(true))
      .catch(() => {
        setIsLoaded(true);
        history.push('/error');
      });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div id="content">
        {isLoaded && (
          <Switch>
            <Route exact path="/">
              {sessionUser ? <Home /> : <Landing />}
            </Route>
            <Route exact path="/login">
              <div className="login-page">
                <LoginForm page />
              </div>
            </Route>
            <Route path="/reviews/:reviewID">
              <Review />
            </Route>
            <Route path="/users/:userID">
              <User />
            </Route>
            <Route exact path="/albums">
              <Albums />
            </Route>
            {/* <Route path="/albums/:spotifyID">
              <Album />
            </Route> */}
            <Route exact path="/lists">
              <Lists />
            </Route>
            <Route exact path="/lists/new">
              <ListForm />
            </Route>
            <Route exact path="/lists/:listID">
              <ListPage />
            </Route>
            <Route exact path="/lists/:listID/edit">
              <ListForm />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        )}
        <Footer />
      </div>
    </>
  );
}

export default App;
