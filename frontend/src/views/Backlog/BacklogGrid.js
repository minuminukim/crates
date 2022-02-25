import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import handleImageError from '../../utils/handleImageError';
import { removeFromBacklog } from '../../store/backlogsReducer';
import { ErrorMessages } from '../../components/ValidationError';

const BacklogGrid = ({ albums, updateGrid }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const { userID } = useParams();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(null);
  const [message, setMessage] = useState('');

  const onDelete = (album) => {
    const { spotifyID, id } = album;
    dispatch(removeFromBacklog(id, spotifyID, sessionUser?.id))
      .then(() =>
        setMessage(`You have removed '${album.title}' from your backlog.`)
      )
      .then(() => updateGrid(album.id))
      // .then(() => history.go(0))
      .catch(async (res) => {
        console.log('res', res);

        const data = await res.json();
        console.log('data', data);
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <ul className="backlog-grid">
      <ErrorMessages success={message} errors={errors} />
      {albums?.length > 0 &&
        albums.map((album, i) => (
          <li key={`backlog-item-${i}`} className="album-grid-item">
            {/* <Link to="#"> */}
            <span className="overlay">
              {sessionUser && +userID === sessionUser?.id && (
                <FaTrash
                  className="remove icon"
                  onClick={() => onDelete(album)}
                />
              )}
            </span>
            <img
              alt={album.title}
              src={album.artworkURL}
              className="backlog-album"
              onError={handleImageError}
            />
            {/* <FaTrash className="remove icon" /> */}
          </li>
        ))}
    </ul>
  );
};

export default BacklogGrid;
