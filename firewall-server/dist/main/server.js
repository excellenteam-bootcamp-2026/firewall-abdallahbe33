"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_1 = require("./env");
const main_1 = require("./main");
const Logger_1 = require("./Logger");
const db_1 = require("../adapters/outbound/persistence/postgres/db");
(0, Logger_1.overrideConsole)();
const app = (0, express_1.default)();
const PORT = env_1.config.port;
app.use(express_1.default.json());
// Log every request
const requestLoggerMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};
app.use(requestLoggerMiddleware);
// Firewall API routes
app.use("/api/firewall", main_1.firewallRoutes);
// Handle unknown routes
app.use((req, res) => {
    return res.status(404).json({
        status: "error",
        code: "NOT_FOUND",
        message: "Endpoint not found."
    });
});
// Handle unexpected errors
app.use((err, req, res, next) => {
    console.error(err);
    return res.status(500).json({
        status: "error",
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong."
    });
});
async function startServer() {
    await (0, db_1.connectToDatabase)();
    await (0, db_1.runMigrations)();
    app.listen(env_1.config.port, () => {
        console.log(`Server is running on port ${env_1.config.port}`);
    });
}
startServer();
//# sourceMappingURL=server.js.map