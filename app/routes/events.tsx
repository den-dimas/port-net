import { useState } from "react";
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  const accessEvents: any[] = [];
  const securityEvents: any[] = [];

  return { accessEvents, securityEvents };
}

export default function Events() {
  const { accessEvents, securityEvents } = useLoaderData<typeof loader>();

  const [filters, setFilters] = useState<string[]>([]);
  const [currentFilter, setCurrentFilter] = useState("");

  const [displaySecurityEvents, setDisplaySecurityEvents] = useState(false);
  const [displayAuthorizedEvents, setDisplayAuthorizedEvents] = useState(true);

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const toggleAuthorizedEvents = () => {
    setDisplayAuthorizedEvents(true);
    setDisplaySecurityEvents(false);
    setFilters(["IP", "Port", "Event ID", "Time", "Geolocation"]);
  };

  const toggleSecurityEvents = () => {
    setDisplaySecurityEvents(true);
    setDisplayAuthorizedEvents(false);
    setFilters([
      "Activity Token",
      "IP",
      "Port",
      "Vulnerability",
      "Time",
      "Geolocation",
    ]);
  };

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleSetFilter = (filter: string) => {
    setCurrentFilter(filter);
    setIsDropDownOpen(false);
  };

  return (
    <div className="v-admin-events">
      <h1 className="v-admin-events-header">Events</h1>
      <div className="v-admin-events-toolbar">
        <div className="v-admin-events-toolbar-btns">
          <button type="button" onClick={toggleAuthorizedEvents}>
            Authorized Events
          </button>
          <button type="button" onClick={toggleSecurityEvents}>
            Security Events
          </button>
        </div>
        <div className="v-admin-events-toolbar-filter-bar">
          <input
            value={currentFilter}
            onChange={(e) => setCurrentFilter(e.target.value)}
            className="filter-input-bar"
            placeholder="Filter:"
            type="text"
          />
          <svg
            className="drop-down-icon"
            onClick={toggleDropDown}
            fill="#000000"
            version="1.1"
            width="20px"
            height="20px"
            viewBox="0 0 971.986 971.986"
          >
            <g>
              <path d="M370.216,459.3c10.2,11.1,15.8,25.6,15.8,40.6v442c0,26.601,32.1,40.101,51.1,21.4l123.3-141.3c16.5-19.8,25.6-29.601,25.6-49.2V500c0-15,5.7-29.5,15.8-40.601L955.615,75.5c26.5-28.8,6.101-75.5-33.1-75.5h-873c-39.2,0-59.7,46.6-33.1,75.5L370.216,459.3z"></path>
            </g>
          </svg>
          {isDropDownOpen && (
            <div className="drop-down-menu">
              {filters.map((filter, index) => (
                <div key={index} onClick={() => handleSetFilter(filter)}>
                  {filter}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="v-admin-events-table-con">
        {displayAuthorizedEvents && (
          <div className="v-admin-events-authorized">
            <table className="v-admin-au-events-table">
              <thead>
                <tr>
                  <th>Event ID</th>
                  <th>Time</th>
                  <th>Source IP</th>
                  <th>Port</th>
                  <th>Resource</th>
                  <th>Request Size [bytes]</th>
                  <th>Geolocation</th>
                </tr>
              </thead>
              <tbody>
                {accessEvents.map((event, index) => (
                  <tr key={index}>
                    <td>{event.id}</td>
                    <td>{event.log.creation_date}</td>
                    <td>{event.log.ip}</td>
                    <td>{event.log.port}</td>
                    <td>{event.request.url[2]}</td>
                    <td>{event.request.size}</td>
                    <td>
                      {event.log.geolocation.continent},{" "}
                      {event.log.geolocation.country},{" "}
                      {event.log.geolocation.city}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {displaySecurityEvents && (
          <div className="v-admin-events-security">
            <table className="v-admin-sec-events-table">
              <thead>
                <tr>
                  <th>Activity Token</th>
                  <th>Time</th>
                  <th>Source IP</th>
                  <th>Port</th>
                  <th>Vulnerability</th>
                  <th>Request Size [bytes]</th>
                  <th>Geolocation</th>
                </tr>
              </thead>
              <tbody>
                {securityEvents.map((event, index) => (
                  <tr key={index}>
                    <td>{event.id}</td>
                    <td>{event.log.creation_date}</td>
                    <td>{event.log.ip}</td>
                    <td>{event.log.port}</td>
                    <td>{event.log.classifiers[0]}</td>
                    <td>{event.request.size}</td>
                    <td>
                      {event.log.geolocation.continent},{" "}
                      {event.log.geolocation.country},{" "}
                      {event.log.geolocation.city}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
