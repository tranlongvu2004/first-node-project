
const Connection = require('tedious').Connection;

const config = {
    server: '26.66.32.50',
    authentication: {
        type: 'default',
        options: {
            userName: 'node',
            password: 'vutran@1'
        }
    },
    options: {
        port: 1433,
        encrypt: true,
        database: 'ProductManagement',
        trustServerCertificate: true
    }
};

const connection = new Connection(config);

connection.on('connect', function(err) {
    if (err) {
        console.error('Kết nối thất bại:', err);
    } else {
        console.log('Connected to SQL Server!');
    }
});

connection.connect();

module.exports = {connection, isConnected: connection.state === 'LoggedIn'};
