import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  state = {
    artist: '',
    artistName: '',
    albuns: [],
    loading: false,
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({
      [name]: value,
    }));
  }

  handleSearchArtist = async () => {
    const { artist } = this.state;

    this.setState({ loading: true });

    const search = await searchAlbumsAPI(artist);
    this.setState({
      albuns: search,
      artist: '',
      artistName: artist,
      loading: false,
    });
  }

  render() {
    const { artist, loading, artistName, albuns } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? (<Loading />) : (
          <form className="searchForm">
            <input
              name="artist"
              type="text"
              className="searchInput"
              value={ artist }
              placeholder="Nome Do Artista"
              data-testid="search-artist-input"
              onChange={ this.handleChange }
            />
            <button
              className="searchButton"
              data-testid="search-artist-button"
              type="button"
              disabled={ artist.length <= 1 }
              onClick={ this.handleSearchArtist }
            >
              Pesquisar

            </button>
          </form>)}
        {albuns.length !== 0 ? (
          <div className="allAlbuns">
            {/* <div>
              <p>{ `Resultado de álbuns de: ${artistName}`}</p>

            </div> */}

            {albuns.map((music, index) => (
              <Link
                key={ music.collectionId }
                data-testid={ `link-to-album-${music.collectionId}` }
                to={ `/album/${music.collectionId}` }
              >
                <main className="albuns" key={ index }>

                  <img
                    className="albumImage"
                    src={ music.artworkUrl100 }
                    alt={ music.collectionName }
                  />

                  <h3 className="albumTitle">{music.collectionName}</h3>
                  <h3 className="artist">{music.artistName}</h3>

                </main>
              </Link>
            ))}
          </div>) : (<h1 className="nothing">Nenhum álbum foi encontrado</h1>)}

      </div>
    );
  }
}

export default Search;
