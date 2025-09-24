import Reveal from "../../../Reveal";

export default function CompanyValuesSection({ values_list, title }) {
  return (
    <section className="company_values_section">
      <Reveal as="h1" className="section_title title">
        {title}
      </Reveal>
      <ul className="section_values_list">
        {values_list.map((item, i) => (
          <Reveal as="li" className="list_item" key={i}>
            <i className={`${item.icon} item_icon`} style={{ color: item.icon_color }}></i>
            <div className="item_text_container">
              <h2 className="item_value">{item.value}</h2>
              <p className="item_description">{item.description}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
