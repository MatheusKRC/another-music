import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

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
            <div>

              <h3 data-testid="header-user-name">{user}</h3>
              <Link data-testid="link-to-search" to="/search" />
              <Link data-testid="link-to-favorites" to="/favorites" />
              <Link data-testid="link-to-profile" to="/profile" />

            </div>
          )}

        </header>
      );
    }
}

export default Header;
