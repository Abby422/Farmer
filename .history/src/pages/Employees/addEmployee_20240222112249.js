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
  createTheme,
} from "@mui/material";

function AddEmployee() {
  const defaultTheme = createTheme();
  const { key } = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const raw = {
      ...formData,
      'user_token': key
    }


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(raw),
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/api/employees/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        
      })
      .catch((error) => console.error(error));
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
                  name="phone_number"
                  required
                  fullWidth
                  label="Phone Number"
                  value={formData.phone_number}
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
