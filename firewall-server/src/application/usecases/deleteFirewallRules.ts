import { FirewallRepository } from "../ports/firewallRepository";
import { FirewallRule } from "../../domain/firewallRule";

export function createDeleteFirewallRules(
  firewallRepository: FirewallRepository
) {
  return async function deleteFirewallRules(
    ids: number[]
  ): Promise<FirewallRule[]> {

    const allRules = await firewallRepository.getAllRules();

    const allIdsExist = ids.every(id =>
      allRules.some(rule => rule.id === id)
    );

    if (!allIdsExist) {
      throw new Error("RULE_NOT_FOUND");
    }

    return await firewallRepository.deleteRules(ids);
  };
}