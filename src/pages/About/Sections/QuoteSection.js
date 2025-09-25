import Reveal from "../../../Reveal";

export default function QuoteSection({ sectionData }) {
  return (
    <>
      <section className="quote_section">
        <Reveal as="img" src={sectionData.image} className="section_img" />
        <Reveal as="h1" className="section_quote">
          {sectionData.quote}
        </Reveal>
        <Reveal as="p" className="section_person">
          {sectionData.name}
        </Reveal>
      </section>
    </>
  );
}
