import React from "react";

 interface Bill {
  id: string;
  month: string;
  amount: number;
  dueDate: string;
  status: "Paid" | "Pending" | "Overdue";
}

interface Props {
  bills: Bill[];
}

const BillsTable: React.FC<Props> = ({ bills }) => {
  return (
    <div className="table-container">
      <table className="bills-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Amount</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Receipt</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr
              key={bill.id}
              className={
                bill.status === "Pending"
                  ? "pending-row"
                  : bill.status === "Overdue"
                  ? "overdue-row"
                  : ""
              }
            >
              <td>{bill.month}</td>
              <td>₹{bill.amount}</td>
              <td>{bill.dueDate}</td>
              <td>
                <span className={`status-badge ${bill.status.toLowerCase()}`}>
                  {bill.status}
                </span>
              </td>
              <td>
                <button className="receipt-btn">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillsTable;