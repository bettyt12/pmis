// db.ts
import mysql, { Pool, RowDataPacket } from 'mysql2/promise';
import fs from 'fs';


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'clinic_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


const createDatabaseSQL = fs.readFileSync('./schema.sql', 'utf8');
// const createTableSQL = fs.readFileSync('./create_table.sql', 'utf8');
// console.log(createTableSQL);

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS patient (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cardNumber INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    sex VARCHAR(5) NOT NULL,
    age INT NOT NULL,
    address VARCHAR(50) NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    date DATE NOT NULL
  )
`;

const createUsersTableSQL = `
  CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    email VARCHAR(255)
  )
`;
// Execute the SQL commands sequentially
pool.query(createDatabaseSQL)
  .then(() => {
    console.log("Database created or already exists");
    return pool.query(createTableQuery);
  })
  .then(() => {
    console.log("Patient table created or already exists");
    return pool.query(createUsersTableSQL);
  })
  .then(() => {
    console.log("Users table created or already exists");
  })
  .catch((err) => {
    console.error("Error executing SQL queries:", err);
});

export default pool;
export { RowDataPacket }; // Export RowDataPacket for external usage
