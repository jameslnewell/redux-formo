
export default function({field, value}) {
  value = String(value).trim();

  if (field === 'username') {
    value = value.replace(/[^a-zA-Z0-9-\_]/g, '');
  }

  if (field === 'phone') {
    value = value.replace(/[^0-9]/g, '');
  }

  return value;
}
