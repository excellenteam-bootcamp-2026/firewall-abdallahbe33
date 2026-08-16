import { FirewallRepository } from "../ports/firewallRepository";
import { FirewallRule, NewFirewallRule, RuleMode, RuleType } from "../../domain/firewallRule";

export function createAddFirewallRules(
  firewallRepository: FirewallRepository
) {

  return async function addFirewallRules(
    values: string[] | number[],
    type: RuleType,
    mode: RuleMode
  ): Promise<FirewallRule[]> {

    const rules: NewFirewallRule[] = values.map(value => ({
      type,
      mode,
      active: true,
      value
    }));

    return Promise.all(
      rules.map(rule => firewallRepository.saveRule(rule))
    );
  };
}


