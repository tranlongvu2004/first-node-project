import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [message, setMessage] = useState("");
    const [sum, setSum] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:5000/api/hello")
            .then(res => setMessage(res.data.message));
    }, []);
        axios.get("http://localhost:5000/api/sum", { params: { a: 55, b: 10 }})
            .then(res => setSum(res.data.Sum));
    return (
    <div>
        <h1>{message}</h1>
        <p>Sum: {sum}</p>
    </div>
    );
}

export default App;