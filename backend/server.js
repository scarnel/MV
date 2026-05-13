const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/empresaDB')
.then(() => console.log('MongoDB conectado'))
.catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Backend funcionando');
});

app.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json({ message: 'Usuario registrado' });
    } catch (error) {
        res.status(500).json(error);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (user) {
        res.json({
            message: 'Login correcto',
            user: user
        });
    } else {
        res.status(401).json({
            message: 'Credenciales incorrectas'
        });
    }
});

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.post('/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json({ message: 'Usuario creado' });
});

app.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usuario eliminado' });
});

app.put('/users/:id', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Usuario actualizado' });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});