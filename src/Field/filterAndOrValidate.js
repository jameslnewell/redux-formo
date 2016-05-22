
export default (event, props) => {
  const promise = Promise.resolve();
  let value = props.value;

  if (props.filterOn === event) {
    promise
      .then(() => props.filter())
      .then(val => value = val)
    ;
  }

  if (props.validateOn === event) {
    promise
      .then(valid => props.validate())
      .then(valid => props.afterValidate({valid, value}))
    ;
  }

  return promise;
};
