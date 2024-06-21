import React, { ReactNode, useContext } from "react";
import { NavLink } from "react-router-dom";
import { LINES_ROUTE, MAIN_ROUTE, MAP_ROUTE, PLATFORMS_ROUTE, SCHEDULE_ROUTE, STAFFS_ROUTE, STATIONS_ROUTE, TRAINS_ROUTE } from "../../consts";


interface IProps {
  children: ReactNode;
}

interface ILink {
  link: string;
  text: string;
  roles?: string[];
}

const applicationLinks: ILink[] = [
  { link: LINES_ROUTE, text: "Lines" },
  { link: PLATFORMS_ROUTE, text: "Platforms" },
  { link: SCHEDULE_ROUTE, text: "Schedules" },
  { link: STAFFS_ROUTE, text: "Staffs" },
  { link: STATIONS_ROUTE, text: "Stations" },
  { link: TRAINS_ROUTE, text: "Trains" },
  { link: MAP_ROUTE, text: "Map" },
];

export const Navbar = ({ children }: IProps) => {

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
          <div className="container">
            <NavLink to={MAIN_ROUTE} className="navbar-brand">
              Metro
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target=".navbar-collapse"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
              <ul className="navbar-nav flex-grow-1">
                {applicationLinks.map(({ link, text }) => (
                  <li className="nav-item" key={link}>
                    <NavLink to={link} className="nav-link text-dark">
                      {text}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div className="container">
        <main role="main" className="pb-3">
          {children}
        </main>
      </div>
    </div>
  );
};
