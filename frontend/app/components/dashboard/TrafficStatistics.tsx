export default function TrafficStatistics({
  trafficData,
}: {
  trafficData: any;
}) {
  const keys = !!trafficData ? Object.keys(trafficData) : [];

  return (
    <div
      id="dashboard-traffic-statistics"
      className="flex flex-col gap-2 text-black h-full"
    >
      {keys.map((p, i) => (
        <div key={i} className="grid grid-cols-2">
          <h1 className="capitalize font-bold">{p.replaceAll("_", " ")}</h1>
          <p>{trafficData[p]}</p>
        </div>
      ))}
    </div>
  );
}
