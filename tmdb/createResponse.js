'use strict';
module.exports = (intent, data, director) => {
    // Extract movie data
    let {
        title,
        overview,
        release_date,
        poster_path
    } = data;

    // Extract release year
    let releaseYear = release_date.slice(0, 4);

    // Create response based on intent
    if(intent === 'movieInfo') {
        let str = `${title} (${releaseYear}): ${overview}`.substring(0, 640);
        return {
            txt: str,
            img: `https://image.tmdb.org/t/p/w300/${poster_path}`
        }

    } else if(intent === 'director') {
        let str = `${title} (${releaseYear}) was directed by ${director}.`.substring(0, 640);
        return {
            txt: str,
            img: null
        }
    } else if(intent ==='releaseYear') {
        let str = `${title} was released in ${releaseYear}`;
        return {
            txt: str,
            img: null
        }
    }
}