// models/Patient.ts
import { OkPacket } from 'mysql2';
import database, { RowDataPacket } from '../db/db';

interface PatientData {
  cardNumber: number;
  firstName: string;
  lastName: string;
  middleName: string;
  sex: string;
  age: number;
  woreda: string;
  keble: number;
  phoneNumber: string;
  date: Date;
  spot: string;
  cardType: string;
  admitted: boolean;
  physician: number;
}

class Patient {
  static async getAllPatients(): Promise<PatientData[]> {
    const query = 'SELECT * FROM patient';
    const [rows] = await database.query(query) as RowDataPacket[];
    return rows.map((row: RowDataPacket) => ({
      cardNumber: row.cardNumber,
      firstName: row.firstName,
      lastName: row.lastName,
      middleName: row.middleName,
      sex: row.sex,
      age: row.age,
      woreda: row.woreda,
      keble: row.keble,
      phoneNumber: row.phoneNumber,
      date: row.date,
      spot: row.spot,
      cardType: row.cardType,
      admitted: row.admitted,
      physician: row.physician,
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
      firstName: row.firstName,
      lastName: row.lastName,
      middleName: row.middleName,
      sex: row.sex,
      age: row.age,
      woreda: row.woreda,
      keble: row.keble,
      phoneNumber: row.phoneNumber,
      date: row.date,
      spot: row.spot,
      cardType: row.cardType,
      admitted: row.admitted,
      physician: row.physician,
    };
  }
  // Add more methods for CRUD operations if needed
}

export default Patient;
