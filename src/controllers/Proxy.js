require('dotenv').config();
const request = require('request');
const axios = require('axios');


const getHtmlWithProxy = async (req, res) => {
    console.log("/GET: proxy")
    const { url } = req.query;

    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        const response = await axios.get(url);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching the URL');
    }
};

module.exports = {
    getProxy: getHtmlWithProxy,
}