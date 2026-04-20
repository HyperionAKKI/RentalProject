import React from "react";

interface Props {
  alerts: string[];
}

const AlertBox: React.FC<Props> = ({ alerts }) => {
  return (
    <div className="alerts">
      <h3>Important Alerts</h3>
      <ul>
        {alerts.map((alert, index) => (
          <li key={index}>{alert}</li>
        ))}
      </ul>
    </div>
  );
};

export default AlertBox;