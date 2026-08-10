import { FirewallRepository } from "../ports/firewallRepository";
import { FirewallRule } from "../../domain/firewallRule";

export function createDeleteFirewallRules(
  firewallRepository: FirewallRepository
) {

  return async function deleteFirewallRules(
    ids: number[]
  ): Promise<FirewallRule[]> {

    return await firewallRepository.deleteRules(ids);

  };

}