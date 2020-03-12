'use strict';

var epc = require('../');
//var epc = require('node-epc');
let example = "30340129FC54C544A817C812"
// Parse using a specific encoding
epc.getParser('SGTIN')
	.then(function(sgtin) {
		sgtin.parse(example)
			.then(function(parsed) {
                let barcodeWOCheckBit = parsed.parts.CompanyPrefix + parsed.parts.ItemReference
                let barcodeWCheckBit = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                for(let i = 1; i < barcodeWOCheckBit.length; i++) {
                    if((i+1)%2 == 0) {
                        let val = parseInt(barcodeWOCheckBit[i]) * 3;
                        barcodeWCheckBit[i] = barcodeWOCheckBit[i];
                        barcodeWCheckBit[barcodeWOCheckBit.length] += val;
                    } else {
                        let val = parseInt(barcodeWOCheckBit[i]) * 1;
                        barcodeWCheckBit[i] = barcodeWOCheckBit[i];
                        barcodeWCheckBit[barcodeWOCheckBit.length] += val;
                    }
                }

                barcodeWCheckBit[barcodeWOCheckBit.length] = Math.abs((Math.round(barcodeWCheckBit[barcodeWOCheckBit.length]/10)*10) -  barcodeWCheckBit[barcodeWOCheckBit.length]);
                console.debug("Barcode: ", barcodeWCheckBit.slice(1,barcodeWCheckBit.length).join(''));
			})
			.fail(function(err) {
				console.error(err);
			});
	});
