import { options, sidebar } from "~/constants/routes";
import { NavLink, useLocation, useNavigate } from "@remix-run/react";

import portnetLogo from "~/assets/logo-portnet.png";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  const location = useLocation().pathname.split("/")[1];
  const navigate = useNavigate();

  if (location == "login") return <></>;

  return (
    <aside className="w-24 overflow-clip border-r-2 border-orange-main flex flex-col justify-between items-center h-screen sticky top-0 left-0 bg-white z-10 text-xs">
      <img src={portnetLogo} alt="Logo" className="w-24 pt-4 -mb-4" />

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
              className={({ isActive }) => "nav-link-black block w-full " + (isActive ? "bg-black" : "")}
              onClick={(e) => {
                if (o.name == "Logout") {
                  e.preventDefault();
                  navigate("/login");
                }
              }}
            >
              {o.name}
            </NavLink>
          </li>
        ))}
      </ol>
    </aside>
  );
}

