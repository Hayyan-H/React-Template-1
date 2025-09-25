import "../styles/layout.scss";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidenav from "../components/Sidenav";
import { use, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function MainLayout({ Page }) {
  const [SidenavOpen, setSidenavOpen] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);
  // Function to toggle small screen state
  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(window.innerWidth < 730);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll to top when pathname changes
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Sidenav isOpen={SidenavOpen} setIsOpen={setSidenavOpen} smallScreen={smallScreen} />
      <Navbar openSideNav={() => setSidenavOpen(true)} smallScreen={smallScreen} />
      <main className="main">
        <Page />
      </main>
      <Footer />
    </>
  );
}
