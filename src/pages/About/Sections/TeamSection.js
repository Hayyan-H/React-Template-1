import { useEffect, useRef, useState } from "react";
import Reveal from "../../../Reveal";

function SliderItem({ member, dragged }) {
  const [flip, setFlip] = useState(false);
  const [backSideTaller, setBackSideTaller] = useState(0);
  const cardRef = useRef();
  const mouseDownRef = useRef();
  const frontRef = useRef();
  const backRef = useRef();

  useEffect(() => {
    const checkHeights = () => {
      if (frontRef.current && backRef.current) {
        frontRef.current.style.height = "auto";
        backRef.current.style.height = "auto";
        setBackSideTaller(backRef.current.offsetHeight > frontRef.current.offsetHeight);
        frontRef.current.style.height = "100%";
        backRef.current.style.height = "100%";
      }
    };
    checkHeights();

    const resize_ob = new window.ResizeObserver(checkHeights);
    if (frontRef.current) resize_ob.observe(frontRef.current);
    if (backRef.current) resize_ob.observe(backRef.current);

    return () => {
      resize_ob.disconnect();
    };
    // first the front and back have height auto to take as much space as they need to find out which one needs more, after that they both take 100% height, which is the height of the tallest side
  }, [member]);

  const handleMouseDown = () => {
    mouseDownRef.current = performance.now();
  };

  const handleMouseUp = (e) => {
    const mouseUpTime = performance.now();
    const timeDiff = mouseUpTime - mouseDownRef.current;
    if (!dragged.current && timeDiff < 300) {
      // If the mouse was pressed for less than 300ms, toggle flip
      setFlip(!flip);
    } else {
      // If the mouse was pressed for more than 300ms, do not flip
      e.preventDefault();
    }
  };

  return (
    <>
      <Reveal className={"slider_item" + (flip ? " flip" : "")} ref={cardRef} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
        <div className="flip_card_inner">
          {/* Height shim */}
          <div className="flip_card_shim" aria-hidden="true">
            {backSideTaller === true ? (
              // if the back side is taller only show put the back side content
              <>
                <div className="item_description">{member.description}</div>
              </>
            ) : (
              <>
                <img src={member.image} draggable="false" />
                <h3 className="item_name">{member.name}</h3>
                <p className="item_role">{member.role}</p>
              </>
            )}
          </div>
          {/* Front and back of the card */}
          <div className="item_front" ref={frontRef}>
            <img src={member.image} draggable="false" />
            <h3 className="item_name">{member.name}</h3>
            <p className="item_role">{member.role}</p>
          </div>
          <div className="item_back" ref={backRef}>
            <p className="item_description">{member.description}</p>
          </div>
        </div>
      </Reveal>
    </>
  );
}

export default function StatisticsSection({ members, description }) {
  const sliderRef = useRef();
  const dragged = useRef(false);

  var mouseX = 0;
  var startX = 0;
  var isDown = false;
  var scrollStart = 0;
  var currentScroll = 0;

  const handleMouseMove = (e) => {
    if (!isDown) return;
    mouseX = e.pageX; // get the current mouse position
    const difference = mouseX - startX; // calculate the difference from the start position
    sliderRef.current.scrollLeft = scrollStart - difference; // 5 for the box shadow
    if (currentScroll !== sliderRef.current.scrollLeft) {
      currentScroll = sliderRef.current.scrollLeft;
      dragged.current = true;
    }
  };
  const handleMouseLeave = (e) => {
    isDown = false;
  };

  const handlePointerDown = (e) => {
    isDown = true;
    startX = e.pageX;
    scrollStart = sliderRef.current.scrollLeft;
  };
  const handlePointerUp = (e) => {
    isDown = false;

    setTimeout(() => {
      dragged.current = false; // reset dragged state
    }, 0);
  };

  return (
    <>
      <section className="team_section">
        <Reveal as="h1" className="section_title title">
          Meet Our Team
        </Reveal>
        <div className="section_content">
          <Reveal className="content_description">{description}</Reveal>
          <div className="slider" ref={sliderRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>
            {members.map((member, index) => (
              <SliderItem key={index} member={member} dragged={dragged} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
