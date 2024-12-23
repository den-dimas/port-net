import { authorizedEventsColumn } from "~/utils/columns";
import DataTable from "./DataTable";

export default function AuthorizedEventTable({ data = [] }: { data: any[] }) {
  return <DataTable column={authorizedEventsColumn} data={data} />;
}
