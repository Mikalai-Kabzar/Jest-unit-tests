// src/server.ts
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Status, User } from './User';

const server = express();
const port = 3000;

server.use(bodyParser.json());

const users: User[] = [];
let nextUserId = 1;

// Create a new user
server.post('/users', (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    age,
    money,
    children,
    petName,
    address,
    postCode,
    status,
  } = req.body;

  const newUser = new User(
    nextUserId.toString(), // Assign a unique id
    firstName,
    lastName,
    age,
    money,
    children,
    petName,
    address,
    postCode,
    status
  );

  nextUserId++;

  users.push(newUser);
  res.status(201).json(newUser);
});

// Get all users
server.get('/users', (req: Request, res: Response) => {
  res.json(users);
});

// Get a specific user by id
server.get('/users/:id', (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Update a specific user by id
server.put('/users/:id', (req: Request, res: Response) => {
  const userId = req.params.id;
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex !== -1) {
    const updatedUser = Object.assign(users[userIndex], req.body);
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Delete a specific user by id
server.delete('/users/:id', (req: Request, res: Response) => {
  const userId = req.params.id;
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser[0]);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

let serverInstance: any = null;

const startServer = async (): Promise<void> => {
  if (!serverInstance) {
    const listener = server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    serverInstance = { server, listener };
  }
};

const closeServer = async (): Promise<void> => {
  if (serverInstance) {
    await new Promise<void>((resolve) => {
      serverInstance.listener.close(() => {
        console.log('Server closed');
        resolve();
      });
    });
  }
};

export { server, startServer, closeServer };
