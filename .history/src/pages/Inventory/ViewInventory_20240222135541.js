import React, { useState, useEffect } from "react";
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

const ViewInventory = () => {
  const [currentInventory, setCurrentInventory] = useState("machines");
  const [inventoryData, setInventoryData] = useState({
    machines: [],
    livestock: [],
  });

  const handleFilter = (inventoryType) => {
    setCurrentInventory(inventoryType);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/machinery/");
        if (response.ok) {
          const data = await response.json();
          setInventoryData(data);
        } else {
          console.error("Failed to fetch inventory data");
        }
      } catch (error) {
        console.error("Error during inventory data fetching:", error);
      }
    };

    fetchData();
  }, []);


  const handleUpdate = (itemId) => {
    console.log(`Update item with ID ${itemId}`);
    // Add logic to handle the update operation
  };

  const handleDelete = (itemId) => {
    console.log(`Delete item with ID ${itemId}`);
    // Add logic to handle the delete operation
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
            {inventoryData[currentInventory]?.map((item) => (
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
                        onClick={() => handleUpdate(item.id)}
                        sx={{ marginRight: 5 }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(item.id)}
                      >
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
                        onClick={() => handleUpdate(item.id)}
                        sx={{ marginRight: 5 }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(item.id)}
                      >
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
