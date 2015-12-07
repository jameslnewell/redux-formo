
export default function({field, value}) {

  if (field === 'name') {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('John'), 1000);
    });
  }

  if (field === 'phone') {
    return value && value.replace(/[^0-9]/g, '');
  }

  return value.trim();
}
