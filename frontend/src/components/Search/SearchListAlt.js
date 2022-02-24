const SearchListALt = ({
  searchErrors,
  showList,
  isLoading,
  results,
  onError,
  onSetState,
}) => {
  return (
    !searchErrors.length &&
    showList && (
      <ul className={`search-list ${showList ? 'absolute' : 'block'}`}>
        {!isLoading &&
          results?.length > 0 &&
          results.map((item) => (
            <SearchItem
              key={item.spotifyID}
              title={item.title}
              artist={item.artist}
              releaseYear={item.releaseYear}
              onClick={() => {
                const found = albums.some(
                  ({ spotifyID }) => spotifyID === item.spotifyID
                );

                if (found) {
                  setErrors([...errors, 'Albums in a list must be unique.']);
                } else {
                  setAlbums([...albums, item]);
                  setShowList(false);
                }
              }}
            />
          ))}
      </ul>
    )
  );
};
