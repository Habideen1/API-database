import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddStudentPage = () => {
  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    occupation: '',
    email: '',
    age: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({
      ...newStudent,
      [name]: value,
    });
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      });

      if (!response.ok) {
        throw new Error('Failed to add student');
      }

      await response.json();
      alert('Student added successfully!');
      navigate('/'); // Navigate back to the Home Page
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Error adding student. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Add New Student
      </Typography>
      <Box
        component="form"
        onSubmit={handleAddStudent}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          backgroundColor: '#f9f9f9',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <TextField
          label="First Name"
          name="firstName"
          value={newStudent.firstName}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={newStudent.lastName}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Occupation"
          name="occupation"
          value={newStudent.occupation}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={newStudent.email}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Age"
          name="age"
          type="number"
          value={newStudent.age}
          onChange={handleChange}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Student
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate('/')} // Navigate back to the Home Page
          fullWidth
        >
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default AddStudentPage;
