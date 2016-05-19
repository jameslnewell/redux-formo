
/**
 * Destroy a form
 * @param   {object}  state   The form state
 * @param   {object}  action  The form action
 * @returns {object}
 */
export default function destroy(state, action) {
  const {meta: {form}} = action;
  return Object.keys(state).reduce((prev, formName) => {
    if (formName === form) {
      return prev;
    } else {
      return {
        ...prev,
        [formName]: state[formName]
      };
    }
  }, {});
}
