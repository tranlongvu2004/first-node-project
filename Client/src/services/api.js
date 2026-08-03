// services/api.js

import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:5000/api"
});
axios.get("/api/sum",{params: {a: 5, b: 10}})
     .then(response => {
        console.log(response.data.Sum);
     })