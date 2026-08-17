import express, {
  Request,
  Response,
  NextFunction
} from "express";

import { config } from "./env";
import { firewallRoutes } from "./main";
import { overrideConsole } from "./Logger";
overrideConsole();
const app = express();
const PORT = config.port;
  


app.use(express.json());


// Log every request
const requestLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(requestLoggerMiddleware);


// Firewall API routes
app.use("/api/firewall", firewallRoutes);


// Handle unknown routes
app.use((req: Request, res: Response) => {
  return res.status(404).json({
    status: "error",
    code: "NOT_FOUND",
    message: "Endpoint not found."
  });
});


// Handle unexpected errors
app.use((
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  return res.status(500).json({
    status: "error",
    code: "INTERNAL_SERVER_ERROR",
    message: "Something went wrong."
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});