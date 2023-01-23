const EventEmitter = require('events');

const { GRBL_RESPONSE_TYPES } = require("./constants");
const Router = require("./router");
const Parser = require("./parser");

/*----- Begin "GrblParser" Class Declaration -----*/
class GrblParser extends EventEmitter {

    constructor(hasEmitter = true) {

        // Call Parent Object
        super();

        this.hasEmitter = hasEmitter;

        // Object Properties
        this.GRBL_RESPONSE_TYPES = GRBL_RESPONSE_TYPES;

        // Object Methods
        this.router = new Router();
        this.parser = new Parser();

    }

    parseResponse(response) {

        // Trim whitespace, newlines, etc from ends of Grbl response
        response = response.trim();

        let parsedResponse = {};

        if (this.router.isStatus(response)) {
            parsedResponse = this.parser.status(response);
        } else if (this.router.isSuccess(response)) {
            parsedResponse = this.parser.success(response);
        } else if (this.router.isWelcome(response)) {
            parsedResponse = this.parser.welcome(response);
        } else if (this.router.isAlarm(response)) {
            parsedResponse = this.parser.alarm(response);
        } else if (this.router.isError(response)) {
            parsedResponse = this.parser.error(response);
        } else if (this.router.isSetting(response)) {
            parsedResponse = this.parser.setting(response);
        } else if (this.router.isFeedback(response)) {
            parsedResponse = this.parser.feedback(response);
        } else if (this.router.isBuildVersion(response)) {
            parsedResponse = this.parser.buildVersion(response);
        } else if (this.router.isBuildOptions(response)) {
            parsedResponse = this.parser.buildOptions(response);
        } else if (this.router.isGcodeStartup(response)) {
            parsedResponse = this.parser.gcodeStartup(response);
        } else if (this.router.isGcodeState(response)) {
            parsedResponse = this.parser.gcodeState(response);
        } else if (this.router.isGcodeSystem(response)) {
            parsedResponse = this.parser.gcodeSystem(response);
        } else if (this.router.isHelp(response)) {
            parsedResponse = this.parser.help(response);
        } else if (this.router.isProbeResult(response)) {
            parsedResponse = this.parser.probeResult(response);
        } else if (this.router.isEcho(response)) {
            parsedResponse = this.parser.echo(response);
        } else {
            parsedResponse = this.parser.unknown(response);
        }

        if (this.hasEmitter) this.emit(parsedResponse.type, parsedResponse);

        return parsedResponse;

    }

}
/*----- End "GrblParser" Class Declaration -----*/

module.exports = GrblParser;