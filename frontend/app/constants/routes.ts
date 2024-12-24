import DashboardIcon from "~/components/sidebar/sidebarIcon/DashboardIcon";
import EventsIcon from "~/components/sidebar/sidebarIcon/EventsIcon";
import ConfigurationIcon from "~/components/sidebar/sidebarIcon/ConfigurationIcon";

export const sidebar = [
  {
    name: "Dashboard",
    logo: DashboardIcon,
    link: "/dashboard",
    description: "Dashboard page is used to see packet monitoring status.",
  },
  {
    name: "Events",
    logo: EventsIcon,
    link: "/events",
    description: "Events page is used to monitor all packets.",
  },
  {
    name: "Configuration",
    logo: ConfigurationIcon,
    link: "/configuration",
    description: "Configuration page is used to set settings such as email, notification, etc.",
  },
];

export const options = [
  { name: "Help", link: "/help" },
  { name: "Logout", link: "/logout" },
];

