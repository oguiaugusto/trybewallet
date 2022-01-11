import React from 'react';
import PropTypes from 'prop-types';
import { TailSpin } from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Header, ExpenseForm, ExpensesTable } from '../components';

class Wallet extends React.Component {
  render() {
    const { props: { isFetching } } = this;

    return (
      <>
        <Header />
        {isFetching ? (
          <TailSpin type="TailSpin" color="#252525" height={ 30 } width={ 30 } />
        ) : null}
        <ExpenseForm />
        <ExpensesTable />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.wallet.isFetching,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  isFetching: PropTypes.bool,
};

Wallet.defaultProps = {
  isFetching: false,
};
