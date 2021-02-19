const supertest = require('supertest')
const env = require('dotenv').config();

const api = supertest(process.env.OMDB_BASE_URL)
const key = process.env.OMDB_API_KEY

const getContentById = (id) => api.get('')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .query({
        apiKey: key,
        i: id
    })

const getContentBySearch = (search, type) => api.get('')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .query({
        apiKey: key,
        s: search,
        type: type
    })

module.exports = {
    getContentById,
    getContentBySearch
}
