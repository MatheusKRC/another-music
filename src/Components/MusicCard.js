import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    favorite: false,
    loading: false,
  }

  componentDidMount = async () => {
    const { musicName } = this.props;
    const music = { musicName };
    const favoriteMusics = await getFavoriteSongs();
    const test = favoriteMusics.some((music2) => music2.trackId === music.trackId);
    return test;
  }

  handlefavorited = ({ target }) => {
    const { musicName } = this.props;
    const music = { musicName };
    this.setState({ favorite: target.checked, loading: true }, async () => {
      await addSong(music);
      getFavoriteSongs();
      this.setState({ loading: false });
    });
  }

  render() {
    const { music } = this.props;
    const { previewUrl, trackId, trackName, isFavorite } = music;
    const { loading, favorite } = this.state;
    return (
      <div>
        {loading && <Loading />}
        <h3>{trackName}</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <input
          type="checkbox"
          defaultChecked={ isFavorite || favorite }
          data-testid={ `checkbox-music-${trackId}` }
          onChange={ this.handlefavorited }
        />
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
    isFavorite: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  musicName: PropTypes.string.isRequired,
};
