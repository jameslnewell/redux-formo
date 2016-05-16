import {STATE_KEY} from './../src/constants';
import getFieldFromState from './../src/getFieldFromState';

const FORM = 'personal-details';
const FIELD = 'firstName';

describe('getFieldFromState()', () => {

  it('should return an empty object when the state is undefined', () => {
    const field = getFieldFromState(FORM, FIELD, undefined); //eslint-disable-line no-undefined
    expect(field).to.be.an('object');
    expect(Object.keys(field).length).to.be.equal(0);
  });

  it('should return an empty object when the library state is undefined', () => {
    const field = getFieldFromState(FORM, FIELD, {});
    expect(field).to.be.an('object');
    expect(Object.keys(field).length).to.be.equal(0);
  });

  it('should return an empty object when the form state is undefined', () => {
    const field = getFieldFromState(FORM, FIELD, {[STATE_KEY]: {}});
    expect(field).to.be.an('object');
    expect(Object.keys(field).length).to.be.equal(0);
  });

  it('should return an empty object when the form fields state is undefined', () => {
    const field = getFieldFromState(FORM, FIELD, {[STATE_KEY]: {[FORM]: {}}});
    expect(field).to.be.an('object');
    expect(Object.keys(field).length).to.be.equal(0);
  });

  it('should return an empty object when the form field state is undefined', () => {
    const field = getFieldFromState(FORM, FIELD, {[STATE_KEY]: {[FORM]: {fields: {}}}});
    expect(field).to.be.an('object');
    expect(Object.keys(field).length).to.be.equal(0);
  });

  it('should return an object when the form field state is defined', () => {
    const field = getFieldFromState(FORM, FIELD, {[STATE_KEY]: {[FORM]: {fields: {firstName: {
      value: 'John'
    }}}}});
    expect(field).to.be.an('object');
    expect(field).to.have.property('value', 'John');
  });

});
