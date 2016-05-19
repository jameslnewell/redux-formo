import filter from '../Field/actions/filter';
import validate from '../Field/actions/validate';
import submit from './actions/submit';
import destroy from './actions/destroy';

export default(dispatch, ownProps) => {
  const {name: form, getState} = ownProps;

  return {

    filter: field => dispatch(filter(getState, form, field, ownProps.filter)),
    validate: field => dispatch(validate(getState, form, field, ownProps.validate)),

    submit: () => dispatch(submit(getState, form, ownProps.submit)),
    destroy: () => dispatch(destroy(getState, form))

  };

};
