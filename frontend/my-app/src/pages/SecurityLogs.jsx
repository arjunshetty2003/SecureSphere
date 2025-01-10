import React, { useState, useEffect } from "react";
import axios from "axios";

const SecurityLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5001/api/security-logs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLogs(response.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch logs");
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Security Logs</h1>
      <table className="table-auto w-full mt-4 border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Event</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td className="border px-4 py-2">{log.id}</td>
              <td className="border px-4 py-2">{log.event}</td>
              <td className="border px-4 py-2">{log.status}</td>
              <td className="border px-4 py-2">{log.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SecurityLogs;