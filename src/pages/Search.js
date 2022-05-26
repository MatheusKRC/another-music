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
          <form>
            <input
              name="artist"
              type="text"
              value={ artist }
              placeholder="Nome Do Artista"
              data-testid="search-artist-input"
              onChange={ this.handleChange }
            />
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ artist.length <= 1 }
              onClick={ this.handleSearchArtist }
            >
              Pesquisar

            </button>
          </form>)}
        {albuns.length !== 0 ? (
          <div>
            <p>{ `Resultado de álbuns de: ${artistName}`}</p>

            {albuns.map((music, index) => (
              <main key={ index }>

                <h2>{music.collectionName}</h2>
                <h3>{music.artistName}</h3>

                <Link
                  key={ music.collectionId }
                  data-testid={ `link-to-album-${music.collectionId}` }
                  to={ `/album/${music.collectionId}` }
                >
                  <button
                    type="button"
                  >
                    Ir Para O Álbum
                  </button>

                </Link>
                <img
                  src={ `url-to-${music.artworkUrl100}` }
                  alt={ music.collectionName }
                />
              </main>
            ))}
          </div>) : (<h1>Nenhum álbum foi encontrado</h1>)}

      </div>
    );
  }
}

export default Search;
