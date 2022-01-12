import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BiEdit, BiX } from 'react-icons/bi';
import { editExpenseAct, removeExpenseAct } from '../actions';

class ExpensesTable extends Component {
  render() {
    const { props: { expenses, removeExpense, editExpense, editing } } = this;
    return (
      <div className="expenses-table">
        <table className="table table-bordered">
          <thead>
            <tr className="table-header">
              <th scope="col" className="ps-2 pe-2 text-center">#</th>
              <th scope="col">Valor</th>
              <th scope="col">Descrição</th>
              <th scope="col">Método de pagamento</th>
              <th scope="col">Tag</th>
              <th scope="col">Moeda</th>
              <th scope="col">Câmbio utilizado</th>
              <th scope="col">Valor convertido</th>
              <th scope="col">Moeda de conversão</th>
              <th scope="col">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((ex, i) => (
              <tr key={ `expense-${ex.id}` }>
                <th scope="row" className="text-center">{ `${i + 1}` }</th>
                <td>{ex.value}</td>
                <td>{ex.description}</td>
                <td>{ex.method}</td>
                <td>{ex.tag}</td>
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
                <td
                  className="
                  cell-buttons d-flex align-items-center justify-content-center"
                >
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => editExpense(ex.id) }
                    disabled={ editing }
                  >
                    <BiEdit size={ 25 } />
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => removeExpense(ex.id) }
                    disabled={ editing }
                  >
                    <BiX size={ 30 } />
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
  editing: state.wallet.editing,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(removeExpenseAct(id)),
  editExpense: (id) => dispatch(editExpenseAct(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  removeExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
  editing: PropTypes.bool,
};

ExpensesTable.defaultProps = {
  editing: false,
};
