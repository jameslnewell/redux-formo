
export const getReduxFormoState = state => {

  if (!state) {
    return {};
  }

  if (!state.form) {
    return {};
  }

  return state.form;
};

export default (form, getReduxFormoState = getReduxFormoState) => state => getReduxFormoState(state)[form];
