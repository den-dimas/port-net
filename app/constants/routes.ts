import DashboardIcon from "~/components/sidebarIcon/DashboardIcon";
import EventsIcon from "~/components/sidebarIcon/EventsIcon";
import ConfigurationIcon from "~/components/sidebarIcon/ConfigurationIcon";

export const sidebar = [
  {
    name: "Dashboard",
    logo: DashboardIcon,
    link: "/dashboard",
  },
  {
    name: "Events",
    logo: EventsIcon,
    link: "/events",
  },
  {
    name: "Configuration",
    logo: ConfigurationIcon,
    link: "/configuration",
  },
];

export const options = [
  { name: "Help", link: "/help" },
  { name: "Logout", link: "/logout" },
];
