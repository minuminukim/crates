import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleUser } from '../../store/usersReducer';
import {
  Switch,
  Route,
  useRouteMatch,
  useParams,
  useHistory,
} from 'react-router-dom';
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
  const history = useHistory();

  useEffect(() => {
    if (user) {
      setLoading(false);
      return;
    }

    dispatch(fetchSingleUser(+userID))
      .then(() => setLoading(false))
      .catch((err) => {
        if (err && err.status === 404) {
          history.push('/not-found');
        }
      });
  }, [dispatch, userID]);

  return (
    !loading && (
      <div className="content-container user">
        <UserNavigation />

        <Switch>
          <Route exact path={`${path}`}>
            <Profile />
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
      </div>
    )
  );
};

export default User;
