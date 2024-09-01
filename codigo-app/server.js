const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database(path.join(__dirname, '../db', 'database.db'));

// Criar a tabela se não existir
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS codes (name TEXT, code TEXT)');
});

// Endpoint para adicionar um código
app.post('/addCode', (req, res) => {
    const { name, code } = req.body;
    const stmt = db.prepare('INSERT INTO codes (name, code) VALUES (?, ?)');
    stmt.run(name, code);
    stmt.finalize();
    res.sendStatus(200);
});

// Endpoint para buscar um código
app.get('/searchCode', (req, res) => {
    const code = req.query.code;
    db.get('SELECT * FROM codes WHERE code = ?', [code], (err, row) => {
        if (err) {
            res.status(500).send(err.message);
        } else if (row) {
            res.json(row);
        } else {
            res.status(404).send('Código não encontrado.');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
