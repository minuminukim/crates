const Tracklist = ({ tracks }) => {
  const formatted = (duration) => {
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);
    const padded = (int) => int.toString().padStart(2, '0');
    return `${padded(minutes)}:${padded(seconds)}`;
  };
  return (
    <ol className="album-tracklist">
      {tracks?.length > 0 &&
        tracks.map((track) => (
          <li className="album-track">
            <div className="album-track-left">
              <p className="trackname">{track.name}<span></span></p>
            </div>
            <div className="album-track-right">
              <p>{formatted(track.durationMS)}</p>
            </div>
          </li>
        ))}
    </ol>
  );
};

export default Tracklist;
