let nextId =1;

let firewallRules = [];

function generateId() {
    return nextId++;
}

module.exports = {
    firewallRules: firewallRules,
    createRule : createRule,
    generateId
};

function createRule(value, type, mode) {
    let newRule = {
        id: generateId(),
        value: value,
        type: type,
        mode: mode,
        active : true
    };
    firewallRules.push(newRule);
    return newRule;

}

