import HomePage from "./pages/HomePage/HomePage";
import FAQsPage from "./pages/FAQsPage";
import AboutPage from "./pages/About/About";
import ContactPage from "./pages/Contact";

var pages = [
  { path: "/", page: HomePage, title: "Home" },
  { path: "/about", page: AboutPage, title: "About" },
  { path: "/contact", page: ContactPage, title: "Contact" },
  { path: "/faq", page: FAQsPage, title: "FAQ" },
];

export default pages;
