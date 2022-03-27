import { ArtWithOverlay } from '../AlbumArt';
import './AlbumGrid.css';
import { mapObjectIDs } from '../../utils';

const AlbumGrid = ({ albums, isRanked = false }) => {
  const sortRankedList = (albums) =>
    [...albums].sort((a, b) => a.listIndex - b.listIndex);
  const albumIDs = mapObjectIDs(sortRankedList(albums));

  return (
    <ul className="album-grid">
      {albumIDs?.length > 0 &&
        albumIDs.map((albumID, i) => (
          <li key={`grid-item-${i}}`} className="grid-item">
            <ArtWithOverlay albumID={albumID} />
            {isRanked && <span className="position">{i + 1}</span>}
          </li>
        ))}
    </ul>
  );
};

export default AlbumGrid;
