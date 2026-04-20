import React from "react";
import BillsTable from "../components/BillsTable";
import { billsData } from "../data/mockData";

const MyBills: React.FC = () => {
  return (
    <>
    <div className="container">
     
      <h2 className="page-title">My Bills</h2>
      <BillsTable bills={billsData} />
    </div>
    </>
  );
};

export default MyBills;