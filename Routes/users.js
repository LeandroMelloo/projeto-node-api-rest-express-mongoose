const express = require('express');
const router = express.Router();
const Users = require('../Model/users');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    Users.find({}, (err, data) => {
        if (err) return res.send({ error: 'Erro na consulta do usuário!' });
        return res.send(data);
    });
});

router.post('/create', (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) return res.send({ error: 'Dados obrigatorios para o cadastro do usuário!' });

    Users.findOne({email}, (err, data) => {
        if (err) return res.send({ error: 'Erro ao buscar usuário!' });
        if (data) return res.send({ error: 'Usuário já cadastrado!' });

        Users.create(req.body, (error, data) => {
            if (error) return res.send({ error: 'Error ao criar o usuário!' });

            data.password = undefined;
            return res.send(data);
        });
    });
});

router.post('/auth', (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) return res.send({ error: 'Dados obrigatorios para o cadastro do usuário!' });

    Users.findOne({email}, (err, data) => {
        if (err) return res.send({ error: 'Erro ao buscar usuário!' });
        if (!data) return res.send({ error: 'Usuário não cadastrado!' });

        bcrypt.compare(password, data.password, (error, same) => {
            if (!same) return res.send({ error: 'Erro ao autenticar o usuário' });

            data.password = undefined;
            return res.send(data);
        });

    }).select('+password');
});

module.exports = router;