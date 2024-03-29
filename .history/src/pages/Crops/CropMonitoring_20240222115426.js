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
import { useNavigate } from "react-router-dom";



const defaultTheme = createTheme();

function CropMonitoring() {
  const { key } = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cropName: "",
    variety: "",
    plantingDate: "",
    harvestingDate: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    const emptyFields = Object.keys(formData).filter((key) => !formData[key]);

    if (emptyFields.length > 0) {
      setError(`Please fill in all fields: ${emptyFields.join(", ")}`);
      return;
    }

    setError(null);

    const raw = {
      ...formData,
      user_token: key,
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(raw),
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/api/crops/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        result && navigate("/view");
      })
      .catch((error) => alert(error));
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
            {error && (
              <Typography color="error" variant="subtitle2">
                {error}
              </Typography>
            )}
            <Grid container spacing={2}>
           
             
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
