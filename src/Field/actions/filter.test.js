import {FILTER} from '../constants';
import filter from '../actions/filter';

const KEY = 'form';
const FORM = 'personal-details';
const FIELD = 'firstName';

describe('filter()', () => {

  describe('=> synchronous', () => {

    it('should call the fn', () => {

      const fn = sinon.stub().returns('John');
      const dispatch = sinon.spy();
      const getState = sinon.stub().returns({form: {[FORM]: {fields: {firstName: {value: 'John'}}}}});

      return filter(KEY, FORM, FIELD, fn)(dispatch, getState).then(() => {
        expect(fn).to.be.calledOnce;
      });

    });

    it('should return an action with a filtered value', () => {

      const fn = sinon.stub().returns('John');
      const dispatch = sinon.spy();
      const getState = sinon.stub().returns({form: {[FORM]: {fields: {firstName: {value: 'John'}}}}});

      return filter(KEY, FORM, FIELD, fn)(dispatch, getState).then(() => {

        expect(dispatch).to.be.calledOnce;
        expect(dispatch).to.be.calledWith({
          type: FILTER,
          status: 'finish',
          payload: 'John',
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
        setTimeout(() => resolve('John'), 100);
      }));
      const dispatch = sinon.spy();
      const getState = sinon.stub().returns({form: {[FORM]: {fields: {firstName: {value: 'John'}}}}});

      return filter(KEY, FORM, FIELD, fn)(dispatch, getState).then(() => {
        expect(fn).to.be.calledOnce;
      });

    });

    it('should resolve an action with a filtered value', () => {

      const fn = sinon.stub().returns(new Promise(resolve => {
        setTimeout(() => resolve('John'), 100);
      }));
      const dispatch = sinon.spy();
      const getState = sinon.stub().returns({form: {[FORM]: {fields: {firstName: {value: 'John'}}}}});

      return filter(KEY, FORM, FIELD, fn)(dispatch, getState).then(() => {

        expect(dispatch).to.be.calledTwice;
        expect(dispatch).to.be.calledWith({
          type: FILTER,
          status: 'finish',
          payload: 'John',
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

      return filter(KEY, FORM, FIELD, fn)(dispatch, getState).catch(() => {

        expect(dispatch).to.be.calledTwice;
        expect(dispatch).to.be.calledWith({
          type: FILTER,
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
