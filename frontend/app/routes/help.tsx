import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Fragment } from "react/jsx-runtime";
import { sidebar } from "~/constants/routes";
import { loginSessionStorage } from "~/utils/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await loginSessionStorage.getSession(request.headers.get("Cookie"));

  if (!session || !session.data.user) return redirect("/login");
}

export default function Help() {
  return (
    <div className="py-6 px-4 flex flex-col gap-6 text-xs w-full">
      <h1 className="header">Help</h1>

      <div className="flex flex-col gap-4 w-full">
        <h1 className="header bg-orange-main">Features</h1>

        <div className="flex justify-around">
          {sidebar.map((s, i) => (
            <Link to={s.link} key={i} className="flex flex-col items-center text-justify gap-4">
              <p className="font-bold text-sm">{s.name}</p>

              <div className="w-16">
                <Fragment key={s.name}>{s.logo()}</Fragment>
              </div>

              <p className="max-w-[12rem]">{s.description}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <h1 className="header bg-orange-main">Configurations</h1>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between p-4 border-2 border-black">
            <div className="space-y-1">
              <h1 className="font-medium text-sm">WebSocket Connection</h1>
              <p className="text-xs text-gray-500">
                Use this configuration to set the packet monitoring features. If its ON, then the events and dashboard
                page will receive packet data. If its OFF, then the page will not receive packet data.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border-2 border-black">
            <div className="space-y-1">
              <h1 className="font-medium text-sm">Notifications</h1>
              <p className="text-xs text-gray-500">
                Use this configuration to set if you want to receive email notifications or not. YOU MUST SET THE EMAIL
                FIRST before sending notifications. If this confiuration turned ON, the service will send you a new
                email if there is a packet with risk score greater than 150.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border-2 border-black">
            <div className="space-y-1">
              <h1 className="font-medium text-sm">Email for Notifications</h1>
              <p className="text-xs text-gray-500">
                Set the email destination for sending notification. This configuration is required if you turned on the
                notifications feature.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border-2 border-black">
            <div className="space-y-1">
              <h1 className="font-medium text-sm">Analyst With AI</h1>
              <p className="text-xs text-gray-500">
                This configuration is used to analyze the risk packet with risk score greater than 150 using OpenAI
                model. This will give you a brief analysis of the packet risks and how to mitigate it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

