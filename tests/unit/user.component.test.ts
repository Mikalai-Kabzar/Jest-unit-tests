// server.test.ts

import request from 'supertest';
import {server} from './server';

// Mock the supertest post function
jest.stub('supertest', () => {
  const original = jest.requireActual('supertest');

  return {
    ...original,
    post: jest.fn(() => {
    }),
  };
});

describe('User Routes Integration Tests', () => {
  it('should create a new user', async () => {
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

    // Use the mocked post function
    const response = await request(server)
      .post('/api/users')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  // Add more tests as needed
});