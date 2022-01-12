import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logoTrybewalletWhite from '../images/logo-trybewallet-white.svg';

class Header extends Component {
  constructor(props) {
    super(props);

    this.getTotalExpenses = this.getTotalExpenses.bind(this);
  }

  getTotalExpenses() {
    const { props: { expenses } } = this;
    const totalExpenses = expenses.reduce((acc, ex) => {
      let { value } = ex;
      value = parseFloat(value);

      if (ex.currency !== 'BRL') {
        value *= parseFloat(ex.exchangeRates[ex.currency].ask);
      }

      return acc + value;
    }, 0);

    return totalExpenses;
  }

  render() {
    const { props: { email } } = this;
    return (
      <header className="wallet-header d-flex flex-column align-item-center">
        <div className="logo d-flex justify-content-center pt-4">
          <img src={ logoTrybewalletWhite } alt="logo" />
        </div>
        <div className="info d-flex flex-column align-items-center">
          <p data-testid="email-field" className="email-field mt-2 mb-1">{email}</p>
          <p className="expenses mb-3">
            <span
              data-testid="total-field"
              className="total-field"
            >
              {this.getTotalExpenses().toFixed(2)}
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
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};
