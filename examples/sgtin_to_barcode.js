'use strict';

var epc = require('../');

//var epc = require('node-epc');
let epctag = "30340129FC54C544A817C812";

epctag = "30340129FC279DC4A817C80D";


function parseEPC(epctag) {
    return new Promise(async (resolve, reject) => {
        await epc.getParser('SGTIN')
            .then(async function(sgtin) {
                await sgtin.parse(epctag)
                    .then(function(parsed) {
                        // console.log(parsed.parts.gtin13);
                        resolve(parsed.parts.gtin13);
                    })
                    .fail(function(err) {
                        console.error(err);
                        reject(err);
                    });
            });
    });
}

async function demo() {
    let val = await parseEPC(epctag);
    console.log(val);
}


demo();


