import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GrassIcon from "@mui/icons-material/Grass";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import InventoryIcon from "@mui/icons-material/Inventory";
import InsightsIcon from "@mui/icons-material/Insights";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Link } from "react-router-dom";

export const MainListItems = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  
  return (
    <>
      <ListItemButton
        component={Link}
        to="/"
        selected={selectedIndex === 0}
        onClick={(e) => handleListItemClick(e, 0)}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to="/"
        selected={selectedIndex === 0}
        onClick={(e) => handleListItemClick(e, 0)}
      >
        <ListItemIcon>
          <GrassIcon />
        </ListItemIcon>
        <ListItemText primary="Crop Monitoring" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={(e) => handleListItemClick(e, 0)}
      >
        <ListItemIcon>
          <AccountBalanceIcon />
        </ListItemIcon>
        <ListItemText primary="Financial Analysis" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={(e) => handleListItemClick(e, 0)}
      >
        <ListItemIcon>
          <InventoryIcon />
        </ListItemIcon>
        <ListItemText primary="Inventory Tracking" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={(e) => handleListItemClick(e, 0)}
      >
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={(e) => handleListItemClick(e, 0)}
      >
        <ListItemIcon>
          <InsightsIcon />
        </ListItemIcon>
        <ListItemText primary="Insights" />
      </ListItemButton>
    </>
  );
};

