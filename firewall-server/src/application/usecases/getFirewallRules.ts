import { FirewallRepository } from "../ports/firewallRepository";
import { FirewallRule } from "../../domain/firewallRule";

export function createGetFirewallRules(
  firewallRepository: FirewallRepository
) {

  return async function getFirewallRules(): Promise<FirewallRule[]> {
    return await firewallRepository.getAllRules();
  };

}