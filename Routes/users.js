const express = require('express');
const router = express.Router();
const Users = require('../Model/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../Config/config');

//FUNÇÕES AUXILIARES
const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt_pass, { expiresIn: config.jwt_expires_in });
};

router.get('/', async (req, res) => {
    try {
        const users = await Users.find({});
        return res.send(users);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na consulta do usuário!' });
    };
});

router.post('/create', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ error: 'Dados obrigatorios para o cadastro do usuário!' });

    try {
        if (await Users.findOne({ email })) res.status(400).send({ error: 'Usuário já cadastrado!' });

        const user = await Users.create(req.body);
        user.password = undefined;

        return res.status(201).send({ user, token: createUserToken(user.id) });
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar usuário!' });
    };
});

router.post('/auth', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send({ error: 'Dados obrigatorios para o cadastro do usuário!' });

    try {
        const user = await Users.findOne({ email }).select('+password');
        if (!user) return res.status(400).send({ error: 'Usuário não cadastrado!' });

        const pass_ok = await bcrypt.compare(password, user.password);

        if(!pass_ok) return res.status(401).send({ error: 'Erro ao autenticar o usuário!' });

        user.password = undefined;
        return res.send({ user, token: createUserToken(user.id) });
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar usuário!' });
    };
});

module.exports = router;

/* 

200 - OK
201 - Created
202 - Accepted

400 - Bad Request (Deu ruim)
401 - Unauthorized => autenticação, tem caráter temporário
403 - Forbidden => autenticação, tem caráter permanente

500 - Internal server error 
501 - Not implemented - a API não suporta essa funcionalidade
503 - Service Unavaliable - a API executa essa operação, mas no momento está indisponível 

*/