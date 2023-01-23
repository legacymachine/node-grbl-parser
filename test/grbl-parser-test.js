const util = require('util');

const GrblParser = require("../lib/grbl-parser");
const { GRBL_RESPONSE_TYPES } = require("../lib/constants");
const { validResponses } = require("./spec_constants");

const grbl = new GrblParser();

console.log("\n\n");

const responseTypes = Object.keys(GRBL_RESPONSE_TYPES);
const validResponseTypes = Object.keys(validResponses);

responseTypes.forEach((type) => {
    grbl.on(type, (data) => {
        console.log(util.inspect(data, false, null, true), "\n\n");
    });
});

validResponseTypes.forEach((type) => {
    validResponses[type].forEach((response) => {
        grbl.parseResponse(response);
    });
});