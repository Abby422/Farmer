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

function LivestockInventory() {
  const [formValues, setFormValues] = useState({
    tagNumber: "",
    animalType: "",
    age: "",
    breed: "",
    weight: "",
    purchaseDate: "",
    purchasePrice: "",
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

    // Check if required fields are filled in
    const requiredFields = [
      "tagNumber",
      "animalType",
      "age",
      "breed",
      "weight",
      "purchaseDate",
      "purchasePrice",
    ];
    const missingFields = requiredFields.filter((field) => !formValues[field]);

    if (missingFields.length > 0) {
      console.error(`Missing required fields: ${missingFields.join(", ")}`);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/livestocks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        console.log("Livestock added successfully!");
      } else {
        console.error("Failed to add livestock");
      }
    } catch (error) {
      console.error("Error during livestock addition:", error);
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
            sx={{ mt: 1 }}
          >
            <Typography component="h1" variant="h5">
              Add Livestock
            </Typography>
            {error && (
              <Typography color="error" variant="subtitle2">
                {error}
              </Typography>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="tagNumber"
                  label="Tag Number"
                  name="tagNumber"
                  value={formValues.tagNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="animalType"
                  label="Animal Type"
                  name="animalType"
                  value={formValues.animalType}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  name="age"
                  type="number"
                  value={formValues.age}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="breed"
                  label="Breed"
                  name="breed"
                  value={formValues.breed}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="weight"
                  label="Weight"
                  name="weight"
                  type="number"
                  value={formValues.weight}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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

export default LivestockInventory;
