import { createCookieSessionStorage } from "@remix-run/node";

export type ConfigData = {
  wsEnabled: boolean;
  notificationsEnabled: boolean;
  aiEnabled: boolean;
  email: string;
  ipAddress: string;
  port: string;
  interval: string;
};

export const configSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__config",
    httpOnly: true,
    // maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
    secrets: ["@awd9s@12_!32423Q4(as*22Q@<dL:ASWA)(W2@", "W8@&@!9sdkncuw&@0`2`awdas``dfs`s12s&&**&@^!32"],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function getConfig(request: Request) {
  const session = await configSessionStorage.getSession(request.headers.get("Cookie"));

  return {
    wsEnabled: session.get("wsEnabled") ?? true,
    notificationsEnabled: session.get("notificationsEnabled") ?? true,
    aiEnabled: session.get("aiEnabled") ?? true,
    email: session.get("email") ?? "",
    ipAddress: session.get("ipAddress") ?? "",
    port: session.get("port") ?? "",
    interval: session.get("interval") ?? "1",
  };
}

export async function saveConfig(config: ConfigData, request: Request) {
  const session = await configSessionStorage.getSession(request.headers.get("Cookie"));

  Object.entries(config).forEach(([key, value]) => {
    session.set(key, value);
  });

  return configSessionStorage.commitSession(session);
}

export async function clearConfig(request: Request) {
  const session = await configSessionStorage.getSession(request.headers.get("Cookie"));
  return configSessionStorage.destroySession(session);
}

