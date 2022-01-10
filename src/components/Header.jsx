import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { props: { email } } = this;
    return (
      <header>
        <div className="logo">
          <img src="" alt="logo" />
        </div>
        <div className="info">
          <p data-testid="email-field" className="email-field">{email}</p>
          <p className="expenses">
            <span
              data-testid="total-field"
              className="total-field"
            >
              0
            </span>
            <span>{' '}</span>
            <span
              data-testid="header-currency-field"
              className="header-currency-field"
            >
              BRL
            </span>
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
};
