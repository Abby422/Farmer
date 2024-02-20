import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline, createTheme } from "@mui/material";
import TopBar from "./Components/TopBar";
import CropMonitoring from "./pages/Crops/CropMonitoring";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ViewCrops from "./pages/Crops/ViewCrops";
import Inventory from "./pages/Inventory/Inventory";
import LivestockInventory from "./pages/Inventory/LivestockInventory";

const defaultTheme = createTheme();

const DashboardLayout = ({ children }) => (
  <ThemeProvider theme={defaultTheme}>
    <Box sx={{ display: "flex" }}>
      <TopBar />
      <CssBaseline />
      {children}
    </Box>
  </ThemeProvider>
);

// Layout component without top bar
const AuthLayout = ({ children }) => (
  <ThemeProvider theme={defaultTheme}>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {children}
    </Box>
  </ThemeProvider>
);

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />
      <Route
        path="/add"
        element={
          <DashboardLayout>
            <CropMonitoring />
          </DashboardLayout>
        }
      />
      <Route
        path="/view"
        element={
          <DashboardLayout>
            <ViewCrops />
          </DashboardLayout>
        }
      />
      <Route
        path="/addInventory"
        element={
          <DashboardLayout>
            <Inventory />
          </DashboardLayout>
        }
      />
      <Route
        path="/addLivestock"
        element={
          <DashboardLayout>
            <LivestockInventory />
          </DashboardLayout>
        }
      />
      <Route
        path="/login"
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path="/register"
        element={
          <AuthLayout>
            <Register />
          </AuthLayout>
        }
      />
    </Routes>
  );
}

export default App;
