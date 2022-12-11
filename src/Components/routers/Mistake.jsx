import { NavLink, useRouteError } from "react-router-dom";
import "./style.css";

export default function Eror() {
  const error = useRouteError();
  return (
    <div className="page-error">
      <div className="first-line">404</div>
      <div className="second-line">Page not found</div>
      <div className="third-line" style={{ display: "flex", gap: "1rem" }}>
        Go to page
        <NavLink id="link" to="/users">
          Users
        </NavLink>
      </div>
    </div>
  );
}
