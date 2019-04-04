const jwt = require('jsonwebtoken');
const config = require('../Config/config');

const auth = (req, res, next) => {
    const token_header = req.headers.auth;

    if(!token_header) return res.status(401).send({ error: 'Token não enviado!' });

    jwt.verify(token_header, config.jwt_pass, (error, decoded) => {
        if(error) return res.status(401).send({ error: 'Token inválido!' });
        res.locals.auth_decoded = decoded;
        return next();
    });
};

module.exports = auth;