
export default function(state, action) {
  return {...state, initialised: true, value: action.value};
}
