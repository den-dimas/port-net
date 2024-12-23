import { Fragment, useEffect, useState } from "react";
import { LoaderFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";

import SelectButton from "~/components/SelectButton";

import { dashboardCategories } from "~/constants/categories";
import Loading from "~/components/Loading";
import { getConfig } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const config = await getConfig(request);
  return json({ config });
};

export default function Dashboard() {
  const { config } = useLoaderData<typeof loader>();

  const [selectedView, setSelectedViews] = useState(dashboardCategories[0]);

  const [messages, setMessages] = useState<any>({});
  const [status, setStatus] = useState("disconnected");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!config.wsEnabled) {
      setStatus("disabled");
      setIsLoading(false);
      return;
    }

    const ws = new WebSocket("ws://localhost:5056");

    ws.onopen = () => {
      setStatus("connected");
      console.log("Connected to WebSocket");
    };

    ws.onmessage = (event) => {
      setIsLoading(false);
      setMessages(JSON.parse(event.data));
    };

    ws.onclose = () => {
      setStatus("disconnected");
      console.log("Disconnected from WebSocket");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setStatus("error");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="pt-6 pb-4 px-4 h-fit w-full flex flex-col gap-6 text-xs">
      <h1 className="header">Dashboard</h1>

      <div className="flex flex-row gap-4 w-full sticky top-2 bg-white">
        {dashboardCategories.map((v, i) => (
          <SelectButton
            key={i}
            title={v.name}
            onClick={() => setSelectedViews(v)}
            isSelected={selectedView.name == v.name}
          />
        ))}
      </div>

      {status === "disabled" ? (
        <div>Connection disabled, turn it on in configurations!</div>
      ) : (
        <div id="view" className="border-y-2 py-4 border-black h-full">
          {isLoading ? (
            <Loading message="Connecting to server..." />
          ) : (
            selectedView.component != null && (
              <Fragment>
                {selectedView.component({
                  timeData: messages["time"],
                  ndpiData: messages["memory"],
                  detectedData: messages["protocols"],
                  protocolData: messages["classifications"],
                  riskData: messages["risks"],
                  trafficData: messages["traffic"],
                })}
              </Fragment>
            )
          )}

          {selectedView.name == "Risk Stats" && (
            <div className="flex gap-2 mt-4">
              <p className="font-bold">NOTE: </p>
              <p className="text-justify text-wrap">
                as one flow can have multiple risks set, the sum of the last column can exceed the number of flows with
                risks.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

