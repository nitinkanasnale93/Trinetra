const { spawn } = require("child_process");

const port = process.env.X_ZOHO_CATALYST_LISTEN_PORT || "3000";

const server = spawn(
  process.execPath,
  [".next/standalone/server.js"],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      PORT: port,
      HOSTNAME: "0.0.0.0",
    },
  }
);

server.on("exit", (code) => {
  process.exit(code ?? 1);
});