import { Request, Response } from 'express';
import UserModel from '../models/UserModel';

class UserController {
  public static getAllUsers(req: Request, res: Response): void {
    try {
      const users = UserModel.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public static getUserById(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const user = UserModel.getUserById(Number(id));

      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public static createUser(req: Request, res: Response): void {
    try {
      const { name, email } = req.body;

      const newUser = UserModel.createUser(name, email);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public static updateUser(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      const updatedUser = UserModel.updateUser(Number(id), name, email);

      if (!updatedUser) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json(updatedUser);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public static deleteUser(req: Request, res: Response): void {
    try {
      const { id } = req.params;

      const deletedUser = UserModel.deleteUser(Number(id));

      if (!deletedUser) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json(deletedUser);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default UserController;
