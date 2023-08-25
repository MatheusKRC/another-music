import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import anotherMusic from '../Images/AnotherMusic.png';
import anotherMusicM from '../Images/AnotherMusicM.png';
import Another from '../Images/Another.png';

class Login extends React.Component {
  state = {
    user: '',
    loading: false,
    loaded: false,
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({
      [name]: value,
    }));
  }

  handleSaveUser = async () => {
    const { user } = this.state;

    this.setState({ loading: true });

    await createUser({ name: user });

    this.setState({ loaded: true });
  }

  render() {
    const { loading, user, loaded } = this.state;
    return (
      <div className="loginPage">
        <img alt="Efeitos de Som" className="mobile" src={ Another } />
        {loaded && <Redirect to="/search" />}
        {loading ? (<Loading />) : (
          <div className="login" data-testid="page-login">
            <picture>
              <source media="(max-width: 800px)" srcSet={ anotherMusicM } />
              <img src={ anotherMusic } alt="logo do site" />
            </picture>
            <input
              className="inputName"
              name="user"
              data-testid="login-name-input"
              type="text"
              placeholder="Nome"
              onChange={ this.handleChange }
            />

            <button
              className="loginButton"
              type="button"
              data-testid="login-submit-button"
              disabled={ user.length <= 2 }
              onClick={ this.handleSaveUser }
            >
              Entrar

            </button>

          </div>) }
        <img className="mobile" alt="Efeitos de Som" src={ Another } />
      </div>

    );
  }
}

export default Login;
