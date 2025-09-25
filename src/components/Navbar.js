import { Link, useLocation } from "react-router-dom";
import "../styles/component-styles/navbar.scss";
import pages from "../pages";
import { useEffect, useState } from "react";
import { fetchContentData } from "../sanityClient";

// prettier-ignore
export default function Navbar({ openSideNav, smallScreen }) {
  const [logoData, setLogoData] = useState(null);
  const currentPath = useLocation().pathname;

  useEffect(() => {
    // Get Logo Data
    const getLogoData = async () => {
      const data = await fetchContentData();
      setLogoData(data.general);
    };
    getLogoData();

    // JS LOGIC

    function handleScroll() {
      const navbar_el = document.querySelector(".navbar");
      if (window.scrollY > 0) {
        navbar_el.classList.add("scroll");
      } else {
        navbar_el.classList.remove("scroll");
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!logoData) {
    return <></>;
  }

  return (
    <nav className="navbar">
      <div className="navbar_left">
        {smallScreen ? (
          <button className="menu_btn" onClick={openSideNav}>
            <i className="fa-solid fa-bars"></i>
          </button>
        ) : (
          <></>
        )}
        <Link to="/home" className="navbar_logo_container">
          <img className="navbar_logo" src={logoData.logo} alt={logoData.companyName}></img>
        </Link>
      </div>

      <div className="navbar_right">
        <ul className="navbar_links_wrapper">
          {pages.map((page, i) => {
            return (
              <li key={i} className="navbar_link_container">
                <Link to={page.path} className={`navbar_link${page.path == currentPath ? " active" : ""}`}>
                  {page.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
