import { FirewallRule, NewFirewallRule } from "../../domain/firewallRule";

export interface FirewallRepository {
  getAllRules(): Promise<FirewallRule[]>;
  saveRule(rule: NewFirewallRule): Promise<FirewallRule>;
  updateRulesStatus(ids: number[], active: boolean): Promise<FirewallRule[]>;
  deleteRules(ids: number[]): Promise<FirewallRule[]>;
}