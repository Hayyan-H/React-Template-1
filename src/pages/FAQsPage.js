import "../styles/FAQs.scss";

import { useEffect, useRef, useState } from "react";
import { fetchContentData } from "../sanityClient";

function FAQ_item({ question, answer }) {
  const [active, setActive] = useState(false);
  const answerRef = useRef(null);

  const handleClick = () => setActive((a) => !a);

  return (
    <li className={`faq_item${active ? " active" : ""}`} onClick={handleClick}>
      <h3 className="item_question">
        {question} <i class="fa-solid fa-chevron-down"></i>
      </h3>
      <div className="item_answer" ref={answerRef} style={active ? { height: answerRef.current?.scrollHeight } : { height: 0 }}>
        <p>{answer}</p>
      </div>
    </li>
  );
}

export default function FAQsPage() {
  const [FAQs, setFAQs] = useState(null);

  useEffect(() => {
    const getFAQs = async () => {
      const data = await fetchContentData();
      setFAQs(data.FAQs);
    };
    getFAQs();
  }, []);

  if (!FAQs) {
    return <></>;
  }

  return (
    <>
      <div className="faqs_page">
        <div className="faqs_content">
          <h1 className="faqs_title">Frequently Asked Questions</h1>
          <p className="faqs_description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          {FAQs.map((FAQ_object, i) => (
            <section className="faqs_section" key={i}>
              <h2 className="section_topic">{FAQ_object.topic}</h2>
              <ul className="section_list">
                {FAQ_object.FAQs.map((faq, i) => (
                  <FAQ_item key={i} question={faq.question} answer={faq.answer}></FAQ_item>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
