"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrizzleFirewallRepository = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("./db");
const schema_1 = require("./schema");
class DrizzleFirewallRepository {
    async getAllRules() {
        const rows = await db_1.db
            .select()
            .from(schema_1.firewallRulesTable);
        return rows.map(row => ({
            id: row.id,
            type: row.type,
            mode: row.mode,
            value: row.type === "port"
                ? Number(row.value)
                : row.value,
            active: row.active
        }));
    }
    async saveRule(rule) {
        const insertedRows = await db_1.db
            .insert(schema_1.firewallRulesTable)
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
            type: insertedRule.type,
            mode: insertedRule.mode,
            value: insertedRule.type === "port"
                ? Number(insertedRule.value)
                : insertedRule.value,
            active: insertedRule.active
        };
    }
    async updateRulesStatus(ids, active) {
        const updatedRows = await db_1.db
            .update(schema_1.firewallRulesTable)
            .set({ active })
            .where((0, drizzle_orm_1.inArray)(schema_1.firewallRulesTable.id, ids))
            .returning();
        return updatedRows.map(row => ({
            id: row.id,
            type: row.type,
            mode: row.mode,
            value: row.type === "port"
                ? Number(row.value)
                : row.value,
            active: row.active
        }));
    }
    async deleteRules(ids) {
        const deletedRows = await db_1.db
            .delete(schema_1.firewallRulesTable)
            .where((0, drizzle_orm_1.inArray)(schema_1.firewallRulesTable.id, ids))
            .returning();
        return deletedRows.map(row => ({
            id: row.id,
            type: row.type,
            mode: row.mode,
            value: row.type === "port"
                ? Number(row.value)
                : row.value,
            active: row.active
        }));
    }
}
exports.DrizzleFirewallRepository = DrizzleFirewallRepository;
//# sourceMappingURL=drizzleFirewallRepository.js.map