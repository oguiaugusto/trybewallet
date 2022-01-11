import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpenseAct } from '../actions';

class ExpensesTable extends Component {
  render() {
    const { props: { expenses, removeExpense } } = this;
    return (
      <div className="expenses-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((ex, i) => (
              <tr key={ `expense-${ex.id}` }>
                <th>{ `${i + 1}` }</th>
                <td>{ex.description}</td>
                <td>{ex.tag}</td>
                <td>{ex.method}</td>
                <td>{ex.value}</td>
                <td>{ex.exchangeRates[ex.currency].name.split('/')[0]}</td>
                <td>{parseFloat(ex.exchangeRates[ex.currency].ask).toFixed(2)}</td>
                <td>
                  {
                    parseFloat(parseFloat(ex.value) * parseFloat(
                      ex.exchangeRates[ex.currency].ask,
                    )).toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => removeExpense(ex.id) }
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(removeExpenseAct(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  removeExpense: PropTypes.func.isRequired,
};
