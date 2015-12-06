import wrapMapStateToProps from '../../src/react/wrapMapStateToProps';

describe('wrapMapStateToProps()', () => {

  it('should throw an error when the reducer has not been mounted', () => {
    expect(() => wrapMapStateToProps({formName: 'profile'})()).to.throw();
  });

  it('should get the form state from the root state when I set .formStateKey to empty', () => {

    const state = {
      profile: {
        fields: {
          name: 'John'
        }
      }
    };

    const mapStateToProps = wrapMapStateToProps({
      formName: 'profile',
      formStateKey: ''
    });

    const props = mapStateToProps(state);

    expect(props).to.be.deep.equal({
      fields: {
        name: 'John'
      }
    });

  });

  it('should get the form state from the child state when I set .formStateKey', () => {

    const state = {
      form: {
        profile: {
          fields: {
            name: 'John'
          }
        }
      }
    };

    const mapStateToProps = wrapMapStateToProps({
      formName: 'profile',
      formStateKey: 'form'
    });

    const props = mapStateToProps(state);

    expect(props).to.be.deep.equal({
      fields: {
        name: 'John'
      }
    });

  });

  it('should put the form state into the root props when I set .formPropsKey to empty', () => {

    const state = {
      form: {
        profile: {
          fields: {
            name: 'John'
          }
        }
      }
    };

    const mapStateToProps = wrapMapStateToProps({
      formName: 'profile',
      formPropsKey: ''
    });

    const props = mapStateToProps(state);

    expect(props).to.be.deep.equal({
      fields: {
        name: 'John'
      }
    });

  });

  it('should put the form state into the child props when I set .formPropsKey', () => {

    const state = {
      form: {
        profile: {
          fields: {
            name: 'John'
          }
        }
      }
    };

    const mapStateToProps = wrapMapStateToProps({
      formName: 'profile',
      formPropsKey: 'form'
    });

    const props = mapStateToProps(state);

    expect(props).to.be.deep.equal({
      form: {
        fields: {
          name: 'John'
        }
      }
    });

  });

  it('should not merge other state into the props when I do not set .mapStateToProps', () => {

    const state = {
      route: '/',
      form: {
        profile: {
          fields: {
            name: 'John'
          }
        }
      }
    };

    const mapStateToProps = wrapMapStateToProps({
      formName: 'profile'
    });

    const props = mapStateToProps(state);

    expect(props).to.be.deep.equal({
      fields: {
        name: 'John'
      }
    });

  });

  it('should merge other state into props when I set .mapStateToProps', () => {

    const state = {
      route: '/',
      form: {
        profile: {
          fields: {
            name: 'John'
          }
        }
      }
    };

    const mapStateToProps = wrapMapStateToProps({
      formName: 'profile',
      mapStateToProps: state => ({route: state.route})
    });

    const props = mapStateToProps(state);

    expect(props).to.be.deep.equal({
      route: '/',
      fields: {
        name: 'John'
      }
    });

  });

});