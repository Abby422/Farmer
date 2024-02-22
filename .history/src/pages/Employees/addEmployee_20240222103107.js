import React, { useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  createTheme
} from "@mui/material";


function AddEmployee() {

  const theme = createTheme()
  const { key } = localStorage.getItem('user');
  console.log(key);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    position: "",
    salary: "",
    performance: "",
    user_token: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/employees/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Data successfully submitted
        console.log("Employee added successfully");
      } else {
        // Handle error response
        console.error("Error adding employee");
      }
    } catch (error) {
      console.error("Error adding employee", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
          >
            <Typography component="h1" variant="h5">
              Add Employee
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  label="Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="phoneNumber"
                  required
                  fullWidth
                  label="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="position"
                  required
                  fullWidth
                  label="Position"
                  value={formData.position}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="salary"
                  required
                  fullWidth
                  label="Salary"
                  type="number"
                  value={formData.salary}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="performance"
                  required
                  fullWidth
                  label="Performance"
                  multiline
                  rows={4}
                  value={formData.performance}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#296c00", color: "white" }}
            >
              Add Employee
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default AddEmployee;
