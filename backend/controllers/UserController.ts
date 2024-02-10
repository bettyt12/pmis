// controllers/UserController.ts
import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {


  static async registerUser(req: Request, res: Response): Promise<void> {
    const userData = req.body;
    try {
      const userId = await UserService.registerUser(userData);
      res.json({ userId ,message:"User registered Successfully"});
    } catch (error:any) {
      console.error('Error registering user:', error);
      if (error?.message === 'User already exists') {
        res.status(400).json({ message: 'User already exists' });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }}
  }

 static async loginUser(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
console.log(req.body);

    try {
      const token = await UserService.loginUser(username, password);

      if (token === null) {
        res.status(401).json({ message: 'Invalid credentials' });
      } else {
        res.json({ token , message: "User signed in Successfully"});
      }
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

 static async getUserDetails(req: Request, res: Response): Promise<void> {
    const { username } = req.params;

    try {
      const userDetails = await UserService.getUserDetails(username);

      if (userDetails === null) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json(userDetails);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

 static  async updateUserDetails(req: Request, res: Response): Promise<void> {
    const { username } = req.params;
    const updatedUserData = req.body;

    try {
      await UserService.updateUserDetails(username, updatedUserData);
      res.json({ message: 'User details updated successfully' });
    } catch (error) {
      console.error('Error updating user details:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default UserController;
