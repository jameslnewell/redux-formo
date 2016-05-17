import filterAndValidate from './filterAndValidate';
import selectLastValidValues from '../util/selectLastValidValues';

/**
 * @param   {object}  component   The form component
 * @returns {function}
 */
export default function(component) {

  /**
   * Create a submission handler
   * @param   {function} [submit]
   * @returns {function}
   */
  return function(submit) {
    const submitFn = submit || (() => {/*do nothing*/});

    /**
     * Handle the form submission
     * @param   {Event} event
     * @returns {void}
     */
    return event => {

      //prevent the form submitting
      if (event && event.preventDefault) {
        event.preventDefault();
      }

      const form = component.form;
      const props = component.props;

      let formIsValid = true;
      const {
        dispatch,
        fields,
        filterOnSubmit, validateOnSubmit,
        filter, validate,
        afterValidate
      } = props;

      //filter and validate each of the fields
      Promise.all(fields.map(fieldName =>
        filterAndValidate({

          field: fieldName,

          filter: filterOnSubmit,
          filterFn: filter,
          filterAction: form.filter,

          validate: validateOnSubmit,
          validateFn: validate,
          validateAction: form.validate,
          afterValidate,

          dispatch,
          component

        }).then(valid => formIsValid = formIsValid && valid)
      )).then(() => {

        //submit the valid values
        if (formIsValid) {
          form.submit(selectLastValidValues(form), submitFn);
        }

      });
    };
  };

}
