"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firewallRulesTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.firewallRulesTable = (0, pg_core_1.pgTable)("firewall_rules", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    type: (0, pg_core_1.varchar)("type", { length: 20 }).notNull(),
    mode: (0, pg_core_1.varchar)("mode", { length: 20 }).notNull(),
    value: (0, pg_core_1.varchar)("value", { length: 255 }).notNull(),
    active: (0, pg_core_1.boolean)("active")
        .notNull()
        .default(true)
});
//# sourceMappingURL=schema.js.map