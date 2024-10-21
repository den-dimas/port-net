import { options, sidebar } from "~/constants/routes";
import { NavLink } from "@remix-run/react";

import portnetLogo from "~/assets/logo-portnet.png";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  return (
    <aside className="w-32 overflow-clip border-r-2 border-orange-main flex flex-col justify-between h-screen sticky left-0 bg-white">
      <img src={portnetLogo} alt="Logo" className="w-44" />

      <div className="">
        {sidebar.map((s, i) => (
          <div key={i}>
            <SidebarItem {...s} />
          </div>
        ))}
      </div>

      <ol className="flex flex-col w-full items-center bg-orange-main">
        {options.map((o, i) => (
          <li key={i} className="w-full text-center">
            <NavLink
              to={o.link}
              className={({ isActive }) =>
                "nav-link-black block w-full " + (isActive ? "bg-black" : "")
              }
            >
              {o.name}
            </NavLink>
          </li>
        ))}
      </ol>
    </aside>
  );
}
