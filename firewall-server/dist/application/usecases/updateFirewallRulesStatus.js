"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUpdateFirewallRulesStatus = createUpdateFirewallRulesStatus;
function createUpdateFirewallRulesStatus(firewallRepository) {
    return async function updateFirewallRulesStatus(ids, active) {
        const allRules = await firewallRepository.getAllRules();
        const allIdsExist = ids.every(id => allRules.some(rule => rule.id === id));
        if (!allIdsExist) {
            throw new Error("RULE_NOT_FOUND");
        }
        return await firewallRepository.updateRulesStatus(ids, active);
    };
}
//# sourceMappingURL=updateFirewallRulesStatus.js.map