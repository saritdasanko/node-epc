'use strict';

var epc = require('../');

//var epc = require('node-epc');
let example = "30363A22CC00AB437E11D630"


epc.getParser('SGTIN')
	.then(function(sgtin) {
		sgtin.parse(example)
			.then(function(parsed) {
               console.log(parsed.parts.gtin13);
			})
			.fail(function(err) {
				console.error(err);
			});
	});
