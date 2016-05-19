import initialise from './actions/initialise';
import focus from './actions/focus';
import blur from './actions/blur';
import change from './actions/change';
import filter from './actions/filter';
import validate from './actions/validate';

export default options => dispatch => {
  const {getState, form, field, filter: filterFn, validate: validateFn} = options;

  return {
    initialise: value => dispatch(initialise(getState, form, field, value)),
    focus: () => dispatch(focus(getState, form, field)),
    blur: () => dispatch(blur(getState, form, field)),
    change: value => dispatch(change(getState, form, field, value)),
    filter: () => dispatch(filter(getState, form, field, filterFn)),
    validate: () => dispatch(validate(getState, form, field, validateFn))
  };

};