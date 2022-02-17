import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import IndexView from './components/IndexView';
import LandingView from './components/LandingView';
// import LoginFormPage from "./components/LoginFormPage";
// import SearchModal from './components/SearchModal';
import { restoreUser } from './store/session';
import { fetchAlbumsFromDB } from './store/albumsReducer';
import Navigation from './components/Navigation';
import { Modal } from './context/Modal';
import StarRating from './components/StarRating';
import Review from './components/Review';

function App() {
  const dispatch = useDispatch();
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
            <LandingView />
          </Route>
          <Route exact path="/home">
            <IndexView />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/reviews/:reviewID">
            <Review />
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
