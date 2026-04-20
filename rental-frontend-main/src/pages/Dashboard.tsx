import React from "react";
import SummaryCard from "../components/SummaryCard";
import PaymentStatus from "../components/PaymentStatus";
import AlertBox from "../components/AlertBox";
import { dashboardData } from "../data/mockData";

const Dashboard: React.FC = () => {
  return (
    <>
    
    <div className="container">
      

      <div className="grid">
        <SummaryCard title="Monthly Rent" value={`₹${dashboardData.rentAmount}`} />
        <SummaryCard title="Due Date" value={dashboardData.dueDate} />
        <PaymentStatus status={dashboardData.paymentStatus} />
      </div>
      

 <div className="paynow"><button className="paynow-btn">Pay Now</button></div>
   
      <AlertBox alerts={dashboardData.alerts} />
    </div>
    </>
  );
};

export default Dashboard;