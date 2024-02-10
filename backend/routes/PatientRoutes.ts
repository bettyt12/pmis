// routes/patientRoutes.ts
import express from 'express';
import PatientController from '../controllers/PatientController';

const router = express.Router();

// Define routes
router.get('/getAllPatients', PatientController.getAllPatients);
router.get('/patients/:cardNumber', PatientController.getPatientByCardNumber);
router.post('/createPatient', PatientController.createPatient);
router.put('/updatePatient/:cardNumber', PatientController.updatePatient);
router.delete('/deletePatient/:cardNumber', PatientController.deletePatient);


export default router;
