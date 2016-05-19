
export default function(state, action) {
  return {
    ...state,
    value: action.value,
    defaultValue: action.defaultValue
  };
}
