import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTheme } from "@emotion/react";


const inventoryData = {
  machines: [
    {
      id: 1,
      plateNumber: "ABC123",
      equipmentName: "Tractor",
      purchasePrice: "$10000",
      purchaseDate: "2023-01-15",
      operation: "Farming",
    },
    // Add more machine data as needed
  ],
  livestock: [
    {
      id: 1,
      tagNumber: "001",
      animalType: "Cow",
      age: 3,
      breed: "Angus",
      moreDetails: "Healthy and active",
    },
    // Add more livestock data as needed
  ],

};

const ViewInventory = () => {
  const [currentInventory, setCurrentInventory] = useState("machines");
  const theme = useTheme();

  const handleFilter = (inventoryType) => {
    setCurrentInventory(inventoryType);
  };

  return (
    <Container sx={{ marginTop: 10 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button
            variant={currentInventory === "machines" ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleFilter("machines")}
          >
            Machines
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant={
              currentInventory === "livestock" ? "contained" : "outlined"
            }
            color="primary"
            onClick={() => handleFilter("livestock")}
          >
            Livestock
          </Button>
        </Grid>
       
      </Grid>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {currentInventory === "machines" && (
                <>
                  <TableCell>Plate Number</TableCell>
                  <TableCell>Equipment Name</TableCell>
                  <TableCell>Purchase Price</TableCell>
                  <TableCell>Purchase Date</TableCell>
                  <TableCell>Operation</TableCell>
                  <TableCell>Actions</TableCell>
                </>
              )}
              {currentInventory === "livestock" && (
                <>
                  <TableCell>Tag Number</TableCell>
                  <TableCell>Animal Type</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Breed</TableCell>
                  <TableCell>More Details</TableCell>
                  <TableCell>Actions</TableCell>
                </>
              )}
          
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryData[currentInventory].map((item) => (
              <TableRow key={item.id}>
                {currentInventory === "machines" && (
                  <>
                    <TableCell>{item.plateNumber}</TableCell>
                    <TableCell>{item.equipmentName}</TableCell>
                    <TableCell>{item.purchasePrice}</TableCell>
                    <TableCell>{item.purchaseDate}</TableCell>
                    <TableCell>{item.operation}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: theme.palette.blue.main,
                          marginRight: 5,
                        }}
                      >
                        Update
                      </Button>
                      <Button variant="contained" color="error">
                        Delete
                      </Button>
                    </TableCell>
                  </>
                )}
                {currentInventory === "livestock" && (
                  <>
                    <TableCell>{item.tagNumber}</TableCell>
                    <TableCell>{item.animalType}</TableCell>
                    <TableCell>{item.age}</TableCell>
                    <TableCell>{item.breed}</TableCell>
                    <TableCell>{item.moreDetails}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginRight: 5 }}
                      >
                        Update
                      </Button>
                      <Button variant="contained" color="error">
                        Delete
                      </Button>
                    </TableCell>
                  </>
                )}
              
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ViewInventory;
