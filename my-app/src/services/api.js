import axios from 'axios';

const API_URI = 'https://filespire-911562915445.asia-south2.run.app';

export const uploadFile = async (data, expirationPeriod) => {
    try {

        data.append("expirationPeriod", expirationPeriod);

        const response = await axios.post(`${API_URI}/upload`, data);
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
};
