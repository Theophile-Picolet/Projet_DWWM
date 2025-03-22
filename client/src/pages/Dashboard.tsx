import { useState } from "react";
import EditDashBoard from "../components/EditDashBoard";
import FormDashBoard from "../components/FormDashBoard";
import HomeDashBoard from "../components/HomeDashBoard";
import UserDashBoard from "../components/UserDashBoard";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("dashboard");

  return (
    <>
      <section className="dashboard-left">
        <button type="button" onClick={() => setActiveComponent("dashboard")}>
          Dashboard
        </button>
        <button type="button" onClick={() => setActiveComponent("form")}>
          Ajout
        </button>
        <button type="button" onClick={() => setActiveComponent("users")}>
          Utilisateur
        </button>
        <button type="button" onClick={() => setActiveComponent("edit")}>
          Edit
        </button>
      </section>
      <section className="dashboard-right">
        {activeComponent === "dashboard" && <HomeDashBoard />}
        {activeComponent === "form" && <FormDashBoard />}
        {activeComponent === "users" && <UserDashBoard />}
        {activeComponent === "edit" && <EditDashBoard />}
      </section>
    </>
  );
}
