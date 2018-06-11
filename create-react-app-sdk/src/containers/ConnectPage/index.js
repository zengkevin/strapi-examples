/**
 * 
 * ConnectPage
 * 
 * 
 */


import React from 'react';
import PropTypes from 'prop-types';

import strapi from '../../utils/Strapi';

class ConnectPage extends React.Component {
  // We only use this lifecycle because it's only mounted once and the saga already handle
  // the redirections depending on the API response

  // NOTE: YOU can delete this container and do the logic in the HomePage formContainer
  // This implementation was just made for the sake of the example and to silmplify the logic
  async componentDidMount() {
    const { match: { params: { provider } } } = this.props;
    try {
      console.log(provider)
      await strapi.authenticateProvider(provider);
      this.redirectUser('/');
    } catch(err) {
      console.log(err);
      this.redirectUser('/auth/login');
    }
  }

  redirectUser = path => this.props.history.push(path);

  render() {
    return (
      <div>
        <h1>Retrieving your token and checking its validity</h1>
      </div>
    );
  }
}

ConnectPage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default ConnectPage;