import { detectedProtocolsParams } from "~/types/DashboardTypes";

export default function DetectedProtocols({
  protocols,
}: detectedProtocolsParams) {
  return (
    <div
      id="dashboard-detected-protocols"
      className="flex flex-col gap-2 text-black"
    >
      {protocols.map((p, i) => (
        <div key={p.name} className="grid grid-cols-4">
          <h1>{p.name}</h1>
          <p>Packets: {p.packets}</p>
          <p>Bytes: {p.bytes}</p>
          <p>Flows: {p.flows}</p>
        </div>
      ))}

      <div className="grid grid-cols-4">
        <h1>Unkown</h1>
        <p>Packets: 115</p>
        <p>Bytes: 8438</p>
        <p>Flows: 48</p>
      </div>

      <div className="grid grid-cols-4">
        <h1>ICMP</h1>
        <p>Packets: 115</p>
        <p>Bytes: 8438</p>
        <p>Flows: 48</p>
      </div>
    </div>
  );
}
