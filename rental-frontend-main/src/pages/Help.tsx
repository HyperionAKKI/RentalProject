

const Help: React.FC = () => {
  return (
    <div className="container">
    

      <div className="help-card">
        <h2 className="help-title">Help & Support</h2>

        {/* FAQ Section */}
        <div className="faq-section">
          <h3>Frequently Asked Questions</h3>

          <div className="faq-item">
            <p className="question">How can I pay my rent?</p>
            <p className="answer">
              Go to the "My Bills" section and click on the payment option for pending bills.
            </p>
          </div>

          <div className="faq-item">
            <p className="question">How do I check my due date?</p>
            <p className="answer">
              Your due date is visible on the Dashboard and My Bills page.
            </p>
          </div>

          <div className="faq-item">
            <p className="question">What if my payment is overdue?</p>
            <p className="answer">
              Overdue payments are highlighted in red. Please clear them as soon as possible.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="contact-section">
          <h3>Contact Support</h3>
          <p>Email: support@rentease.com</p>
          <p>Phone: +91 9876543210</p>
        </div>
      </div>
    </div>
  );
};

export default Help;