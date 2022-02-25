import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleUser } from '../../store/usersReducer';
import { getReviewsByUserID } from '../../store/reviewsReducer';
import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom';
import Backlog from '../Backlog';
import ReviewsList from '../../components/ReviewsList';
import { UserLists, UserNavigation, Diary, UserAlbums, Profile } from '.';
import './User.css';

const User = () => {
  const { userID } = useParams();
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users[userID]);
  const [loading, setLoading] = useState(true);
  // const sessionUser = useSelector((state) => state.session.sessionUser);

  useEffect(() => {
    return dispatch(fetchSingleUser(+userID))
      .then(() => dispatch(getReviewsByUserID(+userID)))
      .then(() => setLoading(false))
      .catch((err) => console.log('error fetching user', err));
  }, [dispatch, userID]);

  return (
    !loading && (
      <div className="page-container user-profile">
        <UserNavigation />
        {!loading && (
          <Switch>
            <Route exact path={`${path}`}>
              <Profile user={user} />
            </Route>
            <Route path={`${path}/reviews`}>
              <ReviewsList />
            </Route>
            <Route path={`${path}/lists`}>
              <UserLists userID={+userID} />
            </Route>
            <Route path={`${path}/backlog`}>
              <Backlog username={user?.username} />
            </Route>
            <Route path={`${path}/diary`}>
              <Diary />
            </Route>
            <Route path={`${path}/albums`}>
              <UserAlbums />
            </Route>
          </Switch>
        )}
      </div>
    )
  );
};

export default User;
