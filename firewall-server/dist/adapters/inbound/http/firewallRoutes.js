"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFirewallRoutes = createFirewallRoutes;
const express_1 = require("express");
const validateFirewallRequest_1 = require("./middleware/validateFirewallRequest");
function createFirewallRoutes(firewallController) {
    const router = (0, express_1.Router)();
    router.post("/ips", validateFirewallRequest_1.validateCommonRuleRequest, validateFirewallRequest_1.validateIpValues, firewallController.addIps.bind(firewallController));
    router.post("/domains", validateFirewallRequest_1.validateCommonRuleRequest, validateFirewallRequest_1.validateDomainValues, firewallController.addDomains.bind(firewallController));
    router.post("/ports", validateFirewallRequest_1.validateCommonRuleRequest, validateFirewallRequest_1.validatePortValues, firewallController.addPorts.bind(firewallController));
    router.get("/rules", firewallController.getAllRules.bind(firewallController));
    router.delete("/rules", validateFirewallRequest_1.validateIds, firewallController.deleteRules.bind(firewallController));
    router.patch("/rules/status", validateFirewallRequest_1.validateIds, validateFirewallRequest_1.validateActive, firewallController.updateRulesStatus.bind(firewallController));
    return router;
}
//# sourceMappingURL=firewallRoutes.js.map