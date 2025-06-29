
import { Users, ListChecks, CalendarCheck, PlusCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function ManagerSidebar() {
  return (
    <aside className="w-64 h-full bg-blue-900 text-white pt-20 px-4 fixed top-0 left-0">
      <nav className="flex flex-col gap-6">
        <NavLink
          to="/manager/reviews"
          className="hover:text-yellow-300 flex gap-2 items-center"
        >
          <ListChecks size={20} /> Employee Reviews
        </NavLink>
        <NavLink
          to="/manager/employees"
          className="hover:text-yellow-300 flex gap-2 items-center"
        >
          <Users size={20} /> Department Staff
        </NavLink>
        <NavLink
          to="/manager/attendance"
          className="hover:text-yellow-300 flex gap-2 items-center"
        >
          <CalendarCheck size={20} /> Attendance
        </NavLink>
        <NavLink
          to="/manager/add-review"
          className="hover:text-yellow-300 flex gap-2 items-center"
        >
          <PlusCircle size={20} /> Add Review
        </NavLink>
      </nav>
    </aside>
  );
}
