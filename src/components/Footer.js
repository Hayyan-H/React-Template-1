import { useRef, useEffect, useState } from "react";
import pages from "../pages";
import "../styles/component-styles/footer.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { fetchContentData } from "../sanityClient";

function SocialIcon({ item }) {
  const iconRef = useRef(null);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (iconRef.current && iconRef.current.offsetWidth === 0) {
        setShowFallback(true);
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <a href={item.url} className="footer_social_link" target="_blank" rel="noopener noreferrer">
      {showFallback ? <span>{item.platform}</span> : <i ref={iconRef} className={item.fontAwesomeIcon}></i>}
    </a>
  );
}

export default function Footer() {
  const [socialMedia, setSocialMedia] = useState(null);
  const [contactInformation, setContactInformation] = useState(null);

  useEffect(() => {
    const getFooterData = async () => {
      const data = await fetchContentData();
      setSocialMedia(data.socialMedia);
      setContactInformation(data.contactInformation);
    };
    getFooterData();
  }, []);

  if (!socialMedia || !contactInformation) {
    return <></>;
  }

  return (
    <footer className="footer">
      <div className="footer_container">
        <div className="row">
          <div className="footer_col text_col">
            <h4>About Us</h4>
            <p>We are a company dedicated to providing the best services in the industry. Our team is committed to excellence and customer satisfaction.</p>
          </div>
          <div className="footer_col">
            <h4>Contact Us</h4>
            <ul>
              <li>
                <a href={`mailto:${contactInformation.email}`}>{contactInformation.email}</a>
              </li>
              <li>
                <a href={`tel:${contactInformation.phone}`}>{contactInformation.phone}</a>
              </li>
              <li>
                <a href={contactInformation.googleMapsLink} target="_blank" rel="noopener noreferrer">
                  {contactInformation.address}
                </a>
              </li>
            </ul>
          </div>
          <div className="footer_col">
            <h4>Quick Links</h4>
            <ul>
              {pages.map((page, i) => (
                <li key={i}>
                  <a href={page.path} className="footer_link">
                    {page.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer_col">
            <h4>Social Media</h4>
            <div className="social_links">
              {socialMedia.map((item, i) => (
                <SocialIcon key={i} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="subfooter">
        <hr className="footer_separator" />
        <div className="subfooter_text">
          <p>&copy; 2025 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
