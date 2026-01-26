import axios from 'axios';

const API_URI = 'https://filespire-app.onrender.com';

export const uploadFile = async (data, expirationPeriod) => {
    try {

        data.append("expirationPeriod", expirationPeriod);

        const response = await axios.post(`${API_URI}/upload`, data);
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
};
