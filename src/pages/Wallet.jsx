import React from 'react';
import PropTypes from 'prop-types';
import { TailSpin } from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Header, ExpenseForm, ExpensesTable } from '../components';
import '../style/wallet-page.css';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: true,
    };

    this.handleExpand = this.handleExpand.bind(this);
  }

  handleExpand() {
    this.setState((prev) => ({ expanded: !prev.expanded }));
  }

  render() {
    const { props: { isFetching, editing }, state: { expanded } } = this;
    const editingClass = editing ? 'column-editing' : '';

    const leftColumnClass = expanded ? 'open' : 'close';
    const expandBtnText = expanded ? 'Min.' : 'Max.';

    return (
      <div className="wallet-page d-flex">
        <div
          className={
            `wallet-left-column d-flex flex-column align-items-center
            ${editingClass} ${leftColumnClass}`
          }
        >
          <button
            type="button"
            className="expand-btn"
            onClick={ this.handleExpand }
          >
            {expandBtnText}
          </button>
          <Header />
          <div className="line" />
          <ExpenseForm />
        </div>
        <div className="right-column d-flex align-items-center justify-content-center">
          {isFetching ? (
            <TailSpin type="TailSpin" color="#252525" height={ 30 } width={ 30 } />
          ) : null}
          <ExpensesTable />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.wallet.isFetching,
  editing: state.wallet.editing,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  isFetching: PropTypes.bool,
  editing: PropTypes.bool,
};

Wallet.defaultProps = {
  isFetching: false,
  editing: false,
};
