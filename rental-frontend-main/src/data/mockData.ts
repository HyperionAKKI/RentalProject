export const dashboardData = {
  rentAmount: 12000,
  dueDate: "2026-05-05",
  paymentStatus: "Pending" as "Paid" | "Pending" | "Overdue",
  alerts: [
    "Your rent is due in 3 days",
    "Maintenance scheduled on Sunday",
  ],
};

export const billsData = [
  {
    id: "1",
    month: "April 2026",
    amount: 12000,
    dueDate: "2026-04-05",
    status: "Paid" as "Paid" | "Pending" | "Overdue",
  },
  {
    id: "2",
    month: "May 2026",
    amount: 12000,
    dueDate: "2026-05-05",
    status: "Pending" as "Paid" | "Pending" | "Overdue",
  },
  {
    id: "3",
    month: "June 2026",
    amount: 12000,
    dueDate: "2026-06-05",
    status: "Overdue" as "Paid" | "Pending" | "Overdue",
  },
];