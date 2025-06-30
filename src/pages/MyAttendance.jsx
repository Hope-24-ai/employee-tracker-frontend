// src/pages/MyAttendance.jsx
import { useEffect, useState } from "react";
import axios from "../services/api";

export default function MyAttendance() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get("/me/attendance").then((res) => setRecords(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-blue-900">My Attendance</h2>
      <table className="w-full bg-white rounded-xl shadow overflow-hidden">
        <thead className="bg-blue-800 text-white text-left">
          <tr>
            <th className="p-3">Date</th>
            <th className="p-3">Check in</th>
            <th className="p-3">Check out</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec) => (
            <tr key={rec.id} className="border-b">
              <td className="p-3">{rec.date}</td>
              <td className="p-3">{rec.check_in_time || "—"}</td>
              <td className="p-3">{rec.check_out_time || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
