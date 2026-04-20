import React from "react";
import Header from "../admin/components/Header";

const AdminHome: React.FC = () => {
  // Static data (later API se ayega)
  const data = {
    totalProperties: 12,
    occupiedUnits: 45,
    vacantUnits: 10,
    monthlyRevenue: 540000,
    pendingPayments: 6,
  };

  return (
    <>
    <Header></Header>
    <div className="container">
    

      <h2 className="page-title">Admin Dashboard</h2>

      <div className="admin-grid">
        <div className="admin-card">
          <h3>Total Properties</h3>
          <p>{data.totalProperties}</p>
        </div>

        <div className="admin-card">
          <h3>Occupied Units</h3>
          <p>{data.occupiedUnits}</p>
        </div>

        <div className="admin-card">
          <h3>Vacant Units</h3>
          <p>{data.vacantUnits}</p>
        </div>

        <div className="admin-card">
          <h3>Monthly Revenue</h3>
          <p>₹{data.monthlyRevenue}</p>
        </div>

        <div className="admin-card highlight">
          <h3>Pending Payments</h3>
          <p>{data.pendingPayments}</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminHome;