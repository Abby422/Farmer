import React from "react";
import { Card, CardContent, CardHeader, Typography, Grid, Box } from "@mui/material";

// Sample dummy data for crops
const dummyCrops = [
  {
    id: 1,
    name: "Crop 1",
    variety: "Variety A",
    plantingDate: "2024-02-20",
    harvestingDate: "2024-03-20",
  },
  {
    id: 2,
    name: "Crop 2",
    variety: "Variety B",
    plantingDate: "2024-02-25",
    harvestingDate: "2024-03-25",
  },
  {
    id: 3,
    name: "Crop 3",
    variety: "Variety C",
    plantingDate: "2024-03-01",
    harvestingDate: "2024-04-01",
  },
  {
    id: 4,
    name: "Crop 4",
    variety: "Variety D",
    plantingDate: "2024-03-05",
    harvestingDate: "2024-04-05",
  },
];


const ViewCrops = () => {
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
            {dummyCrops.map((crop) => (
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
                      Planting Date: {crop.plantingDate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Harvesting Date: {crop.harvestingDate}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
  );
};

export default ViewCrops;
