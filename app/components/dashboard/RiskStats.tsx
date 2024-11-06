import { riskStatsParams } from "~/types/DashboardTypes";

export default function RiskStats({ risks }: riskStatsParams) {
  return (
    <div
      id="dashboard-protocol-statistics"
      className="flex flex-col gap-2 text-black"
    >
      {risks.map((p, i) => (
        <div key={p.name} className="grid grid-cols-2">
          <h1>{p.name}</h1>
          <p>
            {p.count} [{p.percentage} %]
          </p>
        </div>
      ))}

      <div className="grid grid-cols-2">
        <h1>SSH Obsolete CLI Vers/Cipher</h1>
        <p>1 [ 1.7 %]</p>
      </div>

      <div className="grid grid-cols-2">
        <h1>Desktop/File Sharing</h1>
        <p>1 [ 1.7 %]</p>
      </div>

      <div className="grid grid-cols-2">
        <h1>Susp Entropy</h1>
        <p>8 [13.3 %]</p>
      </div>
    </div>
  );
}
