import Reveal from "../../../Reveal";

export default function MissionSection({ sectionData }) {
  return (
    <section className="mission_section">
      <Reveal as="img" src={sectionData.image} className="mission_image" />
      <div className="mission_text_container">
        <Reveal as="h2" className="mission_title title">
          {sectionData.title} <div className="mission_double_quote">“</div>
        </Reveal>
        <Reveal as="p" className="mission_text">
          {sectionData.text}
        </Reveal>
      </div>
    </section>
  );
}
