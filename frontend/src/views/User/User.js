import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleUser } from '../../store/usersReducer';
import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom';
// import UserNavigation from './UserNavigation';
import ReviewsList from '../../components/ReviewsList';
import { UserLists, UserNavigation } from '.';

const User = () => {
  const { userID } = useParams();
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users?.userID);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return dispatch(fetchSingleUser(+userID))
      .then(() => setLoading(false))
      .catch((err) => console.log('error fetching user', err));
  }, [dispatch, userID]);

  return (
    !loading && (
      <div className="page-container user-profile">
        <UserNavigation />
        {!loading && (
          <Switch>
            <Route exact path={path}>
              {/* todo.. profile */}
              <h2>{user?.username}</h2>
            </Route>
            <Route path={`${path}/reviews`}>
              <ReviewsList />
            </Route>
            <Route path={`${path}/lists`}>
              <UserLists userID={+userID} />
            </Route>
          </Switch>
        )}
      </div>
    )
  );
};

export default User;
