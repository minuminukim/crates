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
import { dateTimeToString } from '../../utils/date-helpers';
import './ListPage.css';

const ListPage = () => {
  const { listID } = useParams();
  const list = useSelector((state) => state.lists.items[listID]);
  const user = useSelector((state) => state.users[list?.userID]);
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoading, setIsLoading] = useState(true);
  const { showModal, toggleModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (list) {
      setIsLoading(false);
      return;
    }

    dispatch(fetchSingleList(+listID))
      .then(() => setIsLoading(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          return data;
        }
      });
  }, [dispatch, list, listID]);

  const handleDelete = () => {
    dispatch(deleteList(+listID, sessionUser.id)).then(
      () => history.push('/'),
      (error) => console.log('Error deleting list', error)
    );
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
                {user?.username}
              </Link>
            </p>
          </section>
          <div className="list-date">
            <p className="list-date">
              <span>Published</span> {dateTimeToString(list.createdAt)}
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
