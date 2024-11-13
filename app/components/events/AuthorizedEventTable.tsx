import { authorizedEventsColumn } from "~/utils/columns";
import DataTable from "./DataTable";

export default function AuthorizedEventTable() {
  return <DataTable column={authorizedEventsColumn} data={[]} />;
}
