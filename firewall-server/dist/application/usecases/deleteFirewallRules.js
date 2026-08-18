"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeleteFirewallRules = createDeleteFirewallRules;
function createDeleteFirewallRules(firewallRepository) {
    return async function deleteFirewallRules(ids) {
        const allRules = await firewallRepository.getAllRules();
        const allIdsExist = ids.every(id => allRules.some(rule => rule.id === id));
        if (!allIdsExist) {
            throw new Error("RULE_NOT_FOUND");
        }
        return await firewallRepository.deleteRules(ids);
    };
}
//# sourceMappingURL=deleteFirewallRules.js.map