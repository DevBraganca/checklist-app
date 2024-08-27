const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const checklistRoutes = require('./routes/checklist');

const app = express();

// Middleware
app.use(cors()); // Adicione esta linha para permitir CORS
app.use(express.json());

// Conectando ao MongoDB
mongoose.connect('mongodb://localhost:27017/checklist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch((error) => {
  console.error('Could not connect to MongoDB:', error.message);
});

// Rotas
app.use('/api/checklist', checklistRoutes);

// Iniciar o servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
