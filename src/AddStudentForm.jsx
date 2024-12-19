import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const AddStudentForm = ({ onAddStudent }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    occupation: '',
    email: '',
    age: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add student');
      }

      const newStudent = await response.json();
      onAddStudent(newStudent); // Call the callback to update the parent state
      alert('Student added successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        occupation: '',
        email: '',
        age: '',
      }); // Clear form after submission
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Error adding student. Please try again.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: 2,
        backgroundColor: '#f9f9f9',
        borderRadius: 1,
        boxShadow: 1,
      }}
    >
      <Typography variant="h5" textAlign="center">
        Add Student
      </Typography>
      <TextField
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Occupation"
        name="occupation"
        value={formData.occupation}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Age"
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        required
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Add Student
      </Button>
    </Box>
  );
};

export default AddStudentForm;
