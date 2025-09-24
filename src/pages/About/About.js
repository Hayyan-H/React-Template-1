import "../../styles/about.scss";

import { useEffect, useState } from "react";

import QuoteSection from "./Sections/QuoteSection";
import StatisticsSection from "./Sections/StatisticsSection";
import TeamSection from "./Sections/TeamSection";
import MissionSection from "./Sections/MissionSection";
import CompanyValuesSection from "./Sections/CompanyValuesSection";
import TestimonialsSection from "./Sections/TestimonialsSection";

import { fetchContentData } from "../../sanityClient";

export default function About() {
  const [aboutSections, setaboutSections] = useState(null);

  useEffect(() => {
    const getaboutSections = async () => {
      const data = await fetchContentData();
      setaboutSections(data.about_sections.sections);
    };

    getaboutSections();
  }, []);

  if (!aboutSections) {
    return <></>;
  }

  return (
    <div className="about_page">
      {aboutSections.map((section, index) => {
        if (section._type === "quote_section") {
          return <QuoteSection key={index} sectionData={section} />;
        } else if (section._type === "statistics_section") {
          return <StatisticsSection key={index} statistics={section.statistics} />;
        } else if (section._type === "team_section") {
          return <TeamSection key={index} members={section.members} description={section.description} />;
        } else if (section._type === "mission_section") {
          return <MissionSection key={index} sectionData={section} />;
        } else if (section._type === "company_values_section") {
          return <CompanyValuesSection key={index} values_list={section.company_values_list} title={section.title} />;
        } else if (section._type === "testimonials_section") {
          return <TestimonialsSection key={index} title={section.title} testimonials={section.testimonials} />;
        }
      })}
    </div>
  );
}
