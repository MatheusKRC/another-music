import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

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

  handlefavorited = async () => {
    const { musicName } = this.props;
    const music = { musicName };
    const { loading } = this.state;
    this.setState({ loading: true });
    if (loading) {
      await addSong(music);
      getFavoriteSongs();
      this.setState({ loading: false, favorite: true });
    } else {
      await removeSong(music);
      getFavoriteSongs();
      this.setState({ loading: false, favorite: false });
    }
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
          {' '}
          <code>audio</code>
          .
        </audio>
        <input
          type="checkbox"
          checked={ favorite }
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
