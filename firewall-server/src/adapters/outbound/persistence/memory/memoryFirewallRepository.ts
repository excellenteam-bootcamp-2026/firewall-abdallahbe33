import { FirewallRepository } from "../../../../application/ports/firewallRepository";
import {
  FirewallRule,
  NewFirewallRule
} from "../../../../domain/firewallRule";

export class MemoryFirewallRepository implements FirewallRepository {

  private rules: FirewallRule[] = [];
  private nextId: number = 1;

  private generateId(): number {
    return this.nextId++;
  }

  async getAllRules(): Promise<FirewallRule[]> {
    return this.rules;
  }

 async deleteRules(ids: number[]): Promise<FirewallRule[]> {
    const deletedRules: FirewallRule[] = [];

    this.rules = this.rules.filter(rule => {
        if (ids.includes(rule.id)) {
            deletedRules.push(rule);
            return false;
        }

        return true;
    });

    return deletedRules;
}

async updateRulesStatus(ids: number[], active: boolean): Promise<FirewallRule[]> {
    const updatedRules: FirewallRule[] = [];

    this.rules.forEach(rule => {
        if (ids.includes(rule.id)) {
            rule.active = active;
            updatedRules.push(rule);
        }
    });
    return updatedRules;
}
    

  async saveRule(rule: NewFirewallRule): Promise<FirewallRule> {
    const newRule: FirewallRule = {
      id: this.generateId(),
      type: rule.type,
      mode: rule.mode,
      active: rule.active,
      value: rule.value
    };

    this.rules.push(newRule);

    return newRule;
  }
}