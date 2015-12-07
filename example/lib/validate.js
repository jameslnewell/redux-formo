
export default function({field, value}) {

  switch (field) {

    case 'username':

      if (value == '') {
        return 'Please enter a username which you will use to log in.';
      }

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (value === 'jameslnewell') {
            resolve('Sorry this username has already been taken.');
          } else {
            resolve(true);
          }
        }, 2000)
      });

      break;

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
