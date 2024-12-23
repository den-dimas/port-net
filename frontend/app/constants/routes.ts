import DashboardIcon from "~/components/sidebar/sidebarIcon/DashboardIcon";
import EventsIcon from "~/components/sidebar/sidebarIcon/EventsIcon";
import ConfigurationIcon from "~/components/sidebar/sidebarIcon/ConfigurationIcon";

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
