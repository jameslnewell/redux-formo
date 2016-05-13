import {VALIDATE} from '../../../src/redux/constants';
import {validate} from '../../../src/redux/actions';

const KEY = 'form';
const FORM = 'personal-details';
const FIELD = 'firstName';

describe('validate()', () => {

  describe('=> synchronous', () => {

    it('should call the fn', () => {

      const fn = sinon.stub().returns(true);
      const dispatch = sinon.spy();
      const getState = sinon.stub().returns({form: {[FORM]: {fields: {firstName: {value: 'John'}}}}});

      return validate(KEY, FORM, FIELD, fn)(dispatch, getState).then(() => {
        expect(fn).to.be.calledOnce;
      });

    });

    it('should return an action with a valid result', () => {

      const dispatch = sinon.spy();
      const getState = sinon.stub().returns({form: {[FORM]: {fields: {firstName: {value: 'John'}}}}});

      return validate(KEY, FORM, FIELD, () => true)(dispatch, getState).then(() => {

        expect(dispatch).to.be.calledOnce;
        expect(dispatch).to.be.calledWith({
          type: VALIDATE,
          status: 'finish',
          payload: true,
          meta: {
            form: FORM,
            field: FIELD
          }
        });

      });

    });

    it('should return an action with an invalid result', () => {

      const fn = () => 'Invalid!';
      const dispatch = sinon.spy();
      const getState = sinon.stub().returns({form: {[FORM]: {fields: {firstName: {value: 'John'}}}}});

      return validate(KEY, FORM, FIELD, fn)(dispatch, getState).then(() => {

        expect(dispatch).to.be.calledOnce;
        expect(dispatch).to.be.calledWith({
          type: VALIDATE,
          status: 'finish',
          payload: 'Invalid!',
          meta: {
            form: FORM,
            field: FIELD
          }
        });

      });

    });

  });

  describe('=> asynchronous', () => {

    it('should call the fn', () => {

      const fn = sinon.stub().returns(new Promise(resolve => {
        setTimeout(() => resolve(true), 100);
      }));
      const dispatch = sinon.spy();
      const getState = sinon.stub().returns({form: {[FORM]: {fields: {firstName: {value: 'John'}}}}});

      return validate(KEY, FORM, FIELD, fn)(dispatch, getState).then(() => {
        expect(fn).to.be.calledOnce;
      });

    });

    it('should resolve an action with a valid result', () => {

      const fn = sinon.stub().returns(new Promise(resolve => {
        setTimeout(() => resolve(true), 100);
      }));
      const dispatch = sinon.spy();
      const getState = sinon.stub().returns({form: {[FORM]: {fields: {firstName: {value: 'John'}}}}});

      return validate(KEY, FORM, FIELD, fn)(dispatch, getState).then(() => {

        expect(dispatch).to.be.calledTwice;
        expect(dispatch).to.be.calledWith({
          type: VALIDATE,
          status: 'finish',
          payload: true,
          meta: {
            form: FORM,
            field: FIELD
          }
        });

      });

    });

    it('should resolve an action with an invalid result', () => {

      const fn = sinon.stub().returns(new Promise(resolve => {
        setTimeout(() => resolve('Invalid!'), 100);
      }));
      const dispatch = sinon.spy();
      const getState = sinon.stub().returns({form: {[FORM]: {fields: {firstName: {value: 'John'}}}}});

      return validate(KEY, FORM, FIELD, fn)(dispatch, getState).then(() => {

        expect(dispatch).to.be.calledTwice;
        expect(dispatch).to.be.calledWith({
          type: VALIDATE,
          status: 'finish',
          payload: 'Invalid!',
          meta: {
            form: FORM,
            field: FIELD
          }
        });

      });

    });

    it('should resolve an action with an error', () => {

      const fn = sinon.stub().returns(new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('Error!')), 100);
      }));
      const dispatch = sinon.spy();
      const getState = sinon.stub().returns({form: {[FORM]: {fields: {firstName: {value: 'John'}}}}});

      return validate(KEY, FORM, FIELD, fn)(dispatch, getState).catch((err) => {

        expect(dispatch).to.be.calledTwice;
        expect(dispatch).to.be.calledWith({
          type: VALIDATE,
          status: 'error',
          payload: new Error('Error!'),
          meta: {
            form: FORM,
            field: FIELD
          }
        });

      });

    });

  });

});
