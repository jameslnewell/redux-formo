import
  mapFormStateToProps, {
    defaultFormProps, defaultFieldProps, mergeDefaultFieldPropsWithState
  } from '../../src/react/mapFormStateToProps'
;

describe('mapFormStateToProps()', () => {

  describe('mergeDefaultFieldPropsWithState()', () => {

    it('should merge defaults', () => {

      const props = mergeDefaultFieldPropsWithState('firstName', {});

      Object.keys(defaultFieldProps).forEach(prop => {
        expect(props).to.have.property(prop, defaultFieldProps[prop]);
      });

    });

    it('should merge state', () => {

      const state = {value: 'John', defaultValue: 'Anon'};
      const props = mergeDefaultFieldPropsWithState('firstName', state);

      Object.keys(state).forEach(prop => {
        expect(props).to.have.property(prop, state[prop]);
      });

    });

    it('should merge state over defaults', () => {

      const state = {active: true, valid: true};
      const props = mergeDefaultFieldPropsWithState('firstName', state);

      Object.keys(state).forEach(prop => {
        expect(props).to.have.property(prop, state[prop]);
      });

    });

    it('should set .name', () => {
      const props = mergeDefaultFieldPropsWithState('firstName', {});
      expect(props).to.have.property('name', 'firstName');
    });

    it('should set .checked when .value is true', () => {
      const props = mergeDefaultFieldPropsWithState('firstName', {value: true});
      expect(props).to.have.property('checked', true);
    });

    it('should set .checked when .value is false', () => {
      const props = mergeDefaultFieldPropsWithState('firstName', {value: false});
      expect(props).to.have.property('checked', false);
    });

    it('should not set .checked when .value is not a boolean', () => {
      const props = mergeDefaultFieldPropsWithState('firstName', {value: 'John'});
      expect(props.checked).to.not.exist;
    });

    it('should set .defaultChecked when defaultValue is true', () => {
      const props = mergeDefaultFieldPropsWithState('firstName', {defaultValue: true});
      expect(props).to.have.property('defaultChecked', true);
    });

    it('should set .defaultChecked when defaultValue is false', () => {
      const props = mergeDefaultFieldPropsWithState('firstName', {defaultValue: false});
      expect(props).to.have.property('defaultChecked', false);
    });

    it('should not set .defaultChecked when defaultValue is not a boolean', () => {
      const props = mergeDefaultFieldPropsWithState('firstName', {}, 'John');
      expect(props.defaultChecked).to.not.exist;
    });

  });

  //================================================================================

  it('should merge defaults', () => {

    const props = mapFormStateToProps([], {});

    Object.keys(defaultFormProps).forEach(prop => {
      if (prop !== 'fields') {
        expect(props).to.have.property(prop, defaultFormProps[prop]);
      }
    });

  });

  it('should merge state', () => {

    const state = {error: 'Uh oh!'};
    const props = mapFormStateToProps([], state);

    Object.keys(state).forEach(prop => {
      expect(props).to.have.property(prop, state[prop]);
    });

  });

  it('should merge state over defaults', () => {

    const state = {initialised: true, submitted: true};
    const props = mapFormStateToProps([], state);

    Object.keys(state).forEach(prop => {
      expect(props).to.have.property(prop, state[prop]);
    });

  });

  it('should set calculated property .valid to true when all fields are valid', () => {

    const state = {fields: {firstName: {valid: true}, lastName: {valid: true}}};
    const props = mapFormStateToProps(['firstName', 'lastName'], state, {}, {}, {});

    expect(props).to.have.property('valid', true);

  });

  it('should set calculated property .valid to false when one or more fields are invalid', () => {

    const state = {fields: {firstName: {valid: true}}};
    const props = mapFormStateToProps(['firstName', 'lastName'], state, {}, {}, {});

    expect(props).to.have.property('valid', false);

  });

  it('should set calculated property .filtering/.validating to true when one or more fields are filtering/validating', () => {

    const state = {fields: {firstName: {validating: true}, lastName: {filtering: true}}};
    const props = mapFormStateToProps(['firstName', 'lastName'], state, {}, {}, {});

    expect(props).to.have.property('filtering', true);
    expect(props).to.have.property('validating', true);

  });

  it('should set calculated property .filtering/.validating to false when none of the fields are filtering/validating', () => {

    const state = {fields: {firstName: {validating: false}}};
    const props = mapFormStateToProps(['firstName', 'lastName'], state, {}, {}, {});

    expect(props).to.have.property('filtering', false);
    expect(props).to.have.property('validating', false);

  });

  it('should merge actions', () => {

    const actions = {blur: () => {/*do nothing*/}};
    const props = mapFormStateToProps(['firstName'], {}, actions, {}, {});

    Object.keys(actions).forEach(prop => {
      expect(props).to.have.property(prop, actions[prop]);
    });

  });

  it('should merge form handlers', () => {

    const formHandlers = {onSubmit: () => {/*do nothing*/}};
    const props = mapFormStateToProps(['firstName'], {}, {}, formHandlers, {});

    Object.keys(formHandlers).forEach(prop => {
      expect(props).to.have.property(prop, formHandlers[prop]);
    });

  });

  it('should merge field handlers', () => {

    const fieldNames = ['firstName'];
    const fieldHandlers = {firstName: {onChange: () => {/*do nothing*/}}};
    const props = mapFormStateToProps(fieldNames, {}, {}, {}, fieldHandlers);

    fieldNames.forEach(fieldName => Object.keys(fieldHandlers[fieldName]).forEach(prop => {
      expect(props.fields[fieldName]).to.have.property(prop, fieldHandlers[fieldName][prop]);
    }));

  });

});
