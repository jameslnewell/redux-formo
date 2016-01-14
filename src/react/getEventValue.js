import isEvent from './isEvent';

const getEventValue = (event) => {
  if (isEvent(event)) {
    const {target: {type, value, checked}} = event;
    if (type === 'checkbox') {
        return checked;
    }
    return value;
  }
  
  // not an event, so must be either our value or an object containing our value in the 'value' key
  return event && typeof event === 'object' && event.value !== undefined ?
    event.value : 
    event;  
};

export default getEventValue;
