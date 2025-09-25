import Reveal from "../../../Reveal";

export default function FeaturesSection({ sectionItems, sectionTitle }) {
  if (!sectionItems) {
    return <></>;
  }

  return (
    <>
      <section className="features_section_container">
        <div className="features_section_content">
          <Reveal as="h1" className="features_section_headline title">
            {sectionTitle}
          </Reveal>
          <div className="features_section_items_container">
            {sectionItems.map((item, index) => {
              return (
                <div className="features_section_item" key={index}>
                  <Reveal as="div" className="item_icon">
                    <i className={item.icon}></i>
                  </Reveal>
                  <div className="item_text">
                    <Reveal as="h2" className="item_title">
                      {item.title}
                    </Reveal>
                    <Reveal as="p" className="item_description">
                      {item.description}
                    </Reveal>
                  </div>
                </div>
              );
            })}
          </div>
          <Reveal as="div" className="features_section_button">
            Learn More
          </Reveal>
        </div>
      </section>
    </>
  );
}
