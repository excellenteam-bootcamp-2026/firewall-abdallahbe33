"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGetFirewallRules = createGetFirewallRules;
function createGetFirewallRules(firewallRepository) {
    return async function getFirewallRules() {
        return await firewallRepository.getAllRules();
    };
}
//# sourceMappingURL=getFirewallRules.js.map