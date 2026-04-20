import React from "react";


interface FooterLink {
  label: string;
  path: string;
}

const companyLinks: FooterLink[] = [
  { label: "About Us", path: "#" },
  { label: "Careers", path: "#" },
  { label: "Blog", path: "#" },
];

const supportLinks: FooterLink[] = [
  { label: "Help Center", path: "#" },
  { label: "Terms of Service", path: "#" },
  { label: "Privacy Policy", path: "#" },
];

const exploreLinks: FooterLink[] = [
  { label: "Apartments", path: "#" },
  { label: "Villas", path: "#" },
  { label: "Offices", path: "#" },
];

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Brand */}
        <div className="footer-brand">
          <h2>Rentify</h2>
          <p>Your trusted rental marketplace for homes and spaces.</p>
        </div>

        {/* Links */}
        <div className="footer-links">

          <div className="footer-column">
            <h4>Company</h4>
            {companyLinks.map((link) => (
              <a key={link.label} href={link.path}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="footer-column">
            <h4>Support</h4>
            {supportLinks.map((link) => (
              <a key={link.label} href={link.path}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="footer-column">
            <h4>Explore</h4>
            {exploreLinks.map((link) => (
              <a key={link.label} href={link.path}>
                {link.label}
              </a>
            ))}
          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Rentify. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;