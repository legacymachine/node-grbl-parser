
//const constants = require("./constants");
//const GRBL_RESPONSE_TYPES = constants.GRBL_RESPONSE_TYPES;
//const GRBL_STATUS = constants.GRBL_STATUS;
//const statusSubStateMap = constants.statusSubStateMap;
//const GRBL_GCODES = constants.GRBL_GCODES;
//const GRBL_ERRORS = constants.GRBL_ERRORS;
//const GRBL_ALARMS = constants.GRBL_ALARMS;
//const GRBL_SETTINGS = constants.GRBL_SETTINGS;
//const GRBL_BUILD_OPTIONS = constants.GRBL_BUILD_OPTIONS;

const {
    GRBL_RESPONSE_TYPES,
    GRBL_SETTINGS,
    GRBL_STATUS,
    GRBL_ERRORS,
    GRBL_ALARMS,
    GRBL_BUILD_OPTIONS,
    GRBL_GCODES
} = require("./constants");

/*----- Begin "Parser" Class Declaration -----*/
class Parser {

    constructor() {

    }

    // GRBL Welcome Message Parser
    welcome(welcome) {

        // Grbl 1.1f ['$' for help]
        const welcomeData = welcome.match(/^Grbl\sv?(\d\.\d.)\s\[\'\$\'\sfor\shelp\]$/);

        const data = {
            firmwareVersion: welcomeData[1]
        };

        return {
            type: GRBL_RESPONSE_TYPES.welcome, // TODO: GRBL_RESPONSE_TYPES
            data: data,
            response: welcome
        };
    
    }

    // GRBL G-Code Startup Settings [$N#=] Message Parser
    gcodeStartup(gcodeStartup) {

        // >G54G20:ok
        const startupData = gcodeStartup.replace(">", "").split(":");
        // [G54G20, ok]

        const data = {
            line: startupData[0],
            success: (startupData[1] === "ok")
        };

        return {
            type: GRBL_RESPONSE_TYPES.gcodeStartup, //TODO: GRBL_RESPONSE_TYPES
            data: data,
            response: gcodeStartup
        };
    
    }

    // GRBL Success Message Parser
    success(success) {

        // ok

        const data = {
            success: (success === "ok")
        };

        return {
            type: GRBL_RESPONSE_TYPES.success, //TODO: GRBL_RESPONSE_TYPES
            data: data,
            response: success
        };
    
    }

    // GRBL Alarm Message Parser
    alarm(alarm) {

        // ALARM:9
        // ALARM:Homing fail. Could not find limit switch within search distance.

        const alarmCode = alarm.split(":")[1];

        const data = {};
        
        if (Number.isInteger(parseInt(alarmCode))) {
            data.code = parseInt(alarmCode);
            data.message = GRBL_ALARMS[alarmCode]; //TODO: constants
        } else {
            data.message = alarmCode;
        }

        return {
            type: GRBL_RESPONSE_TYPES.alarm, //TODO: GRBL_RESPONSE_TYPES
            data: data,
            response: alarm
        };
    
    }

    // GRBL Error Message Parser
    error(error) {

        // error:9
        // error:G-code commands are locked out during alarm or jog state.

        const errCode = error.split(":")[1];

        const data = {};

        if (Number.isInteger(parseInt(errCode))) {
            data.code = parseInt(errCode);
            data.message = GRBL_ERRORS[errCode]; //TODO: constants
        } else {
            data.message = errCode;
        }
        
        return {
            type: GRBL_RESPONSE_TYPES.error, //TODO: GRBL_RESPONSE_TYPES
            data: data,
            response: error
        };
    
    }

    // GRBL Settings Message Parser
    setting(setting) {

        // $10=255.5

        const settingData = setting.split("=");

        const data = {
            code: parseInt(settingData[0].match(/\$(\d+)/)[1]),
            value: parseFloat(settingData[1]),
        };

        data.setting = GRBL_SETTINGS[data.code].setting;
        data.units = GRBL_SETTINGS[data.code].units;
        data.description = GRBL_SETTINGS[data.code].description;
        
        return {
            type: GRBL_RESPONSE_TYPES.setting,
            data: data,
            response: setting
        };

    }

    // GRBL G-Code State Message Parser
    gcodeState(state) {

        // [GC:G0 G54 G17 G21 G90 G94 M5 M9 T0 F0 S0]
        const gcodeData = state.replace("[", "").replace("]", "").replace("GC:", "").split(" ");

        const codes = [];

        gcodeData.forEach((code) => {
            if (/G.+/.test(code)) {
                codes.push(GRBL_GCODES.gcode[code]); // TODO: constants
            } else if (/M.+/.test(code)) {
                codes.push(GRBL_GCODES.mcode[code]); // TODO: constants
            } else if (/T.+/.test(code)) {
                codes.push({ code: "T", name: "Tool", description: "The current tool", value: parseInt(code.replace("T", "")) });
            } else if (/F.+/.test(code)) {
                codes.push({ code: "F", name: "Feed rate", description: "The last feed command", value: parseFloat(code.replace("F", "")) });
            } else if (/S.+/.test(code)) {
                codes.push({ code: "S", name: "RPM", description: "The current spindle speed command", value: parseFloat(code.replace("S", "")) });
            } else {
                codes.push({ code: code, description: "Unknown gcode state", name: "Unknown" });
            }
        });

        return {
            type: GRBL_RESPONSE_TYPES.gcodeState, // TODO: GRBL_RESPONSE_TYPES
            data: {
                codes: codes
            },
            response: state
        };

    }

    // GRBL G-Code System Message Parser
    gcodeSystem(system) {

        // [G28:0.000,0.000,0.000]
        // [TLO:0.000]
        // [G28:0.000,-10.225,0.000]

        const systemData = system.replace("[", "").replace("]", "").split(":");

        const data = {};

        if (systemData[0] == "TLO") {
            data.tool = GRBL_GCODES.tool[systemData[0]];
            data.coordinates = { z: parseFloat(systemData[1]) };
        } else {
            data.gcode = GRBL_GCODES.gcode[systemData[0]];
            data.coordinates = this._parseCoordinates(systemData[1]);
        }

        return {
            type: GRBL_RESPONSE_TYPES.gcodeSystem, //TODO: GRBL_RESPONSE_TYPES
            data: data,
            response: system
        };
    
    }

    // GRBL Build Version Message Parser
    buildVersion(version) {

        // [VER:1.1f.20170131:]

        const versionMatch = version.replace("[", "").replace("VER:", "").replace("]", "").split(":"); // ['1.1f.20170131', 'My string!!']
        const versionData = versionMatch[0].match(/^(.+)\.(\d{8})$/);

        const data = {
            firmwareVersion: versionData[1],
            buildDate: versionData[2]
        };
        
        if (versionMatch[1]) data.buildString = versionMatch[1];

        return {
            type: GRBL_RESPONSE_TYPES.buildVersion, //TODO: GRBL_RESPONSE_TYPES
            data: data,
            response: version
        };
    
    }

    // GRBL Build Options Message Parser
    buildOptions(options) {

        // [OPT:V,15,128]

        const versionMatch = options.match(/\[(.+)\]/);
        const versionData = versionMatch[1].split(":")[1];

        const versionOptions = versionData.split(",");
        const versionCodes = versionOptions[0].split("");
        const versionExtras = versionOptions.slice(1, versionOptions.length);

        const buildOptions = [];
        const buildExtras = [];

        versionCodes.forEach((code) => {
            buildOptions.push({code: code, message: GRBL_BUILD_OPTIONS[code]}); //TODO: constants
        });

        versionExtras.forEach((extra) => {
            buildExtras.push(extra);
        });

        return {
            type: GRBL_RESPONSE_TYPES.buildOptions, //TODO: GRBL_RESPONSE_TYPES
            data: {
                options: buildOptions,
                extras: buildExtras,
            },
            response: options
        };
    
    }

    // GRBL Probe Result Message Parser
    probeResult(probeResult) {

        // [PRB:0.000,0.000,1.492:1]

        const probeData = probeResult.replace("[PRB:", "").replace("]", "").split(":"); // ["0.000, 0.000, 1.492", "1"]
        
        const data = {
            location: this._parseCoordinates(probeData[0]),
            success: parseInt(probeData[1]) === 1
        };

        return {
            type: GRBL_RESPONSE_TYPES.probeResult, //TODO: GRBL_RESPONSE_TYPES
            data: data,
            response: probeResult
        };

    }

    // GRBL Help Message Parser
    help(help) {

        // [HLP:$$ $# $G $I $N $x=val $Nx=line $J=line $SLP $C $X $H ~ ! ? ctrl-x]
        const helpData = help.replace("[HLP:", "").replace("]", "").split(" ");
        // [$$, $#, $G, $I, $N, $x=val, $Nx=line, $J=line, $SLP, $C, $X, $H, ~, !, ?, ctrl-x]

        const data = {
            availableCommands: []
        };

        helpData.forEach((command) => {
            data.availableCommands.push(command);
        });

        return {
            type: GRBL_RESPONSE_TYPES.help, //TODO: GRBL_RESPONSE_TYPES
            data: data,
            response: help
        };
    
    }

    // GRBL Echo Message Parser
    echo(echo) {

        // [echo:G1X0.540Y10.4F100]
        const echoData = echo.replace("[", "").replace("]", "").split(":");
        // [echo, G1X0.540Y10.4F100]

        const data = {
            message: echoData[1]
        };

        return {
            type: GRBL_RESPONSE_TYPES.echo, //TODO: GRBL_RESPONSE_TYPES
            data: data,
            response: echo
        };
    
    }

    // GRBL Feedback Message Parser
    feedback(feedback) {

        // [MSG:‘$H’|’$X’ to unlock]
        // [Caution: Unlocked]

        const msg = feedback.replace("[", "").replace("]", "");

        const data = {
            message: msg.includes("MSG:") ? msg.split(":")[1] : msg
        };

        return {
            type: GRBL_RESPONSE_TYPES.feedback, //TODO: GRBL_RESPONSE_TYPES
            data: data,
            response: feedback
        };
    
    }

    // GRBL Unknown Message Parser
    unknown(unknown) {

        return {
            type: GRBL_RESPONSE_TYPES.unknown, //TODO: GRBL_RESPONSE_TYPES
            data: null,
            response: unknown
        };
    
    }

    // GRBL Status Message Parser
    status(status) {

        // <Hold:0|MPos:0.000,0.000,0.000|Bf:15,128|FS:675.5,24000|Ov:120,100,100|WCO:0.000,-5.200,306.351|A:SFM>
        // <Idle,MPos:0.000,0.000,0.000,WPos:0.000,0.000,0.000>

        const match = status.match(/^<(.*)>$/)[1];

        // Hold:0|MPos:0.000,0.000,0.000|Bf:15,128|FS:0,0|WCO:0.000,0.000,306.351
        // Idle,MPos:0.000,0.000,0.000,WPos:0.000,0.000,0.000

        const data = {};

        if (status.includes(",MPos:") || status.includes(",WPos:")) {

            const statusData = match.match(/(\w+)\,(.+)/);
            data.status = this._parseStatus(statusData[1]); // Idle
            const statusParams = statusData[2].match(/([a-zA-Z]+)\:([\d\,\.\-\|]+)\,?/g); // [ "MPos:0.000,0.000,0.000,", "WPos:0.000,0.000,0.000,", "Buf:0,", "RX:0,", "Lim:000" ]

            const paramMap = {};
            const buffer = [];

            statusParams.forEach((param) => {

                const paramData = param.split(":");   // [ "MPos", "0.000,0.000,0.000," ]
                const key = paramData[0];
                const value = paramData[1];

                if (key === "Buf") {
                    buffer[0] = value.replace(",", "");
                }  else if (key === "RX") {
                    buffer[1] = value.replace(",", "");
                } else {
                    data[GRBL_STATUS[key]] = value; //TODO: GRBL_STATUS
                }
                    
            });

            if (buffer.length > 0) data.buffer = buffer.join(",");

        } else {

            const params = match.split("|");
            // ["Hold:0", "MPos:0.000,0.000,0.000", "Bf:15,128", ...]

            data.status = this._parseStatus(params[0]); // "Hold:0"

            const paramsPairs = params.slice(1, params.length);

            paramsPairs.forEach((param) => {
                const paramData = param.split(":");
                data[GRBL_STATUS[paramData[0]]] = paramData[1]; //TODO: GRBL_STATUS
            });

        }

        if (data.machinePosition) {
            data.machinePosition = this._parseCoordinates(data.machinePosition);
        }

        if (data.workPosition) {
            data.workPosition = this._parseCoordinates(data.workPosition);
        }

        if (data.workCoordinateOffset) {
            data.workCoordinateOffset = this._parseCoordinates(data.workCoordinateOffset);
        }

        if (data.accessories) {
            data.accessories = this._parseAccessories(data.accessories);
        }

        if (data.buffer) {
            data.buffer = this._parseBuffer(data.buffer);
        }

        if (data.realtimeFeed) {
            data.realtimeFeed = this._parseFeeds(data.realtimeFeed);
        }

        if (data.override) {
            data.override = this._parseOverride(data.override);
        }

        if (data.pins) {
            data.pins = this._parsePins(data.pins);
        }

        return {
            type: GRBL_RESPONSE_TYPES.status, //TODO: GRBL_RESPONSE_TYPES
            data: data,
            response: status
        };
    
    }

    _parseStatus(status) {

        // Hold:0

        const match = status.split(":");

        const parsedStatus = {
            state: match[0]
        };

        if (match[1]) {
            parsedStatus.code = parseInt(match[1]);
            parsedStatus.message = GRBL_STATUS[match[0]][match[1]]; //TODO: GRBL_STATUS
        }

        return parsedStatus;

    }

    _parseCoordinates(position) {

        // example response: "23.3242,102.2234,0.4200"

        const coordinates = position.split(",");
        const parsedCoordinates = {
            x: parseFloat(coordinates[0]),
            y: parseFloat(coordinates[1]),
            z: parseFloat(coordinates[2])
        };

        return parsedCoordinates;

    }

    _parseAccessories(accessories) {

        // SFM

        const flags = accessories.split("");
        const parsedAccessories = {
            flood: (flags.indexOf("F") > -1) ? true : false,
            mist: (flags.indexOf("M") > -1) ? true : false,
            spindleDirection: (flags.indexOf("S") > -1) ? "CW" : "CCW"
        };
        
        return parsedAccessories;

    }

    _parseBuffer(buffer) {

        // example response: "15,128"

        const bufferData = buffer.split(",");
        const parsedBuffer = {
            availableBlocks: parseFloat(bufferData[0]),
            availableRXBytes: parseFloat(bufferData[1])
        };

        return parsedBuffer;

    }

    _parseFeeds(feeds) {

        // example response: "15.432,12000.5"

        const feedData = feeds.split(",");
        const parsedFeeds = {
            realtimeFeedrate: parseFloat(feedData[0]),
            realtimeSpindle: parseFloat(feedData[1])
        };

        return parsedFeeds;

    }

    _parseOverride(override) {

        // 120,100,100

        const overrideData = override.split(",");
        const parsedOverrideData = {
            feeds: parseFloat(overrideData[0]),
            rapids: parseFloat(overrideData[1]),
            spindle: parseFloat(overrideData[2])
        };

        return parsedOverrideData;

    }

    _parsePins(pins) {

        const parsedPinData = [];

        const limitPinMap = {
            0: "limit-x",
            1: "limit-y",
            2: "limit-z"
        };

        const controlPinMap = {
            0: "door",
            1: "hold",
            2: "soft-reset",
            3: "cycle-start",
        };

        if (/([01]+)\,?([01])?\,?([01]+)?/.test(pins)) {

            // 000,1,0000

            const pinMatch = pins.match(/(\d{3})?(\|\d\|)?(\d+)?/);
            const xyzPins = pinMatch[1];
            const probePin = pinMatch[2];
            const controlPins = pinMatch[3];

            let pin = null;

            if (xyzPins) {
                const limitPins = xyzPins.split("");
                limitPins.forEach((value, index) => {
                    pin = {pin: limitPinMap[index], on: (value === "1")}; //TODO: limitPinMap
                    parsedPinData.push(pin);
                });
            }

            if (probePin) {
                parsedPinData.push({pin: "probe", on: probePin.replace(/\|/g, "") === "1" });
            }

            if (controlPins) {
                controlPins.split("").forEach((pin, index) => {
                    parsedPinData.push({pin: controlPinMap[index], on: pin === "1" }); //TODO: controlPinMap
                });
            }
        } else {

            const grbl11pinMap = {
                "X": "limit-x",
                "Y": "limit-y",
                "Z": "limit-z",
                "P": "probe",
                "D": "door",
                "H": "hold",
                "R": "soft-reset",
                "S": "cycle-start",
            };

            const pinData = pins.split("");

            pinData.forEach((pin, index) => {
                pin = {pin: grbl11pinMap[pin], on: true};
                parsedPinData.push(pin);
            });

        }

        return parsedPinData;

    }

}
/*----- End "Parser" Class Declaration -----*/

module.exports = Parser;