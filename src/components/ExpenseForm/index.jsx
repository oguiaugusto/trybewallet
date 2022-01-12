import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrenciesAct, addExpenseAct, saveExpenseAct } from '../../actions';
import Fields from './Fields';

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
        currency: 'USD',
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
      currency: 'USD',
      method: 'defaultSelect',
      tag: 'defaultSelect',
      settledFields: false,
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

    const fieldsObj = {
      value,
      description,
      currency,
      method,
      tag,
      supportedCurrencies,
      handleChange: this.handleChange,
    };

    return (
      <div className="form-expense d-flex flex-column">
        <Fields
          { ...fieldsObj }
        />
        {editing ? (
          <button
            type="button"
            onClick={ this.handleSaveEdit }
            className="btn btn-info align-self-center mt-2"
            disabled={
              value === 0
              || description === ''
              || method === 'defaultSelect'
              || tag === 'defaultSelect'
            }
          >
            Editar despesa
          </button>
        ) : (
          <button
            type="button"
            onClick={ this.handleAddExpense }
            className="btn btn-success align-self-center mt-2"
            disabled={
              value === 0
              || description === ''
              || method === 'defaultSelect'
              || tag === 'defaultSelect'
            }
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
