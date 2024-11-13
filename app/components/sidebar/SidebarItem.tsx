import { NavLink } from "@remix-run/react";
import { Fragment } from "react/jsx-runtime";

interface sidebarItem {
  name: string;
  logo: () => JSX.Element;
  link: string;
}

export default function SidebarItem({ name, logo, link }: sidebarItem) {
  return (
    <div id={`sidebar-${name}`} className="">
      <NavLink
        to={link}
        className={({ isActive }) =>
          `p-4 max-w-full flex flex-col items-center no-underline font-fira-sans duration-200 ease-out ${
            isActive ? "bg-orange-main fill-white text-white" : ""
          }`
        }
      >
        <Fragment key={name}>{logo()}</Fragment>

        <p>{name}</p>
      </NavLink>
    </div>
  );
}
