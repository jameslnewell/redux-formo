import mapValues from '../../util/mapValues';
import {SUBMIT, DESTROY} from '../constants';
import submit from './submit';
import destroy from './destroy';

function createFormReducer(fn) {
  return (state, action) => {
    const {meta: {form}} = action;
    const
      formState = state[form] || {},
      newFormState = fn(formState, action)
    ;
    return {...state, [form]: {...formState, ...newFormState}};
  };
}

function createFieldReducer(fn) {
  return createFormReducer((state, action) => {
    const {meta: {field}} = action;
    const
      fieldState = state.fields && state.fields[field] || {},
      newFieldState = fn(fieldState, action)
    ;
    return {...state, fields: {...(state.fields), [field]: {...fieldState, ...newFieldState}}};
  });
}

export default {
  [SUBMIT]: createFormReducer(submit),
  [DESTROY]: destroy
};
