import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { ConfigData, configSessionStorage, getConfig, saveConfig } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const config = await getConfig(request);

  const session = await configSessionStorage.getSession(request.headers.get("Cookie"));

  if (!session.data) {
    const cookie = await saveConfig(config, request);
    return json({ config }, { headers: { "Set-Cookie": cookie } });
  }

  return { config };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const config = {
    wsEnabled: formData.get("wsEnabled") === "true",
    notificationsEnabled: formData.get("notificationsEnabled") === "true",
    aiEnabled: formData.get("aiEnabled") === "true",
    email: formData.get("email") as string,
    ipAddress: formData.get("ipAddress") as string,
    port: formData.get("port") as string,
    interval: formData.get("interval") as string,
  };

  const cookie = await saveConfig(config, request);
  return json({ success: true }, { headers: { "Set-Cookie": cookie } });
};

export default function Configuration() {
  const { config } = useLoaderData<{ config: ConfigData }>();
  const submit = useSubmit();
  const [formData, setFormData] = useState(config);

  const handleConfigChange = (key: keyof ConfigData, value: any) => {
    const newConfig = { ...formData, [key]: value };
    setFormData(newConfig);

    const form = new FormData();
    Object.entries(newConfig).forEach(([key, value]) => {
      form.append(key, value.toString());
    });

    submit(form, { method: "post" });
  };

  const isValidIp = (ip: string) => {
    if (!ip) return true;
    const pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    return pattern.test(ip);
  };

  const isValidPort = (port: string) => {
    if (!port) return true;
    const portNum = parseInt(port);
    return portNum >= 0 && portNum <= 65535;
  };

  return (
    <div className="pt-6 pb-4 px-4 h-fit w-full flex flex-col gap-6">
      <h1 className="header">Configuration</h1>

      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between p-4 border-2 border-black">
          <div className="space-y-1">
            <Label className="font-medium text-sm">WebSocket Connection</Label>
            <p className="text-xs text-gray-500">Enable/disable WebSocket connection</p>
          </div>

          <Switch
            checked={config.wsEnabled}
            onCheckedChange={(checked) => handleConfigChange("wsEnabled", checked)}
            className="data-[state=checked]:bg-orange-main"
          />
        </div>

        <div className="flex items-center justify-between p-4 border-2 border-black">
          <div className="space-y-1">
            <Label className="font-medium text-sm">Notifications</Label>
            <p className="text-xs text-gray-500">Enable/disable notifications</p>
          </div>
          <Switch
            checked={config.notificationsEnabled}
            onCheckedChange={(checked) => handleConfigChange("notificationsEnabled", checked)}
            className="data-[state=checked]:bg-orange-main"
          />
        </div>

        <div className="flex items-center justify-between p-4 border-2 border-black">
          <div className="space-y-1">
            <Label className="font-medium text-sm">Analyst With AI</Label>
            <p className="text-xs text-gray-500">Enable/disable Analyst</p>
          </div>
          <Switch
            checked={config.aiEnabled}
            onCheckedChange={(checked) => handleConfigChange("aiEnabled", checked)}
            className="data-[state=checked]:bg-orange-main"
          />
        </div>

        <div className="space-y-2">
          <Label className="font-medium text-sm">Email for Notifications</Label>
          <Input
            type="email"
            placeholder="Enter email address"
            value={config.email}
            onChange={(e) => handleConfigChange("email", e.target.value)}
            className="border-2 focus:border-orange-main focus:ring-orange-main shadow-none border-black focus-visible:ring-0 h-12"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="font-medium text-sm">IP Address</Label>
            <Input
              placeholder="Enter IP address"
              value={config.ipAddress}
              onChange={(e) => handleConfigChange("ipAddress", e.target.value)}
              className={`border-2 focus:border-orange-main focus:ring-orange-main shadow-none border-black focus-visible:ring-0 h-12 ${
                !isValidIp(config.ipAddress) ? "border-red-500" : ""
              }`}
            />
            {!isValidIp(config.ipAddress) && <p className="text-xs text-red-500">Invalid IP address format</p>}
          </div>

          <div className="space-y-2">
            <Label className="font-medium text-sm">Port</Label>
            <Input
              type="number"
              placeholder="Enter port number"
              value={config.port}
              onChange={(e) => handleConfigChange("port", e.target.value)}
              className={`border-2 focus:border-orange-main focus:ring-orange-main shadow-none border-black focus-visible:ring-0 h-12 ${
                !isValidPort(config.port) ? "border-red-500" : ""
              }`}
            />
            {!isValidPort(config.port) && <p className="text-xs text-red-500">Invalid port number</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="font-medium text-sm">Data Collection Interval (seconds)</Label>
          <Input
            type="number"
            min="1"
            step="1"
            value={config.interval}
            onChange={(e) => handleConfigChange("interval", e.target.value)}
            className="border-2 focus:border-orange-main focus:ring-orange-main shadow-none border-black focus-visible:ring-0 h-12"
          />
        </div>
      </div>
    </div>
  );
}

