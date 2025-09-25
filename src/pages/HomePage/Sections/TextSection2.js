import Reveal from "../../../Reveal";

export default function TextSection2({ sectionData }) {
  return (
    <section className="text_section_2">
      <Reveal as="img" className="text_section_2_image" src={sectionData.image} alt={sectionData.title} />
      <div className="text_section_2_text_container">
        <Reveal as="h1" className="text_section_2_title title">
          {sectionData.title}
        </Reveal>
        <Reveal as="p" className="text_section_2_text">
          {sectionData.text}
        </Reveal>
      </div>
    </section>
  );
}
