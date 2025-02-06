import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { TextField, Button, Container, Typography, Box, CircularProgress } from "@mui/material";

const EditTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      const docRef = doc(db, "tickets", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTicket(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchTicket();
  }, [id]);

  const handleUpdate = async () => {
    const docRef = doc(db, "tickets", id);
    await updateDoc(docRef, { ...ticket });
    alert("Ticket Updated Successfully!");
    navigate("/dashboard");
  };

  if (!ticket) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom textAlign="center">
        Edit Ticket
      </Typography>
      <Box sx={{ boxShadow: 3, padding: 3, borderRadius: 2 }}>
        <TextField
          label="Title"
          fullWidth
          value={ticket.title}
          onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          fullWidth
          value={ticket.description}
          onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Priority"
          fullWidth
          select
          value={ticket.priority}
          onChange={(e) => setTicket({ ...ticket, priority: e.target.value })}
          sx={{ mb: 2 }}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </TextField>
        <TextField
          label="Status"
          fullWidth
          select
          value={ticket.status}
          onChange={(e) => setTicket({ ...ticket, status: e.target.value })}
          sx={{ mb: 2 }}
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </TextField>
        <TextField
          label="Category"
          fullWidth
          select
          value={ticket.category}
          onChange={(e) => setTicket({ ...ticket, category: e.target.value })}
          sx={{ mb: 2 }}
        >
          <option value="General">General</option>
          <option value="Technical">Technical</option>
          <option value="Billing">Billing</option>
        </TextField>
        <TextField
          label="Contact Email"
          fullWidth
          type="email"
          value={ticket.contactEmail}
          onChange={(e) => setTicket({ ...ticket, contactEmail: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Phone"
          fullWidth
          type="tel"
          value={ticket.phone}
          onChange={(e) => setTicket({ ...ticket, phone: e.target.value })}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            sx={{ paddingX: 4, paddingY: 1 }}
          >
            Update Ticket
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditTicket;
