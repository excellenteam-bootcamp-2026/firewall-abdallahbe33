import { MemoryFirewallRepository } from "./adapters/outbound/persistence/memory/memoryFirewallRepository";

import { createAddFirewallRules } from "./application/usecases/addFirewallRules";
import { createDeleteFirewallRules } from "./application/usecases/deleteFirewallRules";
import { createGetFirewallRules } from "./application/usecases/getFirewallRules";
import { createUpdateFirewallRulesStatus } from "./application/usecases/updateFirewallRulesStatus";

import { FirewallController } from "./adapters/inbound/http/firewallController";
import {createFirewallRoutes} from "./adapters/inbound/http/firewallRoutes";


const firewallRepository = new MemoryFirewallRepository();

const addFirewallRulesUseCase =
  createAddFirewallRules(firewallRepository);

const deleteFirewallRulesUseCase =
  createDeleteFirewallRules(firewallRepository);

const getFirewallRulesUseCase =
  createGetFirewallRules(firewallRepository);

const updateFirewallRulesStatusUseCase =
  createUpdateFirewallRulesStatus(firewallRepository);

const firewallController = new FirewallController(
  addFirewallRulesUseCase,
  getFirewallRulesUseCase,
  deleteFirewallRulesUseCase,
  updateFirewallRulesStatusUseCase
);
const firewallRoutes = createFirewallRoutes(firewallController);

export { firewallRoutes };

export default firewallController;
