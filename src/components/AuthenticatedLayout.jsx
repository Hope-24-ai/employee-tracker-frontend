
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function AuthenticatedLayout() {
  return (
    <>
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
}
