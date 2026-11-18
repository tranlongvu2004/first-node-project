const express = require("express");
const cors = require("cors");
const { TYPES } = require("tedious");
const Request = require("tedious").Request;
const connection = require('./database');


const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Thành công!');
});

app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello React" });
});

app.get("/api/sum", (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    if (!Number.isFinite(a) || !Number.isFinite(b)) {
        res.status(400).json({ Error: "Invalid input. Please try again with valid numbers." });
    } else {
        res.json({ Sum: a + b });
    }
});

app.get("/api/users", (req, res) => {
   const userId = Number(req.query.userId);
   if (userId == null || Number(userId) === 0) {
    res.status(400).json({Error: "Invalid input. Please enter a number"});
   }
       if (!db.isConnected) {
        return res.status(503).json({
            Error: "Database is not connected"
        });
    }
   const users = [];
   const request = new Request( 'SELECT * from products where ProductID = @userId',
         (err, rowCount) => {
            if (err) {
                return res.status(500).json ({Error: err.message});
            }
           res.json(users);
         }
   ); 

   request.addParameter('UserId', TYPES.Int, userId);

   request.on ('row',columns => {
       const user = {};
       columns.forEach(column => {
         user[column.metadata.colName] = column.value;
       });
       users.push(user);
   });
   connection.execSql(request);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});