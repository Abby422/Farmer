import React, { useState } from "react";
import {
  TextField,
  Button,
  createTheme,
  Container,
  CssBaseline,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const defaultTheme = createTheme();

function Inventory() {
  const [formValues, setFormValues] = useState({
    plateNumber: "",
    equipmentName: "",
    purchasePrice: "",
    purchaseDate: "",
    operation: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://your-django-api-url/add-machine/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        // Handle success, e.g., show a success message or redirect
        console.log("Machine added successfully!");
      } else {
        // Handle failure, e.g., show an error message
        console.error("Failed to add machine");
      }
    } catch (error) {
      console.error("Error during machine addition:", error);
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
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 5 }}
          >
            <Typography component="h1" variant="h5">
              Add Machine
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="plateNumber"
                  label="Plate Number"
                  name="plateNumber"
                  value={formValues.plateNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="equipmentName"
                  label="Equipment Name"
                  name="equipmentName"
                  value={formValues.equipmentName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="purchasePrice"
                  label="Purchase Price"
                  name="purchasePrice"
                  type="number"
                  value={formValues.purchasePrice}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="purchaseDate"
                  label="Purchase Date"
                  name="purchaseDate"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formValues.purchaseDate}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="operation"
                  label="Operation"
                  name="operation"
                  value={formValues.operation}
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
              Add
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Inventory;
