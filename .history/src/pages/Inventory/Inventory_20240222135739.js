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

function Inventory() {
  const { key } = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();


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


  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    const emptyFields = Object.keys(formValues).filter((key) => !formValues[key]);

    if (emptyFields.length > 0) {
      setError(`Please fill in all fields: ${emptyFields.join(", ")}`);
      return;
    }

    setError(null);

    const raw = {
      ...formValues,
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

    console.log(raw);
    fetch("http://127.0.0.1:8000/api/machinery/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        result && navigate("/viewInventory");
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
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 5 }}
          >
            <Typography component="h1" variant="h5">
              Add Machine
            </Typography>
            {error && (
              <Typography color="error" variant="subtitle2">
                {error}
              </Typography>
            )}
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
