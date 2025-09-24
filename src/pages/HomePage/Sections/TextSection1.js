import Reveal from "../../../Reveal";

export default function TextSection1({ sectionData }) {
  const positionClass = sectionData.imagePosition === "right" ? "image_right" : "image_left";

  return (
    <section className={`text_section_1 ${positionClass}`}>
      <Reveal as="img" className="text_section_1_image" src={sectionData.image} alt={sectionData.title} />
      <div className="text_section_1_text_container">
        <Reveal as="h1" className="text_section_1_title title">
          {sectionData.title}
        </Reveal>
        <Reveal as="p" className="text_section_1_text">
          {sectionData.text}
        </Reveal>
      </div>
    </section>
  );
}
