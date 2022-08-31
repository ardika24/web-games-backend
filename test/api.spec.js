const request = require('supertest');
const app = require('../app');

describe('POST /api/v1/auth/register', () => {
  const userPayload = {
    email: 'superman@email.com',
    username: 'test.superman',
    password: 'superman123',
  };

  it('status: 400 and code "auth/register-invalid when request body empty', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({ email: '', username: '', password: '' })
      .set('Accept', 'application.json');

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(400);

    expect(response.body.error.code).toEqual('auth/register-invalid');
  });

  it('status: 200 and the credential information', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send(userPayload)
      .set('Accept', 'application/json');

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('accessToken');
    expect(response.body.username).toEqual(userPayload.username);
  });

  it('status: 400 and code "auth/user-exist" when user already exist', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send(userPayload)
      .set('Accept', 'application/json');

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(400);

    expect(response.body.error.code).toEqual('auth/user-exist');
  });
});

describe('POST /api/v1/auth/login', () => {
  const userPayload = {
    username: 'test.superman',
    password: 'superman123',
  };

  it('status: 400 and code "auth/login" when request body empty', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ username: '', password: 'superman123' })
      .set('Accept', 'application/json');

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(400);

    expect(response.body.error.message).toEqual('User not Found!');
  });

  it('status: 400 and code "auth/login" when request body empty', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ username: 'test.superman', password: 'superman12345' })
      .set('Accept', 'application/json');

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(400);

    expect(response.body.error.message).toEqual('Wrong password');
  });

  it('status: 200 and the credential information', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send(userPayload)
      .set('Accept', 'application/json');

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('accessToken');
    expect(response.body.username).toEqual(userPayload.username);
  });
});
