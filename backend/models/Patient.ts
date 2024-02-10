// models/Patient.ts
import { OkPacket } from 'mysql2';
import database, { RowDataPacket } from '../db/db';

interface PatientData {
  cardNumber: number;
  name: string;
  sex: string;
  age: number;
  address: string;
  phoneNumber: string;
  date: Date;
}

class Patient {
  static async getAllPatients(): Promise<PatientData[]> {
    const query = 'SELECT * FROM patient';
    const [rows] = await database.query(query) as RowDataPacket[];
    return rows.map((row: RowDataPacket) => ({
			cardNumber: row.cardNumber,
      name: row.name,
      sex: row.sex,
      age: row.age,
      address: row.address,
      phoneNumber: row.phoneNumber,
      date: row.date,
    }));
  }
  static async getAllPatients1(): Promise<PatientData[]> {
    const query = 'SELECT * FROM patient';
    const [rows] = await database.query(query) as RowDataPacket[];
    return rows.map((row: RowDataPacket) => this.rowToPatient(row));
  }

  static async getPatientByCardNumber(cardNumber: number): Promise<PatientData | null> {
    const query = 'SELECT * FROM patient WHERE cardNumber = ?';
    const [rows] = await database.query(query, [cardNumber]) as RowDataPacket[];
    if (Array.isArray(rows) && rows.length === 0) return null;
    return this.rowToPatient(rows[0]);
  }

  static async createPatient(data: Partial<PatientData>): Promise<number> {
    const query = 'INSERT INTO patient SET ?';
    const result = (await database.query(query, [data]))[0] as OkPacket;
    return result.insertId;
  }

  static async updatePatient(cardNumber: number, data: Partial<PatientData>): Promise<void> {
    const query = 'UPDATE patient SET ? WHERE cardNumber = ?';
    await database.query(query, [data, cardNumber]);
  }

  static async deletePatient(cardNumber: number): Promise<void> {
    const query = 'DELETE FROM patient WHERE cardNumber = ?';
    await database.query(query, [cardNumber]);
  }

  private static rowToPatient(row: RowDataPacket): PatientData {
    return {
      cardNumber: row.cardNumber,
      name: row.name,
      sex: row.sex,
      age: row.age,
      address: row.adress,
      phoneNumber: row.phoneNumber,
      date: row.date,
    };
  }
  // Add more methods for CRUD operations if needed
}

export default Patient;
