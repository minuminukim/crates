import { useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom';
import Backlog from '../Backlog';
import ReviewsList from '../../components/ReviewsList';
import { UserLists, UserNavigation, Diary, UserAlbums, Profile } from '.';
import './User.css';

const User = () => {
  const { userID } = useParams();
  const { path } = useRouteMatch();
  const user = useSelector((state) => state.users[userID]);

  return (
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
  );
};

export default User;
