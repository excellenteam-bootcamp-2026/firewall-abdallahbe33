function modeValidator(req, res, next) {
    const { mode } = req.body;

    if (!["blacklist", "whitelist"].includes(mode)) {
        return res.status(400).json({
            status: "error",
            code: "INVALID_MODE",
            message: "Mode must be either 'blacklist' or 'whitelist'."
        });
    }

    next();
}

function valuesValidator(req, res, next) {
    const { values } = req.body;

    if (!Array.isArray(values) || values.length === 0) {
        return res.status(400).json({
            status: "error",
            code: "INVALID_VALUES",
            message: "Values must be a non-empty array."
        });
    }

    next();
}

function idsValidator(req, res, next) {
    const { ids } = req.body;

    if (
        !Array.isArray(ids) ||
        ids.length === 0 ||
        !ids.every(id => Number.isInteger(id))
    ) {
        return res.status(400).json({
            status: "error",
            code: "INVALID_IDS",
            message: "Ids must be a non-empty array of integers."
        });
    }

    next();
}

function activeValidator(req, res, next) {
    const { active } = req.body;

    if (typeof active !== "boolean") {
        return res.status(400).json({
            status: "error",
            code: "INVALID_ACTIVE",
            message: "Active must be a Boolean value."
        });
    }

    next();
}

function ipsValidator(req, res, next) {
    const { values } = req.body;

    const ipRegex =
        /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;

    const containsInvalidIp =
        !Array.isArray(values) ||
        !values.every(ip =>
            typeof ip === "string" && ipRegex.test(ip)
        );

    if (containsInvalidIp) {
        return res.status(400).json({
            status: "error",
            code: "INVALID_IP",
            message: "Values must contain valid IPv4 addresses only."
        });
    }

    next();
}

function domainsValidator(req, res, next) {
    const { values } = req.body;

    const domainRegex =
        /^(?=.{1,253}$)(?!-)(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/;

    const containsInvalidDomain =
        !Array.isArray(values) ||
        !values.every(domain =>
            typeof domain === "string" && domainRegex.test(domain)
        );

    if (containsInvalidDomain) {
        return res.status(400).json({
            status: "error",
            code: "INVALID_DOMAIN",
            message: "Domains must not contain a protocol, path, or port."
        });
    }

    next();
}

function portsValidator(req, res, next) {
    const { values } = req.body;

    const containsInvalidPort =
        !Array.isArray(values) ||
        !values.every(port =>
            Number.isInteger(port) &&
            port >= 1 &&
            port <= 65535
        );

    if (containsInvalidPort) {
        return res.status(400).json({
            status: "error",
            code: "INVALID_PORT",
            message: "Ports must be integers between 1 and 65535."
        });
    }

    next();
}

module.exports = {
    modeValidator,
    valuesValidator,
    idsValidator,
    activeValidator,
    ipsValidator,
    domainsValidator,
    portsValidator
};