import { json, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { ClientOnly } from "remix-utils/client-only";
import AttackDistributionGraph from "~/components/dashboard/AttackDistributionGraph";
import AttackSourcesGraph from "~/components/dashboard/AttackSourcesGraph";

export async function loader() {
  const sourceData = {
    labels: ["sources"],
    datasets: [
      {
        barPercentage: 0.125,
        label: "Attack Per Public IP Address",
        backgroundColor: "#fc4825",
        data: 0,
      },
    ],
  };

  const distributionData = {
    labels: ["SQLi", "XSS", "Unauthorization", "Anonymization", "Geolocation"],
    datasets: [
      {
        label: "Attack Distribution",
        data: ["", "", "", "", ""],
        backgroundColor: [
          "rgb(92, 4, 138)", // Sqli
          "rgb(245, 234, 20)", // XSS
          "rgb(245, 108, 144)", // Unauthorized Access
          "rgb(47, 62, 89)", // Anonymization
          "rgb(0, 128, 128)", // Banned geolocation
        ],
        hoverOffset: 4,
      },
    ],
  };

  return json({ sourceData, distributionData });
}

export default function Dashboard() {
  const { sourceData, distributionData } = useLoaderData<typeof loader>();
  const [stateC, setStateC] = useState({
    services: 0,
    lastUpdate: 0,
    totalTransactions: 0,
    allowedTransactions: 0,
    blockedTransactions: 0,
    card_informations: 0,
    vulnerabilityScores: 0,
  });

  const stateComponents = [
    {
      title: "Blocked",
      state: "blockedTransactions",
      unit: "Transactions",
    },
    {
      title: "Allowed",
      state: "allowedTransactions",
      unit: "Transactions",
    },
    {
      title: "Total",
      state: "totalTransactions",
      unit: "Transactions",
    },
    {
      title: "Latest Update",
      state: "lastUpdate",
      unit: "",
    },
    {
      title: "Deployed at",
      state: "",
      unit: "",
    },
  ];

  return (
    <div className="py-6 px-4 w-full flex flex-col gap-6">
      <h1 className="header">Dashboard</h1>

      <div className="flex flex-row gap-4 w-full">
        {stateComponents.map((sc, i) => (
          <div
            key={i}
            className="flex-1 space-y-2 border-orange-main border-2 p-4"
          >
            <p className="font-semibold text-2xl font-fira-sans">{sc.title}</p>
            <p className="text-lg">
              {(stateC as any)[sc.state]} {sc.unit}
            </p>
          </div>
        ))}
      </div>

      <div className="w-full flex gap-4">
        <ClientOnly>
          {() => (
            <>
              <div className="flex-1 rounded-md shadow-lg">
                <AttackSourcesGraph data={sourceData} />
              </div>

              <div className="flex-1 rounded-md shadow-lg">
                <AttackDistributionGraph data={distributionData} />
              </div>
            </>
          )}
        </ClientOnly>
      </div>
    </div>
  );
}
