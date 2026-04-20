import { useState } from "react";
import Header from "../admin/components/Header";

interface MaintenanceItem {
  id: string;
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
}


const Maintenance: React.FC = () => {
  const [tasks, setTasks] = useState<MaintenanceItem[]>([
    {
      id: "1",
      title: "Water Leakage",
      description: "Bathroom pipe leakage in Room A-203",
      status: "Pending",
    },
    {
      id: "2",
      title: "Electric Repair",
      description: "Switchboard issue in Room B-101",
      status: "In Progress",
    },
    {
      id: "3",
      title: "Cleaning",
      description: "Corridor cleaning completed",
      status: "Completed",
    },
  ]);

  return (
    <>
     <Header />
    
    <div className="container">
     

      <h2 className="page-title">Maintenance</h2>

      {/* Charges Section */}
      <div className="maintenance-summary">
        <div className="summary-card">
          <h3>Monthly Maintenance</h3>
          <p>₹1500</p>
        </div>

        <div className="summary-card">
          <h3>Pending Requests</h3>
          <p>{tasks.filter((t) => t.status === "Pending").length}</p>
        </div>

        <div className="summary-card">
          <h3>Completed Works</h3>
          <p>{tasks.filter((t) => t.status === "Completed").length}</p>
        </div>
      </div>

      {/* Tasks List */}
      <div className="maintenance-list">
        {tasks.map((task) => (
          <div className="maintenance-card" key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>

            <span className={`status-badge ${task.status.replace(" ", "-").toLowerCase()}`}>
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </div>
     </>
  );
};

export default Maintenance;