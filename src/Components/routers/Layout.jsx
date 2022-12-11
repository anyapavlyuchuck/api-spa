import { NavLink, Outlet } from "react-router-dom";
import "./style.css";

export default function Layout() {
  return (
    <div>
      <header
        className="header-layout"
        style={{ display: "flex", gap: "1rem" }}
      >
        <NavLink
          id="link"
          to="/albums"
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
        >
          Albums
        </NavLink>
        <NavLink
          id="link"
          to="/users"
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
        >
          Users
        </NavLink>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer">
        <hr></hr>
        <div className="creater">Created by: Pavlyuchuck Anna</div>
        <div className="bsu">BSU 2022</div>
      </footer>
    </div>
  );
}
