import { trafficStatsParams } from "~/types/DashboardTypes";

export default function TrafficStatistics({ traffics }: trafficStatsParams) {
  return (
    <div
      id="dashboard-traffic-statistics"
      className="flex flex-col gap-2 text-black"
    >
      {traffics.map((p, i) => (
        <div key={p.name} className="grid grid-cols-3">
          <h1>{p.name}:</h1>
          <p>{p.size}</p>
          <p>{p.other}</p>
        </div>
      ))}

      <div className="grid grid-cols-3">
        <h1>Ethernet bytes:</h1>
        <p>41142</p>
        <p>(includes ethernet CRC/IFC/trailer)</p>
      </div>

      <div className="grid grid-cols-3">
        <h1>Discarded bytes:</h1>
        <p>7418</p>
        <p></p>
      </div>

      <div className="grid grid-cols-3">
        <h1>IP Packets</h1>
        <p>273</p>
        <p>(avg pkt size 125 bytes)</p>
      </div>
    </div>
  );
}
