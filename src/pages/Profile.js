import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../Components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import test from '../Images/AnotherMusic.png';

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
    const { name, description, email } = user;
    return (
      <div data-testid="page-profile">
        <Header />

        {loading ? <Loading /> : (
          <div className="profile">

            <div className="profileCard">
              <h1 className="profileTitle">Profile</h1>

              <img
                className="profileImage"
                data-testid="profile-image"
                src={ test }
                alt={ name }
              />

              <h3 className="profileName">{name}</h3>
              <h3 className="profileEmail">{email}</h3>
              <h3 className="profileDesc">{description}</h3>
              <Link className="profileEdit" to="/profile/edit">Editar perfil</Link>
            </div>

          </div>
        )}
      </div>
    );
  }
}

export default Profile;
