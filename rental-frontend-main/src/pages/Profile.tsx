
const Profile: React.FC = () => {
  // Static data (later API se aa sakta hai)
  const user = {
    name: "Mannu Sharma",
    roomNo: "A-203",
    contact: "+91 9876543210",
    moveInDate: "2025-03-15",
  };

  return (
    <div className="container">
   

      <div className="profile-card">
        <h2 className="profile-title">My Details</h2>

        <div className="profile-grid">
          <div className="profile-item">
            <span className="label">Name</span>
            <span className="value">{user.name}</span>
          </div>

          <div className="profile-item">
            <span className="label">Room No</span>
            <span className="value">{user.roomNo}</span>
          </div>

          <div className="profile-item">
            <span className="label">Contact</span>
            <span className="value">{user.contact}</span>
          </div>

          <div className="profile-item">
            <span className="label">Move-in Date</span>
            <span className="value">{user.moveInDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;