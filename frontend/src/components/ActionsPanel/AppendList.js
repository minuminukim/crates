import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  fetchUserLists,
  appendList,
  selectListsByUserID,
} from '../../store/listsReducer';

import { ErrorMessages } from '../ValidationError';
import { AiOutlinePlus } from 'react-icons/ai';
import './AppendList.css';
import Button from '../Button';

const AppendList = ({ album }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userID = useSelector((state) => state.session.user.id);
  const lists = useSelector((state) => selectListsByUserID(state, userID));

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
    // TODO: figure out z-index on error messages; state is updating as normal
    // but the messages aren't appearing over modal

    // const list = lists.find(({ id }) => id === chosenListID);
    // const isntUnique = list.albums.some(({id}) => id === album.id);
    // if (isntUnique) {
    //   setErrors(['Albums in a list must be unique.']);
    //   console.log('errors', errors);
    //   return;
    // }

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
          setErrors(data.errors);
          setIsLoading(false);
        }
      });
  };

  const listItemClass = (id) =>
    chosenListID === id ? `user-lists-item chosen` : `user-lists-item`;

  return (
    <>
      <ErrorMessages success={message} errors={errors} />
      {!isLoading && (
        <div className="action-panel append-list">
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
            {lists &&
              lists.map((list, i) => (
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
              disabled={!chosenListID || isLoading}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AppendList;
