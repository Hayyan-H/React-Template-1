export default function HeroSection({ heroData }) {
  if (!heroData) {
    return <></>;
  }

  return (
    <section className="hero_section">
      <div className="hero_img_container">
        <img className="hero_img" src={heroData.image}></img>
      </div>
      <div className="hero_container">
        <h1 className="hero_headline">{heroData.headline}</h1>
        <p className="hero_subheadline">{heroData.subheadline}</p>
        <button className="hero_button">{heroData.ctaText}</button>
      </div>
    </section>
  );
}
