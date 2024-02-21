import React from "react";
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
          <Box component="form" noValidate sx={{ mt: 1 }}>
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="equipmentName"
                  label="Equipment Name"
                  name="equipmentName"
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="operation"
                  label="Operation"
                  name="operation"
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
