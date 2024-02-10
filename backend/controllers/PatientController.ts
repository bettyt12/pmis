// controllers/PatientController.ts
import { Request, Response } from 'express';
import PatientService from '../services/PatientService';

class PatientController {
  static async getAllPatients(req: Request, res: Response): Promise<void> {
    try {
      const patients = await PatientService.getAllPatients();
      res.status(200).json(patients);
    } catch (error) {
      console.error(`Error in getAllPatients: `);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getPatientByCardNumber(req: Request, res: Response): Promise<void> {
    try {
      const cardNumber = parseInt(req.params.cardNumber);
      const patient = await PatientService.getPatientByCardNumber(cardNumber);
      if (!patient) {
        res.status(404).json({ error: 'Patient not found' });
      } else {
        res.status(200).json(patient);
      }
    } catch (error) {
      console.error(`Error in getPatientByCardNumber: ${error}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async createPatient(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body; // Assuming request body contains patient data
      const cardNumber = await PatientService.createPatient(data);
      res.status(200).json({cardNumber, meesage: "Patient Created Successfully" });
    } catch (error) {
      console.error(`Error in createPatient: ${error}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async updatePatient(req: Request, res: Response): Promise<void> {
    try {
      const cardNumber = parseInt(req.params.cardNumber);
      const data = req.body; // Assuming request body contains updated patient data
      await PatientService.updatePatient(cardNumber, data);
      res.status(200).json({ message: 'Patient updated successfully' });
    } catch (error) {
      console.error(`Error in updatePatient: ${error}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async deletePatient(req: Request, res: Response): Promise<void> {
    console.log(req.params);
    
    try {
      const cardNumber = parseInt(req.params.cardNumber);
      await PatientService.deletePatient(cardNumber);
      res.status(200).json({ message: 'Patient updated successfully' });
    } catch (error) {
      console.error(`Error in deletePatient: ${error}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Add more controller methods for handling requests
}

export default PatientController;
