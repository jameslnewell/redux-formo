
export default function({field, value}) {

  switch (field) {

    case 'name':

      if (value == '') {
        return 'Please enter your name so we can contact you.';
      }

      break;

    case 'phone':

      if (value == '') {
        return 'Please enter your phone number so we can contact you.';
      }

      if (!/^0[0-9]{9}$/.test(value)) {
        return 'Your phone number must consist of 10 digits starting with a 0';
      }

      break;

    default:
      break;

  }

  return true;
}
