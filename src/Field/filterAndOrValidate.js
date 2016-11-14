
export default (event, props) => {
  let promise = Promise.resolve();
  let value = props.value;

  if (props.filterOn === event) {
    promise = promise
      .then(() => props.filter())
      .then(val => value = val)
    ;
  }

  if (props.validateOn === event) {
    promise = promise
      .then(() => props.validate())
      .then(valid => props.afterValidate({valid, value}))
    ;
  }

  return promise;
};
