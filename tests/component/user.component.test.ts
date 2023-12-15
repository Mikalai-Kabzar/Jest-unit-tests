// user.component.test.ts
import request from 'supertest';
import { server, startServer, closeServer } from './server'; // Adjust the import path based on your project structure
import { Status} from './User';

beforeAll(async () => {
  await startServer();
});

afterAll(async () => {
  await closeServer();
});

describe('User CRUD Operations', () => {
  let testUserId: string;
  let testChildId: string;

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

  it('should return only headers when using HEAD to retrieve a specific user by id', async () => {
    const response = await request(server).head(`/users/${testUserId}`);

    expect(response.status).toBe(200);
    expect(response.text).toBeUndefined();
  });

  it('should retrieve a list of users', async () => {
    const response = await request(server).get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    // Add more assertions based on your application's response structure
  });

  it('should describe communication options for /users endpoint using OPTIONS method', async () => {
    const response = await request(server).options('/users');

    expect(response.status).toBe(200);
    expect(response.header.allow).toBe('GET, POST, OPTIONS');
  });

  it('should describe communication options for /users/:id endpoint using OPTIONS method', async () => {
    const response = await request(server).options(`/users/${testUserId}`);

    expect(response.status).toBe(200);
    expect(response.header.allow).toBe('GET, PUT, DELETE, HEAD, OPTIONS');
  });

  it('should add a child to a specific user by id', async () => {
    const childData = {
      firstName: 'Child',
      lastName: 'User',
      age: 5,
      money: 0,
      petName: 'Sparky',
      address: '123 Pine St',
      postCode: 'JKL012',
      status: Status.Outdated,
    };

    const response = await request(server)
      .post(`/users/${testUserId}/children`)
      .send(childData);

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    testChildId = response.body.id;
    // Add assertions for other fields of the child object if needed
    expect(response.body.firstName).toBe(childData.firstName);
    expect(response.body.age).toBe(childData.age);
    // Additional assertions
    expect(response.body.lastName).toBe('User');
    expect(response.body.money).toBe(0);
    expect(response.body.petName).toBe('Sparky');
    expect(response.body.address).toBe('123 Pine St');
    expect(response.body.postCode).toBe('JKL012');
    expect(response.body.status).toBe(Status.Outdated);
  });

  it('should retrieve all children of a specific user by id', async () => {
    const response = await request(server).get(`/users/${testUserId}/children`);

    expect(response).toHaveProperty('status', 200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty('id', testChildId);
    expect(response.body[0]).toHaveProperty('firstName', 'Child');
    expect(response.body[0].lastName).toBe('User');
    expect(response.body[0].age).toBe(5);
    expect(response.body[0].money).toBe(0);
    expect(response.body[0].petName).toBe('Sparky');
    expect(response.body[0].address).toBe('123 Pine St');
    expect(response.body[0].postCode).toBe('JKL012');
    expect(response.body[0].status).toBe(Status.Outdated);
  });

  it('should retrieve a specific child by id for a specific user by id', async () => {
    const response = await request(server).get(`/users/${testUserId}/children/${testChildId}`);

    expect(response).toHaveProperty('status', 200);
    expect(response.body).toHaveProperty('id', testChildId);
    expect(response.body).toHaveProperty('firstName', 'Child');
    expect(response.body.lastName).toBe('User');
    expect(response.body.age).toBe(5);
    expect(response.body.money).toBe(0);
    expect(response.body.petName).toBe('Sparky');
    expect(response.body.address).toBe('123 Pine St');
    expect(response.body.postCode).toBe('JKL012');
    expect(response.body.status).toBe(Status.Outdated);
  });

  it('should update a specific child by id for a specific user by id', async () => {
    const updatedData = {
      firstName: 'UpdatedChild',
      lastName: 'User',
      age: 6,
      money: 10,
      petName: 'Rover',
      address: '456 Oak St',
      postCode: 'GHI789',
      status: Status.VIP,
    };

    const response = await request(server)
      .put(`/users/${testUserId}/children/${testChildId}`)
      .send(updatedData);

    expect(response).toHaveProperty('status', 200);
    expect(response.body).toHaveProperty('id', testChildId);
    expect(response.body.firstName).toBe(updatedData.firstName);
    expect(response.body.age).toBe(updatedData.age);
    expect(response.body.lastName).toBe('User');
    expect(response.body.money).toBe(10);
    expect(response.body.petName).toBe('Rover');
    expect(response.body.address).toBe('456 Oak St');
    expect(response.body.postCode).toBe('GHI789');
    expect(response.body.status).toBe(Status.VIP);
  });

  it('should delete a specific child by id for a specific user by id', async () => {
    const response = await request(server).delete(`/users/${testUserId}/children/${testChildId}`);

    expect(response).toHaveProperty('status', 200);

    // Verify the child is deleted by trying to retrieve it again
    const retrievalResponse = await request(server).get(`/users/${testUserId}/children/${testChildId}`);
    expect(retrievalResponse).toHaveProperty('status', 404);
  });

  it('should create a user, add children, and perform nested operations', async () => {
    // Step 1: Create a new user
    const createUserResponse = await request(server)
      .post('/users')
      .send({
        firstName: 'Parent',
        lastName: 'User',
        age: 30,
        money: 1500,
        children: [],
        petName: 'Buddy',
        address: '789 Elm St',
        postCode: 'DEF456',
        status: Status.Regular,
      });
  
    expect(createUserResponse.status).toBe(201);
    const userId = createUserResponse.body.id;
  
    // Step 2: Create a child for the user
    const createChildResponse = await request(server)
      .post(`/users/${userId}/children`)
      .send({
        firstName: 'Child1',
        lastName: 'User',
        age: 5,
        money: 100,
        children: [],
        petName: 'Sparky',
        address: '123 Main St',
        postCode: 'ABC123',
        status: Status.Regular,
        // Add other child fields as needed
      });
  
    expect(createChildResponse.status).toBe(201);
    const child1Id = createChildResponse.body.id;
  
    // Step 3: Create 2 more children for the first child
    const createChild2Response = await request(server)
      .post(`/users/${child1Id}/children`)
      .send({
        firstName: 'Grandchild1',
        lastName: 'User',
        age: 2,
        money: 50,
        children: [],
        petName: 'Fluffy',
        address: '456 Oak St',
        postCode: 'GHI789',
        status: Status.VIP,
        // Add other grandchild fields as needed
      });
  
    const createChild3Response = await request(server)
      .post(`/users/${child1Id}/children`)
      .send({
        firstName: 'Grandchild2',
        lastName: 'User',
        age: 3,
        money: 75,
        children: [],
        petName: 'Whiskers',
        address: '789 Elm St',
        postCode: 'DEF456',
        status: Status.Regular,
        // Add other grandchild fields as needed
      });
  
    expect(createChild2Response.status).toBe(201);
    expect(createChild3Response.status).toBe(201);
    const child2Id = createChild2Response.body.id;
    const child3Id = createChild3Response.body.id;
  
    // Step 4: Add 3 more children for the second child (Grandchild2)
    const createChild4Response = await request(server)
      .post(`/users/${child3Id}/children`)
      .send({
        firstName: 'GreatGrandchild1',
        lastName: 'User',
        age: 1,
        money: 20,
        children: [],
        petName: 'Tiny',
        address: '987 Birch St',
        postCode: 'JKL012',
        status: Status.Admin,
        // Add other great-grandchild fields as needed
      });
  
    const createChild5Response = await request(server)
      .post(`/users/${child3Id}/children`)
      .send({
        firstName: 'GreatGrandchild2',
        lastName: 'User',
        age: 2,
        money: 30,
        children: [],
        petName: 'Mini',
        address: '654 Pine St',
        postCode: 'JKL321',
        status: Status.Outdated,
        // Add other great-grandchild fields as needed
      });
  
    const createChild6Response = await request(server)
      .post(`/users/${child3Id}/children`)
      .send({
        firstName: 'GreatGrandchild3',
        lastName: 'User',
        age: 3,
        money: 40,
        children: [],
        petName: 'Small',
        address: '321 Cedar St',
        postCode: 'STU012',
        status: Status.Regular,
        // Add other great-grandchild fields as needed
      });
  
    expect(createChild4Response.status).toBe(201);
    expect(createChild5Response.status).toBe(201);
    expect(createChild6Response.status).toBe(201);
  
    // Additional assertions for each step based on your application's structure
    // Add more assertions as needed
    expect(createChildResponse.body.firstName).toBe('Child1');
    expect(createChild2Response.body.address).toBe('456 Oak St');
    expect(createChild5Response.body.status).toBe(Status.Outdated);
    // ... (Add more assertions for each field and step)
  });

  it('should create and delete a specific user by id', async () => {
    // Create a new user
    const createUserResponse = await request(server)
      .post('/users')
      .send({
        firstName: 'Test',
        lastName: 'User',
        age: 30,
        money: 1500,
        children: [],
        petName: 'Buddy',
        address: '789 Elm St',
        postCode: 'DEF456',
        status: Status.Regular,
      });

    expect(createUserResponse.status).toBe(201);
    expect(createUserResponse.body.id).toBeDefined();
    testUserId = createUserResponse.body.id;

    // Retrieve the created user and validate properties
    const retrievedUserResponse = await request(server).get(`/users/${testUserId}`);
    expect(retrievedUserResponse.status).toBe(200);
    expect(retrievedUserResponse.body.id).toBe(testUserId);
    // Add more assertions based on your application's response structure

    // Delete the created user
    const deleteUserResponse = await request(server).delete(`/users/${testUserId}`);
    expect(deleteUserResponse.status).toBe(200);
    expect(deleteUserResponse.body.message).toBe('User and their descendants deleted successfully');

    // Verify the user is deleted by trying to retrieve it again
    const retrievalResponse = await request(server).get(`/users/${testUserId}`);
    expect(retrievalResponse.status).toBe(404);
  });

  
  it('should handle deleting a non-existing user', async () => {
    // Attempt to delete a non-existing user
    const nonExistingUserId = 'non-existing-id';
    const response = await request(server).delete(`/users/${nonExistingUserId}`);

    // Validate that the server returns a 404 status and JSON with an error message
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'User not found');
  });

  it('should handle deleting a non-existing child for a specific user', async () => {
    // Create a user to ensure it exists
    const userResponse = await request(server)
      .post('/users')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        age: 25,
        money: 1000,
        children: [],
        petName: 'Fluffy',
        address: '123 Main St',
        postCode: 'ABC123',
        status: Status.Regular,
      });
  
    const userId = userResponse.body.id;
  
    // Attempt to delete a non-existing child for the user
    const nonExistingChildId = 'non-existing-child-id';
    const response = await request(server).delete(`/users/${userId}/children/${nonExistingChildId}`);
  
    // Validate that the server returns a 404 status and JSON with an error message
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Child not found');
  });
  
  it('should handle deleting a non-existing user for deleting a child', async () => {
    // Create a user to ensure it exists
    const userResponse = await request(server)
      .post('/users')
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        age: 30,
        money: 1500,
        children: [],
        petName: 'Buddy',
        address: '456 Oak St',
        postCode: 'XYZ789',
        status: Status.VIP,
      });
  
    // Attempt to delete a child for a non-existing user
    const nonExistingUserId = 'non-existing-user-id';
    const nonExistingChildId = 'some-child-id'; // Replace with a valid child ID
    const response = await request(server).delete(`/users/${nonExistingUserId}/children/${nonExistingChildId}`);
  
    // Validate that the server returns a 404 status and JSON with an error message
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'User not found');
  });

  it('should return 404 status and error when updating a non-existing child for a user', async () => {
    // Create a user
    const createUserResponse = await request(server)
      .post('/users')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
        money: 1500,
        children: [],
        petName: 'Buddy',
        address: '789 Elm St',
        postCode: 'DEF456',
        status: Status.Regular,
      });
  
    const userId = createUserResponse.body.id;
  
    // Try to update a non-existing child for the user
    const nonExistingChildId = 'non-existing-child-id';
  
    const response = await request(server)
      .put(`/users/${userId}/children/${nonExistingChildId}`)
      .send({
        // ... (update data)
      });
  
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Child not found');
  });
  
  
  it('should return 404 status and error when updating a child for a non-existing user', async () => {
    const nonExistingUserId = 'nonExistingUserId';
    const childId = 'someChildId';
  
    const response = await request(server)
      .put(`/users/${nonExistingUserId}/children/${childId}`)
      .send({
        firstName: 'UpdatedChild',
        age: 7,
        money: 200,
        petName: 'UpdatedSparky',
        address: '456 Oak St',
        postCode: 'XYZ789',
        status: Status.VIP,
      });
  
    // Validate that the server returns a 404 status and error when user is not found
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'User not found' });
  });

  it('should return 404 status and error when trying to retrieve children of a non-existing user', async () => {
    // Attempt to get all children of a non-existing user
    const response = await request(server).get('/users/nonExistingUserId/children');

    // Add assertions
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('User not found');
  });

  it('should return 404 status and error when trying to retrieve a child for a non-existing user by id', async () => {
    // Attempt to get a specific child for a non-existing user
    const nonExistingUserId = 'nonExistingUserId';
    const nonExistingChildId = 'nonExistingChildId';
    const response = await request(server).get(`/users/${nonExistingUserId}/children/${nonExistingChildId}`);

    // Add assertions
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('User not found');
  });

  it('should recursively remove a user and their children from the users array', async () => {
    // Create a user with children
    const responseCreateUser = await request(server)
      .post('/users')
      .send({
        firstName: 'Test',
        lastName: 'User',
        age: 30,
        money: 1500,
        children: [
          {
            firstName: 'Child1',
            lastName: 'User',
            age: 5,
            money: 100,
            children: [
              {
                firstName: 'Grandchild1',
                lastName: 'User',
                age: 2,
                money: 50,
                children: [],
                petName: 'Fluffy',
                address: '123 Pine St',
                postCode: 'ABC123',
                status: Status.Outdated,
              },
            ],
            petName: 'Buddy',
            address: '789 Elm St',
            postCode: 'DEF456',
            status: Status.Regular,
          },
        ],
        petName: 'Fido',
        address: '456 Oak St',
        postCode: 'GHI789',
        status: Status.VIP,
      });

    const userId = responseCreateUser.body.id;

    // Ensure the user was created successfully
    expect(responseCreateUser.status).toBe(201);

    // Attempt to delete the user and their children
    const responseDeleteUser = await request(server).delete(`/users/${userId}`);

    // Add assertions
    expect(responseDeleteUser.status).toBe(200);
    expect(responseDeleteUser.body).toEqual({ message: 'User and their descendants deleted successfully' });    // Verify the user and their children are not in the users array
    
    const retrievalResponse = await request(server).get(`/users/${userId}`);
    expect(retrievalResponse.status).toBe(404);
  });

  it('should create a child for a specific user and return 404 if the user is not found', async () => {
    // Create a user to associate the child with
    const responseCreateUser = await request(server)
      .post('/users')
      .send({
        firstName: 'Parent',
        lastName: 'User',
        age: 30,
        money: 1500,
        children: [],
        petName: 'Buddy',
        address: '789 Elm St',
        postCode: 'DEF456',
        status: Status.Regular,
      });

    const userId = responseCreateUser.body.id;

    // Ensure the user was created successfully
    expect(responseCreateUser.status).toBe(201);

    // Attempt to create a child for the user
    const responseCreateChild = await request(server)
      .post(`/users/${userId}/children`)
      .send({
        firstName: 'Child',
        lastName: 'User',
        age: 5,
        money: 100,
        children: [],
        petName: 'Fluffy',
        address: '123 Pine St',
        postCode: 'ABC123',
        status: Status.Outdated,
      });

    // Ensure the child creation was successful
    expect(responseCreateChild.status).toBe(201);
    expect(responseCreateChild.body.id).toBeDefined();

    // Attempt to create a child for a non-existing user
    const nonExistingUserId = 'nonexistentuser123';
    const responseCreateChildForNonExistingUser = await request(server)
      .post(`/users/${nonExistingUserId}/children`)
      .send({
        firstName: 'AnotherChild',
        lastName: 'User',
        age: 3,
        money: 50,
        children: [],
        petName: 'Sparky',
        address: '456 Oak St',
        postCode: 'GHI789',
        status: Status.Regular,
      });

    // Ensure the response indicates that the user was not found
    expect(responseCreateChildForNonExistingUser.status).toBe(404);
    expect(responseCreateChildForNonExistingUser.body).toEqual({ error: 'User not found' });
  });







});
