"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAddFirewallRules = createAddFirewallRules;
function createAddFirewallRules(firewallRepository) {
    return async function addFirewallRules(values, type, mode) {
        const rules = values.map(value => ({
            type,
            mode,
            active: true,
            value
        }));
        return Promise.all(rules.map(rule => firewallRepository.saveRule(rule)));
    };
}
//# sourceMappingURL=addFirewallRules.js.map