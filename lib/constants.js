module.exports.GRBL_SUPPORTED_VERSIONS = ['Grbl 1.1e', 'Grbl 1.1f'];

module.exports.GRBL_RESPONSE_TYPES = {
    welcome: "welcome",
    gcodeStartup: "gcodeStartup",
    status: "status",
    success: "success",
    alarm: "alarm",
    error: "error",
    setting: "setting",
    feedback: "feedback",
    buildVersion: "buildVersion",
    buildOptions: "buildOptions",
    gcodeState: "gcodeState",
    gcodeSystem: "gcodeSystem",
    help: "help",
    probeResult: "probeResult",
    echo: "echo",
    unknown: "unknown"
};

module.exports.GRBL_SETTINGS = {
    0: {
        "code": "0",
        "setting": "Step pulse time",
        "units": "microseconds",
        "description": "Sets time length per step. Minimum 3usec."
    },
    1: {
        "code": "1",
        "setting": "Step idle delay",
        "units": "milliseconds",
        "description": "Sets a short hold delay when stopping to let dynamics settle before disabling steppers. Value 255 keeps motors enabled with no delay."
    },
    2: {
        "code": "2",
        "setting": "Step pulse invert",
        "units": "mask",
        "description": "Inverts the step signal. Set axis bit to invert (00000ZYX)."
    },
    3: {
        "code": "3",
        "setting": "Step direction invert",
        "units": "mask",
        "description": "Inverts the direction signal. Set axis bit to invert (00000ZYX)."
    },
    4: {
        "code": "4",
        "setting": "Invert step enable pin",
        "units": "boolean",
        "description": "Inverts the stepper driver enable pin signal."
    },
    5: {
        "code": "5",
        "setting": "Invert limit pins",
        "units": "boolean",
        "description": "Inverts the all of the limit input pins."
    },
    6: {
        "code": "6",
        "setting": "Invert probe pin",
        "units": "boolean",
        "description": "Inverts the probe input pin signal."
    },
    10: {
        "code": "10",
        "setting": "Status report options",
        "units": "mask",
        "description": "Alters data included in status reports."
    },
    11: {
        "code": "11",
        "setting": "Junction deviation",
        "units": "millimeters",
        "description": "Sets how fast Grbl travels through consecutive motions. Lower value slows it down."
    },
    12: {
        "code": "12",
        "setting": "Arc tolerance",
        "units": "millimeters",
        "description": "Sets the G2 and G3 arc tracing accuracy based on radial error. Beware: A very small value may effect performance."
    },
    13: {
        "code": "13",
        "setting": "Report in inches",
        "units": "boolean",
        "description": "Enables inch units when returning any position and rate value that is not a settings value."
    },
    20: {
        "code": "20",
        "setting": "Soft limits enable",
        "units": "boolean",
        "description": "Enables soft limits checks within machine travel and sets alarm when exceeded. Requires homing."
    },
    21: {
        "code": "21",
        "setting": "Hard limits enable",
        "units": "boolean",
        "description": "Enables hard limits. Immediately halts motion and throws an alarm when switch is triggered."
    },
    22: {
        "code": "22",
        "setting": "Homing cycle enable",
        "units": "boolean",
        "description": "Enables homing cycle. Requires limit switches on all axes."
    },
    23: {
        "code": "23",
        "setting": "Homing direction invert",
        "units": "mask",
        "description": "Homing searches for a switch in the positive direction. Set axis bit (00000ZYX) to search in negative direction."
    },
    24: {
        "code": "24",
        "setting": "Homing locate feed rate",
        "units": "mm/min",
        "description": "Feed rate to slowly engage limit switch to determine its location accurately."
    },
    25: {
        "code": "25",
        "setting": "Homing search seek rate",
        "units": "mm/min",
        "description": "Seek rate to quickly find the limit switch before the slower locating phase."
    },
    26: {
        "code": "26",
        "setting": "Homing switch debounce delay",
        "units": "milliseconds",
        "description": "Sets a short delay between phases of homing cycle to let a switch debounce."
    },
    27: {
        "code": "27",
        "setting": "Homing switch pull-off distance",
        "units": "millimeters",
        "description": "Retract distance after triggering switch to disengage it. Homing will fail if switch isn't cleared."
    },
    30: {
        "code": "30",
        "setting": "Maximum spindle speed",
        "units": "RPM",
        "description": "Maximum spindle speed. Sets PWM to 100% duty cycle."
    },
    31: {
        "code": "31",
        "setting": "Minimum spindle speed",
        "units": "RPM",
        "description": "Minimum spindle speed. Sets PWM to 0.4% or lowest duty cycle."
    },
    32: {
        "code": "32",
        "setting": "Laser-mode enable",
        "units": "boolean",
        "description": "Enables laser mode. Consecutive G1/2/3 commands will not halt when spindle speed is changed."
    },
    100: {
        "code": "100",
        "setting": "X-axis travel resolution",
        "units": "step/mm",
        "description": "X-axis travel resolution in steps per millimeter."
    },
    101: {
        "code": "101",
        "setting": "Y-axis travel resolution",
        "units": "step/mm",
        "description": "Y-axis travel resolution in steps per millimeter."
    },
    102: {
        "code": "102",
        "setting": "Z-axis travel resolution",
        "units": "step/mm",
        "description": "Z-axis travel resolution in steps per millimeter."
    },
    110: {
        "code": "110",
        "setting": "X-axis maximum rate",
        "units": "mm/min",
        "description": "X-axis maximum rate. Used as G0 rapid rate."
    },
    111: {
        "code": "111",
        "setting": "Y-axis maximum rate",
        "units": "mm/min",
        "description": "Y-axis maximum rate. Used as G0 rapid rate."
    },
    112: {
        "code": "112",
        "setting": "Z-axis maximum rate",
        "units": "mm/min",
        "description": "Z-axis maximum rate. Used as G0 rapid rate."
    },
    120: {
        "code": "120",
        "setting": "X-axis acceleration",
        "units": "mm/sec^2",
        "description": "X-axis acceleration. Used for motion planning to not exceed motor torque and lose steps."
    },
    121: {
        "code": "121",
        "setting": "Y-axis acceleration",
        "units": "mm/sec^2",
        "description": "Y-axis acceleration. Used for motion planning to not exceed motor torque and lose steps."
    },
    122: {
        "code": "122",
        "setting": "Z-axis acceleration",
        "units": "mm/sec^2",
        "description": "Z-axis acceleration. Used for motion planning to not exceed motor torque and lose steps."
    },
    130: {
        "code": "130",
        "setting": "X-axis maximum travel",
        "units": "millimeters",
        "description": "Maximum X-axis travel distance from homing switch. Determines valid machine space for soft-limits and homing search distances."
    },
    131: {
        "code": "131",
        "setting": "Y-axis maximum travel",
        "units": "millimeters",
        "description": "Maximum Y-axis travel distance from homing switch. Determines valid machine space for soft-limits and homing search distances."
    },
    132: {
        "code": "132",
        "setting": "Z-axis maximum travel",
        "units": "millimeters",
        "description": "Maximum Z-axis travel distance from homing switch. Determines valid machine space for soft-limits and homing search distances."
    }
};

