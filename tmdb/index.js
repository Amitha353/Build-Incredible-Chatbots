'use strict';
const request = require('request');
const TMDB = require('../config').TMDB;
const createResponse = require('./createResponse');
const MAX_CONFIDENCE = 0.8;

const extractEntity = (nlp, entity) => {
    let obj = nlp[entity] && nlp[entity][0];
    if(obj && obj.confidence > MAX_CONFIDENCE) {
        return obj.value;
    } else {
        return null;
    }
}

const getMovieData = (movie, releaseYear = null) => {
    let qs = {
        api_key: TMDB,
        query: movie
    }

    if(releaseYear) {
        qs.year = Number(releaseYear);
    }

    return new Promise((resolve, reject) => {
        request({
            uri: 'https://api.themoviedb.org/3/search/movie',
            qs
        }, (error, response, body) => {
            if(!error && response.statusCode === 200) {
                let data = JSON.parse(body);
                resolve(data.results[0]);
            } else {
                reject(error);
            }
        });
    });
}

const getDirector = movie_id => {
    return new Promise((resolve, reject) => {
        request({
            uri: `https://api.themoviedb.org/3/movie/${movie_id}/credits`,
            qs: {
                api_key: TMDB
            }
        }, (error, response, body) => {
            if(!error && response.statusCode === 200) {
                let result = JSON.parse(body).crew;
                let directors = result.filter(item => item.job === 'Director').map(item => item.name).join(', ');
                resolve(directors);
            } else {
                reject(error);
            }
        });
    });
}

module.exports = nlpData => {
    return new Promise(async function(resolve, reject) {
        let intent = extractEntity(nlpData, 'intent');

        if(intent) {
            let movie = extractEntity(nlpData, 'cinema');
            let releaseYear = extractEntity(nlpData, 'releaseYear');
            // Get data (including id) about the movie
            // Get director(s) using the id
            // Create a response and resolve back to the user
            try {
                let movieData = await getMovieData(movie, releaseYear);
                let director = await getDirector(movieData.id);
                let response = createResponse(intent, movieData, director);
                resolve(response);
            } catch(error) {
                reject(error);
            }

        } else {
            resolve({
                txt: "I'm not sure I understand you!",
                img: null
            });
        }
        
    });
}