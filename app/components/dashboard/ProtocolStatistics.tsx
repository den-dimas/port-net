import { protocolStatsParams } from "~/types/DashboardTypes";

export default function ProtocolStatistics({
  statistics,
}: protocolStatsParams) {
  return (
    <div
      id="dashboard-protocol-statistics"
      className="flex flex-col gap-2 text-black"
    >
      {statistics.map((p, i) => (
        <div key={p.name} className="grid grid-cols-4">
          <h1>{p.name}</h1>
          <p>Packets: {p.packets}</p>
          <p>Bytes: {p.bytes}</p>
          <p>Flows: {p.flows}</p>
        </div>
      ))}

      <div className="grid grid-cols-4">
        <h1>Acceptable</h1>
        <p>Packets: 200</p>
        <p>Bytes: 2045</p>
        <p>Flows: 12</p>
      </div>

      <div className="grid grid-cols-4">
        <h1>Unrated</h1>
        <p>Packets: 141</p>
        <p>Bytes: 3233</p>
        <p>Flows: 94</p>
      </div>
    </div>
  );
}
