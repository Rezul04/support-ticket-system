import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { db, collection, getDocs } from "../firebaseConfig";  // Firebase imports

const AgentDashboard = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const querySnapshot = await getDocs(collection(db, "tickets"));
      setTickets(querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })));
    };

    fetchTickets();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Support Agent Dashboard</Typography>
      {tickets.length === 0 ? (
        <Typography>No tickets available.</Typography>
      ) : (
        tickets.map((ticket) => (
          <Box
            key={ticket.id}
            sx={{
              mb: 2,
              border: "1px solid #ddd",
              padding: 2,
              borderRadius: 1,
              boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {ticket.title}
            </Typography>
            <Typography variant="body1">{ticket.description}</Typography>
            <Typography variant="body2" color="textSecondary">
              Priority: {ticket.priority}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Status: {ticket.status}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-start", marginTop: 1 }}>
              <Button variant="contained" color="primary" sx={{ mr: 1 }}>
                Update
              </Button>
            </Box>
          </Box>
        ))
      )}
    </Container>
  );
};

export default AgentDashboard;
