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

const defaultTheme = createTheme();

function Financials() {
  const [formData, setFormData] = useState({
    incomeAmount: "",
    expenditureAmount: "",
    description: "",
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

    // Send the form data to your Django backend for income and expenditure
    try {
      const response = await fetch("YOUR_BACKEND_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Handle the response as needed
      if (response.ok) {
        // Data successfully submitted
        console.log("Income and expenditure added successfully");
      } else {
        // Handle error response
        console.error("Error adding income and expenditure");
      }
    } catch (error) {
      console.error("Error adding income and expenditure", error);
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
              Add Income and Expenditure
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="incomeAmount"
                  required
                  fullWidth
                  label="Income Amount"
                  type="number"
                  value={formData.incomeAmount}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="expenditureAmount"
                  required
                  fullWidth
                  label="Expenditure Amount"
                  type="number"
                  value={formData.expenditureAmount}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  required
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  value={formData.description}
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
              Add Income and Expenditure
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Financials;
