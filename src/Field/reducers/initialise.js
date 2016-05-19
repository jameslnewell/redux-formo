
export default function(state, action) {
  const newState = {...state, initialised: true};

  if (typeof action.value !== 'undefined') {
    newState.value = action.value;
  }

  if (typeof action.defaultValue !== 'undefined') {
    newState.defaultValue = action.defaultValue;
  }

  return newState;
}
