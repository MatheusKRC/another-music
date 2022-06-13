import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class Album extends React.Component {
  state = {
    musics: [],
    collection: [],
    loading: false,
  }

  componentDidMount = async () => {
    this.pushMusic();
  }

  pushMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const pushMusics = await getMusics(id);
    const listMusics = pushMusics.filter((_music, index) => index !== 0);
    this.setState({ musics: pushMusics,
      collection: listMusics });
  }

  render() {
    const { collection, musics, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {musics.length > 0 && (
          <div>
            {loading && <Loading />}
            <h3 data-testid="artist-name">
              {musics[0].artistName}
            </h3>

            <h4 data-testid="album-name">
              {musics[0].collectionName}
            </h4>
          </div>

        )}

        <div>
          {collection.map((music, index) => (
            <div key={ index }>
              <MusicCard music={ music } />
            </div>
          ))}
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
