
import {
  FOCUS, BLUR, CHANGE,
  FILTER, VALIDATE, SUBMIT
} from '../../src/redux/constants';

import {
  focus, blur, change,
  filter, validate, submit
} from '../../src/redux/actions';

const FORM = 'profile';
const FIELD = 'firstName';

describe('actions', () => {

  describe('focus()', () => {

    it('should return an action', () => {

      const action = focus(FORM, FIELD);

      expect(action).to.be.deep.equal({
        type: FOCUS,
        meta: {
          form: FORM,
          field: FIELD
        }
      });

    });

  });

  describe('blur()', () => {

    it('should return an action', () => {

      const action = blur(FORM, FIELD);

      expect(action).to.be.deep.equal({
        type: BLUR,
        meta: {
          form: FORM,
          field: FIELD
        }
      });

    });

  });

  describe('change()', () => {

    it('should return an action', () => {

      const action = change(FORM, FIELD, 'John');

      expect(action).to.be.deep.equal({
        type: CHANGE,
        payload: 'John',
        meta: {
          form: FORM,
          field: FIELD
        }
      });

    });

  });

  describe('filter()', () => {

    describe('=> synchronous', () => {

      it('should call the fn', () => {

        const fn = sinon.stub().returns('John');
        const dispatch = sinon.spy();

        filter(FORM, FIELD, 'John', {}, fn)(dispatch);

        expect(fn).to.be.calledOnce;

      });

      it('should return an action with a filtered value', () => {

        const dispatch = sinon.spy();

        filter(FORM, FIELD, ' John ', {}, ({value}) => value.trim())(dispatch);

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

    describe('=> asynchronous', () => {
      it('should...')
    });

  });

  describe('validate()', () => {

    describe('=> synchronous', () => {

      it('should call the fn', () => {

        const fn = sinon.stub().returns(true);
        const dispatch = sinon.spy();

        validate(FORM, FIELD, 'John', {}, fn)(dispatch);

        expect(fn).to.be.calledOnce;

      });

      it('should return an action with a valid result', () => {

        const dispatch = sinon.spy();

        validate(FORM, FIELD, 'John', {}, () => true)(dispatch);

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

      it('should return an action with an invalid result', () => {

        const dispatch = sinon.spy();

        validate(FORM, FIELD, 'John', {}, () => 'Error!')(dispatch);

        expect(dispatch).to.be.calledWith({
          type: VALIDATE,
          status: 'finish',
          payload: 'Error!',
          meta: {
            form: FORM,
            field: FIELD
          }
        });

      });

    });

    describe('=> asynchronous', () => {
      it('should...')
    });

  });

  describe('submit()', () => {

    describe('=> synchronous', () => {

      it('should call the fn', () => {

        const fn = sinon.stub();
        const dispatch = sinon.spy();
        const values = {};

        return submit(FORM, {}, fn)(dispatch).then(() => {

          expect(fn).to.be.calledWith({dispatch, values});

        });

      });

      it('should dispatch an action on success', () => {

        const fn = sinon.stub();
        const dispatch = sinon.spy();

        return submit(FORM, {}, fn)(dispatch).then(() => {

          expect(dispatch).to.be.calledWith({
            type: SUBMIT,
            status: 'finish',
            meta: {
              form: FORM
            }
          });

        });

      });

      it('should dispatch an action on failure', () => {

        const fn = sinon.stub().throws(new Error('Submit failed.'));
        const dispatch = sinon.spy();

        return submit(FORM, {}, fn)(dispatch).then(() => {

          expect(dispatch).to.be.calledWith({
            type: SUBMIT,
            status: 'error',
            payload: new Error('Submit failed.'),
            meta: {
              form: FORM
            }
          });

        });

      });

      it('should dispatch an action on flux standard action error', () => {

        const fn = sinon.stub().returns({type: 'ERR', payload: new Error('Submit failed.'), error: true});
        const dispatch = sinon.spy();

        return submit(FORM, {}, fn)(dispatch).then(() => {

          expect(dispatch).to.be.calledWith({
            type: SUBMIT,
            status: 'error',
            payload: new Error('Submit failed.'),
            meta: {
              form: FORM
            }
          });

        });

      });

    });

    describe('=> asynchronous', () => {

      it('should call the fn', () => {

        const fn = sinon.stub().returns(new Promise(resolve => {
          setTimeout(resolve, 100);
        }));
        const dispatch = sinon.spy();
        const values = {};

        return submit(FORM, {}, fn)(dispatch).then(() => {
          expect(fn).to.be.calledWith({dispatch, values});
        });

      });

      it('should dispatch an action on start', () => {

        const fn = sinon.stub().returns(new Promise(resolve => {
          setTimeout(resolve, 100);
        }));
        const dispatch = sinon.spy();

        return submit(FORM, {}, fn)(dispatch).then(() => {

          expect(dispatch).to.be.calledWith({
            type: SUBMIT,
            status: 'start',
            meta: {
              form: FORM
            }
          });

        });

      });

      it('should dispatch an action on success', () => {

        const fn = sinon.stub().returns(new Promise(resolve => {
          setTimeout(resolve, 100);
        }));
        const dispatch = sinon.spy();

        return submit(FORM, {}, fn)(dispatch).then(() => {

          expect(dispatch).to.be.calledWith({
            type: SUBMIT,
            status: 'finish',
            meta: {
              form: FORM
            }
          });

        });

      });

      it('should dispatch an action on failure', () => {

        const fn = sinon.stub().returns(new Promise((resolve, reject) => {
          setTimeout(() => reject(new Error('Submit failed.')), 100);
        }));
        const dispatch = sinon.spy();

        return submit(FORM, {}, fn)(dispatch)
          .then(
            () => {

              expect(dispatch).to.be.calledWith({
                type: SUBMIT,
                status: 'error',
                payload: new Error('Submit failed.'),
                meta: {
                  form: FORM
                }
              });

            }
          )
        ;

      });

    });

  });
});
