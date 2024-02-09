// services/PatientService.ts
import Patient from '../models/Patient';

class PatientService {
  static async getAllPatients(): Promise<any[]> {
    try {
      return await Patient.getAllPatients();
    } catch (error) {
      throw new Error(`Error getting patients: `);
    }
  }
  
    static async getPatientByCardNumber(cardNumber: number): Promise<any> {
      try {
        return await Patient.getPatientByCardNumber(cardNumber);
      } catch (error) {
        throw new Error(`Error getting patient by card number ${cardNumber}: ${error}`);
      }
    }
  
    static async createPatient(data: Partial<any>): Promise<number> {
      try {
        return await Patient.createPatient(data);
      } catch (error) {
        throw new Error(`Error creating patient: ${error}`);
      }
    }
  
    static async updatePatient(cardNumber: number, data: Partial<any>): Promise<void> {
      try {
        await Patient.updatePatient(cardNumber, data);
      } catch (error) {
        throw new Error(`Error updating patient with card number ${cardNumber}: ${error}`);
      }
    }
  
    static async deletePatient(cardNumber: number): Promise<void> {
      try {
        await Patient.deletePatient(cardNumber);
      } catch (error) {
        throw new Error(`Error deleting patient with card number ${cardNumber}: ${error}`);
      }
    }
  // Add more service methods for business logic
}

export default PatientService;
