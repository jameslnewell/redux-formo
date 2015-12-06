import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import deepFreeze from 'deep-freeze-strict';

chai.use(sinonChai);

global.sinon = sinon;
global.expect = chai.expect;
global.deepFreeze = deepFreeze;