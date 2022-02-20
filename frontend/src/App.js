import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import IndexView from './components/IndexView';
import LandingView from './components/LandingView';
import AlbumsView from './components/AlbumsView';
// import LoginFormPage from "./components/LoginFormPage";
// import SearchModal from './components/SearchModal';
import SignupForm from './components/SignupFormPage/SignupForm';
import { restoreUser } from './store/session';
import { fetchAlbumsFromDB } from './store/albumsReducer';
import Navigation from './components/Navigation';
import ReviewsList from './components/ReviewsList';
import Review from './components/Review';

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
            {sessionUser ? <IndexView /> : <LandingView />}
          </Route>
          <Route exact path="/home">
            <IndexView />
          </Route>
          <Route path="/signup">
            <SignupForm />
          </Route>
          <Route path="/reviews/:reviewID">
            <Review />
          </Route>
          <Route exact path="/users/:userID/reviews">
            <ReviewsList />
          </Route>
          <Route exact path="/albums">
            <AlbumsView />
          </Route>
          {/* <Route path="/search">
            <SearchModal />
          </Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;
