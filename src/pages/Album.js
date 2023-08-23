import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import getMusics from '../services/musicsAPI';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import especialCharMask from '../services/removeSpecialChar';

class Album extends React.Component {
  state = {
    musics: [],
    albumImage: [],
    collection: [],
    loading: false,
    favoriteMusics: [],
  }

  componentDidMount = async () => {
    this.pushAlbumImage();
  }

  pushMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const pushMusics = await getMusics(id);
    const getFavorite = await getFavoriteSongs();
    const listMusics = pushMusics.filter((_music, index) => index !== 0);
    this.setState({
      favoriteMusics: getFavorite,
      musics: pushMusics,
      collection: listMusics });
  }

  pushAlbumImage = async () => {
    await this.pushMusic();

    const { musics } = this.state;
    const name = musics[0].artistName;
    const getImage = await searchAlbumsAPI(especialCharMask(name));
    const music = getImage.find((tittle) => (
      tittle.collectionName === musics[0].collectionName));
    console.log(music);
    this.setState({
      albumImage: music.artworkUrl100,
    });
  }

  render() {
    const { collection, musics, loading, favoriteMusics, albumImage } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div className="albumAllPage">
          {musics.length > 0 && (
            <div className="albumPage">
              {loading && <Loading />}

              <h3
                className="albumArtistName"
                data-testid="artist-name"
              >
                {musics[0].artistName}
              </h3>

              <h4
                className="AlbumName"
                data-testid="album-name"
              >
                {musics[0].collectionName}
              </h4>
            </div>

          )}

          <div className="musicCards">
            {collection.map((music, index) => (
              <div className="musicCard" key={ index }>
                <img
                  className="albumImagePage"
                  src={ albumImage }
                  alt={ musics[0].collectionName }
                />
                <MusicCard
                  music={ music }
                  favoriteMusics={
                    favoriteMusics.find((song) => song.trackName === music.trackName)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>);
  }
}

Album.propTypes = {
  match: PropTypes.shape.isRequired,
  params: PropTypes.shape.isRequired,
  id: PropTypes.string.isRequired,
}.isRequired;
export default Album;
