import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";
import "../styles/contact.scss";
import { fetchContentData } from "../sanityClient";

function FormInput({ label_text, textarea }) {
  return (
    <div className="form_input">
      {textarea ? (
        <textarea
          onInput={(e) => {
            e.target.style.height = "48px"; // Reset to base height
            e.target.style.height = e.target.scrollHeight + "px"; // Adjust to scroll height
          }}
          className="input_field"
          autoComplete="off"
          rows={1}
          required
          placeholder=" "
          key={label_text}
          name={label_text.toLowerCase().replace(" ", "_")}
        ></textarea>
      ) : (
        <input name={label_text.toLowerCase().replace(" ", "_")} className="input_field" placeholder=" " type={label_text === "E-Mail" ? "email" : "text"} key={label_text} autoComplete="off" required />
      )}
      <label>
        {label_text.split("").map((letter, idx) => (
          <span style={{ transitionDelay: idx * 6 + "ms" }} key={idx}>
            {letter}
          </span>
        ))}
      </label>
    </div>
  );
}

const PUBLIC_KEY = "DWXvybn8TqwT15nwf";
const SERVICE_ID = "service_l4e44s2";
const TEMPLATE_ID = "template_9pa5rdm";

export default function Contact() {
  const [contactData, setContactData] = useState(null);
  useEffect(() => {
    const getContactPageData = async () => {
      const data = await fetchContentData();
      setContactData(data.contact);
    };
    getContactPageData();
  }, []);

  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [successToast, setSuccessToast] = useState(true); // true for success, false for error

  function ToastPopup() {
    return (
      <div className={(!successToast ? "error" : "") + " form_toast_popup show"}>
        {successToast ? <i className="fa-solid fa-circle-check"></i> : <i className="fa-solid fa-circle-xmark"></i>}
        <span>{successToast ? "Message sent successfully!" : "Something went wrong, please try again later."}</span>
        <div className="time_bar"></div>
      </div>
    );
  }

  useEffect(() => {
    emailjs.init(PUBLIC_KEY);
  }, []);

  const sendEmail = (e) => {
    if (loading) return;
    e.preventDefault();
    setLoading(true);
    const inputFields = document.querySelectorAll(".input_field");

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, {
        name: `${inputFields[0].value} ${inputFields[1].value}`,
        email: inputFields[2].value,
        message: inputFields[3].value,
        time: new Date().toLocaleString(),
      })
      .then(
        (result) => {
          setLoading(false);

          if (!showToast) {
            const isSuccess = result.status === 200 ? true : false;
            setShowToast(true);
            setSuccessToast(isSuccess);
            if (isSuccess) {
              inputFields.forEach((input) => (input.value = ""));
            }
            setTimeout(() => {
              setShowToast(false);
            }, 5000);
          }
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  if (!contactData) {
    return <></>;
  }

  return (
    <>
      <div className="contact_page">
        <div className="section_text">
          <h2>{contactData.title}</h2>
          <p>{contactData.text}</p>
        </div>
        <div className="form_wrapper">
          <form className="contact_form" onSubmit={sendEmail}>
            {[["First Name", "Last Name"], "E-Mail", "Message"].map((label_text, index) => {
              if (typeof label_text == "string") {
                // Email and Message
                return <FormInput idx={index} label_text={label_text} textarea={label_text == "Message" ? true : false}></FormInput>;
              } else {
                //First and Last Name together in double input
                return (
                  <div className="form_double_input">
                    {label_text.map((single_label) => {
                      return <FormInput label_text={single_label}></FormInput>;
                    })}
                  </div>
                );
              }
            })}
            <button className={loading ? "form_submit_btn loading" : "form_submit_btn"} disabled={loading}>
              Send
            </button>
          </form>
          <div className="form_toast_wrapper">{showToast && <ToastPopup></ToastPopup>}</div>
        </div>
      </div>
    </>
  );
}
