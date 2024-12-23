import Ndpi from "~/components/dashboard/Ndpi";
import TrafficStatistics from "~/components/dashboard/TrafficStatistics";
import DetectedProtocols from "~/components/dashboard/DetectedProtocols";
import ProtocolStatistics from "~/components/dashboard/ProtocolStatistics";
import RiskStats from "~/components/dashboard/RiskStats";

export const dashboardCategories = [
  { name: "nDPI Memory Statistics", component: Ndpi },
  { name: "Traffic Statistics", component: TrafficStatistics },
  { name: "Detected Protocols", component: DetectedProtocols },
  { name: "Protocol Statistics", component: ProtocolStatistics },
  { name: "Risk Stats", component: RiskStats },
];

export const eventsCategories = ["Authorized Events", "Security Events"];
