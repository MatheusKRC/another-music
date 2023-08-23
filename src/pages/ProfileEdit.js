import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    loading: true,
    disabled: true,
  }

  componentDidMount = async () => {
    const { name, email, image, description } = await getUser();

    this.setState({
      name,
      email,
      image,
      description,
      loading: false,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      { [name]: value },
      this.validate,
    );
  }

  handleClick = () => {
    const { name, email, image, description } = this.state;
    const { history } = this.props;
    this.setState(
      { loading: true },
      async () => {
        await updateUser({ name, email, image, description });
        history.push('/profile');
      },
    );
  }

  validate = () => {
    const { name } = this.state;
    const validate = name === '';
    this.setState({
      disabled: validate,
    });
  }

  render() {
    const { loading, disabled, name, email, description } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          { loading ? <Loading /> : (
            <form className="editProfile">
              Nome
              <input
                type="text"
                className="editInput"
                name="name"
                value={ name }
                data-testid="edit-input-name"
                onChange={ this.handleChange }
              />
              E-mail
              <input
                type="email"
                className="editInput"
                name="email"
                value={ email }
                data-testid="edit-input-email"
                onChange={ this.handleChange }
              />
              Descrição
              <input
                type="text"
                className="editInput"
                name="description"
                value={ description }
                data-testid="edit-input-description"
                onChange={ this.handleChange }
              />

              <button
                type="button"
                className="profileEdit"
                data-testid="edit-button-save"
                disabled={ disabled }
                onClick={ this.handleClick }
              >
                Editar perfil
              </button>

            </form>
          ) }
        </div>
      </>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
