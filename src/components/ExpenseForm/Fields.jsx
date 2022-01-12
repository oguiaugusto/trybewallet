import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Fields extends Component {
  render() {
    const {
      props: {
        value,
        description,
        currency,
        method,
        tag,
        handleChange,
        supportedCurrencies,
      },
    } = this;

    return (
      <div className="fields d-flex flex-column">
        <label htmlFor="value" className="form-label">
          Qual o valor da despesa?
          <input
            data-testid="value-input"
            type="number"
            name="value"
            id="value"
            className="form-control"
            value={ value }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="description" className="form-label">
          Sobre o que se trata?
          <input
            data-testid="description-input"
            type="text"
            name="description"
            id="description"
            className="form-control"
            value={ description }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="currency" className="form-label">
          Moeda
          <select
            data-testid="currency-input"
            name="currency"
            id="currency"
            className="form-select"
            onChange={ handleChange }
            value={ currency }
          >
            {supportedCurrencies.map((c) => (
              <option data-testid={ c } key={ `currency-${c}` } value={ c }>{c}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method" className="form-label">
          Qual o método de pagamento?
          <select
            data-testid="method-input"
            name="method"
            id="method"
            className="form-select"
            onChange={ handleChange }
            value={ method }
          >
            <option value="defaultSelect" disabled hidden>Método de pagamento</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag" className="form-label">
          Qual a categoria da despesa?
          <select
            data-testid="tag-input"
            name="tag"
            id="tag"
            className="form-select"
            onChange={ handleChange }
            value={ tag }
          >
            <option value="defaultSelect" disabled hidden>Categoria da despesa</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}

export default Fields;

Fields.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  description: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  supportedCurrencies: PropTypes.arrayOf(PropTypes.any).isRequired,
};
