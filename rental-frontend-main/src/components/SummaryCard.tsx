import React from "react";

interface Props {
  title: string;
  value: string | number;
}

const SummaryCard: React.FC<Props> = ({ title, value }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default SummaryCard;