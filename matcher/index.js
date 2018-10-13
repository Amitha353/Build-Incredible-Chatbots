'use strict';
const patterns = require('../patterns');
const XRegExp = require('xregexp');

let createEntities = (str, pattern) => {
	return XRegExp.exec(str, XRegExp(pattern, "i"));
}

let matchPattern = (str, cb) => {
	let getResult = patterns.find(item => {
		if(XRegExp.test(str, XRegExp(item.pattern, "i"))) {
			return true;
		}
	});

	if(getResult) {
		return cb({
			intent: getResult.intent,
			entities: createEntities(str, getResult.pattern)
		});
	} else {
		return cb({});
	}
}

module.exports = matchPattern;