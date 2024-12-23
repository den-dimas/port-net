export default function DetectedProtocols({
  detectedData,
}: {
  detectedData: any[];
}) {
  return (
    <div
      id="dashboard-detected-protocols"
      className="flex flex-col gap-2 text-black"
    >
      {detectedData.map((p, i) => (
        <div key={i} className="grid grid-cols-4">
          <h1 className="font-bold">{p["name"]}</h1>
          <p>Packets: {p["packet_count"]}</p>
          <p>Bytes: {p["byte_count"]}</p>
          <p>Flows: {p["flow_count"]}</p>
        </div>
      ))}
    </div>
  );
}
