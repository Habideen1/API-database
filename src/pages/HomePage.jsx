const HomePage = ({ students, columns, handleRowEdit, handleOpenDeleteDialog }) => {
    const navigate = useNavigate(); // Move this hook to the top of the component
  
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
  