module.exports.GRBL_STATUS = {
    "Idle": "idle",
    "Run": "run",
    "Hold": [
        "Hold complete. Ready to resume.", 
        "Hold in-progress. Reset will throw an alarm."
    ],
    "Door": [
        "Door closed. Ready to resume.", 
        "Machine stopped. Door still ajar. Can't resume until closed.", 
        "Door opened. Hold (or parking retract) in-progress. Reset will throw an alarm.", 
        "Door closed and resuming. Restoring from park, if applicable. Reset will throw an alarm."
    ],
    "Home": "home",
    "Sleep": "sleep",
    "Alarm": "alarm",
    "Check": "check",
    "A": "accessories",
    "Bf": "buffer",
    "Buf": "buffer",
    "RX": "buffer",
    "FS": "realtimeFeed",
    "MPos": "machinePosition",
    "Ov": "override",
    "Lim": "pins",
    "Pn": "pins",
    "Pin": "pins",
    "WCO": "workCoordinateOffset",
    "WPos": "workPosition"
};

module.exports.GRBL_ERRORS = {
    1: "G-code words consist of a letter and a value. Letter was not found.",
    2: "Missing the expected G-code word value or numeric value format is not valid.",
    3: "Grbl '$' system command was not recognized or supported.",
    4: "Negative value received for an expected positive value.",
    5: "Homing cycle failure. Homing is not enabled via settings.",
    6: "Minimum step pulse time must be greater than 3usec.",
    7: "An EEPROM read failed. Auto-restoring affected EEPROM to default values.",
    8: "Grbl '$' command cannot be used unless Grbl is IDLE. Ensures smooth operation during a job.",
    9: "G-code commands are locked out during alarm or jog state.",
    10: "Soft limits cannot be enabled without homing also enabled.",
    11: "Max characters per line exceeded. Received command line was not executed.",
    12: "Grbl '$' setting value cause the step rate to exceed the maximum supported.",
    13: "Safety door detected as opened and door state initiated.",
    14: "Build info or startup line exceeded EEPROM line length limit. Line not stored.",
    15: "Jog target exceeds machine travel. Jog command has been ignored.",
    16: "Jog command has no '=' or contains prohibited g-code.",
    17: "Laser mode requires PWM output.",
    20: "Unsupported or invalid g-code command found in block.",
    21: "More than one g-code command from same modal group found in block.",
    22: "Feed rate has not yet been set or is undefined.",
    23: "G-code command in block requires an integer value.",
    24: "More than one g-code command that requires axis words found in block.",
    25: "Repeated g-code word found in block.",
    26: "No axis words found in block for g-code command or current modal state which requires them.",
    27: "Line number value is invalid.",
    28: "G-code command is missing a required value word.",
    29: "G59.x work coordinate systems are not supported.",
    30: "G53 only allowed with G0 and G1 motion modes.",
    31: "Axis words found in block when no command or current modal state uses them.",
    32: "G2 and G3 arcs require at least one in-plane axis word.",
    33: "Motion command target is invalid.",
    34: "Arc radius value is invalid.",
    35: "G2 and G3 arcs require at least one in-plane offset word.",
    36: "Unused value words found in block.",
    37: "G43.1 dynamic tool length offset is not assigned to configured tool length axis.",
    38: "Tool number greater than max supported value."
};

