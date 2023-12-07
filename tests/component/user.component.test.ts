// user.component.test.ts
import request from 'supertest';
import { server, startServer, closeServer } from './server'; // Adjust the import path based on your project structure

beforeAll(async () => {
  await startServer();
});

afterAll(async () => {
  await closeServer();
});

describe('User CRUD Operations', () => {
  let testUserId: string;

  test('should create a new user', async () => {
    const newUser = {
      firstName: 'John',
      lastName: 'Doe',
      age: 25,
      money: 5000,
      children: [],
      petName: 'Buddy',
      address: '123 Main St',
      postCode: 'ABC123',
      status: 'Regular',
    };

    const response = await request(server)
      .post('/users')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    testUserId = response.body.id;
  });

  test('should get all users', async () => {
    const response = await request(server).get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1); // Assuming only one user is created
  });

  test('should get a specific user by id', async () => {
    const response = await request(server).get(`/users/${testUserId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(testUserId);
  });

  test('should update a specific user by id', async () => {
    const updatedUserData = {
      firstName: 'Updated',
      lastName: 'User',
    };

    const response = await request(server)
      .put(`/users/${testUserId}`)
      .send(updatedUserData);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(testUserId);
    expect(response.body.firstName).toBe(updatedUserData.firstName);
    expect(response.body.lastName).toBe(updatedUserData.lastName);
  });

  test('should delete a specific user by id', async () => {
    const response = await request(server).delete(`/users/${testUserId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(testUserId);
  });
});
