
export const defaultGetReduxFormoState = key => state => {

  if (!state) {
    return {};
  }

  if (!state[key]) {
    return {};
  }

  return state[key];
};

export default (form, getReduxFormoState = defaultGetReduxFormoState('form')) => state => {
  const reduxFormoState = getReduxFormoState(state);

  if (!reduxFormoState[form]) {
    return {};
  }

  return reduxFormoState[form];
}
