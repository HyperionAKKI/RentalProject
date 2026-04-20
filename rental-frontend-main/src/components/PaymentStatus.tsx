import React from "react";

interface Props {
  status: "Paid" | "Pending" | "Overdue";
}

const PaymentStatus: React.FC<Props> = ({ status }) => {
  return (
    <div className={`status ${status.toLowerCase()}`}>
      {status}
    </div>
  );
};

export default PaymentStatus;