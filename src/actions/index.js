import getCurrenciesApi from '../services/getCurrenciesApi';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const REQUEST_API = 'REQUEST_API';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const FAIL_REQUEST = 'FAIL_REQUEST';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const saveEmailAct = (email) => ({ type: SAVE_EMAIL, email });
export const addExpenseAct = (expense) => ({ type: ADD_EXPENSE, expense });
export const removeExpenseAct = (id) => ({ type: REMOVE_EXPENSE, id });

const requestApi = () => ({ type: REQUEST_API });
const getCurrencies = (curr) => ({ type: GET_CURRENCIES, curr });
const failRequest = (err) => ({ type: FAIL_REQUEST, err });

export const fetchCurrenciesAct = () => (dispatch) => {
  dispatch(requestApi());
  return getCurrenciesApi()
    .then((r) => dispatch(getCurrencies(r)))
    .catch((err) => dispatch(failRequest(err)));
};
