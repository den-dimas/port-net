import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { AuthorizedEvent } from "~/types/AuthorizedEvent";
import { SecurityEvent } from "~/types/SecurityEvent";

const dt: any = {
  transport_protocol: "TCP",
  ip_version: 4,
  src_ip: "185.125.190.18",
  src_port: 130874767608392,
  dst_ip: "192.168.1.102",
  dst_port: 130874767608438,
  bidirectional: false,
  vlan_id: 0,
  tunnel: "No-Tunnel",
  application_protocol: "HTTP",
  ip_owner: "UbuntuONE",
  encryption: false,
  content_type: "???",
  full_packet_capture: "UbuntuONE",
  dpi_packets: 1,
  category: "Web",
  outgoing_packet_count: 1,
  outgoing_packet_size: 66,
  incoming_packet_count: 0,
  incoming_packet_size: 0,
  outgoing_goodput_ratio: 0,
  incoming_goodput_ratio: 0,
  duration: 0,
  hostname: "",
  currency: "",
  geolocation: "",
  bt_hash: "",
  dhcp_fingerprint: "",
  dhcp_class_id: "",
  plain_text: "",
  info_type: "invalid",
  info_details: {},
  info_tls: {
    advertised_alpns: "",
    negotiated_alpn: "",
    tls_supported_versions: "",
    ssl_version: "",
    quic_version: "",
    "hassh-c": "",
    ja3_client: "",
    ja3_client_category: "",
    ja4_client: "",
    ja4_client_category: "",
    ja4_r: "",
    server_info: "",
    server_names: "",
    server_hassh: "",
    ja3_server: "",
    ja3_server_category: "",
    tls_issuer_dn: "",
    tls_subject_dn: "",
    esni: "",
    esni_cipher: "",
    ech_version: 0,
    sha1_cert: "",
    is_safari_tls: false,
    is_firefox_tls: false,
    is_chrome_tls: false,
    validity_notbefore: "",
    validity_notafter: "",
    cipher: "",
  },
  info_analytics: {},
  info_http: {
    url: "",
    response_status_code: 0,
    request_content_type: "",
    content_type: "",
    nat_ip: "",
    server: "",
    user_agent: "",
    filename: "",
  },
  info_risk: { names: [], score: 10, info: "No client to server traffic" },
  payload: "",
};
const keys = Object.keys(dt);

export const authorizedEventsColumn: ColumnDef<AuthorizedEvent>[] = keys.map((k, i) => {
  if (k === "info_analytics") {
    return {
      accessorKey: k,
      header: ({}) => (
        <div
          key={i + "" + (i + i) + i * 12}
          className="capitalize px-4 bg-white whitespace-nowrap border-2 border-black py-2 -ml-0.5 -mt-0.5"
        >
          {k.replaceAll("_", " ")}
        </div>
      ),
      cell: ({ row }) => <div className="capitalize pl-4">{JSON.stringify(row.getValue(k))}</div>,
    };
  } else if (typeof dt[k] == "object") {
    const subKeys = Object.keys(dt[k]);

    return {
      accessorKey: k,
      header: ({}) => (
        <div key={i} className="capitalize px-4 bg-white whitespace-nowrap border-2 border-black py-2 -ml-0.5 -mt-0.5">
          {k.replaceAll("_", " ")}
        </div>
      ),
      columns: subKeys.map((sk, j) => ({
        accessorKey: k + "." + sk,
        id: sk,
        header: ({}) => (
          <div
            key={j}
            className="capitalize px-4 bg-white whitespace-nowrap border-2 border-black py-2 -ml-0.5 -mt-0.5"
          >
            {sk.replaceAll("_", " ")}
          </div>
        ),
        cell: ({ row }) => <div className="capitalize pl-4">{row.getValue(sk)}</div>,
      })),
    };
  } else {
    return {
      accessorKey: k,
      header: ({}) => (
        <div
          key={i + "" + (i + i) + i * 12}
          className="capitalize px-4 bg-white whitespace-nowrap border-2 border-black py-2 -ml-0.5 -mt-0.5"
        >
          {k.replaceAll("_", " ")}
        </div>
      ),
      cell: ({ row }) => (
        <div className="capitalize pl-4">
          {typeof row.getValue(k) == "object" ? JSON.stringify(row.getValue(k)) : row.getValue(k)}
        </div>
      ),
    };
  }
});

export const securityEventsColumn: ColumnDef<SecurityEvent>[] = [
  {
    accessorKey: "activityToken",
    header: "Activity Token",
    cell: ({ row }) => <div className="capitalize pl-4">{row.getValue("activityToken")}</div>,
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => <div className="capitalize pl-4">{row.getValue("time")}</div>,
  },
  {
    accessorKey: "sourceIP",
    header: "Source IP",
    cell: ({ row }) => <div className="capitalize pl-4">{row.getValue("sourceIP")}</div>,
  },
  {
    accessorKey: "port",
    header: "Port",
    cell: ({ row }) => <div className="capitalize pl-4">{row.getValue("resource")}</div>,
  },
  {
    accessorKey: "vulnerability",
    header: "Vulnerability",
    cell: ({ row }) => <div className="capitalize pl-4">{row.getValue("vulnerability")}</div>,
  },
  {
    accessorKey: "requestSizeInBytes",
    header: "Request Size [Bytes]",
    cell: ({ row }) => <div className="capitalize pl-4">{row.getValue("requestSizeInBytes")}</div>,
  },
  {
    accessorKey: "geolocation",
    header: "Geolocation",
    cell: ({ row }) => <div className="capitalize pl-4">{row.getValue("geolocation")}</div>,
  },
];

