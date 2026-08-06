const {firewallRules,generateId,createRule} = require('../data/firewallStore');


function addIP(value, mode) {
    return createRule(value, 'ip', mode);
}

function addDomain(value, mode) {
    return createRule(value, 'domain', mode);
}

function addPort(value, mode) {
    return createRule(value, 'port', mode);
}

function deleteRule(id) {
    const index = firewallRules.findIndex(rule => rule.id === id);
    if (index !== -1) {
        firewallRules.splice(index, 1);
        return true;
    }
    return false;
}

function getRules() {
    return firewallRules;
}

function updateRuleStatus(id, active) {
    const rule = firewallRules.find(rule => rule.id === id);
    if (rule) {
        rule.active = active;
        return rule;
    }
    return null;
}

module.exports = {
    addIP,
    addDomain,
    addPort,
    deleteRule,
    getRules,
    updateRuleStatus
};
