import React from "react";
import Header from "../admin/components/Header";

interface Document {
  id: string;
  tenantName: string;
  roomNo: string;
  contact: string;
  idProof: string;
  agreement: string;
}

const Documents: React.FC = () => {
  const documents: Document[] = [
    {
      id: "1",
      tenantName: "Mannu Sharma",
      roomNo: "A-203",
      contact: "+91 9876543210",
      idProof: "Aadhar Card",
      agreement: "Rental Agreement",
    },
    {
      id: "2",
      tenantName: "Rahul Verma",
      roomNo: "B-101",
      contact: "+91 9123456780",
      idProof: "PAN Card",
      agreement: "Rental Agreement",
    },
    {
      id: "3",
      tenantName: "Amit Singh",
      roomNo: "C-305",
      contact: "+91 9988776655",
      idProof: "Driving License",
      agreement: "Rental Agreement",
    },
  ];

  return (
    <> <Header />
    
    <div className="container">
     

      <h2 className="page-title">Documents & Tenant Details</h2>

      <div className="table-container">
        <table className="bills-table">
          <thead>
            <tr>
              <th>Tenant Name</th>
              <th>Room</th>
              <th>Contact</th>
              <th>ID Proof</th>
              <th>Agreement</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.tenantName}</td>
                <td>{doc.roomNo}</td>
                <td>{doc.contact}</td>
                <td>{doc.idProof}</td>
                <td>{doc.agreement}</td>

                <td>
                  <button className="view-btn">View</button>
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

export default Documents;