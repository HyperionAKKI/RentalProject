import Header from "../admin/components/Header";

interface Room {
  id: number;
  number: string;
  status: "available" | "booked";
}

const Apartments: React.FC = () => {
  // Mock room data
  const rooms: Room[] = [
    { id: 1, number: "A-101", status: "available" },
    { id: 2, number: "A-102", status: "booked" },
    { id: 3, number: "A-103", status: "available" },
    { id: 4, number: "A-104", status: "booked" },
    { id: 5, number: "B-201", status: "available" },
    { id: 6, number: "B-202", status: "booked" },
    { id: 7, number: "B-203", status: "available" },
    { id: 8, number: "B-204", status: "booked" },
  ];

  return (
    <>
    <Header />
    <div className="container">
      

      <h2 className="page-title">Apartments</h2>

      {/* Legend */}
      <div className="legend">
        <div><span className="box available"></span> Available</div>
        <div><span className="box booked"></span> Booked</div>
      </div>

      {/* Room Grid */}
      <div className="room-grid">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`room-box ${room.status}`}
          >
            {room.number}
          </div>
        ))}
      </div>
    </div>
    </>
    
  );
};

export default Apartments;