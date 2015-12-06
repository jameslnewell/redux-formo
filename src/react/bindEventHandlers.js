
export default function bindEventHandlers({fields}) {
 return fields.reduce(
   (boundHandlers, field) => {
     boundHandlers[field] = {
       onChange: (...args) => console.log(args)
     };
     return boundHandlers;
   },
   {}
 );
}