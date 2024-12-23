export default function Ndpi({
  ndpiData,
  timeData,
}: {
  ndpiData: any;
  timeData: any;
}) {
  const ndpiKeys = !!ndpiData ? Object.keys(ndpiData) : [];
  const timeKeys = !!timeData ? Object.keys(timeData) : [];

  return (
    <div
      id="dashboard-detected-protocols"
      className="flex flex-col gap-2 text-black"
    >
      {ndpiKeys.map((p, i) => (
        <div key={i} className="grid grid-cols-2">
          <h1 className="capitalize font-bold">{p.replaceAll("_", " ")}</h1>
          <p>{ndpiData[p]}</p>
        </div>
      ))}

      {timeKeys.map((p, i) => (
        <div key={i} className="grid grid-cols-2">
          <h1 className="capitalize font-bold">{p.replaceAll("_", " ")}</h1>
          <p>{timeData[p]}</p>
        </div>
      ))}
    </div>
  );
}
