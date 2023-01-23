/*----- Begin "Router" Class Declaration -----*/
class Router {

    constructor() {

    }

    // GRBL Welcome Message Router
    isWelcome(msg) {
        return /^Grbl\sv?(\d\.\d.)\s\[\'\$\'\sfor\shelp\]$/.test(msg);
    }

    // GRBL G-Code Startup Settings [$N#=] Message Router
    isGcodeStartup(msg) {
        return /^\>?.+\:?ok$/.test(msg);
    }

    // GRBL Success Message Router
    isSuccess(msg) {
        return /^ok$/.test(msg);
    }

    // GRBL Status Message Router
    isStatus(msg) {
        return /^<.*>$/.test(msg);
    }

    // GRBL Alarm Message Router
    isAlarm(msg) {
        return /^ALARM:.+$/.test(msg);
    }

    // GRBL Error Message Router
    isError(msg) {
        return /^error:.+$/.test(msg);
    }

    // GRBL Setting Message Router
    isSetting(msg) {
        return /^\$\d+\=.+$/.test(msg);
    }

    // GRBL Build Version Message Router
    isBuildVersion(msg) {
        return /^\[(VER:)?(\d\.\d\w).+\:.*\]$/.test(msg);
    }

    // GRBL Build Options Message Router
    isBuildOptions(msg) {
        return /^\[OPT\:.*\]$/.test(msg);
    }

    // GRBL Feedback Message Router
    isFeedback(msg) {
        if (/^\[((?!G|VER:|TLO|OPT|HLP|echo|PRB).+)\]$/.test(msg)) {
            return !/^\[(VER:)?(\d\.\d\w).+\:.*\]$/.test(msg);
        } else {
            return false;
        }
    }

    // GRBL G-Code State Message Router
    isGcodeState(msg) {
        return /^\[.+(G\d).+(M\d).+\]$/.test(msg);
    }

    // GRBL G-Code System Message Router
    isGcodeSystem(msg) {
        return /^\[(G\d+|TLO)\:.*\]$/.test(msg);
    }

    // GRBL Help Message Router
    isHelp(msg) {
        return /^\[HLP\:.*\]$/.test(msg);
    }

    // GRBL Probe Result Message Router
    isProbeResult(msg) {
        return /^\[PRB\:.*\]$/.test(msg);
    }

    // GRBL Echo Message Router
    isEcho(msg) {
        return /^\[echo\:.*\]$/.test(msg);
    }

}
/*----- End "Router" Class Declaration -----*/

module.exports = Router;