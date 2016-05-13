/**
 * @param   {string}  field
 * @param   {object}  actions
 * @param   {object}  functions
 * @returns {object}
 */
export default function(field, actions, functions) {
  return {
    focus: () => actions.focus(field),
    blur: () => actions.blur(field),
    change: value => actions.change(field, value),
    filter: () => actions.filter(field, functions.filter),
    validate: () => actions.validate(field, functions.validate)
  };
}
