// server.ts
import fs from 'fs';
import path from 'path';
import express, { Application, Request, Response } from 'express';
import patientRoutes from './routes/PatientRoutes';
import mysql from 'mysql2';
import userRoutes from './routes/UserRoute';

const app: Application = express();
const port = 5000;
const cors = require('cors');
const cookieParser = require("cookie-parser");
// Create a MySQL connection pool
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'clinic_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Check the connection to the database
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');

    // Read and execute the SQL file
    const sqlFilePath = path.join(__dirname, 'schema.sql');
    const sqlFileContent = fs.readFileSync(sqlFilePath, 'utf-8');

    connection.query(sqlFileContent, (executeError) => {
      if (executeError) {
        console.error('Error executing SQL file:', executeError);
      } else {
        console.log('SQL file executed successfully');
      }

      // Release the connection
      connection.release();
    });
  }
});

app.use(cors());
app.use(cookieParser());
// Use the database connection in your routes
// app.use((req, res, next) => {
//   req.body = db;
//   next();
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define your routes
app.use('/api/patient', patientRoutes);
app.use('/api/user', userRoutes);

// Default route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Clinic Management System API');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
