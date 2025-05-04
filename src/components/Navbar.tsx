import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaChartLine, FaTable, FaLightbulb, FaRandom, FaCog } from "react-icons/fa";
import { useTranslation } from "../hooks/useTranslation";
import "../styles/Navbar.css"; // Still needed for serious-mode & optional overrides

const Navbar = ({ onOpenSettings }: { onOpenSettings: () => void }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 z-50 w-full bg-gradient-to-r from-[#14557f] to-[#061b2d] border-b-4 border-[#71fafc] shadow-lg px-4 py-4 sm:flex sm:justify-between sm:items-center">
      <h1
        className="text-white text-xl sm:text-2xl font-bold tracking-wide uppercase mb-4 sm:mb-0 cursor-pointer transition-all duration-300 hover:text-[#71fafc] hover:drop-shadow-[0_0_10px_#71fafc]"
        onClick={() => navigate("/")}
      >
        {t("appTitle")}
      </h1>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 w-full sm:w-auto">
        <NavLink
          to="/Dashboard"
          className={({ isActive }) =>
            `nav-link ${isActive ? "bg-[#56b7d9] border-[#56b7d9] text-white" : ""}`
          }
        >
          <FaChartLine className="mr-2" />
          {t("Dashboard")}
        </NavLink>

        <NavLink
          to="/Table"
          className={({ isActive }) =>
            `nav-link ${isActive ? "bg-[#56b7d9] border-[#56b7d9] text-white" : ""}`
          }
        >
          <FaTable className="mr-2" />
          {t("Table")}
        </NavLink>

        <NavLink
          to="/Predictive"
          className={({ isActive }) =>
            `nav-link ${isActive ? "bg-[#56b7d9] border-[#56b7d9] text-white" : ""}`
          }
        >
          <FaLightbulb className="mr-2" />
          {t("Predictive")}
        </NavLink>

        <NavLink
          to="/Mix"
          className={({ isActive }) =>
            `nav-link ${isActive ? "bg-[#56b7d9] border-[#56b7d9] text-white" : ""}`
          }
        >
          <FaRandom className="mr-2" />
          {t("mix")}
        </NavLink>

        <button onClick={onOpenSettings} className="nav-link">
          <FaCog className="mr-2" />
          {t("settings")}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
