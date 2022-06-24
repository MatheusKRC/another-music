import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class MusicCard extends React.Component {
  state = {
    favorite: false,
    loading: false,
  }

  componentDidMount = async () => {
    const { favoriteMusics } = this.props;
    this.setState({ favorite: favoriteMusics });
  }

  handlefavorited = async ({ target: { checked } }) => {
    const { music } = this.props;
    const { trackId } = music;

    this.setState({ loading: true, favorite: checked });
    if (checked) {
      await addSong(await getMusics(trackId));
    } else {
      await removeSong(await getMusics(trackId));
    }
    this.setState({ loading: false });
  }

  getFavoriteMusic = async () => {
    const { favoriteMusics } = this.state;
    this.setState({ loading: true });
    const favorite = await getFavoriteSongs();
    this.setState({ favoriteMusics: favorite, loading: false });
    return favoriteMusics;
  }

  handleFavorite = () => {
    const { favoriteMusics } = this.props;
    this.setState({ favorite: favoriteMusics });
  }

  render() {
    const { music } = this.props;
    const { previewUrl, trackId, trackName } = music;
    const { loading, favorite } = this.state;
    return (
      <div>
        {loading && <Loading />}
        <h3>{trackName}</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="fav">

          <input
            id="fav"
            name="fav"
            type="checkbox"
            checked={ favorite }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handlefavorited }
          />
          Favorita
        </label>

      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.string.isRequired,
    favorite: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  favoriteMusics: PropTypes.bool.isRequired,
};
