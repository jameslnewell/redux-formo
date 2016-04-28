import {bindActionCreators} from 'redux';

/**
 * Wrap a `mapDispatchToProps` object/function to always include `dispatch` (as currently required by `redux-formo`)
 * @param   {object|function}   mapDispatchToProps
 * @returns {function}
 */
export default function wrapMapDispatchToProps(mapDispatchToProps) {

  if (mapDispatchToProps) {
    if (typeof mapDispatchToProps === 'function') {

      if (mapDispatchToProps.length > 1) {
        return (dispatch, ownProps) => ({
          dispatch,
          ...mapDispatchToProps(dispatch, ownProps)
        });
      }

      return dispatch => ({
        dispatch,
        ...mapDispatchToProps(dispatch)
      });

    } else {

      return dispatch => ({
        dispatch,
        ...bindActionCreators(mapDispatchToProps, dispatch)
      });

    }
  }

  return dispatch => ({
    dispatch
  });

}
