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
    maxAge: 99983090,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.COOKIE_SECRET1 || "", process.env.COOKIE_SECRET2 || ""],
    secure: process.env.NODE_ENV === "production",
  },
});

export const loginSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    maxAge: 99983090,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.COOKIE_SECRET1 || "", process.env.COOKIE_SECRET2 || ""],
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

  return configSessionStorage.commitSession(session, { expires: new Date(99983090) });
}

export async function clearConfig(request: Request) {
  const session = await configSessionStorage.getSession(request.headers.get("Cookie"));
  return configSessionStorage.destroySession(session);
}

