
const About: React.FC = () => {
  return (
    <div className="container">
     

      <div className="about-card">
        <h2 className="about-title">About RentEase</h2>

        {/* About Description */}
        <p className="about-text">
          RentEase is a smart tenant management platform designed to simplify rent tracking,
          bill payments, and communication between tenants and property managers.
          Our goal is to make renting hassle-free and transparent.
        </p>

        {/* Features */}
        <div className="about-section">
          <h3>Key Features</h3>
          <ul>
            <li>Track monthly rent and due dates easily</li>
            <li>View payment status (Paid, Pending, Overdue)</li>
            <li>Access bills and receipts anytime</li>
            <li>Get important alerts and updates</li>
          </ul>
        </div>

        {/* Mission */}
        <div className="about-section">
          <h3>Our Mission</h3>
          <p>
            To provide a simple, reliable, and efficient platform for tenants to manage
            their rental life without confusion or stress.
          </p>
        </div>

        {/* Contact */}
        <div className="about-section">
          <h3>Contact Us</h3>
          <p>Email: support@rentease.com</p>
          <p>Phone: +91 9876543210</p>
        </div>
      </div>
    </div>
  );
};

export default About;