const signInEndPoint = "/api/user/login";
const signOutEndPoint = "/api/user/SignOut";
const signUpEndPoint = "/api/user/register";
const createPatientEndpoint = "/api/patient/createPatient";
const editPatientEndpoint = "/api/patient/editPatient";
const deletePatientEndpoint = "/api/patient/deletePatient";
const getAllPatientsEndpoint="/api/patient/getAllPatients";
const getPatientByCardNumberEndpoint='/api/patients/:cardNumber';

export{
    signInEndPoint,
    signOutEndPoint,
    signUpEndPoint,
    createPatientEndpoint,
    editPatientEndpoint,
    deletePatientEndpoint,
    getAllPatientsEndpoint,
    getPatientByCardNumberEndpoint
}