let present = [{
	codes: [5,6,7,8,9,10],
	prefix: "there is"
}, {
	codes: [11,12,13,14,37,38,39,40,42,45,46,47,3,4],
	prefix: "there are"
}, {
	codes: [0,1,2],
	prefix: "there is a"
}, {
	codes: [20,22,23,25,26,27,28,29,30,31,32,33,34,36,44,24],
	prefix: "it is"
}];

let future = [{
	codes: [0,1,2],
	prefix: "there will be a"
}, {
	codes: [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,21,35,37,38,39,40,41,42,43,45,46,47,3,4],
	prefix: "there will be"
}, {
	codes: [20,22,23,25,26,27,28,29,30,31,32,33,34,36,44,24],
	prefix: "it will be"
}];

module.exports = {
	present,
	future
}