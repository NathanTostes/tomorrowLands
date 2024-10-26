import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const lastRound = req.query.round || 0;
    const defeatedEnemies = req.query.enemies || 0;

    res.render('home', { 
        title: 'Tela Inicial - Tomorrow Lands', 
        lastRound, 
        defeatedEnemies 
    });
});

app.get('/lore', (req, res) => {
    res.render('lore', { title: 'História - Tomorrow Lands' });
});


app.get('/game', (req, res) => {
    res.render('game', { title: 'Tomorrow Lands' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});