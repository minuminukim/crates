import './AlbumInfo.css';

const AlbumInfo = ({ title, year }) => {
  return (
    <>
      <div className="with-arrow">
        <div className="album-info">
          <span className="album-info">
            {title} ({year})
          </span>
        </div>
        <div className="arrow" />
      </div>
    </>
  );
};

export default AlbumInfo;
