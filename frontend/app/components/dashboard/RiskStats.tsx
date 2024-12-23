export default function RiskStats({ riskData }: { riskData: any[] }) {
  return (
    <div
      id="dashboard-protocol-statistics"
      className="flex flex-col gap-2 text-black"
    >
      {riskData.map((p, i) => (
        <div key={i} className="grid grid-cols-3">
          <h1 className="font-bold">{p["name"]}</h1>
          <p>{p["flow_count"]}</p>
          <p> [ {parseFloat(p["ratio"]).toFixed(2)} %]</p>
        </div>
      ))}
    </div>
  );
}
