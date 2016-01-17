import mapFieldStateToProps from '../../src/react/mapFieldStateToProps';

describe('mapFieldStateToProps()', () => {

  it('should set .name', () => {
    const props = mapFieldStateToProps('firstName', {});
    expect(props).to.have.property('name', 'firstName');
  });

  it('should set .value from state when .value is defined', () => {
    const props = mapFieldStateToProps('firstName', {value: 'John'});
    expect(props).to.have.property('value', 'John');
  });

  it('should set .value from .defaultValue when .value is undefined', () => {
    const props = mapFieldStateToProps('firstName', {}, 'John');
    expect(props).to.have.property('value', 'John');
  });

  it('should set .defaultValue', () => {
    const props = mapFieldStateToProps('firstName', {}, 'John');
    expect(props).to.have.property('defaultValue', 'John');
  });

  it('should set .checked when .value is true', () => {
    const props = mapFieldStateToProps('firstName', {value: true});
    expect(props).to.have.property('checked', true);
  });

  it('should set .checked when .value is false', () => {
    const props = mapFieldStateToProps('firstName', {value: false});
    expect(props).to.have.property('checked', false);
  });

  it('should not set .checked when .value is not a boolean', () => {
    const props = mapFieldStateToProps('firstName', {value: 'John'});
    expect(props.checked).to.not.exist;
  });

  it('should set .defaultChecked when defaultValue is true', () => {
    const props = mapFieldStateToProps('firstName', {}, true);
    expect(props).to.have.property('defaultChecked', true);
  });

  it('should set .defaultChecked when defaultValue is false', () => {
    const props = mapFieldStateToProps('firstName', {}, false);
    expect(props).to.have.property('defaultChecked', false);
  });

  it('should not set .defaultChecked when defaultValue is not a boolean', () => {
    const props = mapFieldStateToProps('firstName', {}, 'John');
    expect(props.defaultChecked).to.not.exist;
  });

  it('should replace default props with state', () => {
    const props = mapFieldStateToProps('firstName', {
      filtering: true,
      error: 'an error occurred'
    });
    expect(props).to.have.property('filtering', true);
    expect(props).to.have.property('error', 'an error occurred');
  });

});