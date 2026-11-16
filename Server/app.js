const express = require("express");
const cors = require("cors");

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});