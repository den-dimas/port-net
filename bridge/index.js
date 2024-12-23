const zmq = require("zeromq");
const WebSocket = require("ws");
const express = require("express");
const http = require("http");

const config = {
  zmqAddress: "tcp://127.0.0.1",
  zmqTopic: "",
  zmqDashboardPort: "56",
  zmqEventsPort: "57",
  wsDashboardPort: 5056,
  wsEventsPort: 5057,
  allowedOrigin: "*",
};

const dashboardApp = express();
const eventsApp = express();
const dashboardServer = http.createServer(dashboardApp);
const eventsServer = http.createServer(eventsApp);

const dashboardWs = new WebSocket.Server({ server: dashboardServer });
const eventsWs = new WebSocket.Server({ server: eventsServer });

const dashboardClients = new Set();
const eventsClients = new Set();

async function zmqSubscribe(clients, port) {
  const sock = new zmq.Subscriber();
  const { zmqAddress, zmqTopic } = config;

  try {
    await sock.connect(zmqAddress + ":" + port);
    await sock.subscribe(zmqTopic);

    for await (const [msg] of sock) {
      try {
        const message = msg.toString();

        wsBroadcast(clients, message);
      } catch (error) {
        console.log("Error processing message", error);
      }
    }
  } catch (error) {
    setTimeout(() => zmqSubscribe(clients, port), 5000);
  }
}

function wsBroadcast(clients, message) {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

console.log("Setting up Dashboard Web Socket...");
dashboardWs.on("connection", (ws, req) => {
  dashboardClients.add(ws);

  console.log("Dashboard    : A client has connected!");
  console.log("Total Clients: " + dashboardClients.size);

  ws.on("close", () => {
    dashboardClients.delete(ws);
  });
});
console.log("Dashboard Web Socket is running\n");

console.log("Setting up Events Web Socket...");
eventsWs.on("connection", (ws, req) => {
  eventsClients.add(ws);

  console.log("Events       : A client has connected!");
  console.log("Total Clients: " + eventsClients.size);

  ws.on("close", () => {
    eventsClients.delete(ws);
  });
});
console.log("Events Web Socket is running\n");

console.log("Setting up Dashboard Server...");
dashboardServer.listen(config.wsDashboardPort, () => {
  zmqSubscribe(dashboardClients, config.zmqDashboardPort);
});
console.log("Dashboard ZMQ connected");

console.log("Setting up Events Server...");
eventsServer.listen(config.wsEventsPort, () => {
  zmqSubscribe(eventsClients, config.zmqEventsPort);
});
console.log("Events ZMQ connected");

console.log("\n====== Portnet Bridge Server ======");
console.log(
  "Dashboard Server running on http://localhost:" + config.wsDashboardPort
);
console.log("Events Server running on http://localhost:" + config.wsEventsPort);
console.log("Server Logs:");

process.on("SIGINT", async () => {
  dashboardWs.clients.forEach((client) => client.close());
  dashboardServer.close();
  eventsWs.clients.forEach((client) => client.close());
  eventsServer.close();
  process.exit();
});
