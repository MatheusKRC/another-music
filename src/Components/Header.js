import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import icon from './Icon.png';
import logo from './Logo.png';

class Header extends React.Component {
    state = {
      loading: true,
      user: '',
    }

    componentDidMount() {
      this.handleGetUser();
    }

    handleGetUser = async () => {
      const login = await getUser();

      this.setState({ loading: false, user: login.name });
    }

    render() {
      const { loading, user } = this.state;
      return (
        <header data-testid="header-component">
          {loading ? (<Loading />) : (
            <div className="navBar">
              <div className="test">
                <img className="imgLogo" src={ logo } alt="Icon" />
              </div>
              <div className="divName">

                <img className="imgIcon" src={ icon } alt="Icon" />
                <h3 className="username" data-testid="header-user-name">{user}</h3>

              </div>

              <Link data-testid="link-to-search" to="/search">
                <button className="headerButtons" type="button">Search</button>
              </Link>

              <Link data-testid="link-to-favorites" to="/favorites">
                <button className="headerButtons" type="button">Favorites</button>
              </Link>

              <Link data-testid="link-to-profile" to="/profile">
                <button className="headerButtons" type="button">Profile</button>
              </Link>

            </div>
          )}

        </header>
      );
    }
}

export default Header;
