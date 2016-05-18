
export default function({field, value}) {

  switch (field) {

    case 'name':

      if (value === undefined || value == '') {
        return 'Please enter your name so we can contact you.';
      }

      break;

    case 'email':

      if (value === undefined || value == '') {
        return 'Please enter your email address so we can contact you.';
      }

      if (!/^[^@]+@[^@]+$/.test(value)) {
        return 'Your email address must be valid';
      }

      break;

    case 'interests':

      if (value === undefined || value == '' || (Array.isArray(value) && value.length === 0)) {
        return 'You must select at least one interest.';
      }

      break;

    case 'newsletter':

      if (value === undefined || value === false) {
        return 'You must receive updates.';
      }

      break;

    default:
      break;

  }

  return true;
}
