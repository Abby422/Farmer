import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";

const ViewCrops = () => {
  const [crops, setCrops] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/crops/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Filter crops based on user_token
          const userToken = localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")).key
            : null;
          const filteredCrops = data.filter(
            (crop) => crop.user_token === userToken
          );
          setCrops(filteredCrops);
        } else {
          console.error("Failed to fetch crops");
        }
      } catch (error) {
        console.error("Error fetching crops:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount

  const handleUpdate = (crop) => {
    setSelectedCrop(crop);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCrop(null);
  };

 const handleSaveUpdate = async () => {
   try {
     const response = await fetch(
       `http://127.0.0.1:8000/api/crops/${selectedCrop.id}/`,
       {
         method: "PUT",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(selectedCrop),
       }
     );

     console.log(response);
     if (response.ok) {
       // Update the local state with the updated crop
       const updatedCrops = crops.map((crop) =>
         crop.id === selectedCrop.id ? selectedCrop : crop
       );
       setCrops(updatedCrops);
       alert("Crop updated successfully");
     } else {
       alert("Failed to update crop");
     }
   } catch (error) {
     console.error("Error updating crop:", error);
   }

   // Close the dialog
   handleCloseDialog();
 };

 const handleDelete = async (id) => {
   try {
     const response = await fetch(`http://127.0.0.1:8000/api/crops/${id}/`, {
       method: "DELETE",
       headers: {
         "Content-Type": "application/json",
       },
     });

     if (response.ok) {
       // Remove the deleted crop from the local state
       const updatedCrops = crops.filter((crop) => crop.id !== id);
       setCrops(updatedCrops);
       console.log("Crop deleted successfully");
     } else {
       console.error("Failed to delete crop");
     }
   } catch (error) {
     console.error("Error deleting crop:", error);
   }
 };
  return (
    <Box
      sx={{
        margin: 10,
        flexGrow: 1,
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {crops.map((crop) => (
          <Grid item xs={2} sm={4} md={4} key={crop.id}>
            <Card
              sx={{
                minWidth: 275,
                borderLeft:
                  crop.plantingDate === "2024-02-20" ||
                  crop.harvestingDate === "2024-03-20"
                    ? "4px solid #8bc34a"
                    : "1px solid #ccc",
              }}
            >
              <CardHeader title={crop.name} />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Variety: {crop.variety}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Planting Date: {crop.planting_date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Harvesting Date: {crop.harvest_date}
                </Typography>
                <Button
                  onClick={() => handleUpdate(crop)}
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 1, marginRight: 1 }}
                >
                  Update
                </Button>
                <Button
                  onClick={() => handleDelete(crop.id)}
                  variant="contained"
                  color="error"
                  sx={{ marginTop: 1 }}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Update Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Update Crop</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                style={{ marginTop: 10 }}
                label="Variety"
                fullWidth
                value={selectedCrop?.variety || ""}
                onChange={(e) =>
                  setSelectedCrop({ ...selectedCrop, variety: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Planting Date"
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                value={selectedCrop?.plantingDate || ""}
                onChange={(e) =>
                  setSelectedCrop({
                    ...selectedCrop,
                    plantingDate: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Harvesting Date"
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                value={selectedCrop?.harvestingDate || ""}
                onChange={(e) =>
                  setSelectedCrop({
                    ...selectedCrop,
                    harvestingDate: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveUpdate} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewCrops;
