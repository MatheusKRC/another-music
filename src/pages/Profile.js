import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../Components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  state = {
    user: {},
    loading: true,
  }

  componentDidMount = async () => {
    const usuario = await getUser();
    const { user, loading } = this.state;
    this.setState({ user: { ...usuario }, loading: false });
    return (user, loading);
  }

  render() {
    const { loading, user } = this.state;
    const { name, image, description, email } = user;
    return (
      <div data-testid="page-profile">
        <Header />

        {loading ? <Loading /> : (
          <div>
            <h1>Profile</h1>

            <img
              data-testid="profile-image"
              src={ image }
              alt={ name }
            />

            <Link to="/profile/edit">Editar perfil</Link>

            <h3>{name}</h3>
            <h3>{email}</h3>
            <h3>{description}</h3>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
