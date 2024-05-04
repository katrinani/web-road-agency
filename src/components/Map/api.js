import axios from 'axios';

const BASE_URL = 'https://smiling-striking-lionfish.ngrok-free.app';

const getVerifiedPoints = async (roadName) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/roads/${roadName}/verifiedPoints`);
        return response.data;
    } catch (error) {
        console.error('Error fetching verified points:', error);
        throw error;
    }
};

const api = {
    getVerifiedPoints,
};

export default api;
