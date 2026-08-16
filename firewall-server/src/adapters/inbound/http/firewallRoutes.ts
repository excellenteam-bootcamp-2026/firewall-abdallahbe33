import { Router } from "express";
import { FirewallController } from "./firewallController";

import {
  validateCommonRuleRequest,
  validateIpValues,
  validateDomainValues,
  validatePortValues,
  validateIds,
  validateActive
} from "./middleware/validateFirewallRequest";

export function createFirewallRoutes(
  firewallController: FirewallController
) {
  const router = Router();

  router.post(
    "/ips",
    validateCommonRuleRequest,
    validateIpValues,
    firewallController.addIps.bind(firewallController)
  );

  router.post(
    "/domains",
    validateCommonRuleRequest,
    validateDomainValues,
    firewallController.addDomains.bind(firewallController)
  );

  router.post(
    "/ports",
    validateCommonRuleRequest,
    validatePortValues,
    firewallController.addPorts.bind(firewallController)
  );

  router.get(
    "/rules",
    firewallController.getAllRules.bind(firewallController)
  );

  router.delete(
    "/rules",
    validateIds,
    firewallController.deleteRules.bind(firewallController)
);

  router.patch(
    "/rules/status",
    validateIds,
    validateActive,
    firewallController.updateRulesStatus.bind(firewallController)
);

  return router;
}