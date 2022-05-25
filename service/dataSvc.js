import axios from 'axios'
const config = require('../nuxt.config.js')

const PENGGUNA = '/searchpengguna';
const OTP = '/searchotphistory';
const ACTIVITY_HISTORY = '/searchactivity';
const PEMEGANG = '/findpemegang';
const TYPE_PROCESS = '/configprocess';
const NO_HP_URI = '/findnohp';
const baseURL = config.default.env.API_URL;
export default {
    async findAccount (data, token){
        const config = { headers: { Authorization: `Bearer ${token}` } };
        return await axios.post(`${baseURL}`+ PENGGUNA, data, config)
    },
    async findHistoryOtp(data, token){
        const config = { headers: { Authorization: `Bearer ${token}` } };
        return await axios.post(`${baseURL}`+ OTP, data, config)
    },
    async findHistoryActivity(data, token){
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const URL = `${baseURL}` + ACTIVITY_HISTORY;
        return await axios.post(URL, data, config)
    },
    async findPemegang(data, token){
        const config = { headers: { Authorization: `Bearer ${token}` } };
        return await axios.post(`${baseURL}`+ PEMEGANG, data, config)
    },
    async getConfigProcess(token){
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const URL = `${baseURL}` + TYPE_PROCESS;
        return await axios.get(URL, config)
    },
    async findNoHPData(data, token){
        const config = { headers: { Authorization: `Bearer ${token}` } };
        return await axios.post(`${baseURL}`+ NO_HP_URI, data, config)
    }
}