
export default function({field, value}) {

  if (field === 'phone') {
    return value && value.replace(/[^0-9]/g, '');
  }

  return value;
}
