// // models/User.ts
// import { OkPacket, Pool, RowDataPacket } from 'mysql2/promise';
// import bcrypt from 'bcrypt';
// import pool from '../db/db';

// interface UserData {
//   id?: number;
//   userName: string;
//   password: string;
//   name?: string;
//   email?: string;
// }

// class User {


//  static async createUser(userData: UserData): Promise<number> {
//     const hashedPassword = await bcrypt.hash(userData.password, 10);
//       console.log(userData);
      
//     const [result] = await pool.execute<OkPacket>(
//       'INSERT INTO users (username, password, name, email) VALUES ( ?, ?, ?, ?)',
//       [
//         userData.userName,
//         hashedPassword,
//         userData.name,
//         userData.email || null,
//       ]
//     );

//     return result.insertId;
//   }
  


//   static async getUserByUsername(username: string): Promise<UserData | null> {
//     const [rows] = await pool.execute<RowDataPacket[]>(
//       'SELECT * FROM users WHERE username = ?',
//       [username]
//     );

//     if (rows.length === 0) {
//       return null; // No user found
//     }

//     const user: UserData = {
//       id: rows[0].id,
//       userName: rows[0].userName,
//       password: rows[0].password,
//       name: rows[0].name,
//       email: rows[0].email,
//     };

//     return user;
//   }
//  static  async updateUserByUsername(userName: string, updatedUserData: Partial<UserData>): Promise<void> {
//     const { name,  email } = updatedUserData;

//     const updateFields = [];
//     const updateValues = [];

//     if (name) {
//       updateFields.push('name = ?');
//       updateValues.push(name);
//     }

//     if (email) {
//       updateFields.push('email = ?');
//       updateValues.push(email);
//     }

//     if (userName) {
//       updateFields.push('userNane = ?');
//       updateValues.push(email);
//     }
//     if (updateFields.length === 0) {
//       // Nothing to update
//       return;
//     }

//     const updateQuery = `
//       UPDATE users
//       SET ${updateFields.join(', ')}
//       WHERE username = ?;
//     `;

//     const updateParams = [...updateValues, userName];

//     await pool.execute(updateQuery, updateParams);
//   }


// }

// export default User;
import bcrypt from 'bcrypt';
import database,  { RowDataPacket } from '../db/db';
import { OkPacket } from 'mysql2';

interface UserData {
  id?: number;
  username: string;
  password: string;
  name?: string;
  email?: string;
}

class User {
  static async createUser(userData: UserData): Promise<number> {
    // Check if user already exists
    const existingUser = await database.query<RowDataPacket[]>('SELECT * FROM user WHERE username = ?', [userData.username]);
    if (existingUser.length > 0) {
      const error = new Error('User already exists');
      (error as any).message = 'User already exists'; // Set message property
      throw error;
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Insert new user
    const query = 'INSERT INTO user (username, password, name, email) VALUES (?, ?, ?, ?)';
    const [result] = await database.query<OkPacket>(query, [
      userData.username,
      hashedPassword,
      userData.name || null,
      userData.email || null,
    ]);
    
    return result.insertId;
}

  static async getUserByUsername(username: string): Promise<UserData | null> {
   
    const query = 'SELECT * FROM user WHERE username = ?';
    const [rows] = await database.query<RowDataPacket[]>(query, [username]);
    if (rows.length === 0) {
      return null; // No user found
    }
    const user: UserData = {
      id: rows[0].id,
      username: rows[0].username,
      password: rows[0].password,
      name: rows[0].name,
      email: rows[0].email,
    };

    
    return user;
  }

  static async updateUserByUsername(username: string, updatedUserData: Partial<UserData>): Promise<void> {
    const { name, email } = updatedUserData;
    const updateFields = [];
    const updateValues = [];
    if (name) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }
    if (email) {
      updateFields.push('email = ?');
      updateValues.push(email);
    }
    if (username) {
      updateFields.push('username = ?');
      updateValues.push(username);
    }
    if (updateFields.length === 0) {
      // Nothing to update
      return;
    }
    const updateQuery = `
      UPDATE users
      SET ${updateFields.join(', ')}
      WHERE username = ?;
    `;
    const updateParams = [...updateValues, username];
    await database.query(updateQuery, updateParams);
  }

  static async authenticateUser(username: string, password: string): Promise<UserData | null> {
    const query = 'SELECT * FROM user WHERE username = ?';
    const [rows] = await database.query<RowDataPacket[]>(query, [username]);
    if (rows.length === 0) {
      // User not found
      return null;
    }

    const userData: UserData = {
      id: rows[0].id,
      username: rows[0].username,
      password: rows[0].password,
      name: rows[0].name,
      email: rows[0].email,
    };

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, userData.password);
    if (!passwordMatch) {
      // Passwords don't match
      return null;
    }

    // Passwords match, return the user data
    return userData;
  }
}

export default User;