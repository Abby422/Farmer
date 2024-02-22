import React, { useState } from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const [openModal, setOpenModal] = useState(false);
  const [incomeData, setIncomeData] = useState({
    description: "",
    amount: null,
    date: null,
    user_token: "",
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    // Reset form fields
    setIncomeData({
      description: "",
      amount: null,
      date: null,
      user_token: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncomeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/income/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incomeData),
      });

      if (response.ok) {
        console.log("Income added successfully");
        // Close the modal after successful submission
        handleCloseModal();
      } else {
        console.error("Failed to add income");
      }
    } catch (error) {
      console.error("Error during income submission:", error);
    }
  };

  return (
    <React.Fragment>
      <Title>Income</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 January, 2024
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={handleOpenModal}>
          Add Income
        </Link>
      </div>

      {/* Add Income Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="add-income-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="div" id="add-income-modal">
            Add Income
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Description"
              name="description"
              value={incomeData.description}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Amount"
              type="number"
              name="amount"
              value={incomeData.amount}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Date"
              type="date"
              name="date"
              value={incomeData.date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="User Token"
              name="user_token"
              value={incomeData.user_token}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </form>
        </Box>
      </Modal>
    </React.Fragment>
  );
}