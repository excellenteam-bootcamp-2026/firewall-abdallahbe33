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

    return res.status(201).json({
      type: "ip",
      mode,
      values: createdRules,
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

    return res.status(201).json({
      type: "domain",
      mode,
      values: createdRules,
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

    return res.status(201).json({
      type: "port",
      mode,
      values: createdRules,
      status: "success"
    });
  }


  async getAllRules(req: Request, res: Response) {
    const allRules = await this.getFirewallRules();

    return res.status(200).json(allRules);
  }


  async deleteRules(req: Request, res: Response) {
    const { ids } = req.body;

    const deletedRules = await this.deleteFirewallRules(ids);

    return res.status(200).json({
      removed: deletedRules,
      status: "success"
    });
  }


  async updateRulesStatus(req: Request, res: Response) {
    const { ids, active } = req.body;

    const updatedRules = await this.updateFirewallRulesStatus(
      ids,
      active
    );

    return res.status(200).json({
      updated: updatedRules,
      status: "success"
    });
  }
}
