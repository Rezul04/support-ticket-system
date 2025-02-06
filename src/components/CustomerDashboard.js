import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Modal, TextField, Grid, MenuItem, FormControl, InputLabel, Select, CircularProgress } from "@mui/material";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";  // Firebase configuration

const CustomerDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Low',
    category: '',
    attachment: null,
    contactEmail: '',
    phone: '',
  });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tickets"));
      const ticketsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTickets(ticketsList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tickets: ", error);
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      // Add ticket to Firestore
      await addDoc(collection(db, "tickets"), {
        ...formData,
        createdAt: new Date(),
      });
      setOpenModal(false);  // Close the modal after successful submission
      fetchTickets();  // Refresh ticket list
    } catch (err) {
      console.error("Error submitting ticket: ", err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Customer Support Dashboard
      </Typography>
      
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          {/* Ticket Table */}
          <table style={{ width: "100%", border: "1px solid #ccc" }}>
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(ticket => (
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>{ticket.title}</td>
                  <td>{ticket.description}</td>
                  <td>{ticket.priority}</td>
                  <td>{ticket.status}</td>
                  <td>
                    <Button variant="contained" color="primary" onClick={() => alert('View')}>View</Button>
                    <Button variant="contained" color="secondary" style={{ marginLeft: '5px' }} onClick={() => alert('Edit')}>Edit</Button>
                    <Button variant="contained" color="error" style={{ marginLeft: '5px' }} onClick={() => alert('Delete')}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for ticket submission */}
      <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
        Raise a Ticket
      </Button>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <div style={{ padding: "20px", backgroundColor: "white", marginTop: "50px" }}>
          <Typography variant="h6" gutterBottom>Raise a New Ticket</Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                fullWidth
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Category"
                fullWidth
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Contact Email"
                type="email"
                fullWidth
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                type="phone"
                fullWidth
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit Ticket
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </Container>
  );
};

export default CustomerDashboard;
