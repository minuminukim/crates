import HoverInfo from '../HoverInfo';

const AlbumInfo = ({ title, year }) => {
  const formatted = `${title} (${year})`;
  return <HoverInfo className="album-info" text={formatted} />;
};

export default AlbumInfo;
