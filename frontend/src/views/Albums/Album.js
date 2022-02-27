import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useRouteMatch, Switch, Route } from 'react-router-dom';
import { fetchSingleAlbum } from '../../store/albumsReducer';
import AlbumArt from '../../components/AlbumArt';
import { AlbumNavigation, Tracklist } from '.';
import { ReviewActions } from '../../components/ActionsPanel';
import './Album.css';

const Album = (id) => {
  // const [album, setAlbum] = useState();
  // const [loading, setLoading] = useState(true);
  // const [errors, setErrors] = useState(false);
  const { spotifyID } = useParams();
  const dispatch = useDispatch();
  const { path } = useRouteMatch();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const album = await dispatch(fetchSingleAlbum(spotifyID));
  //       console.log('album', album);
  //       setAlbum(album);
  //       setLoading(false);
  //     } catch (err) {
  //       console.log('error fetching album', err);
  //     }
  //   })();
  // }, [dispatch, spotifyID]);

  let album = {
    spotifyID: '44byRkiG5AmHjfrBuodMzp',
    title: 'Body War',
    artist: 'Show Me the Body',
    artistImageURL: [],
    artworkURL:
      'https://i.scdn.co/image/ab67616d0000b273fc5b945694542a289fd416b5',
    genres: [],
    releaseYear: 2016,
    spotifyID: '44byRkiG5AmHjfrBuodMzp',
    title: 'Body War',
    totalTracks: 10,
    tracks: [
      { name: 'Body War', trackNumber: 1 },
      { name: 'Tight SWAT', trackNumber: 2 },
      { name: 'Death Sounds 2', trackNumber: 3 },
      { name: 'Chrome Exposed', trackNumber: 4 },
      { name: 'Honesty Hour', trackNumber: 5 },
      { name: 'Metallic Taste', trackNumber: 6 },
      { name: 'Worth One', trackNumber: 7 },
      { name: 'New Language', trackNumber: 8 },
      { name: 'Two Blood Pacts', trackNumber: 9 },
      { name: 'Aspirin', trackNumber: 10 },
    ],
  };

  return (
    <div className="single-album-view">
      <section className="album-view-left">
        <AlbumArt
          title={album.title}
          artworkURL={album.artworkURL}
          size="230"
        />
      </section>
      <section className="album-view-main">
        <div>
          <div className="album-header">
            <h1>{album.title}</h1>
            <p>{album.releaseYear}</p>
            <p>By {album.artist}</p>
          </div>
          <div className="album-details">
            <AlbumNavigation />
            <Switch>
              <Route path={`${path}/tracks`}>
                <Tracklist tracks={album.tracks} />
              </Route>
              <Route path={`${path}/genres`}>
                <h2>GENRES</h2>
              </Route>
            </Switch>
          </div>
        </div>
        <div><ReviewActions /></div>
      </section>
    </div>
  );
};

export default Album;
