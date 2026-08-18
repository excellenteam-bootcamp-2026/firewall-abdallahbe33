"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryFirewallRepository = void 0;
class MemoryFirewallRepository {
    rules = [];
    nextId = 1;
    generateId() {
        return this.nextId++;
    }
    async getAllRules() {
        return this.rules;
    }
    async deleteRules(ids) {
        const deletedRules = [];
        this.rules = this.rules.filter(rule => {
            if (ids.includes(rule.id)) {
                deletedRules.push(rule);
                return false;
            }
            return true;
        });
        return deletedRules;
    }
    async updateRulesStatus(ids, active) {
        const updatedRules = [];
        this.rules.forEach(rule => {
            if (ids.includes(rule.id)) {
                rule.active = active;
                updatedRules.push(rule);
            }
        });
        return updatedRules;
    }
    async saveRule(rule) {
        const newRule = {
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
exports.MemoryFirewallRepository = MemoryFirewallRepository;
//# sourceMappingURL=memoryFirewallRepository.js.map