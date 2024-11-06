import { ndpiParams } from "~/types/DashboardTypes";

export default function Ndpi({ ndpis }: ndpiParams) {
  return (
    <div
      id="dashboard-detected-protocols"
      className="flex flex-col gap-2 text-black"
    >
      {ndpis.map((p, i) => (
        <div key={p.name} className="grid grid-cols-2">
          <h1>{p.name}:</h1>
          <p>
            {p.size} {p.unit}
          </p>
        </div>
      ))}

      <div className="grid grid-cols-2">
        <h1>nDPI Memory (once):</h1>
        <p>38.17 KB</p>
      </div>
    </div>
  );
}
