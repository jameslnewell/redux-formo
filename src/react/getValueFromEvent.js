
/**
 * Get the field value from an input event
 * @param   {*} event
 * @returns {*}
 */
export default function getValueFromEvent(event) {

  if (event && event.target) {
    const {target: {type, value, checked}} = event;

    if (type === 'checkbox') {
      return checked;
    }

    return value;
  }

  return event;
}
