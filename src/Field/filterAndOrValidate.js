
export default (event, props) => {
  const promise = Promise.resolve();

  if (props.filterOn === event) {
    promise.then(() => props.filter());
  }

  if (props.validateOn === event) {
    promise.then(() => props.validate());
  }

  return promise;
};
