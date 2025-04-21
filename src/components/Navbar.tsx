import React from "react";
import { NavLink } from "react-router-dom";
import { FaChartLine, FaTable, FaLightbulb, FaRandom, FaCog } from "react-icons/fa";
import { useTranslation } from "../hooks/useTranslation";
import "../styles/Navbar.css"

const Navbar = ({ onOpenSettings }: { onOpenSettings: () => void }) => {
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Trend Analisys</h1>
      <div className="navbar-links">
        <NavLink to="/graphs" className={({ isActive }) =>
          isActive ? "nav-link nav-link-active-graphs" : "nav-link"
        }>
          <FaChartLine className="nav-icon" />
          {t("graphs")}
        </NavLink>

        <NavLink to="/Comparison" className={({ isActive }) =>
          isActive ? "nav-link nav-link-active-comparison" : "nav-link"
        }>
          <FaTable className="nav-icon" />
          {t("comparison")}
        </NavLink>

        <NavLink to="/Prediction" className={({ isActive }) =>
          isActive ? "nav-link nav-link-active-prediction" : "nav-link"
        }>
          <FaLightbulb className="nav-icon" />
          {t("prediction")}
        </NavLink>

        <NavLink to="/Mix" className={({ isActive }) =>
          isActive ? "nav-link nav-link-active-mix" : "nav-link"
        }>
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
