import * as Action from './actions';

export function resetForm(formName) {
  return {
    type: Action.RESET_FORM,
    formName
  };
}

export function focusForm(formName, fieldName) {
  return {
    type: Action.FOCUS_FORM,
    formName,
    fieldName
  };
}

export function blurForm(formName, fieldName) {
  return {
    type: Action.BLUR_FORM,
    formName,
    fieldName
  };
}

export function changeForm(formName, fieldName, fieldValue) {
  return {
    type: Action.CHANGE_FORM,
    formName,
    fieldName,
    fieldValue
  };
}

export function validateForm(formName) {
  return {
    type: Action.VALIDATE_FORM,
    formName
  };
}
