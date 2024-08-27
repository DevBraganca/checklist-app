const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Definição de rotas
app.get('/api/checklist', async (req, res) => {
    try {
        // Adicione aqui o código para buscar dados do banco de dados
        res.json({ message: 'Endpoint GET funcionando!' });
    } catch (err) {
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

app.post('/api/checklist', async (req, res) => {
    try {
        // Adicione aqui o código para adicionar dados ao banco de dados
        res.status(201).json({ message: 'Item adicionado' });
    } catch (err) {
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

// Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
