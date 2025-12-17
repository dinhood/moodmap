import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();

  const isActive = (path) =>
    path === "/"
      ? pathname === "/"
      : pathname.startsWith(path);

  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">MOODMAP</div>
        <div className="navbar-subtitle">
          Behavioral Monitoring System · Build 2.17
        </div>
      </div>

      <nav className="navbar-links">
        <Link className={isActive("/") ? "active" : ""} to="/">
          Departamento
        </Link>
        <Link
          className={isActive("/registrar") ? "active" : ""}
          to="/registrar"
        >
          Registrar estado
        </Link>
        <Link className={isActive("/mapa") ? "active" : ""} to="/mapa">
          Cartografia
        </Link>
      </nav>
    </header>
  );
}
