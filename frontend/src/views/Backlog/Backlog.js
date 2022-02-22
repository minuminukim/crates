import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserBacklog } from '../../store/albumsReducer';

const Backlog = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { userID } = useParams();
  const [albums, setAlbums] = useState([]);
  // const backlog = useSelector((state) => state.backlogs[+userID]);

  useEffect(() => {
    const fetchBacklog = async () => {
      const backlog = await dispatch(fetchUserBacklog(+userID));
      setAlbums(backlog);
      setLoading(false);
    };
    fetchBacklog();
  }, [dispatch]);

  return (
    !loading && (
      <>
        <h2 className="section-heading">YOU WANT TO LISTEN TO ALBUMS</h2>
        <ul>
          {albums?.length > 0 &&
            albums.map((album) => (
              <li>
                {album.title}
                {album.artworkURL}
              </li>
            ))}
        </ul>
      </>
    )
  );
};

export default Backlog;
