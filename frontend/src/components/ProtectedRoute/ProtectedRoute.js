import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ path, exact, children }) => {
  const user = useSelector((state) => state.session.user);

  return (
    <Route exact={exact} path={path}>
      {user ? children : <Redirect to="/login" />}
    </Route>
  );
};

export default ProtectedRoute;
