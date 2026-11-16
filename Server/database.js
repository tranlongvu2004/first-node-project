
const Connection = require('tedious').Connection;

const config = {
    server: 'Vutraan\SQLEXPRESS',
    authentication: {
        type: 'default',
        options: {
            userName: 'tlv',
            password: '123456'
        }
    },
    options: {
        encrypt: true,
        database: 'LabProjectManagement'
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

module.exports = connection;
