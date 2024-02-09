// routes/patientRoutes.ts
import express from 'express';
import PatientController from '../controllers/PatientController';

const router = express.Router();

// Define routes
router.get('/patients', PatientController.getAllPatients);
router.get('/patients/:cardNumber', PatientController.getPatientByCardNumber);
router.post('/patients', PatientController.createPatient);
router.put('/patients/:cardNumber', PatientController.updatePatient);
router.delete('/patients/:cardNumber', PatientController.deletePatient);


export default router;
