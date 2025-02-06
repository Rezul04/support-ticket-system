import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { db, collection, addDoc } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const CreateTicket = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Open");
  const [category, setCategory] = useState("General");
  const [contactEmail, setContactEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [attachment, setAttachment] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ticketData = {
      title,
      description,
      priority,
      status,
      category,
      contactEmail,
      phone,
      attachment: attachment ? attachment.name : "",
    };

    try {
      await addDoc(collection(db, "tickets"), ticketData);
      alert("Ticket Created Successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom textAlign="center">
        Create New Ticket
      </Typography>
      <Box sx={{ boxShadow: 3, padding: 3, borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            fullWidth
            required
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Priority"
            fullWidth
            select
            required
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
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
            required
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            required
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Phone"
            fullWidth
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            sx={{ mb: 2 }}
          />
          <input type="file" onChange={handleFileChange} />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ paddingX: 4, paddingY: 1 }}
            >
              Submit Ticket
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default CreateTicket;
