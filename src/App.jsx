import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Container, Button } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AddStudentPage from './pages/AddStudentPage'; 
import DeleteStudentForm from './DeleteStudentForm';

const HomePage = ({ students, columns, handleRowEdit, handleOpenDeleteDialog }) => {
  const navigate = useNavigate(); // Correctly use the hook at the top level

  return (
    <Container sx={{ marginTop: '20px' }}>
      <h3>Student Management System</h3>

      {/* Add Student Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/add-student')} 
        sx={{ marginBottom: '20px' }}
      >
        Add Student
      </Button>

      {/* Box Component for Data Grid */}
      <Box
        sx={{
          height: 400,
          width: '100%',
          backgroundColor: '#f5f5f5',
          '@media (max-width: 600px)': { backgroundColor: '#e0e0e0' },
          padding: '20px',
        }}
      >
        {/* Data Grid Component */}
        <DataGrid
          rows={students}
          columns={columns}
          pageSize={10}
          onProcessRowUpdate={handleRowEdit}
          sx={{
            backgroundColor: '#f5f5f5',
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#1976d2',
              color: 'white',
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-cell': {
              fontSize: 14,
              color: '#333',
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: '#1976d2',
            },
          }}
        />
      </Box>
    </Container>
  );
};

const App = () => {
  const [students, setStudents] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    fetch('http://localhost:3001/students') // Use correct API URL for local JSON server
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleRowEdit = async (newRow) => {
    try {
      const response = await fetch(`http://localhost:3001/students/${newRow.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRow),
      });

      if (!response.ok) throw new Error('Failed to update student');

      const updatedRow = await response.json();

      setStudents((prevStudents) =>
        prevStudents.map((student) => (student.id === updatedRow.id ? updatedRow : student))
      );

      return updatedRow; // Must return the updated row
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  };

  const handleOpenDeleteDialog = (id) => {
    setStudentToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setStudentToDelete(null);
  };

  const handleDeleteStudent = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/students/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete student');

      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'First Name', width: 150, editable: true },
    { field: 'lastName', headerName: 'Last Name', width: 150, editable: true },
    { field: 'occupation', headerName: 'Occupation', width: 150, editable: true },
    { field: 'email', headerName: 'Email', width: 200, editable: true },
    { field: 'age', headerName: 'Age', width: 110, editable: true },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleOpenDeleteDialog(params.row.id)} // Open delete dialog with student ID
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <HomePage
              students={students}
              columns={columns}
              handleRowEdit={handleRowEdit}
              handleOpenDeleteDialog={handleOpenDeleteDialog}
            />
          }
        />

        {/* Add Student Page */}
        <Route path="/add-student" element={<AddStudentPage />} />
      </Routes>

      {/* Delete Student Dialog */}
      <DeleteStudentForm
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        studentId={studentToDelete}
        onDelete={handleDeleteStudent}
      />
    </Router>
  );
};

export default App;
