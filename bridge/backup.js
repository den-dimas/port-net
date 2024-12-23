const zmq = require("zeromq");
const WebSocket = require("ws");
const express = require("express");
const http = require("http");

// Configuration for multiple ZMQ publishers
const config = {
  publishers: [
    {
      zmqAddress: "tcp://127.0.0.1:56", // First ZMQ publisher
      zmqTopic: "",
      wsPort: 5006,
      allowedOrigin: "*",
    },
    {
      zmqAddress: "tcp://127.0.0.1:57", // Second ZMQ publisher
      zmqTopic: "",
      wsPort: 5007,
      allowedOrigin: "*",
    },
    // Add more publishers as needed
  ],
};

// Create a function to set up a ZMQ to WebSocket bridge for a single publisher
function createZmqWsBridge(publisherConfig) {
  const app = express();
  const server = http.createServer(app);
  const wss = new WebSocket.Server({ server });
  const clients = new Set();

  // Debug logging function
  function debugLog(category, message, data = null) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${category}] ${message}`);
    // if (data) {
    //   console.log(`[${timestamp}] [${category}] Data:`, data);
    // }
  }

  // WebSocket connection handler
  wss.on("connection", (ws, req) => {
    // Origin verification
    const origin = req.headers.origin;
    if (origin !== publisherConfig.allowedOrigin) {
      ws.close();
      return;
    }

    debugLog(
      "WebSocket",
      `New client connected to port ${publisherConfig.wsPort}`
    );
    clients.add(ws);

    ws.on("close", () => {
      debugLog(
        "WebSocket",
        `Client disconnected from port ${publisherConfig.wsPort}`
      );
      clients.delete(ws);
    });

    ws.on("error", (error) => {
      debugLog("WebSocket", `Error on port ${publisherConfig.wsPort}`, error);
      clients.delete(ws);
    });
  });

  // Broadcast message to all connected WebSocket clients
  function broadcast(message) {
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  // Initialize ZMQ subscriber
  async function initZmqSubscriber() {
    const sock = new zmq.Subscriber();

    try {
      debugLog(
        "ZMQ",
        `Connecting to ZMQ publisher at ${publisherConfig.zmqAddress}`
      );
      await sock.connect(publisherConfig.zmqAddress);
      debugLog(
        "ZMQ",
        `Connected to ZMQ publisher at ${publisherConfig.zmqAddress}`
      );

      // Subscribe to topic
      await sock.subscribe(publisherConfig.zmqTopic);
      debugLog(
        "ZMQ",
        `Subscribed to topic: ${publisherConfig.zmqTopic || "all"}`
      );

      // Start receiving messages
      for await (const [msg] of sock) {
        try {
          const message = msg.toString();
          broadcast(message);
        } catch (error) {
          debugLog("ZMQ", "Error processing message", error);
        }
      }
    } catch (error) {
      debugLog(
        "ZMQ",
        `Error with publisher at ${publisherConfig.zmqAddress}`,
        error
      );
      // Reconnection logic
      setTimeout(() => initZmqSubscriber(), 5000);
    }
  }

  // Start the server
  server.listen(publisherConfig.wsPort, () => {
    debugLog(
      "Server",
      `WebSocket server listening on port ${publisherConfig.wsPort}`
    );
    initZmqSubscriber();
  });

  // Graceful shutdown
  process.on("SIGINT", async () => {
    debugLog(
      "Server",
      `Shutting down server on port ${publisherConfig.wsPort}`
    );
    wss.clients.forEach((client) => {
      client.close();
    });
    server.close();
  });

  return { server, wss };
}

// Create bridges for all configured publishers
const bridges = config.publishers.map(createZmqWsBridge);
