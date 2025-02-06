import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CustomerLogin from "./components/CustomerLogin";
import AgentLogin from "./components/AgentLogin";
import CustomerDashboard from "./components/CustomerDashboard";
import AgentDashboard from "./components/AgentDashboard";
import { Container, Button } from "@mui/material";

function App() {
  return (
    <Router>
      <Container maxWidth="xs" sx={{ textAlign: "center", marginTop: "50px" }}>
        {/* Main Login Page - Choose User Role */}
        <h2>Welcome to Ticket System</h2>
        <Button 
          component={Link} 
          to="/customer-login" 
          variant="contained" 
          sx={{ marginBottom: "20px", marginRight: "10px" }}
        >
          Customer Login
        </Button>
        <Button 
          component={Link} 
          to="/agent-login" 
          variant="contained"
        >
          Agent Login
        </Button>
        
        {/* Routes */}
        <Routes>
          {/* Login Routes */}
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/agent-login" element={<AgentLogin />} />
          
          {/* Dashboard Routes */}
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/agent-dashboard" element={<AgentDashboard />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
