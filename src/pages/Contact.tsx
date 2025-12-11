import { Container, Typography, TextField, Button, Box } from '@mui/material';

export default function Contact() {
  // Replace with your Formspree ID or logic
  const handleSubmit = (e: React.FormEvent) => {
    // Standard Formspree logic: action="https://formspree.io/f/YOUR_ID"
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h3" gutterBottom>Get in Touch</Typography>
      <Typography paragraph color="text.secondary">
        Have a product for review or a question?
      </Typography>
      
      <form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST">
        <TextField fullWidth label="Name" name="name" margin="normal" required />
        <TextField fullWidth label="Email" name="email" type="email" margin="normal" required />
        <TextField fullWidth label="Message" name="message" multiline rows={4} margin="normal" required />
        <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }} fullWidth>
          Send Message
        </Button>
      </form>
    </Container>
  );
}
