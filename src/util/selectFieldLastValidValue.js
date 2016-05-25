import defaultSelectFieldState from './selectFieldState';

export default (form, field, selectFieldState = defaultSelectFieldState(form, field)) => state => {
  return selectFieldState(state).lastValidValue;
};
