import { FirewallRepository } from "../ports/firewallRepository";
import { FirewallRule } from "../../domain/firewallRule";

export function createUpdateFirewallRulesStatus(
  firewallRepository: FirewallRepository
) {

  return async function updateFirewallRulesStatus(
    ids: number[],
    active: boolean
  ): Promise<FirewallRule[]> {

    return await firewallRepository.updateRulesStatus(
      ids,
      active
    );

  };

}