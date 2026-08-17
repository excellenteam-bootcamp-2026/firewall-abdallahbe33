import fs from "fs";
import winston from "winston";
import { config } from "./env";

export class Logger {
  private static instance: Logger;
  private logger: winston.Logger;

  private constructor() {
    const transports: winston.transport[] = [];

    if (config.isDevelopment) {
      transports.push(
        new winston.transports.Console()
      );
    } else {
      // Make sure the log directory exists in production
      fs.mkdirSync("logs", { recursive: true });

      transports.push(
        new winston.transports.File({
          filename: "logs/app.log"
        })
      );
    }

    this.logger = winston.createLogger({
      level: config.isDevelopment ? "debug" : "info",

      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),

      transports
    });
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public debug(message: string): void {
    this.logger.debug(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public error(message: string): void {
    this.logger.error(message);
  }
}

export function overrideConsole(): void {
  const logger = Logger.getInstance();

  console.log = (...args: unknown[]) => {
    logger.info(args.map(String).join(" "));
  };

  console.info = (...args: unknown[]) => {
    logger.info(args.map(String).join(" "));
  };

  console.warn = (...args: unknown[]) => {
    logger.warn(args.map(String).join(" "));
  };

  console.error = (...args: unknown[]) => {
    logger.error(args.map(String).join(" "));
  };

  console.debug = (...args: unknown[]) => {
    logger.debug(args.map(String).join(" "));
  };
}