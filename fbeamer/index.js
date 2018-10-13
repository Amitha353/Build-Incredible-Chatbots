'use strict';
const request = require('request');
const crypto = require('crypto');

class FBeamer {
	constructor(config) {
		try {
			if (!config || config.PAGE_ACCESS_TOKEN === undefined || config.VERIFY_TOKEN === undefined || config.APP_SECRET === undefined) {
				throw new Error("Unable to access tokens!");
			} else {
				this.PAGE_ACCESS_TOKEN = config.PAGE_ACCESS_TOKEN;
				this.VERIFY_TOKEN = config.VERIFY_TOKEN;
				this.APP_SECRET = config.APP_SECRET;
			}
		} catch (e) {
			console.log(e);
		}
	}

	registerHook(req, res) {
		// If req.query.hub.mode is 'subscribe'
		// and if req.query.hub.verify_token is the same as this.VERIFY_TOKEN
		// then send back an HTTP status 200 and req.query.hub.challenge
		let {
			mode,
			verify_token,
			challenge
		} = req.query.hub;

		if (mode === 'subscribe' && verify_token === this.VERIFY_TOKEN) {
			return res.end(challenge);
		} else {
			console.log("Could not register webhook!");
			return res.status(403).end();
		}
	}

	verifySignature(req, res, next) {
		let rawData = '';

		req.on('data', function(data) {
			rawData += data;
		});

		req.on('end', () => {
			let hash = crypto.createHmac('sha1', this.APP_SECRET).update(rawData).digest('hex');
			let signature = req.headers['x-hub-signature'];
			if (hash !== signature.split("=")[1]) {
				// Implement a logging and notification mechanism
				console.error("ERROR: INVALID SIGNATURE");
			}

		});
		return next();
	}

	subscribe() {
		request({
			uri: 'https://graph.facebook.com/v2.6/me/subscribed_apps',
			qs: {
				access_token: this.PAGE_ACCESS_TOKEN
			},
			method: 'POST'
		}, (error, response, body) => {
			if (!error && JSON.parse(body).success) {
				console.log("Subscribed to the page!");
			} else {
				console.log(error);
			}
		});
	}

	incoming(req, res, cb) {
		// Extract the body of the POST request
		let data = req.body;

		if (data.object === 'page') {
			// Iterate through the page entry Array
			data.entry.forEach(pageObj => {
				// Iterate through the messaging Array
				pageObj.messaging.forEach(msgEvent => {
					let messageObj = {
						sender: msgEvent.sender.id,
						timeOfMessage: msgEvent.timestamp,
						message: msgEvent.message
					}
					cb(messageObj);
				});
			});
		}
		res.send(200);
	}

	sendMessage(payload) {
		return new Promise((resolve, reject) => {
			// Create an HTTP POST request
			request({
				uri: 'https://graph.facebook.com/v2.6/me/messages',
				qs: {
					access_token: this.PAGE_ACCESS_TOKEN
				},
				method: 'POST',
				json: payload
			}, (error, response, body) => {
				if (!error && response.statusCode === 200) {
					resolve({
						messageId: body.message_id
					});
				} else {
					reject(error);
				}
			});
		});
	}

	// Send a text message
	txt(id, text, messaging_type = 'RESPONSE') {
		let obj = {
			messaging_type,
			recipient: {
				id
			},
			message: {
				text
			}
		}

		this.sendMessage(obj)
			.catch(error => console.log(error));
	}

	// Send an image message
	img(id, url, messaging_type = 'RESPONSE') {
		let obj = {
			messaging_type,
			recipient: {
				id
			},
			message: {
				attachment: {
					type: 'image',
					payload: {
						url
					}
				}
			}
		}

		this.sendMessage(obj)
			.catch(error => console.log(error));
	}
}

module.exports = FBeamer;