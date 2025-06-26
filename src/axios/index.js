import axios from 'axios';

export default axios.create({
    baseURL: 'https://novair.am:8085/api/',
});