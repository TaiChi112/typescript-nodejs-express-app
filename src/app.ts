import express from 'express';
import bodyParser from 'body-parser';
import UserController from './controllers/UserController';

const app = express();
const port = 8080;

app.use(bodyParser.json());

app.get('/users', UserController.getAllUsers);
app.get('/users/:id', UserController.getUserById);
app.post('/users', UserController.createUser);
app.put('/users/:id', UserController.updateUser);
app.delete('/users/:id', UserController.deleteUser);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
