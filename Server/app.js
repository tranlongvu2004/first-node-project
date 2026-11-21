require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { TYPES } = require("tedious");
const Request = require("tedious").Request;
const connection = require('./database');


const app = express();

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Origin not allowed"));
        }
    }
}));
app.use(express.json());

const apiAuthToken = process.env.API_AUTH_TOKEN;
if (!apiAuthToken) {
    throw new Error("Missing required environment variable: API_AUTH_TOKEN");
}

function requireApiAuthentication(req, res, next) {
    const authorization = req.get("authorization");
    if (authorization !== `Bearer ${apiAuthToken}`) {
        return res.status(401).json({ Error: "Authentication required" });
    }
    return next();
}

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

app.get("/api/users", requireApiAuthentication, (req, res) => {
   const userId = Number(req.query.userId);
   if (!Number.isInteger(userId) || userId <= 0) {
    return res.status(400).json({Error: "Invalid input. Please enter a positive integer"});
   }
   const users = [];
   const request = new Request( 'SELECT * from products where ProductID = @userId',
         (err, rowCount) => {
            if (err) {
                console.error("Database query failed:", err);
                return res.status(500).json ({Error: "Database query failed"});
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