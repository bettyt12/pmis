import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { error, success } from '../constants';
import { ToastContext } from '../components/Toast/ToastProvider';
import { createContent } from '../adapters/create';
import { createPatientEndpoint, signUpEndPoint } from '../adapters/endpoint';
import { useNavigate } from 'react-router-dom';

interface PatientFormData {
  cardNumber: number;
  name: string;
  sex: string;
  age: number;
  address: string;
  phoneNumber: string;
  date: string; // Assuming a string format for simplicity
  // doctor: string;
}

const PatientForm: React.FC = () => {
  const [formData, setFormData] = useState<PatientFormData>({
    cardNumber: 0,
    name: '',
    sex: '',
    age: 0,
    address: '',
    phoneNumber: '',
    date: '',
    // doctor: '',
  });
  const navigate=useNavigate()
  const { handleCreateToast } = useContext(ToastContext);
  const onSuccess = (data: any, response: any) =>{
    handleCreateToast(response.message, success);
    setFormData({
      cardNumber: 0,
    name: '',
    sex: '',
    age: 0,
    address: '',
    phoneNumber: '',
    date: '',
    // doctor: '',
    })
    navigate('../patient')
  }

  const onFail = (message: string) => handleCreateToast(message, error);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    return formData
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createContent(createPatientEndpoint, formData, onSuccess, onFail);
    // Here you can handle submitting the form data, for example, sending it to a backend API
    console.log('Form Data:', formData);
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
    <Typography variant="h5" align="center" gutterBottom>
      Create Patient
    </Typography>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Card Number"
            type="number"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Age"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Sex</InputLabel>
              <Select
                name="sex"
                value={formData.sex}
                onChange={(e)=> setFormData((prevFormData) => ({
                  ...prevFormData,
                  "sex": e.target.value,
                }))}
                // margin="normal"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
          <TextField
            fullWidth
            label="Address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Phone Number"
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        {/* <Grid item xs={6}>
          <TextField
            fullWidth
            label="Doctor"
            type="text"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            margin="normal"
          />
        </Grid> */}
      </Grid>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </form>
  </div>
  );
};

export default PatientForm;
