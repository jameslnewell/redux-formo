import {RESET_FORM} from './actions';
import {CHANGE_FORM} from './actions';
import {VALIDATE_FORM} from './actions';

export function resetForm(formName, fieldName, fieldValue) {
  return {
    type: RESET_FORM,
    formName,
    fieldName,
    fieldValue
  };
}

export function changeForm(formName, fieldName, fieldValue) {
  return {
    type: CHANGE_FORM,
    formName,
    fieldName,
    fieldValue
  };
}

export function validateForm(formName) {
  return {
    type: VALIDATE_FORM,
    formName
  };
}
