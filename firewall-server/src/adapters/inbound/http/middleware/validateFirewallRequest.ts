import { Request, Response, NextFunction } from "express";

export function validateCommonRuleRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { mode, values } = req.body;

  if (mode !== "blacklist" && mode !== "whitelist") {
    return res.status(400).json({
      status: "error",
      code: "INVALID_MODE",
      message: "Mode must be either blacklist or whitelist."
    });
  }

  if (!Array.isArray(values) || values.length === 0) {
    return res.status(400).json({
      status: "error",
      code: "INVALID_VALUES",
      message: "Values must be a non-empty array."
    });
  }

  next();
}

export function validateIpValues(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { values } = req.body;

  const isValidIp = (ip: string): boolean => {
    const parts = ip.split(".");

    if (parts.length !== 4) {
      return false;
    }

    return parts.every(part => {
      const number = Number(part);

      return (
        part !== "" &&
        Number.isInteger(number) &&
        number >= 0 &&
        number <= 255
      );
    });
  };

  const allValid = values.every(
    (value: unknown) =>
      typeof value === "string" && isValidIp(value)
  );

  if (!allValid) {
    return res.status(400).json({
      status: "error",
      code: "INVALID_IP",
      message: "Values must contain valid IPv4 addresses."
    });
  }

  next();
}


export function validateDomainValues(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { values } = req.body;

  const isValidDomain = (domain: string): boolean => {
    const domainRegex =
      /^(?!-)(?:[a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,63}$/;

    return domainRegex.test(domain);
  };

  const allValid = values.every(
    (value: unknown) =>
      typeof value === "string" && isValidDomain(value)
  );

  if (!allValid) {
    return res.status(400).json({
      status: "error",
      code: "INVALID_DOMAIN",
      message: "Values must contain valid domains without protocol, path, or port."
    });
  }

  next();
}


export function validatePortValues(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { values } = req.body;

  const allValid = values.every(
    (value: unknown) =>
      typeof value === "number" &&
      Number.isInteger(value) &&
      value >= 1 &&
      value <= 65535
  );

  if (!allValid) {
    return res.status(400).json({
      status: "error",
      code: "INVALID_PORT",
      message: "Ports must be integers between 1 and 65535."
    });
  }

  next();
}



export function validateIds(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { ids } = req.body;

  const validIds =
    Array.isArray(ids) &&
    ids.length > 0 &&
    ids.every(
      (id: unknown) =>
        typeof id === "number" &&
        Number.isInteger(id)
    );

  if (!validIds) {
    return res.status(400).json({
      status: "error",
      code: "INVALID_IDS",
      message: "Ids must be a non-empty array of integers."
    });
  }

  next();
}


export function validateActive(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { active } = req.body;

  if (typeof active !== "boolean") {
    return res.status(400).json({
      status: "error",
      code: "INVALID_ACTIVE",
      message: "Active must be a boolean."
    });
  }

  next();
}