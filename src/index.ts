import http from "node:http";
import { makeApp } from "./app/app.js";

const PORT = 3000;

const app = makeApp();
const server = new http.Server(app);

server.listen(PORT, () => {
  console.log("Server listen on PORT ", PORT);
});

server.on("error", (error) => {
  console.log("Server error ", error);
});

server.on("close", () => {
  console.log("Server is closing");
});

const handleProcessClose: NodeJS.SignalsListener = (signal) => {
  console.log("Closing application ", signal);
  server.close((error) => {
    if (error) {
      console.log("Failed to close the server ", error);
    }
    process.exit(0);
  });
};

process.on("SIGINT", handleProcessClose);
process.on("SIGTERM", handleProcessClose);
