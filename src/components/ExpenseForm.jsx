import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrenciesAct, addExpenseAct, saveExpenseAct } from '../actions';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'defaultSelect',
      tag: 'defaultSelect',
      settledFields: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
    this.setEditingFields = this.setEditingFields.bind(this);
    this.handleAddExpense = this.handleAddExpense.bind(this);
    this.handleSaveEdit = this.handleSaveEdit.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
  }

  componentDidUpdate() {
    const {
      state: {
        settledFields,
      },
      props: { editing },
    } = this;

    if (editing && !settledFields) this.setEditingFields();
  }

  getCurrencies() {
    const { props: { fetchCurrencies } } = this;
    fetchCurrencies();
  }

  setEditingFields() {
    const {
      props: { editingExpense: {
        value, description, currency, method, tag,
      } },
    } = this;

    const fields = { value, description, currency, method, tag };

    this.setState({ settledFields: true, ...fields });
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

  handleSaveEdit() {
    const {
      state: { value, description, currency, method, tag },
      props: { saveExpense, editingExpense },
    } = this;

    const newExpense = { ...editingExpense, value, description, currency, method, tag };
    saveExpense(editingExpense.id, newExpense);

    this.setState({ value: 0,
      description: '',
      currency: 'defaultSelect',
      method: 'defaultSelect',
      tag: 'defaultSelect',
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
      props: { currencies, editing },
    } = this;

    const supportedCurrencies = Array.isArray(currencies)
      ? currencies : Object.keys(currencies);

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
          <label htmlFor="currency">
            Moeda
            <select
              data-testid="currency-input"
              name="currency"
              id="currency"
              onChange={ this.handleChange }
              value={ currency }
            >
              {supportedCurrencies.map((c) => (
                <option data-testid={ c } key={ `currency-${c}` } value={ c }>{c}</option>
              ))}
            </select>
          </label>
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
        {editing ? (
          <button
            type="button"
            onClick={ this.handleSaveEdit }
          >
            Editar despesa
          </button>
        ) : (
          <button
            type="button"
            onClick={ this.handleAddExpense }
          >
            Adicionar despesa
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editing: state.wallet.editing,
  editingExpense: state.wallet.editingExpense,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesAct()),
  addExpense: (expense) => dispatch(addExpenseAct(expense)),
  saveExpense: (id, expense) => dispatch(saveExpenseAct(id, expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);

ExpenseForm.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  saveExpense: PropTypes.func.isRequired,
  currencies: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  editing: PropTypes.bool,
  editingExpense: PropTypes.objectOf(PropTypes.any),
};

ExpenseForm.defaultProps = {
  editing: false,
  editingExpense: {},
};
