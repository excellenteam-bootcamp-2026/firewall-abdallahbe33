const ruleService = require("../service/ruleService");

function formatCreatedRule(rule) {
    return {
        id: rule.id,
        value: rule.value,
        active: rule.active
    };
}

function addIP(req, res) {
    const { values, mode } = req.body;

    const createdValues = values.map(value => {
        const rule = ruleService.addIP(value, mode);
        return formatCreatedRule(rule);
    });

    res.status(201).json({
        type: "ip",
        mode,
        values: createdValues,
        status: "success"
    });
}

function addDomain(req, res) {
    const { values, mode } = req.body;

    const createdValues = values.map(value => {
        const rule = ruleService.addDomain(value, mode);
        return formatCreatedRule(rule);
    });

    res.status(201).json({
        type: "domain",
        mode,
        values: createdValues,
        status: "success"
    });
}

function addPort(req, res) {
    const { values, mode } = req.body;

    const createdValues = values.map(value => {
        const rule = ruleService.addPort(value, mode);
        return formatCreatedRule(rule);
    });

    res.status(201).json({
        type: "port",
        mode,
        values: createdValues,
        status: "success"
    });
}

function deleteRule(req, res) {
    const { ids } = req.body;
    const rules = ruleService.getRules();

    const missingId = ids.find(
        id => !rules.some(rule => rule.id === id)
    );

    if (missingId !== undefined) {
        return res.status(404).json({
            status: "error",
            code: "RULE_NOT_FOUND",
            message: `Rule with id ${missingId} not found.`
        });
    }

    const removed = ids.map(id => {
        const rule = rules.find(currentRule => currentRule.id === id);
        ruleService.deleteRule(id);
        return rule;
    });

    res.status(200).json({
        removed,
        status: "success"
    });
}

function getRules(req, res) {
    const { type } = req.query;
    const rules = ruleService.getRules();

    const pluralNames = {
        ip: "ips",
        domain: "domains",
        port: "ports"
    };

    if (type) {
        if (!pluralNames[type]) {
            return res.status(400).json({
                status: "error",
                code: "INVALID_TYPE",
                message: "Type must be 'ip', 'domain', or 'port'."
            });
        }

        return res.status(200).json({
            [pluralNames[type]]: rules.filter(rule => rule.type === type)
        });
    }

    res.status(200).json({
        ips: rules.filter(rule => rule.type === "ip"),
        domains: rules.filter(rule => rule.type === "domain"),
        ports: rules.filter(rule => rule.type === "port")
    });
}

function updateRuleStatus(req, res) {
    const { ids, active } = req.body;
    const rules = ruleService.getRules();

    const missingId = ids.find(
        id => !rules.some(rule => rule.id === id)
    );

    if (missingId !== undefined) {
        return res.status(404).json({
            status: "error",
            code: "RULE_NOT_FOUND",
            message: `Rule with id ${missingId} not found.`
        });
    }

    const updated = ids.map(id =>
        ruleService.updateRuleStatus(id, active)
    );

    res.status(200).json({
        updated,
        status: "success"
    });
}

module.exports = {
    addIP,
    addDomain,
    addPort,
    deleteRule,
    getRules,
    updateRuleStatus
};