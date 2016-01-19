import getValueFromEvent from '../../src/react/getFieldValueFromEvent';

describe('getValueFromEvent()', () => {

  it('should return the .value of the event target when .type is not a checkbox', () => {
    const value = getValueFromEvent({target: {type: 'text', value: 'foobar'}});
    expect(value).to.be.equal('foobar');
  });

  it('should return the .checked value of the event target when .type is a checkbox', () => {
    const value = getValueFromEvent({target: {type: 'checkbox', checked: false}});
    expect(value).to.be.false;
  });

  it('should return the event when the event does not have a target', () => {
    const value = getValueFromEvent(['red', 'green', 'blue']);
    expect(value).to.be.deep.equal(['red', 'green', 'blue']);
  });

});