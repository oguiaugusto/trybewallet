import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrenciesAct, addExpenseAct } from '../actions';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      description: '',
      currency: 'defaultSelect',
      method: 'defaultSelect',
      tag: 'defaultSelect',
    };

    this.handleChange = this.handleChange.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
    this.handleAddExpense = this.handleAddExpense.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
  }

  getCurrencies() {
    const { props: { fetchCurrencies } } = this;
    fetchCurrencies();
  }

  handleAddExpense() {
    const { props: { fetchCurrencies } } = this;

    fetchCurrencies().then(() => {
      const {
        state: { value, description, currency, method, tag },
        props: { currencies, addExpense },
      } = this;

      const expenseObj = {
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates: currencies,
      };

      addExpense(expenseObj);

      this.setState({ value: 0,
        description: '',
        currency: 'defaultSelect',
        method: 'defaultSelect',
        tag: 'defaultSelect',
      });
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const {
      state: {
        value,
        description,
        currency,
        method,
        tag,
      },
    } = this;

    const supportedCurrencies = [
      'USD',
      'CAD',
      'EUR',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
    ];

    return (
      <div className="form-expense">
        <div className="fields">
          <label htmlFor="value">
            Valor
            <input
              data-testid="value-input"
              type="number"
              name="value"
              id="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              data-testid="description-input"
              type="text"
              name="description"
              id="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <select
            data-testid="currency-input"
            name="currency"
            onChange={ this.handleChange }
            value={ currency }
          >
            <option value="defaultSelect" disabled hidden>Selecione uma moeda</option>
            <option value="BRL">BRL</option>
            {supportedCurrencies.map((c) => (
              <option data-testid={ c } key={ `currency-${c}` } value={ c }>{c}</option>
            ))}
          </select>
          <select
            data-testid="method-input"
            name="method"
            onChange={ this.handleChange }
            value={ method }
          >
            <option value="defaultSelect" disabled hidden>Método de pagamento</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option value="defaultSelect" disabled hidden>Categoria da despesa</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </div>
        <button
          type="button"
          onClick={ this.handleAddExpense }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesAct()),
  addExpense: (expense) => dispatch(addExpenseAct(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);

ExpenseForm.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  currencies: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};
