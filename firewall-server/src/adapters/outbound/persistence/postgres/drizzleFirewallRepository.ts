import { eq, inArray } from "drizzle-orm";

import { FirewallRepository } from "../../../../application/ports/firewallRepository";

import {
  FirewallRule,
  NewFirewallRule
} from "../../../../domain/firewallRule";

import { db } from "./db";
import { firewallRulesTable } from "./schema";


export class DrizzleFirewallRepository implements FirewallRepository {

  async getAllRules(): Promise<FirewallRule[]> {
    const rows = await db
      .select()
      .from(firewallRulesTable);

    return rows.map(row => ({
      id: row.id,
      type: row.type as FirewallRule["type"],
      mode: row.mode as FirewallRule["mode"],

      value:
        row.type === "port"
          ? Number(row.value)
          : row.value,

      active: row.active
    }));
  }


  async saveRule(
    rule: NewFirewallRule
  ): Promise<FirewallRule> {

    const insertedRows = await db
      .insert(firewallRulesTable)
      .values({
        type: rule.type,
        mode: rule.mode,
        value: String(rule.value),
        active: rule.active
      })
      .returning();

    const insertedRule = insertedRows[0];

    if (!insertedRule) {
      throw new Error("Failed to insert firewall rule.");
    }

    return {
      id: insertedRule.id,
      type: insertedRule.type as FirewallRule["type"],
      mode: insertedRule.mode as FirewallRule["mode"],

      value:
        insertedRule.type === "port"
          ? Number(insertedRule.value)
          : insertedRule.value,

      active: insertedRule.active
    };
  }


  async updateRulesStatus(
    ids: number[],
    active: boolean
  ): Promise<FirewallRule[]> {

    const updatedRows = await db
      .update(firewallRulesTable)
      .set({ active })
      .where(inArray(firewallRulesTable.id, ids))
      .returning();

    return updatedRows.map(row => ({
      id: row.id,
      type: row.type as FirewallRule["type"],
      mode: row.mode as FirewallRule["mode"],

      value:
        row.type === "port"
          ? Number(row.value)
          : row.value,

      active: row.active
    }));
  }


  async deleteRules(
    ids: number[]
  ): Promise<FirewallRule[]> {

    const deletedRows = await db
      .delete(firewallRulesTable)
      .where(inArray(firewallRulesTable.id, ids))
      .returning();

    return deletedRows.map(row => ({
      id: row.id,
      type: row.type as FirewallRule["type"],
      mode: row.mode as FirewallRule["mode"],

      value:
        row.type === "port"
          ? Number(row.value)
          : row.value,

      active: row.active
    }));
  }
}