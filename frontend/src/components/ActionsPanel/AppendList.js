import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { fetchUserLists, appendList } from '../../store/listsReducer';
import { ErrorMessages } from '../ValidationError';
import { AiOutlinePlus } from 'react-icons/ai';
import './AppendList.css';
import Button from '../Button';

const AppendList = ({ album }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userID = useSelector((state) => state.session.user.id);
  const lists = useSelector((state) => {
    const listIDs = state.users[userID]?.lists;
    if (!listIDs) return [];
    return listIDs.map((id) => state.lists.items[id]);
  });

  const [isLoading, setIsLoading] = useState(true);
  const [chosenListID, setChosenID] = useState(null);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(fetchUserLists(userID))
      .then(() => setIsLoading(false))
      .catch((err) =>
        console.log(
          `Error fetching lists for user ${userID} in AppendList`,
          err
        )
      );
  }, [dispatch, userID]);

  const handleDispatch = () => {
    setErrors([]);
    const list = lists.find(({ id }) => id === chosenListID);
    const isntUnique = list.albums.some((albumID) => albumID === album.id);
    if (isntUnique) {
      setErrors(['Albums in a list must be unique.']);
      return;
    }

    const payload = {
      listID: chosenListID,
      albumID: album.id,
      spotifyID: album.spotifyID,
      artworkURL: album.artworkURL,
      title: album.title,
      artist: album.artist,
      releaseYear: album.releaseYear,
    };

    setIsLoading(true);
    dispatch(appendList(payload))
      .then((list) => {
        setMessage(
          `You have successfully added '${album.title}' to your list '${list.title}'`
        );
        setIsLoading(false);
        const redirectTimeout = setTimeout(() => history.go(0), 2500);
        return () => clearTimeout(redirectTimeout);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          return setErrors(data.errors);
        }
      });
  };

  const listItemClass = (id) =>
    chosenListID === id ? `user-lists-item chosen` : `user-lists-item`;

  const chooseList = (listID, albumIDs) => {
    console.log('listID', albumIDs);
    const isntUnique = albumIDs.some((id) => id === listID);
    if (isntUnique) {
      setErrors(['Albums in a list must be unique.']);
    } else {
      setChosenID(listID);
    }
  };

  return (
    !isLoading && (
      <div className="action-panel append-list">
        <ErrorMessages success={message} errors={errors} />
        <div className="panel-header">
          <h1 className="panel-heading">Add '{album.title}' to lists</h1>
        </div>
        <ul className="user-lists">
          <li className="new-list user-lists-item">
            <Link to={{ pathname: '/lists/new', state: { data: album } }}>
              <span className="append-list-icon">
                <AiOutlinePlus />
              </span>
              New list...
            </Link>
          </li>
          {lists.map((list, i) => (
            <li
              key={`list-${i}`}
              className={listItemClass(list.id)}
              onClick={() => setChosenID(list.id)}
            >
              <p>{list.title}</p>
            </li>
          ))}
        </ul>
        <div className="action-panel-footer">
          <Button
            label="ADD"
            className="btn-save"
            size="medium"
            onClick={() => handleDispatch()}
            disabled={!chosenListID || isLoading || errors.length}
          />
        </div>
      </div>
    )
  );
};

export default AppendList;
