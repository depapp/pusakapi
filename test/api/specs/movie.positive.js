const assert = require('chai').expect
const page = require('../pages/movie.page')

const param = {
    positive: {
        movieId: 'tt5923026',
        seriesId: 'tt6468322',
        movieKeyword: 'marlina',
        seriesKeyword: 'la casa de papel',
        movieType: 'movie',
        seriesType: 'series'
    },
    negative: {
        movieId: '12345',
        seriesId: '67890',
        movieKeyword: 'marmarmar',
        seriesKeyword: 'monmonmon'
    }
}

const resp = {
    positive: {
        success: 200,
        response: 'True',
        movieTitle: 'Marlina si pembunuh dalam empat babak',
        movieYear: '2017',
        movieImdbId: 'tt5923026',
        movieType: 'movie',
        seriesTitle: 'La casa de papel',
        seriesYear: '2017–2021',
        seriesImdbId: 'tt6468322',
        seriesType: 'series'
    },
    negative: {
        response: 'False',
        id: 'Incorrect IMDb ID.',
        movieSearch: 'Movie not found!',
        seriesSearch: 'Series not found!'
    }
}

describe(`OMDb - Positive Cases`, () => {

    it(`@get Movie by ID`, async() => {
        const response = await page.getContentById(param.positive.movieId)
        assert(response.status).to.equal(resp.positive.success)
        assert(response.body.Response).to.equal(resp.positive.response)
        assert(response.body.Title).to.equal(resp.positive.movieTitle)
        assert(response.body.Year).to.equal(resp.positive.movieYear)
        assert(response.body.imdbID).to.equal(resp.positive.movieImdbId)
        assert(response.body.Type).to.equal(resp.positive.movieType)
    })

    it('@get Movie by Search', async() => {
        const response = await page.getContentBySearch(param.positive.movieKeyword, param.positive.movieType)
        assert(response.status).to.equal(resp.positive.success)
        assert(response.body.Response).to.equal(resp.positive.response)
        assert(response.body.Search[0]['Title']).to.equal(resp.positive.movieTitle)
        assert(response.body.Search[0]['Year']).to.equal(resp.positive.movieYear)
        assert(response.body.Search[0]['imdbID']).to.equal(resp.positive.movieImdbId)
        assert(response.body.Search[0]['Type']).to.equal(resp.positive.movieType)
    })

    it(`@get Series by ID`, async() => {
        const response = await page.getContentById(param.positive.seriesId)
        assert(response.status).to.equal(resp.positive.success)
        assert(response.body.Response).to.equal(resp.positive.response)
        assert(response.body.Title).to.equal(resp.positive.seriesTitle)
        assert(response.body.Year).to.equal(resp.positive.seriesYear)
        assert(response.body.imdbID).to.equal(resp.positive.seriesImdbId)
        assert(response.body.Type).to.equal(resp.positive.seriesType)
    })

    it('@get Series by Search', async() => {
        const response = await page.getContentBySearch(param.positive.seriesKeyword, param.positive.seriesType)
        assert(response.status).to.equal(resp.positive.success)
        assert(response.body.Response).to.equal(resp.positive.response)
        assert(response.body.Search[0]['Title']).to.equal(resp.positive.seriesTitle)
        assert(response.body.Search[0]['Year']).to.equal(resp.positive.seriesYear)
        assert(response.body.Search[0]['imdbID']).to.equal(resp.positive.seriesImdbId)
        assert(response.body.Search[0]['Type']).to.equal(resp.positive.seriesType)
    })

})

describe(`OMDb - Negative Cases`, () => {

    it(`@get Movie by ID`, async() => {
        const response = await page.getContentById(param.negative.movieId)
        assert(response.status).to.equal(resp.positive.success)
        assert(response.body.Response).to.equal(resp.negative.response)
        assert(response.body.Error).to.equal(resp.negative.id)
    })

    it('@get Movie by Search', async() => {
        const response = await page.getContentBySearch(param.negative.movieKeyword, param.positive.movieType)
        assert(response.status).to.equal(resp.positive.success)
        assert(response.body.Response).to.equal(resp.negative.response)
        assert(response.body.Error).to.equal(resp.negative.movieSearch)
    })

    it(`@get Series by ID`, async() => {
        const response = await page.getContentById(param.negative.seriesId)
        assert(response.status).to.equal(resp.positive.success)
        assert(response.body.Response).to.equal(resp.negative.response)
        assert(response.body.Error).to.equal(resp.negative.id)
    })

    it('@get Series by Search', async() => {
        const response = await page.getContentBySearch(param.negative.seriesKeyword, param.positive.seriesType)
        assert(response.status).to.equal(resp.positive.success)
        assert(response.body.Response).to.equal(resp.negative.response)
        assert(response.body.Error).to.equal(resp.negative.seriesSearch)
    })

})
