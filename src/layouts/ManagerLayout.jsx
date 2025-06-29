// src/layouts/ManagerLayout.jsx
import ManagerNavbar from "../components/ManagerNavbar";
import ManagerSidebar from "../components/ManagerSidebar";
import { Outlet } from "react-router-dom";

export default function ManagerLayout() {
  return (
    <div className="min-h-screen">
      <ManagerNavbar />
      <div className="flex pt-16">
        <ManagerSidebar />
        <main className="ml-64 p-6 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
