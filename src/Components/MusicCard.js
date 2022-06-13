import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    favorite: false,
    loading: false,
  }

  handlefavorited = () => {
    const { musicName } = this.props;
    const music = { musicName };
    const { favorite } = this.state;
    if (!favorite) {
      this.setState({ favorite: true, loading: true }, async () => {
        await addSong(music);
        this.setState({ loading: false });
      });
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
          defaultChecked={ favorite }
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
  }).isRequired,
  musicName: PropTypes.string.isRequired,
};
