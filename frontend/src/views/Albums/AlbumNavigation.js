import { NavLink, useRouteMatch } from 'react-router-dom';

const AlbumNavigation = () => {
  const { url } = useRouteMatch();

  return (
    <nav className="album-nav">
      <NavLink className="album-nav-label" to={`${url}/tracks`}>
        TRACKS
      </NavLink>
      <NavLink className="album-nav-label" to={`${url}/genres`}>
        GENRES
      </NavLink>
    </nav>
  );
};

export default AlbumNavigation;
