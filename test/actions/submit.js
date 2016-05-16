import {SUBMIT} from '../../src/constants';
import {submit} from '../../src/actions';

const KEY = 'form';
const FORM = 'personal-details';

describe('submit()', () => {

  describe('=> synchronous', () => {

    it('should call the fn', () => {

      const fn = sinon.stub();
      const dispatch = sinon.spy();
      const getState = sinon.stub().returns({form: {[FORM]: {fields: {firstName: {lastValidValue: 'John'}}}}});

      return submit(KEY, FORM, fn)(dispatch, getState).then(() => {

        expect(fn).to.be.calledWith({
          dispatch,
          values: {firstName: 'John'}
        });

      });

    });

    it('should dispatch an action on success', () => {

      const fn = sinon.stub();
      const dispatch = sinon.spy();
      const getState = sinon.stub().returns({form: {[FORM]: {fields: {firstName: {lastValidValue: 'John'}}}}});

      return submit(KEY, FORM, fn)(dispatch, getState).then(() => {

        expect(dispatch).to.be.calledOnce;
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
      const getState = sinon.stub().returns({form: {[FORM]: {fields: {firstName: {lastValidValue: 'John'}}}}});

      return submit(KEY, FORM, fn)(dispatch, getState).catch(() => {

        expect(dispatch).to.be.calledOnce;
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

    it('should dispatch an action on Flux Standard Action', () => {

      const fn = sinon.stub().returns({
        type: 'SAVE'
      });
      const dispatch = sinon.spy();
      const getState = sinon.stub().returns({form: {[FORM]: {fields: {firstName: {lastValidValue: 'John'}}}}});

      return submit(KEY, FORM, fn)(dispatch, getState).then(() => {

        expect(dispatch).to.be.calledOnce;
        expect(dispatch).to.be.calledWith({
          type: SUBMIT,
          status: 'finish',
          meta: {
            form: FORM
          }
        });

      });

    });

    it('should dispatch an action on Flux Standard Action error', () => {

      const fn = sinon.stub().returns({
        type: 'SAVE',
        error: true,
        payload: new Error('Submit failed.')
      });
      const dispatch = sinon.spy();
      const getState = sinon.stub().returns({form: {[FORM]: {fields: {firstName: {lastValidValue: 'John'}}}}});

      return submit(KEY, FORM, fn)(dispatch, getState).catch(() => {

        expect(dispatch).to.be.calledOnce;
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
      const getState = sinon.stub().returns({form: {[FORM]: {fields: {firstName: {lastValidValue: 'John'}}}}});

      return submit(KEY, FORM, fn)(dispatch, getState).then(() => {
        expect(fn).to.be.calledWith({dispatch, values: {firstName: 'John'}});
      });

    });

    it('should dispatch an action on start', () => {

      const fn = sinon.stub().returns(new Promise(resolve => {
        setTimeout(resolve, 100);
      }));
      const dispatch = sinon.spy();
      const getState = sinon.stub().returns({form: {[FORM]: {fields: {firstName: {lastValidValue: 'John'}}}}});

      return submit(KEY, FORM, fn)(dispatch, getState).then(() => {

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
      const getState = sinon.stub().returns({form: {[FORM]: {fields: {firstName: {lastValidValue: 'John'}}}}});

      return submit(KEY, FORM, fn)(dispatch, getState).then(() => {

        expect(dispatch).to.be.calledTwice;
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
      const getState = sinon.stub().returns({form: {[FORM]: {fields: {firstName: {lastValidValue: 'John'}}}}});

      return submit(KEY, FORM, fn)(dispatch, getState).catch(() => {

        expect(dispatch).to.be.calledTwice;
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


    it('should dispatch an action on Flux Standard Action', () => {

      const fn = sinon.stub().returns(new Promise((resolve) => {
        setTimeout(() => resolve({
          type: 'SAVE'
        }), 100);
      }));
      const dispatch = sinon.spy();
      const getState = sinon.stub().returns({form: {[FORM]: {fields: {firstName: {lastValidValue: 'John'}}}}});

      return submit(KEY, FORM, fn)(dispatch, getState).then(() => {

        expect(dispatch).to.be.calledWith({
          type: SUBMIT,
          status: 'finish',
          meta: {
            form: FORM
          }
        });

      });

    });

    it('should dispatch an action on Flux Standard Action error', () => {

      const fn = sinon.stub().returns(new Promise((resolve, reject) => {
        setTimeout(() => resolve({
          type: 'SAVE',
          error: true,
          payload: new Error('Submit failed.')
        }), 100);
      }));
      const dispatch = sinon.spy();
      const getState = sinon.stub().returns({form: {[FORM]: {fields: {firstName: {lastValidValue: 'John'}}}}});

      return submit(KEY, FORM, fn)(dispatch, getState).catch(() => {

        expect(dispatch).to.be.calledTwice;
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

});