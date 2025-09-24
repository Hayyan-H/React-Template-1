import "../../styles/home.scss";

import { useEffect, useState } from "react";
import { fetchContentData } from "../../sanityClient";

import HeroSection from "./Sections/HeroSection";
import FeaturesSection from "./Sections/FeaturesSection";
import TextSection1 from "./Sections/TextSection1";
import TextSection2 from "./Sections/TextSection2";

export default function HomePage() {
  const [HomePageSections, setHomePageSections] = useState(null);

  useEffect(() => {
    const getHomePageData = async () => {
      const data = await fetchContentData();
      setHomePageSections(data.homepage_sections);
    };
    getHomePageData();
  }, []);

  if (!HomePageSections) {
    return <></>;
  }

  return (
    <>
      <div className="homepage_container">
        {HomePageSections.map((section, index) => {
          if (section._type === "hero") {
            return <HeroSection key={index} heroData={section} />;
          } else if (section._type === "features") {
            return <FeaturesSection key={index} sectionItems={section.features} sectionTitle={section.title} />;
          } else if (section._type === "text1") {
            return <TextSection1 key={index} sectionData={section} />;
          } else if (section._type === "text2") {
            return <TextSection2 key={index} sectionData={section} />;
          }
          return null;
        })}
      </div>
    </>
  );
}
