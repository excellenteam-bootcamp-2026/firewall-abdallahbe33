import { createAddFirewallRules } from "../../../application/usecases/addFirewallRules";
import { createGetFirewallRules } from "../../../application/usecases/getFirewallRules";
import { createDeleteFirewallRules } from "../../../application/usecases/deleteFirewallRules";
import { createUpdateFirewallRulesStatus } from "../../../application/usecases/updateFirewallRulesStatus";
import { Request, Response } from "express";


export class FirewallController {
  constructor(
    private addFirewallRules: ReturnType<typeof createAddFirewallRules>,
    private getFirewallRules: ReturnType<typeof createGetFirewallRules>,
    private deleteFirewallRules: ReturnType<typeof createDeleteFirewallRules>,
    private updateFirewallRulesStatus: ReturnType<typeof createUpdateFirewallRulesStatus>
  ) {}


  async addIps(req: Request, res: Response) {
  const { values, mode } = req.body;

  const createdRules = await this.addFirewallRules(
    values,
    "ip",
    mode
  );

  const responseValues = createdRules.map(rule => ({
    id: rule.id,
    value: rule.value,
    active: rule.active
  }));

  return res.status(201).json({
    type: "ip",
    mode,
    values: responseValues,
    status: "success"
  });
}


  async addDomains(req: Request, res: Response) {
    const { values, mode } = req.body;

    const createdRules = await this.addFirewallRules(
      values,
      "domain",
      mode
    );

    const responseValues = createdRules.map(rule => ({
      id: rule.id,
      value: rule.value,
      active: rule.active
    }));

    return res.status(201).json({
      type: "domain",
      mode,
      values: responseValues,
      status: "success"
    });
  }


  async addPorts(req: Request, res: Response) {
    const { values, mode } = req.body;

    const createdRules = await this.addFirewallRules(
      values,
      "port",
      mode
    );

    const responseValues = createdRules.map(rule => ({
      id: rule.id,
      value: rule.value,
      active: rule.active
    }));

    return res.status(201).json({
      type: "port",
      mode,
      values: responseValues,
      status: "success"
    });
  }


  async getAllRules(req: Request, res: Response) {
  const allRules = await this.getFirewallRules();

  const type = req.query.type;

  if (
    type !== undefined &&
    type !== "ip" &&
    type !== "domain" &&
    type !== "port"
  ) {
    return res.status(400).json({
      status: "error",
      code: "INVALID_TYPE",
      message: "Type must be ip, domain, or port."
    });
  }

  const filteredRules =
    type === undefined
      ? allRules
      : allRules.filter(rule => rule.type === type);

  const ips = filteredRules.filter(rule => rule.type === "ip");
  const domains = filteredRules.filter(rule => rule.type === "domain");
  const ports = filteredRules.filter(rule => rule.type === "port");

  return res.status(200).json({
    ips,
    domains,
    ports
  });
}

async deleteRules(req: Request, res: Response) {
  try {
    const { ids } = req.body;

    const deletedRules = await this.deleteFirewallRules(ids);

    return res.status(200).json({
      removed: deletedRules,
      status: "success"
    });

  } catch (error) {
    if (error instanceof Error && error.message === "RULE_NOT_FOUND") {
      return res.status(404).json({
        status: "error",
        code: "RULE_NOT_FOUND",
        message: "One or more firewall rules were not found."
      });
    }

    throw error;
  }
}


 async updateRulesStatus(req: Request, res: Response) {
  try {
    const { ids, active } = req.body;

    const updatedRules =
      await this.updateFirewallRulesStatus(ids, active);

    return res.status(200).json({
      updated: updatedRules,
      status: "success"
    });

  } catch (error) {
    if (error instanceof Error && error.message === "RULE_NOT_FOUND") {
      return res.status(404).json({
        status: "error",
        code: "RULE_NOT_FOUND",
        message: "One or more firewall rules were not found."
      });
    }

    throw error;
  }
  }
}