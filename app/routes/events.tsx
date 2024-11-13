import { useState } from "react";
import { useLoaderData } from "@remix-run/react";

import { eventsCategories } from "~/constants/categories";
import SelectButton from "~/components/SelectButton";
import AuthorizedEventTable from "~/components/events/AuthorizedEventTable";

export async function loader() {
  const authorizedEvents: any[] = [];
  const securityEvents: any[] = [];

  return { authorizedEvents, securityEvents };
}

export default function Events() {
  const { authorizedEvents, securityEvents } = useLoaderData<typeof loader>();

  const [selectedView, setSelectedViews] = useState(eventsCategories[0]);

  return (
    <div className="py-6 px-4 w-full flex flex-col gap-6">
      <h1 className="header">Events</h1>

      <div className="flex flex-row gap-4 w-full">
        {eventsCategories.map((v, i) => (
          <SelectButton
            key={i}
            title={v}
            onClick={() => setSelectedViews(v)}
            isSelected={selectedView == v}
          />
        ))}
      </div>

      {selectedView == "Authorized Events" && <AuthorizedEventTable />}
    </div>
  );
}
