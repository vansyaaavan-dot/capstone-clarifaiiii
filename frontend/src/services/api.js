import axios from "axios";

const API = axios.create({

  baseURL:
    "https://brilliant-spontaneity-production-0fac.up.railway.app/",

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