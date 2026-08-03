import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/api/hello")
            .then(res => setMessage(res.data.message));
        axios.get("/api/sum", (req, res) => {
              const a = Number(req.query.a);
              const b = Number(req.query.b);
                if (!Number.isFinite(a) || !Number.isFinite(b))
                {
                   res.status(400).json({ Error: "Invalid input. Please try again with valid numbers." });
                }                                                             
                   res.json({ Sum: a + b });
});
    }, []);

    return <h1>{message}</h1>;
}

export default App;