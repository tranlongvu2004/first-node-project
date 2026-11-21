
require('dotenv').config();

const Connection = require('tedious').Connection;

const requiredEnvironmentVariables = [
    'DB_SERVER',
    'DB_USERNAME',
    'DB_PASSWORD',
    'DB_NAME'
];

const missingEnvironmentVariables = requiredEnvironmentVariables
    .filter((name) => !process.env[name]);

if (missingEnvironmentVariables.length > 0) {
    throw new Error(
        `Missing required environment variables: ${missingEnvironmentVariables.join(', ')}`
    );
}

const config = {
    server: process.env.DB_SERVER,
    authentication: {
        type: 'default',
        options: {
            userName: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD
        }
    },
    options: {
        port: Number(process.env.DB_PORT || 1433),
        encrypt: true,
        database: process.env.DB_NAME,
        trustServerCertificate: false
    }
};

const connection = new Connection(config);

connection.on('connect', function(err) {
    if (err) {
        console.error('Kết nối thất bại:', err);
    } else {
        isConnected = true;
        console.log('Connected to SQL Server!');
    }
});

connection.connect();

module.exports = connection;
