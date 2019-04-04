const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {

        case 'dev':
        return {
            bd_string: 'mongodb+srv://admin:admin@clusterapi-vqrfi.mongodb.net/test?retryWrites=true',
            jwt_pass: 'batatafrita2019',
            jwt_expires_in: '7d'
        };

        case 'hml':
        return {
            bd_string: 'mongodb+srv://admin:admin@clusterapi-vqrfi.mongodb.net/test?retryWrites=true',
            jwt_pass: 'batatafrita2019',
            jwt_expires_in: '7d'
        };

        case 'prod':
        return {
            bd_string: 'mongodb+srv://admin:admin@clusterapi-vqrfi.mongodb.net/test?retryWrites=true',
            jwt_pass: 'wfrwmgrprejeporjopejeorkh748709894578@huehf',
            jwt_expires_in: '7d'
        };
    };
};

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();