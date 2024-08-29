const request = require('supertest');
const app = require('../app');
const User = require('../models/user'); // 假設 User 是你的 Sequelize 模型

beforeAll(async () => {
  await User.destroy({ where: { email: 'test@email.com' } });
});

afterAll(async () => {
  await User.destroy({ where: { email: 'test@email.com' } });
});
describe('POST /api/auth/register', () => {
  it('should register a new user with the correct body', async () => {
    const response = await request(app).post('/api/auth/register').send({
      name: 'testuser',
      password: 'testpassword',
      email: 'test@email.com',
      rolesId: 1,
    });

    expect(response.statusCode).toBe(201);
  });
});

describe('POST /api/auth/login', () => {
  it('should login a user with correct credentials', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'test@email.com',
      password: 'testpassword',
    });

    expect(response.statusCode).toBe(200); // 假設成功登入返回 200 狀態碼
  });

  it('should return 401 for incorrect credentials', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'test@email.com',
      password: 'wrongpassword',
    });

    expect(response.statusCode).toBe(401); // 假設登入失敗返回 401 狀態碼
  });
});

describe('POST /api/auth/reset', () => {
  it('should reset the password and send a reset email', async () => {
    const response = await request(app).post('/api/auth/reset').send({
      name: 'testuser',
      email: 'test@email.com',
      newPassword: 'testNewPassword',
    });

    expect(response.statusCode).toBe(200); // 假設成功重設返回 200 狀態碼
  });

  it('should return 404 if email is not found', async () => {
    const response = await request(app).post('/api/auth/reset').send({
      name: 'notfound',
      email: 'test@reset.com',
      newPassword: 'testNewPassword',
    });

    expect(response.statusCode).toBe(404); // 假設找不到 email 時返回 404 狀態碼
  });
});
