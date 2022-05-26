import React from 'react';
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
            <h3 data-testid="header-user-name">{user}</h3>)}

        </header>
      );
    }
}

export default Header;
