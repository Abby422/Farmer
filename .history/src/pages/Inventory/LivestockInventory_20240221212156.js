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
    moreDetails: "",
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
      const response = await fetch(
        "http://your-django-api-url/add-livestock/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        }
      );

      if (response.ok) {
        // Handle success, e.g., show a success message or redirect
        console.log("Livestock added successfully!");
      } else {
        // Handle failure, e.g., show an error message
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="breed"
                  label="Breed"
                  name="breed"
                  value={formValues.breed}
                  onChange={handleChange}
                />
                <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="moreDetails"
                  label="More Details"
                  name="moreDetails"
                  multiline
                  rows={4}
                  value={formValues.moreDetails}
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
