import { FirewallRepository } from "../ports/firewallRepository";
import { FirewallRule } from "../../domain/firewallRule";

export function createUpdateFirewallRulesStatus(
  firewallRepository: FirewallRepository
) {
  return async function updateFirewallRulesStatus(
    ids: number[],
    active: boolean
  ): Promise<FirewallRule[]> {

    const allRules = await firewallRepository.getAllRules();

    const allIdsExist = ids.every(id =>
      allRules.some(rule => rule.id === id)
    );

    if (!allIdsExist) {
      throw new Error("RULE_NOT_FOUND");
    }

    return await firewallRepository.updateRulesStatus(ids, active);
  };
}