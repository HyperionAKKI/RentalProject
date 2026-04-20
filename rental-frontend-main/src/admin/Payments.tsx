import { useState } from "react";
import Header from "../admin/components/Header";

interface Payment {
  id: string;
  tenantName: string;
  roomNo: string;
  amount: number;
  dueDate: string;
  status: "Paid" | "Pending" | "Overdue";
}


const Payments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "1",
      tenantName: "Mannu Sharma",
      roomNo: "A-203",
      amount: 12000,
      dueDate: "2026-05-05",
      status: "Pending",
    },
    {
      id: "2",
      tenantName: "Rahul Verma",
      roomNo: "B-101",
      amount: 10000,
      dueDate: "2026-04-05",
      status: "Paid",
    },
    {
      id: "3",
      tenantName: "Amit Singh",
      roomNo: "C-305",
      amount: 15000,
      dueDate: "2026-04-01",
      status: "Overdue",
    },
  ]);

  // Mark as Paid
  const markAsPaid = (id: string) => {
    const updated = payments.map((p) =>
      p.id === id ? { ...p, status: "Paid" } : p
    );
    setPayments(updated);
  };

  return (
    <>
      <Header />
    
    <div className="container">
    

      <h2 className="page-title">Payments Management</h2>

      <div className="table-container">
        <table className="bills-table">
          <thead>
            <tr>
              <th>Tenant</th>
              <th>Room</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr
                key={p.id}
                className={
                  p.status === "Pending"
                    ? "pending-row"
                    : p.status === "Overdue"
                    ? "overdue-row"
                    : ""
                }
              >
                <td>{p.tenantName}</td>
                <td>{p.roomNo}</td>
                <td>₹{p.amount}</td>
                <td>{p.dueDate}</td>

                <td>
                  <span className={`status-badge ${p.status.toLowerCase()}`}>
                    {p.status}
                  </span>
                </td>

                <td>
                  {p.status !== "Paid" && (
                    <button
                      className="pay-btn"
                      onClick={() => markAsPaid(p.id)}
                    >
                      Mark Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default Payments;