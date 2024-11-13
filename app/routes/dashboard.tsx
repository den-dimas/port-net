import { Fragment, useEffect, useState } from "react";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Socket, Subscriber } from "zeromq";

import SelectButton from "~/components/SelectButton";

import { dashboardCategories } from "~/constants/categories";
import { DashboardComponentParams } from "~/types/DashboardTypes";

export const loader: LoaderFunction = async ({ request }) => {
  const socket = new Subscriber();
  socket.connect("tcp://192.168.1.102:56");
  socket.subscribe("");

  return {
    data: { protocols: [], statistics: [], ndpis: [], risks: [], traffics: [] },
    socket,
  };
};

export default function Dashboard() {
  const { data, socket } = useLoaderData<typeof loader>();

  const [selectedView, setSelectedViews] = useState(dashboardCategories[0]);

  const [messages, setMessages] = useState<string[]>([]);
  const [status, setStatus] = useState("disconnected");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");

    ws.onopen = () => {
      setStatus("connected");
      console.log("Connected to WebSocket");
    };

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    ws.onclose = () => {
      setStatus("disconnected");
      console.log("Disconnected from WebSocket");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setStatus("error");
    };

    console.log(messages);

    // Cleanup on unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="py-6 px-4 w-full flex flex-col gap-6">
      <h1 className="header">Dashboard</h1>

      <div className="flex flex-row gap-4 w-full">
        {dashboardCategories.map((v, i) => (
          <SelectButton
            key={i}
            title={v.name}
            onClick={() => setSelectedViews(v)}
            isSelected={selectedView.name == v.name}
          />
        ))}
      </div>

      <div id="view" className="">
        {selectedView.component != null && (
          <Fragment>{selectedView.component(data as any)}</Fragment>
        )}

        {selectedView.name == "Risk Stats" && (
          <div className="flex gap-2 mt-4">
            <p className="font-bold">NOTE: </p>
            <p className="text-justify text-wrap">
              as one flow can have multiple risks set, the sum of the last
              column can exceed the number of flows with risks.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
