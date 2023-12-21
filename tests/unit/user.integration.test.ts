// user.integration.test.ts
import request from 'supertest';
import { server, startServer, closeServer } from './server'; // Adjust the import path based on your project structure
import { Status, User, UserCategory} from './User';

beforeAll(async () => {
  await startServer();
});

afterAll(async () => {
  await closeServer();
});

describe('User CRUD Operations integration tests', () => {
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

  it('should update user properties by id using PATCH method', async () => {
    // Create a user to update
    const responseCreateUser = await request(server)
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

    const userId = responseCreateUser.body.id;

    // Ensure the user was created successfully
    expect(responseCreateUser.status).toBe(201);

    // Update user properties using PATCH method
    const responsePatchUser = await request(server)
      .patch(`/users/${userId}`)
      .send({
        firstName: 'UpdatedFirstName',
        age: 35,
        address: 'UpdatedAddress',
      });

    // Ensure the user properties were updated successfully
    expect(responsePatchUser.status).toBe(200);
    expect(responsePatchUser.body.id).toBe(userId);
    expect(responsePatchUser.body.firstName).toBe('UpdatedFirstName');
    expect(responsePatchUser.body.age).toBe(35);
    expect(responsePatchUser.body.address).toBe('UpdatedAddress');
  });

  it('should create a child for a specific user using POST method', async () => {
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

    // Create a child for the user using POST method
    const responseCreateChild = await request(server)
      .post(`/users/${userId}/children`)
      .send({
        firstName: 'Child',
        lastName: 'User',
        age: 5,
        money: 100,
        petName: 'Fluffy',
        address: '123 Pine St',
        postCode: 'ABC123',
        status: Status.Outdated,
      });

    // Ensure the child was created successfully
    expect(responseCreateChild.status).toBe(201);
    expect(responseCreateChild.body.id).toBeDefined();
  });

  it('should return 404 status and error when updating a non-existing user', async () => {
    // Attempt to update a non-existing user
    const nonExistingUserId = 'non-existing-id';
    const updateData = {
      firstName: 'Updated',
      lastName: 'User',
      age: 32,
      money: 1800,
      children: [],
      petName: 'Max',
      address: '456 Oak St',
      postCode: 'GHI789',
      status: Status.VIP,
    };

    const response = await request(server)
      .put(`/users/${nonExistingUserId}`)
      .send(updateData);

    // Ensure the response has the expected 404 status and error
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('User not found');
  });

  it('should return 404 status and error when updating properties of a non-existing user', async () => {
    // Attempt to update properties of a non-existing user
    const nonExistingUserId = 'non-existing-id';
    const updateData = {
      firstName: 'Updated',
      lastName: 'User',
      age: 32,
      money: 1800,
      children: [],
      petName: 'Max',
      address: '456 Oak St',
      postCode: 'GHI789',
      status: Status.VIP,
    };

    const response = await request(server)
      .patch(`/users/${nonExistingUserId}`)
      .send(updateData);

    // Ensure the response has the expected 404 status and error
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('User not found');
  });

  it('should return 404 status and error when adding a child to a non-existing user', async () => {
    const nonExistingUserId = 'non-existing-user-id';

    const response = await request(server)
      .post(`/users/${nonExistingUserId}/children`)
      .send({
        firstName: 'Child',
        lastName: 'User',
        age: 5,
        money: 100,
        children: [],
        petName: 'Puppy',
        address: '123 Oak St',
        postCode: 'ABC123',
        status: 'Child',
      });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('User not found');
  });

  it('should create a user and add a child to the user', async () => {
    // Create a user first
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
        status: 'Regular',
      });

    expect(createUserResponse.status).toBe(201);
    expect(createUserResponse.body.id).toBeDefined();

    const userId = createUserResponse.body.id;

    // Add a child to the user
    const addChildResponse = await request(server)
      .post(`/users/${userId}/children`)
      .send({
        firstName: 'Child',
        lastName: 'User',
        age: 5,
        money: 100,
        children: [],
        petName: 'Puppy',
        address: '123 Oak St',
        postCode: 'ABC123',
        status: 'Child',
      });

    expect(addChildResponse.status).toBe(201);
    expect(addChildResponse.body.id).toBeDefined();
    expect(addChildResponse.body.firstName).toBe('Child');

    // Verify that the user now has the child
    const getUserResponse = await request(server).get(`/users/${userId}`);
    expect(getUserResponse.status).toBe(200);
    expect(getUserResponse.body.children.length).toBe(1);
    expect(getUserResponse.body.children[0].id).toBe(addChildResponse.body.id);
  });

  it('should create a new user and get the proposed status for that user', async () => {
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

    // Assertions for user creation
    expect(createUserResponse.status).toBe(201);
    expect(createUserResponse.body.id).toBeDefined();
    testUserId = createUserResponse.body.id;

    // Get the proposed status for the created user
    const getProposedStatusResponse = await request(server).get(`/users/${testUserId}/proposed-status`);

    // Assertions for getting proposed status
    expect(getProposedStatusResponse.status).toBe(200);
    expect(getProposedStatusResponse.body.proposedStatus).toBe(Status.Regular);
    // Add more assertions based on your application's response structure and expected behavior
  });

  it('should return 404 status and error when the user is not found', async () => {
    // Make a request for a non-existing user
    const response = await request(server).get('/users/1000/proposed-status');

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('User not found');
  });

  const moneyAndProposedStatuses = [
    [-100, Status.Outdated],
    [100, Status.Outdated],   
    [999, Status.Outdated], 
    [1000, Status.Regular], 
    [3456, Status.Regular],  
    [4999, Status.Regular], 
    [5000, Status.VIP], 
    [6789, Status.VIP], 
    [9999, Status.VIP], 
    [10000, Status.Admin],
    [98745, Status.Admin],
    [9874545445, Status.Admin],
  ];

  it.each(moneyAndProposedStatuses)('should cover all existing statuses with %i money and return proposeNewStatus equal to %p', async (money, expectedStatus) => {
    // Create a test user with initial status based on the proposeNewStatus method
    const createUserResponse = await request(server)
      .post('/users')
      .send({
        firstName: 'Test',
        lastName: 'User',
        age: 30,
        money: money,
        children: [],
        petName: 'Buddy',
        address: '789 Elm St',
        postCode: 'DEF456',
      });

    const userId = createUserResponse.body.id;

    // Verify the initial status is determined by proposeNewStatus method
    expect(createUserResponse.status).toBe(201);

    // Use GET method to retrieve the proposed status for the user
    const getProposedStatusOutdatedesponse = await request(server).get(`/users/${userId}/proposed-status`);

    // Verify the proposed status is 'Outdated' based on the updated amount of money
    expect(getProposedStatusOutdatedesponse.status).toBe(200);
    expect(getProposedStatusOutdatedesponse.body.proposedStatus).toBe(expectedStatus);
  });

  it('should retrieve years to retirement for a specific user by id', async () => {
    // Create a test user
    const createUserResponse = await request(server)
      .post('/users')
      .send({
        firstName: 'Test',
        lastName: 'User',
        age: 30,
        money: 800,
        children: [],
        petName: 'Buddy',
        address: '789 Elm St',
        postCode: 'DEF456',
      });

    expect(createUserResponse.status).toBe(201);
    expect(createUserResponse.body.id).toBeDefined();
    testUserId = createUserResponse.body.id;

    // Get years to retirement for the created user
    const response = await request(server).get(`/users/${testUserId}/years-to-retirement`);

    expect(response.status).toBe(200);
    expect(response.body.yearsToRetirement).toBe(35); 
    // Add more assertions based on your application's response structure and business logic
  });

  const yearsToRetirementTestData = [
    [35, 30],   
    [49, 16], 
    [64, 1],  
    [65, 0], 
    [75, 0], 
  ];
  it.each(yearsToRetirementTestData)('should update age to %i and retrieve updated years to retirement equal to %i', async (age, yearsToRetirement) => {
      await request(server)
      .put(`/users/${testUserId}`)
      .send({ age: age });

    let updatedResponse = await request(server).get(`/users/${testUserId}/years-to-retirement`);

    expect(updatedResponse.status).toBe(200);
    expect(updatedResponse.body.yearsToRetirement).toBe(yearsToRetirement);
  });

  it('should return 404 status and error when retrieving years to retirement for a non-existing user', async () => {
    // Use a non-existing user ID (assuming this ID does not exist in the database)
    const nonExistingUserId = 'non-existing-id';

    // Attempt to get years to retirement for the non-existing user
    const response = await request(server).get(`/users/${nonExistingUserId}/years-to-retirement`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('User not found');
  });
  const userCategoryTestData = [
    [0, UserCategory.Child], 
    [10, UserCategory.Child], 
    [17, UserCategory.Child], 
    [18, UserCategory.Adult],  
    [19, UserCategory.Adult], 
    [59, UserCategory.Adult], 
    [60, UserCategory.Senior], 
    [92, UserCategory.Senior], 
  ];
  it.each(userCategoryTestData)('should get the user category for a specific user with age %i and expected category %i by id', async (age, category) => {
    // Create a new user
    const createUserResponse = await request(server)
      .post('/users')
      .send({
        firstName: 'Test',
        lastName: 'User',
        age: age,
        money: 800,
        children: [],
        petName: 'Buddy',
        address: '789 Elm St',
        postCode: 'DEF456',
        status: Status.Regular,
      });

    expect(createUserResponse.status).toBe(201);
    testUserId = createUserResponse.body.id;

    // Get the user category for the created user
    const response = await request(server).get(`/users/${testUserId}/category`);

    expect(response.status).toBe(200);
    expect(response.body.userCategory).toBe(category); 
  });

  it('should return 404 when getting user category for a non-existing user', async () => {
    const nonExistingUserId = 'nonexistinguser123';

    // Attempt to get the user category for a non-existing user
    const response = await request(server).get(`/users/${nonExistingUserId}/category`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('User not found');
  });
 
  it('should return 404 status and error when incrementing age for a non-existing user by id', async () => {
    const nonExistingUserId = 'non-existing-id';

    // Send a POST request to increment the age for a non-existing user
    const response = await request(server)
      .post(`/users/${nonExistingUserId}/increment-age-until/40`)
      .send();

    // Verify the response
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('User not found');
  });

  it('should increment age until target age', async () => {
    const initialAge = 30;
    const targetAge = 40;
    const createUserResponse = await request(server)
      .post('/users')
      .send({
        firstName: 'Test',
        lastName: 'User',
        age: initialAge,
        money: 800,
        children: [],
        petName: 'Buddy',
        address: '789 Elm St',
        postCode: 'DEF456',
        status: Status.Regular,
      });

    const userId = createUserResponse.body.id;

    const incrementAgeResponse = await request(server)
      .post(`/users/${userId}/increment-age-until/${targetAge}`);

    expect(incrementAgeResponse.status).toBe(200);
    expect(incrementAgeResponse.body.message).toBe('Age incremented successfully');
    expect(incrementAgeResponse.body.yearsAdded).toBe(targetAge - initialAge);

    const getUserResponse = await request(server).get(`/users/${userId}`);
    expect(getUserResponse.status).toBe(200);
    expect(getUserResponse.body.age).toBe(targetAge);
  });

  it.each([
    { initialAge: 30, targetAge: 30 , errorMessage: 'Target age must be greater than the current age'},
    { initialAge: 30, targetAge: 25 , errorMessage: 'Target age must be greater than the current age'},
    { initialAge: 30, targetAge: 0 , errorMessage: 'Target age must be greater than 0'},
    { initialAge: 30, targetAge: -13 , errorMessage: 'Target age must be greater than 0'},
  ])('should return 400 for invalid target age (%p)', async ({ initialAge, targetAge, errorMessage }) => {
    const createUserResponse = await request(server)
      .post('/users')
      .send({
        firstName: 'Test',
        lastName: 'User',
        age: initialAge,
        money: 800,
        children: [],
        petName: 'Buddy',
        address: '789 Elm St',
        postCode: 'DEF456',
        status: Status.Regular,
      });

    const userId = createUserResponse.body.id;

    const incrementAgeResponse = await request(server)
      .post(`/users/${userId}/increment-age-until/${targetAge}`);

    expect(incrementAgeResponse.status).toBe(400);
    expect(incrementAgeResponse.body.error).toBe(errorMessage);

    const getUserResponse = await request(server).get(`/users/${userId}`);
    expect(getUserResponse.status).toBe(200);
    expect(getUserResponse.body.age).toBe(initialAge); 
  });

  it('should return 404 for non-existing user', async () => {
    const incrementAgeResponse = await request(server)
      .post(`/users/nonExistingUserId/increment-age-until/40`);

    expect(incrementAgeResponse.status).toBe(404);
    expect(incrementAgeResponse.body.error).toBe('User not found');
  });







});
