"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
exports.overrideConsole = overrideConsole;
const fs_1 = __importDefault(require("fs"));
const winston_1 = __importDefault(require("winston"));
const env_1 = require("./env");
class Logger {
    static instance;
    logger;
    constructor() {
        const transports = [];
        if (env_1.config.isDevelopment) {
            transports.push(new winston_1.default.transports.Console());
        }
        else {
            // Make sure the log directory exists in production
            fs_1.default.mkdirSync("logs", { recursive: true });
            transports.push(new winston_1.default.transports.File({
                filename: "logs/app.log"
            }));
        }
        this.logger = winston_1.default.createLogger({
            level: env_1.config.isDevelopment ? "debug" : "info",
            format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.errors({ stack: true }), winston_1.default.format.json()),
            transports
        });
    }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    info(message) {
        this.logger.info(message);
    }
    debug(message) {
        this.logger.debug(message);
    }
    warn(message) {
        this.logger.warn(message);
    }
    error(message) {
        this.logger.error(message);
    }
}
exports.Logger = Logger;
function overrideConsole() {
    const logger = Logger.getInstance();
    console.log = (...args) => {
        logger.info(args.map(String).join(" "));
    };
    console.info = (...args) => {
        logger.info(args.map(String).join(" "));
    };
    console.warn = (...args) => {
        logger.warn(args.map(String).join(" "));
    };
    console.error = (...args) => {
        logger.error(args.map(String).join(" "));
    };
    console.debug = (...args) => {
        logger.debug(args.map(String).join(" "));
    };
}
//# sourceMappingURL=Logger.js.map