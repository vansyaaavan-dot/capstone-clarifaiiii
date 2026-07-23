import axios from "axios";

const API = axios.create({

  baseURL:
    "https://capstone-clarifaiiii-production.up.railway.app/",

});

export const analyzeNews = async (textData) => {

    const response =
        await API.post(
            "/api/detect-hoax",
            { text:textData }
        );

    return response.data;
};

export default API;