import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
