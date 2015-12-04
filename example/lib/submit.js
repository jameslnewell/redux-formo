
export default function({values}) {

  console.log('Submitting:', values);

  //sync errors are handled
  //throw new Error('Uh oh!');

  //async errors are handled
  //return new Promise((resolve, reject) => {
  //  setTimeout(reject.bind(null, new Error('Uh oh!')), 3000);
  //});

  //sync completion is handled
  //return;

  //async completion is handled
  //return new Promise((resolve, reject) => {
  //  setTimeout(resolve, 3000);
  //});

}
