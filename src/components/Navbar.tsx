import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaChartLine, FaTable, FaLightbulb, FaRandom, FaCog } from "react-icons/fa";
import { useTranslation } from "../hooks/useTranslation";
import "../styles/Navbar.css";

const Navbar = ({ onOpenSettings }: { onOpenSettings: () => void }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h1
        className="navbar-title clickable"
        onClick={() => navigate("/")}
      >
        {t("appTitle")}
      </h1>

      <div className="navbar-links">
        <NavLink
          to="/Dashboard"
          className={({ isActive }) =>
            isActive ? "nav-link nav-link-active-dashboard" : "nav-link"
          }
        >
          <FaChartLine className="nav-icon" />
          {t("Dashboard")}
        </NavLink>

        <NavLink
          to="/Table"
          className={({ isActive }) =>
            isActive ? "nav-link nav-link-active-Table" : "nav-link"
          }
        >
          <FaTable className="nav-icon" />
          {t("Table")}
        </NavLink>

        <NavLink
          to="/Predictive"
          className={({ isActive }) =>
            isActive ? "nav-link nav-link-active-Predictive" : "nav-link"
          }
        >
          <FaLightbulb className="nav-icon" />
          {t("Predictive")}
        </NavLink>

        <NavLink
          to="/Mix"
          className={({ isActive }) =>
            isActive ? "nav-link nav-link-active-mix" : "nav-link"
          }
        >
          <FaRandom className="nav-icon" />
          {t("mix")}
        </NavLink>

        <button onClick={onOpenSettings} className="nav-link">
          <FaCog className="nav-icon" />
          {t("settings")}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
