/**
 *
 * AuthPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { findIndex, get, map, replace, set } from 'lodash';
import { Link } from 'react-router-dom';

import Button from '../../components/Button';
import FormDivider from '../../components/FormDivider';
import Input from '../../components/InputsIndex';
import Logo from '../../assets/logo_strapi.png';
import SocialLink from '../../components/SocialLink';

import strapi from '../../utils/Strapi';

import form from './forms.json';
import './styles.scss';

class AuthPage extends React.Component {
  state = { value: {}, errors: [], didCheckErrors: false };

  componentDidMount() {
    this.generateForm(this.props);
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { authType } } } = this.props;

    if (prevProps.match.params.authType !== authType) {
      this.generateForm(this.props);
    }
  }

  generateForm = props => {
    const params = props.location.search
      ? replace(props.location.search, '?code=', '')
      : props.match.params.id;
    this.setForm(props.match.params.authType, params);
  };

  handleChange = ({ target }) =>
    this.setState(prevState => ({
        value: {
            ...prevState.value,
            [target.name]: target.value,
        }
    }));

  handleSubmit = async (e) => {
		e.preventDefault();
		const { value } = this.state;
		const { match: { params: { authType } } } = this.props;
    try {
			switch(authType) {
				case 'login':
					await strapi.login(value.identifier, value.password);
					break;
				case 'register':
					await strapi.register(value.username, value.email, value.password);
					break;
				case 'forgot-password':
					await strapi.forgotPassword(value.email, 'http://localhost:3000/auth/reset-password');
					break;
				default:
					// Silent
			}
			this.redirectUser();
    } catch(err) {
			console.log(err);
			const errors = [
				{ name: 'identifier', errors: [err.response.payload.message] },
			];
			this.setState({ didCheckErrors: !this.state.didCheckErrors, errors });
		}
  };

  redirectUser = () => {
    this.props.history.push('/');
  };

  /**
   * Function that allows to set the value to be modified
   * @param {String} formType the auth view type ex: login
   * @param {String} email    Optionnal
   */
  setForm = (formType, email) => {
    const value = get(form, ['data', formType], {});
    console.log(value);
    if (formType === 'reset-password') {
      set(value, 'code', email);
    }
    this.setState(value);
  };

  /**
   * Check the URL's params to render the appropriate links
   * @return {Element} Returns navigation links
   */
  renderLink = () => {
    if (this.props.match.params.authType === 'login') {
      return (
        <div>
          <Link to="/auth/forgot-password">Forgot Password</Link>
          &nbsp;or&nbsp;
          <Link to="/auth/register">register</Link>
        </div>
      );
    }

    return (
      <div>
        <Link to="/auth/login">Ready to signin</Link>
      </div>
    );
  };

  render() {
    const divStyle =
      this.props.match.params.authType === 'register'
        ? { marginTop: '3.2rem' }
        : { marginTop: '.9rem' };
    const inputs = get(form, ['views', this.props.match.params.authType], []);
    const providers = ['facebook', 'github', 'google', 'twitter']; // To remove a provider from the list just delete it from this array...

    return (
      <div className="authPage">
        <div className="wrapper">
          <div className="headerContainer">
            {this.props.match.params.authType === 'register' ? (
              <span>Welcome !</span>
            ) : (
              <img src={Logo} alt="logo" />
            )}
          </div>
          <div className="headerDescription">
            {this.props.match.params.authType === 'register' ? (
              <span>Please register to access the app.</span>
            ) : (
              ''
            )}
          </div>
          <div className="formContainer" style={divStyle}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  {providers.map(provider => (
                    <SocialLink provider={provider} key={provider} />
                  ))}
                </div>
              </div>
              <FormDivider />
              <form onSubmit={this.handleSubmit}>
                <div className="row form-group" style={{ textAlign: 'start' }}>
                  {map(inputs, (input, key) => (
                    <Input
                      autoFocus={key === 0}
                      customBootstrapClass={get(input, 'customBootstrapClass')}
                      didCheckErrors={this.state.didCheckErrors}
                      errors={get(
                        this.state.errors,
                        [
                          findIndex(this.state.errors, ['name', input.name]),
                          'errors',
                        ],
                        []
                      )}
                      key={get(input, 'name')}
                      label={get(input, 'label')}
                      name={get(input, 'name')}
                      onChange={this.handleChange}
                      placeholder={get(input, 'placeholder')}
                      type={get(input, 'type')}
                      validations={{ required: true }}
                      value={get(this.state.value, get(input, 'name'), '')}
                    />
                  ))}
                  <div className="col-md-12 buttonContainer">
                    <Button
                      label="Submit"
                      style={{ width: '100%' }}
                      primary
                      type="submit"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="linkContainer">{this.renderLink()}</div>
        </div>
      </div>
    );
  }
}

AuthPage.defaultProps = {};
AuthPage.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default AuthPage;
