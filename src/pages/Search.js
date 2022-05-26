import React from 'react';
import Header from '../Components/Header';

class Search extends React.Component {
  state = {
    artist: '',
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({
      [name]: value,
    }));
  }

  render() {
    const { artist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            name="artist"
            type="text"
            placeholder="Nome Do Artista"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ artist.length <= 1 }
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}

export default Search;
