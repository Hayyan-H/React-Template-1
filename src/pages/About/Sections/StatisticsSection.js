import { useEffect, useRef, useState } from "react";
import Reveal from "../../../Reveal";

function StatisticsItem({ stat }) {
  const [currentVal, setCurrentVal] = useState(0);
  const item_ref = useRef();
  const intervalRef = useRef();
  const rafRef = useRef();

  useEffect(() => {
    const item = item_ref.current;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setTimeout(() => {
          if (entry.isIntersecting) {
            const target = parseInt(stat.value); // final value
            const duration = 1700; // how long the animation should take
            const start = performance.now(); // get the current time

            function animate(now) {
              const elapsed = now - start; // calculate how much time has passed since the animation started
              const progress = Math.min(elapsed / duration, 1); // calculate the progress of the animation (0 to 1)
              setCurrentVal(Math.floor(progress * target)); // example 50% of the time has passed and 100 is the target: 0.5 * 100 = 50 -> 50 will be displayed
              if (progress < 1) {
                // if the animation is not finished yet
                rafRef.current = requestAnimationFrame(animate); // request the next frame
              } else {
                setCurrentVal(target); // ensure the final value is set
              }
            }
            rafRef.current = requestAnimationFrame(animate);
            observer.unobserve(item); // Stop observing once the element is visible
          }
        }, 300);
      },
      { threshold: 0.5 }
    );

    observer.observe(item); // Start observing the element

    return () => {
      observer.disconnect();
      clearInterval(intervalRef.current);
    };
  }, [stat.value]);

  return (
    <>
      <div className="statistics_item" ref={item_ref}>
        <Reveal as="i" className={stat.icon + " item_icon"}></Reveal>
        <Reveal as="h2" className="item_value">
          {currentVal}
        </Reveal>
        <Reveal as="p" className="item_title">
          {stat.title}
        </Reveal>
      </div>
    </>
  );
}

export default function StatisticsSection({ statistics }) {
  return (
    <>
      <section className="statistics_section">
        <div className="statistics_list">
          {statistics.map((stat, index) => (
            <StatisticsItem key={index} stat={stat}></StatisticsItem>
          ))}
        </div>
      </section>
    </>
  );
}
