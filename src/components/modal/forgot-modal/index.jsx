import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { auth } from "../../../service";
import { useNavigate } from "react-router-dom";

const ForgotModal = ({ open, toggle }) => {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      code: code,
      email: localStorage.getItem("email"),
      password: password,
    };
    console.log(payload);

    try {
      const response = await auth.verify_forgot_password(payload);
      if (response.status === 200) {
        navigate("/");
      }

      console.log(response);
      toggle();
    } catch (error) {
      console.error("Verification failed", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={toggle}
      aria-labelledby="modalTitle"
      aria-describedby="modalDescription"
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
        <Typography
          id="modalTitle"
          variant="h6"
          component="h2"
          textAlign="center"
        >
          Enter Code
        </Typography>
        <form onSubmit={handleSubmit} id="submit">
          <TextField
            label="Code"
            name="code"
            fullWidth
            variant="outlined"
            margin="normal"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <TextField
            label="New password"
            name="password"
            fullWidth
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e?.target?.value)}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              onClick={toggle}
              color="secondary"
              variant="outlined"
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <Button color="primary" variant="contained" type="submit">
              Confirm
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ForgotModal;
