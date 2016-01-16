
export default function({field, value}) {
  if (typeof value === 'string') {
    return String(value).trim();
  } else {
    return value;
  }
}
