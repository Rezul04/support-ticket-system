import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Box, Typography } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();

  const handleCustomerLogin = () => {
    navigate("/customer-login");  // Redirect to Customer Login
  };

  const handleAgentLogin = () => {
    navigate("/agent-login");  // Redirect to Agent Login
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, textAlign: "center" }}>
      <Box>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          onClick={handleCustomerLogin}
        >
          Login as Customer
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={handleAgentLogin}
        >
          Login as Support Agent
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
