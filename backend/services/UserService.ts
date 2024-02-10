// services/UserService.ts
import { Pool } from 'mysql2/promise';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService {


 static async registerUser(userData: any): Promise<number> {
    // Perform any additional logic if needed 
    
    return await User.createUser(userData);
  }

 static async loginUser(username: string, password: string): Promise<string | null> {
    const user = await User.getUserByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null;
    }

    // Generate and return JWT token
    return jwt.sign(
      { id: user.id, username: user.username },
      'your-secret-key',
      { expiresIn: '1h' }
    );
  }

 static async getUserDetails(username: string): Promise<any | null> {
    return await User.getUserByUsername(username);
  }

 static async updateUserDetails(username: string, updatedUserData: any): Promise<void> {
    // Perform any additional logic if needed
    await User.updateUserByUsername(username, updatedUserData);
  }
}

export default UserService;
