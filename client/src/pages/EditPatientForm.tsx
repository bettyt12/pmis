import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { error, success } from '../constants';
import { ToastContext } from '../components/Toast/ToastProvider';
import { createContent } from '../adapters/create';
import { createPatientEndpoint, editPatientEndpoint, getPatientByCardNumberEndpoint, signUpEndPoint } from '../adapters/endpoint';
import { useLocation, useNavigate } from 'react-router-dom';
import { getContent } from '../adapters/get';
import { updateContent } from '../adapters/update';

interface EditPatientFormData {
  cardNumber: number;
  name: string;
  sex: string;
  age: number;
  address: string;
  phoneNumber: string;
  date: string; // Assuming a string format for simplicity
  // doctor: string;
}

const EditPatientForm: React.FC = () => {
  const [formData, setFormData] = useState<EditPatientFormData>({
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
  const { state } = useLocation();
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
    const endpoint=`${editPatientEndpoint}/${formData.cardNumber}`
    updateContent(endpoint, formData, onSuccess, onFail);
  };

  useEffect(() => {
    if(state){
        setFormData(state)
    //    const endpoint=`${getPatientByCardNumberEndpoint}/${state.cardNumber}`
    //     getContent(endpoint,onGetSuccess, onGetFail)
    }
  }, [state])
  
  return (
    <div style={{ maxWidth: '600px', margin: 'auto' ,padding: '6'}}>
    <Typography variant="h5"  gutterBottom p={6}>
       Patient
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
      <Button type="submit" variant="contained" color="primary" >
        Submit
      </Button>
    </form>
  </div>
  );
};

export default EditPatientForm;
