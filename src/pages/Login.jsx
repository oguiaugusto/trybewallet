import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { saveEmailAct } from '../actions';
import logoTrybeWallet from '../images/logo-trybewallet.svg';
import coin from '../images/coin.svg';
import '../style/login-page.css';

const emailRegex = (
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm
);

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loggedIn: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.logIn = this.logIn.bind(this);
    this.enableBtn = this.enableBtn.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  logIn() {
    const { props: { saveEmail }, state: { email } } = this;
    saveEmail(email);
    this.setState({ loggedIn: true });
  }

  enableBtn() {
    const { state: { email, password } } = this;
    const emailMatch = email.match(emailRegex);

    const MIN_PASSWORD_LENGTH = 6;

    return !(
      !emailMatch || password.length < MIN_PASSWORD_LENGTH
    );
  }

  render() {
    const { state: { email, password, loggedIn } } = this;
    const enableBtn = this.enableBtn();

    if (loggedIn) return <Redirect to="/carteira" />;

    const inputClassEmail = email.match(emailRegex)
      ? 'validated-input' : 'unvalidated-input';

    const MIN_PASSWORD_LENGTH = 6;

    const inputClassPassword = password.length >= MIN_PASSWORD_LENGTH
      ? 'validated-input' : 'unvalidated-input';

    return (
      <div className="page-container d-flex">
        <div
          className="
            login-container d-flex flex-column align-items-center justify-content-center
          "
        >
          <img src={ logoTrybeWallet } alt="trybewallet logo" className="logo" />
          <div className="login-form d-flex flex-column">
            <p className="display-6 text-center mb-4">Entre para continuar</p>
            <label htmlFor="email" className="form-label">
              Digite seu email:
              <input
                data-testid="email-input"
                type="text"
                name="email"
                id="email"
                placeholder="email@email.com"
                className={ `form-control mt-1 ${inputClassEmail}` }
                value={ email }
                onChange={ this.handleChange }
                onKeyDown={ ({ key }) => (
                  key === 'Enter' && enableBtn ? this.logIn() : null
                ) }
              />
            </label>
            <label htmlFor="password" className="form-label mt-1 mb-4">
              Digite sua senha:
              <input
                data-testid="password-input"
                type="password"
                name="password"
                id="password"
                placeholder="****************"
                className={ `form-control mt-1 ${inputClassPassword}` }
                value={ password }
                onChange={ this.handleChange }
                onKeyDown={ ({ key }) => (
                  key === 'Enter' && enableBtn ? this.logIn() : null
                ) }
              />
            </label>
            <button
              type="button"
              className="btn btn-primary"
              onClick={ this.logIn }
              disabled={ !enableBtn }
            >
              Entrar
            </button>
          </div>
        </div>
        <div className="coin-image d-flex align-items-center justify-content-center">
          <img src={ coin } alt="coin" />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(saveEmailAct(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
};
