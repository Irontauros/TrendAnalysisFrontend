// src/components/Navbar.tsx

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaChartLine, FaTable, FaLightbulb, FaRandom, FaCog } from "react-icons/fa";
import { useTranslation } from "../hooks/useTranslation";
import "../styles/Navbar.css";

const Navbar = ({ onOpenSettings }: { onOpenSettings: () => void }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-link nav-link-active" : "nav-link";

  return (
    <nav className="navbar">
      <h1 className="navbar-title clickable" onClick={() => navigate("/")}>
        {t("appTitle")}
      </h1>

      <div className="navbar-links">
        <NavLink to="/Dashboard" className={navLinkClass}>
          <FaChartLine className="nav-icon" />
          {t("Dashboard")}
        </NavLink>

        <NavLink to="/Table" className={navLinkClass}>
          <FaTable className="nav-icon" />
          {t("Table")}
        </NavLink>

        <NavLink to="/Predictive" className={navLinkClass}>
          <FaLightbulb className="nav-icon" />
          {t("Predictive")}
        </NavLink>

        <NavLink to="/Mix" className={navLinkClass}>
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
