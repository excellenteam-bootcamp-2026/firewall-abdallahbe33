import {
  pgTable,
  serial,
  varchar,
  boolean
} from "drizzle-orm/pg-core";

export const firewallRulesTable = pgTable("firewall_rules", {
  id: serial("id").primaryKey(),

  type: varchar("type", { length: 20 }).notNull(),

  mode: varchar("mode", { length: 20 }).notNull(),

  value: varchar("value", { length: 255 }).notNull(),

  active: boolean("active")
    .notNull()
    .default(true)
});