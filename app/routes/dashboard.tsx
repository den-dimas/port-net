import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Fragment, useState } from "react";

import Button from "~/components/Button";
import SelectButton from "~/components/SelectButton";

import { views } from "~/constants/dashboard";
import { DashboardComponentParams } from "~/types/DashboardTypes";

export const loader: LoaderFunction = async ({ request }) => {
  return { protocols: [], statistics: [], ndpis: [], risks: [], traffics: [] };
};

export default function Dashboard() {
  const data: DashboardComponentParams = useLoaderData<typeof loader>();

  const [selectedView, setSelectedViews] = useState(views[0]);

  return (
    <div className="py-6 px-4 w-full flex flex-col gap-6">
      <h1 className="header">Dashboard</h1>

      <div className="flex flex-row gap-4 w-full">
        {views.map((v, i) => (
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
