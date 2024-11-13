import { ColumnDef } from "@tanstack/react-table";
import { AuthorizedEvent } from "~/types/AuthorizedEvent";
import { SecurityEvent } from "~/types/SecurityEvent";

export const authorizedEventsColumn: ColumnDef<AuthorizedEvent>[] = [
  {
    accessorKey: "eventId",
    header: "Event ID",
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("eventId")}</div>
    ),
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("time")}</div>
    ),
  },
  {
    accessorKey: "sourceIP",
    header: "Source IP",
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("sourceIP")}</div>
    ),
  },
  {
    accessorKey: "port",
    header: "Port",
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("resource")}</div>
    ),
  },
  {
    accessorKey: "resource",
    header: "Resource",
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("resource")}</div>
    ),
  },
  {
    accessorKey: "requestSizeInBytes",
    header: "Request Size [Bytes]",
    cell: ({ row }) => (
      <div className="capitalize pl-4">
        {row.getValue("requestSizeInBytes")}
      </div>
    ),
  },
  {
    accessorKey: "geolocation",
    header: "Geolocation",
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("geolocation")}</div>
    ),
  },
];

export const securityEventsColumn: ColumnDef<SecurityEvent>[] = [
  {
    accessorKey: "activityToken",
    header: "Activity Token",
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("activityToken")}</div>
    ),
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("time")}</div>
    ),
  },
  {
    accessorKey: "sourceIP",
    header: "Source IP",
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("sourceIP")}</div>
    ),
  },
  {
    accessorKey: "port",
    header: "Port",
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("resource")}</div>
    ),
  },
  {
    accessorKey: "vulnerability",
    header: "Vulnerability",
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("vulnerability")}</div>
    ),
  },
  {
    accessorKey: "requestSizeInBytes",
    header: "Request Size [Bytes]",
    cell: ({ row }) => (
      <div className="capitalize pl-4">
        {row.getValue("requestSizeInBytes")}
      </div>
    ),
  },
  {
    accessorKey: "geolocation",
    header: "Geolocation",
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("geolocation")}</div>
    ),
  },
];
