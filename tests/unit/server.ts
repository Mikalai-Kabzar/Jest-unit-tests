// src/server.ts
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Status, User } from './User';
import { error } from 'console';

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

// OPTIONS method to describe communication options for /users endpoint
server.options('/users', (req: Request, res: Response) => {
  res.status(200).header('Allow', 'GET, POST, OPTIONS').end();
});

server.options('/users/:id', (req: Request, res: Response) => {
  res.status(200).header('Allow', 'GET, PUT, DELETE, HEAD, OPTIONS').end();
});

// Add a child to a specific user by id
server.post('/users/:id/children', (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === userId);

  if (user) {
    const {
      firstName,
      lastName,
      age,
      money,
      petName,
      address,
      postCode,
      status,
    } = req.body;

    const newChild = new User(
      nextUserId.toString(), // Assign a unique id
      firstName,
      lastName,
      age,
      money,
      [], // Children of a child are not supported in this example
      petName,
      address,
      postCode,
      status
    );

    nextUserId++;

    user.children.push(newChild);
    users.push(newChild); // Add the child to the users array
    res.status(201).json(newChild);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Update user properties by id
server.patch('/users/:id', (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === userId);

  if (user) {
    const updatedData = req.body;

    Object.assign(user, updatedData);
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Get all children of a specific user by id
server.get('/users/:userId/children', (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json(user.children);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Get a specific child by id for a specific user by id
server.get('/users/:userId/children/:childId', (req: Request, res: Response) => {
  const userId = req.params.userId;
  const childId = req.params.childId;

  const user = users.find((u) => u.id === userId);

  if (user) {
    const child = user.children.find((c) => c.id === childId);

    if (child) {
      res.json(child);
    } else {
      res.status(404).json({ error: 'Child not found' });
    }
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Update a specific child by id for a specific user by id
server.put('/users/:userId/children/:childId', (req: Request, res: Response) => {
  const userId = req.params.userId;
  const childId = req.params.childId;

  const user = users.find((u) => u.id === userId);

  if (user) {
    const childIndex = user.children.findIndex((c) => c.id === childId);

    if (childIndex !== -1) {
      const updatedChild = Object.assign(user.children[childIndex], req.body);
      res.status(200).json(updatedChild);
    } else {
      res.status(404).json({ error: 'Child not found' });
    }
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Delete a specific child by id for a specific user by id
server.delete('/users/:userId/children/:childId', (req: Request, res: Response) => {
  const userId = req.params.userId;
  const childId = req.params.childId;

  const user = users.find((u) => u.id === userId);

  if (user) {
    const childIndex = user.children.findIndex((c) => c.id === childId);

    if (childIndex !== -1) {
      const deletedChild = user.children.splice(childIndex, 1);
      res.json(deletedChild[0]);
    } else {
      res.status(404).json({ error: 'Child not found' });
    }
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Recursively remove a user and their children from the users array
function recursivelyRemoveUser(userId: string) {
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex !== -1) {
    // Remove the user
    const deletedUsers = users.splice(userIndex, 1);

    // Remove the deleted user's children recursively
    const deletedUser = deletedUsers[0];
    deletedUser.children.forEach((child) => {
      recursivelyRemoveUser(child.id);
    });
  }
}

// Delete a specific user by id (now with recursive deletion)
server.delete('/users/:id', (req: Request, res: Response) => {
  const userId = req.params.id;
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex !== -1) {
    // Call the recursive deletion function
    recursivelyRemoveUser(userId);

    // Respond with a success message
    res.json({ message: 'User and their descendants deleted successfully' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Get the proposed status for a specific user by id
server.get('/users/:id/proposed-status', (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === userId);

  if (user) {
    const proposedStatus = user.proposeNewStatus();
    res.json({ proposedStatus });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Get the years to retirement for a specific user by id
server.get('/users/:id/years-to-retirement', (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === userId);

  if (user) {
    const yearsToRetirement = user.calculateYearsToRetired();
    res.json({ yearsToRetirement });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Get the user category for a specific user by id
server.get('/users/:id/category', (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === userId);

  if (user) {
    const userCategory = user.calculateUserCategory();
    res.json({ userCategory });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});


// server.post('/users/:id/increment-age-until/:targetAge', (req: Request, res: Response) => {
//   const userId = req.params.id;
//   const targetAge = parseInt(req.params.targetAge);

//   const user = users.find((u) => u.id === userId);

//   if (user) {
//     try {
//       const yearsAdded = user.incrementAgeUntil(targetAge);
//       res.json({ message: 'Age incremented successfully', yearsAdded:  yearsAdded});
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   } else {
//     res.status(404).json({ error: 'User not found' });
//   }
// });

server.post('/users/:id/increment-age-until/:targetAge', (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === userId);

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

   const targetAge = parseInt(req.params.targetAge, 10);

  // if (isNaN(targetAge) || targetAge <= 0 || targetAge < user.age) {
  //   res.status(400).json({ error: 'Invalid target age' });
  //   return;
  // }

  //let yearsAdded = 0;
  try {
    let yearsAdded = user.incrementAgeUntil(targetAge);
    //yearsAdded = user.age - userInitialAge; // Assuming you have an initial age stored somewhere
    res.json({ message: 'Age incremented successfully', yearsAdded });
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({ error: e.message});
    } 
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
