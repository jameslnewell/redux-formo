import createFocusHandler from './createFocusHandler';
import createBlurHandler from './createBlurHandler';
import createChangeHandler from './createChangeHandler';

/**
 * @param   {string}  field
 * @param   {object}  component
 * @returns {object}
 */
export default function(field, component) {
  return {
    onFocus: createFocusHandler(component, field),
    onBlur: createBlurHandler(component, field),
    onChange: createChangeHandler(component, field)
  };
}
