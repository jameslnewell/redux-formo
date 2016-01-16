
export default function({field, value}) {

  switch (field) {

    case 'name':

      if (value == '') {
        return 'Please enter your name so we can contact you.';
      }

      break;

    case 'email':

      if (value == '') {
        return 'Please enter your email address so we can contact you.';
      }

      if (!/^[^@]+@[^@]+$/.test(value)) {
        return 'Your email address must be valid';
      }

      break;

    case 'interests':

      if (value == '' || (Array.isArray(value) && value.length === 0)) {
        return 'You must select at least one interest.';
      }

      break;

    case 'newsletter':

      if (value == '') {
        return 'You must receive updates.';
      }

      break;

    default:
      break;

  }

  return true;
}
