import bindActionCreators from '../../src/react/bindActionCreators';

describe('bindActionCreators()', () => {

  it('should have a property for each action', () => {
    const dispatch = sinon.spy();
    const actions = bindActionCreators({formName: 'profile', dispatch});

    Object.keys(actions).forEach(action => expect(action))

  });

});