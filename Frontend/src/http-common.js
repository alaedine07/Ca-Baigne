import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost/3001',
    header: {
        "Content-type": "application/json"
    }
});