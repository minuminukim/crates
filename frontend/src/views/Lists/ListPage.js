import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchSingleList } from '../../store/listsReducer';
import AlbumGrid from '../../components/AlbumGrid';
import { ListActions } from '../../components/ActionsPanel';
import { deleteList } from '../../store/listsReducer';
import { useModal } from '../../hooks';
import { Modal } from '../../context/Modal';
import WarningMessage from '../../components/WarningMessage';
import { FaUserCircle } from 'react-icons/fa';
import { fetchSingleUser } from '../../store/usersReducer';
import { Link } from 'react-router-dom';
import { formatDateDayMonthYear } from '../../utils/date-helpers';
import './ListPage.css';

const ListPage = () => {
  const { listID } = useParams();
  const list = useSelector((state) => state.lists.items[listID]);
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoading, setIsLoading] = useState(true);
  const { showModal, toggleModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (list && list.albums?.length && username) {
      setIsLoading(false);
      return;
    }

    return dispatch(fetchSingleList(+listID))
      .then((list) => dispatch(fetchSingleUser(list.userID)))
      .then((user) => setUsername(user.username))
      .then(() => setIsLoading(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          console.log('error fetching list', data);
        }
      });
  }, [dispatch, list, username]);

  const handleDelete = () => {
    return dispatch(deleteList(+listID))
      .then(() => history.push('/'))
      .catch((err) => console.log('error deleting list', err));
  };

  return (
    !isLoading &&
    list?.albums.length > 0 && (
      <div className="list-page-content">
        <section className="list-page-main">
          <section className="user-info">
            <Link className="avatar-link" to={`/users/${list?.userID}`}>
              <FaUserCircle className="avatar-link" />
            </Link>
            <p>
              List by{' '}
              <Link className="user-link" to={`/users/${list?.userID}`}>
                {username}
              </Link>
            </p>
          </section>
          <div className="list-date">
            <p className="list-date">
              <span>Published</span> {formatDateDayMonthYear(list.createdAt)}
            </p>
          </div>
          <section className="list-page-header">
            <h1>{list?.title}</h1>
            <p>{list?.description}</p>
          </section>
          <AlbumGrid albums={list?.albums} isRanked={list?.isRanked} />
        </section>
        <section className="list-page-side">
          <ListActions
            userID={list?.userID}
            sessionUserID={sessionUser?.id}
            listID={listID}
            handleDelete={toggleModal}
          />
        </section>
        {showModal && (
          <Modal onClose={toggleModal}>
            <WarningMessage
              item="list"
              toggle={toggleModal}
              onDelete={handleDelete}
            />
          </Modal>
        )}
      </div>
    )
  );
};

export default ListPage;