module.exports.GRBL_ALARMS = {
    1: "Hard limit triggered",
    2: "G-code motion target exceeds machine travel.",
    3: "Reset while in motion. Lost steps are likely.",
    4: "Probe fail. The probe is not in the expected initial state before starting probe cycle.",
    5: "Probe fail. Probe did not contact the workpiece.",
    6: "Homing fail. Reset during active homing cycle.",
    7: "Homing fail. Safety door was opened during active homing cycle.",
    8: "Homing fail. Cycle failed to clear limit switch when pulling off.",
    9: "Homing fail. Could not find limit switch within search distance."
};

module.exports.GRBL_BUILD_OPTIONS = {
    "V": "Variable spindle enabled",
    "N": "Line numbers enabled",
    "M": "Mist coolant enabled",
    "C": "CoreXY enabled",
    "P": "Parking motion enabled",
    "Z": "Homing force origin enabled",
    "H": "Homing single axis enabled",
    "T": "Two limit switches on axis enabled",
    "A": "Allow feed rate overrides in probe cycles",
    "*": "Restore all EEPROM disabled",
    "$": "Restore EEPROM $ settings disabled",
    "#": "Restore EEPROM parameter data disabled",
    "I": "Build info write user string disabled",
    "E": "Force sync upon EEPROM write disabled",
    "W": "Force sync upon work coordinate offset change disabled",
    "L": "Homing init lock sets Grbl into an alarm state upon power up"
};

module.exports.GRBL_GCODES = {
    "gcode": {
        "G0": {
            "code": "G0",
            "name": "Movement",
            "description": "The last movement command"
        },
        "G54": {
            "code": "G54",
            "name": "WCS",
            "description": "Default Work Coordinate System"
        },
        "G17": {
            "code": "G17",
            "name": "Plane",
            "description": "X Y (default)"
        },
        "G21": {
            "code": "G21",
            "name": "Units",
            "description": "Current units"
        },
        "G28": {
            "code": "G28",
            "name": "Predefined Position",
            "description": "Go to Predefined Position"
        },
        "G90": {
            "code": "G90",
            "name": "Distance Mode",
            "description": "Absolute distance mode"
        },
        "G94": {
            "code": "G94",
            "name": "Feed Rate Mode",
            "description": "Units per minute mode"
        }
    },
    "mcode": {
        "M0": {
            "code": "M0",
            "name": "Suspended",
            "description": "Machine is currently suspended"
        },
        "M5": {
            "code": "M5",
            "name": "Spindle",
            "description": "Spindle stopped"
        },
        "M9": {
            "code": "M9",
            "name": "Coolant",
            "description": "Coolant stopped"
        }
    },
    "tool": {
        "TLO": {
            "code": "TLO",
            "name": "Tool length offset",
            "description": "The distance the tool is offset from the current WCS"
        }
    }
};