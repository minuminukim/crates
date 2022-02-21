import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Home from './views/Home';
import Landing from './views/Landing';
import Albums from './views/Albums';
import { Lists, ListForm, ListPage } from './views/Lists';
import SignupForm from './components/SignupForm';
import { restoreUser } from './store/session';
import { fetchAlbumsFromDB } from './store/albumsReducer';
import Navigation from './components/Navigation';
import ReviewsList from './components/ReviewsList';
import Review from './views/Reviews';
import NotFound from './views/NotFound';
import { User } from './views/User';

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser())
      .then(() => dispatch(fetchAlbumsFromDB()))
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            {sessionUser ? <Home /> : <Landing />}
          </Route>
          <Route path="/signup">
            <SignupForm />
          </Route>
          <Route path="/reviews/:reviewID">
            <Review />
          </Route>
          <Route path="/users/:userID">
            <User />
          </Route>
          {/* <Route exact path="/users/:userID/reviews">
            <ReviewsList />
          </Route> */}
          <Route exact path="/albums">
            <Albums />
          </Route>
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
    </>
  );
}

export default App;
