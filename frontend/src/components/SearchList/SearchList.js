import { useState } from 'react';
import { Modal } from '../../context/Modal';
import ReviewForm from '../ReviewForm';
import SearchItem from '../SearchItem';
import './SearchList.css';

const SearchList = ({
  items,
  isModal,
  closeSearchModal = null,
  onClick = null,
}) => {
  const [chosen, setChosen] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <ul className="search-list">
      {items.map((item) => (
        <SearchItem
          key={item.spotifyID}
          title={item.title}
          artist={item.artist}
          releaseYear={item.releaseYear}
          onClick={() => {
            setChosen(item);
            setShowModal(true);
          }}
        />
      ))}
      {isModal && showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewForm
            album={chosen}
            onSuccess={() => {
              closeSearchModal();
              setShowModal(false);
            }}
          />
        </Modal>
      )}
    </ul>
  );
};

export default SearchList;
