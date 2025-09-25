import pages from "../pages";
import { Link, useLocation } from "react-router-dom";
import "../styles/component-styles/sidenav.scss";
import { fetchContentData } from "../sanityClient";
import { useEffect, useState } from "react";

export default function Sidenav({ isOpen, setIsOpen, smallScreen }) {
  const currentPath = useLocation().pathname;
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

  return smallScreen ? (
    <aside className={`sidenav_wrapper${isOpen ? " open" : ""}`}>
      <div className="sidenav">
        <div className="close_btn_wrapper">
          <button className="close_btn" onClick={() => setIsOpen(false)}>
            <div className="xmark"></div>
            <div className="xmark"></div>
          </button>
        </div>
        <ul className="sidenav_links_container">
          {pages.map((page, i) => (
            <li key={i} className="sidenav_link_item">
              <Link onClick={() => setIsOpen(false)} to={page.path} className={`sidenav_link${page.path == currentPath ? " active" : ""}`}>
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="sidenav_footer">
          <ul className="sidenav_footer_list">
            <li className="sidenav_footer_list_item">
              <a href={`mailto:${contactInformation.email}`}>{contactInformation.email}</a>
            </li>
            <li className="sidenav_footer_list_item">
              <a href={`tel:${contactInformation.phone}`}>{contactInformation.phone}</a>
            </li>
            <li className="sidenav_footer_list_item">
              <div className="sidenav_social_links">
                {socialMedia.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noopener noreferrer">
                    <i className={link.fontAwesomeIcon}></i>
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="sidenav_overlay" onClick={() => setIsOpen(false)}></div>
    </aside>
  ) : null;
}
