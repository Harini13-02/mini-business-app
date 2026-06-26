const request = require('supertest');
const app = require('../../src/app');

async function getAdminToken() {
  const response = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'admin@example.com',
      password: 'admin123',
    });

  if (response.status !== 200) {
    throw new Error(
      `Unable to login as admin. Status: ${response.status}`
    );
  }

  return response.body.token;
}

module.exports = {
  getAdminToken,
};