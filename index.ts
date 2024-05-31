// index.ts
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any);

// Define Schema
const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Form = mongoose.model('Form', formSchema);

app.use(() => {
  console.log('Server is running on http://localhost:3000');
});

// Routes
app.post('/api/form', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newForm = new Form({ name, email, message });
    await newForm.save();
    res.status(201).send('Formulario enviado correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al enviar el formulario3');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
