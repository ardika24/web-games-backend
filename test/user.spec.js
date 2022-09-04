const jwt = require('jsonwebtoken');
const { User } = require('../models');

describe('user.generateToken function', () => {
  const payload = {
    id: 1,
    username: 'ardika',
  };
  let user;

  beforeEach(() => {
    user = User.build(payload);
  });

  it('should return an error when process.env.APP.SECRET is not defined', (done) => {
    const currentSecret = process.env.APP_SECRET;

    process.env.APP_SECRET = '';

    expect(() => {
      user.generateToken();
    }).toThrow('Please set APP_SECRET on env');

    process.env.APP_SECRET = currentSecret;

    done();
  });

  it('sign jwt with the secret', (done) => {
    const secret = process.env.APP_SECRET;
    const testToken = jwt.sign(payload, secret);

    const token = user.generateToken();

    expect(token).toBe(testToken);

    done();
  });
});
