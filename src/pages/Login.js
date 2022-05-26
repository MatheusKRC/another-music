import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

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
      <div>
        {loaded && <Redirect to="/search" />}
        {loading ? (<Loading />) : (
          <div data-testid="page-login">
            <input
              name="user"
              data-testid="login-name-input"
              type="text"
              placeholder="Nome"
              onChange={ this.handleChange }
            />

            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ user.length <= 2 }
              onClick={ this.handleSaveUser }
            >
              Entrar

            </button>

          </div>) }

      </div>

    );
  }
}

export default Login;
