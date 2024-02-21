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

function CropMonitoring() {
  const [formData, setFormData] = useState({
    fieldName: "",
    fieldDescription: "",
    cropName: "",
    variety: "",
    plantingDate: "",
    harvestingDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form data:", formData);
    // Reset form fields
    setFormData({
      fieldName: "",
      fieldDescription: "",
      cropName: "",
      variety: "",
      plantingDate: "",
      harvestingDate: "",
    });
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
              Add crop
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="fieldName"
                  required
                  fullWidth
                  label="Field Name"
                  value={formData.fieldName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="fieldDescription"
                  required
                  fullWidth
                  label="Field Description"
                  value={formData.fieldDescription}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="cropName"
                  required
                  fullWidth
                  label="Crop Name"
                  value={formData.cropName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="variety"
                  required
                  fullWidth
                  label="Variety"
                  value={formData.variety}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="plantingDate"
                  required
                  fullWidth
                  label="Planting Date"
                  type="date"
                  value={formData.plantingDate}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="harvestingDate"
                  required
                  fullWidth
                  label="Harvesting Date"
                  type="date"
                  value={formData.harvestingDate}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#296c00", color: "white" }}
            >
              Add Crop
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default CropMonitoring;
