// db.ts
import mysql, { Pool, RowDataPacket } from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'clinic_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
export { RowDataPacket }; // Export RowDataPacket for external usage
