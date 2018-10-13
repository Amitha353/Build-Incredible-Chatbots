'use strict';

if(process.env.NODE_ENV === 'production') {
	module.exports = {
		FB: {
			PAGE_ACCESS_TOKEN: process.env.PAGE_ACCESS_TOKEN,
			VERIFY_TOKEN: process.env.VERIFY_TOKEN,
			APP_SECRET: process.env.APP_SECRET
		},
		TMDB: process.env.TMDB
	}
} else {
	module.exports = require('./development.json');
}
