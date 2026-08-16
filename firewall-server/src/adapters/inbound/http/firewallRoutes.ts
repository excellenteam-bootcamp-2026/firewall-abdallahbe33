import { Router } from "express";
import { FirewallController } from "./firewallController";

export function createFirewallRoutes(
  firewallController: FirewallController
) {
  const router = Router();

  router.post(
    "/ips",
    firewallController.addIps.bind(firewallController)
  );

  router.post(
    "/domains",
    firewallController.addDomains.bind(firewallController)
  );

  router.post(
    "/ports",
    firewallController.addPorts.bind(firewallController)
  );

  router.get(
    "/rules",
    firewallController.getAllRules.bind(firewallController)
  );

  router.delete(
    "/rules",
    firewallController.deleteRules.bind(firewallController)
  );

  router.patch(
    "/rules/status",
    firewallController.updateRulesStatus.bind(firewallController)
  );

  return router;
}