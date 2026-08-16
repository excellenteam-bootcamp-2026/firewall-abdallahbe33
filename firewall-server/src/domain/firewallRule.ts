export type RuleType = "ip" | "port" | "domain";
export type RuleMode = "blacklist" | "whitelist";

export interface NewFirewallRule {
  type: RuleType;
  mode: RuleMode;
  active: boolean;
  value: string | number;
}

export interface FirewallRule extends NewFirewallRule {
  id: number;
}