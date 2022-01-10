import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { saveEmailAct } from '../actions';

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
    const emailMatch = email.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm,
    );

    const MIN_PASSWORD_LENGTH = 6;

    return (
      !emailMatch || password.length < MIN_PASSWORD_LENGTH
    );
  }

  render() {
    const { state: { email, password, loggedIn } } = this;
    const enableBtn = this.enableBtn();

    if (loggedIn) return <Redirect to="/carteira" />;

    return (
      <div className="login-page">
        <div className="login-form">
          <label htmlFor="email">
            Email
            <input
              data-testid="email-input"
              type="text"
              name="email"
              id="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              data-testid="password-input"
              type="password"
              name="password"
              id="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            onClick={ this.logIn }
            disabled={ enableBtn }
          >
            Entrar
          </button>
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
