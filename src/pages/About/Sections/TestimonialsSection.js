import { useEffect, useRef } from "react";
import Reveal from "../../../Reveal";

export default function TestimonialsSection({ title, testimonials }) {
  const testimonials_list = useRef(null);

  useEffect(() => {
    const testimonial_items = testimonials_list.current.querySelectorAll(".testimonial_item");
    var clickTime = 0;
    const item_handleMouseDown = () => {
      clickTime = Date.now();
    };
    const item_handleMouseUp = (item) => {
      if (Date.now() - clickTime < 300) {
        window.open(item.getAttribute("url"), "_blank");
      }
    };
    function adjustMasonryLayout() {
      testimonial_items.forEach((item) => {
        // Reset padding for all items
        item.style.paddingTop = "";
        item.style.paddingBottom = "";
        item.removeAttribute("column");

        item.addEventListener("mousedown", item_handleMouseDown);

        item.addEventListener("mouseup", () => item_handleMouseUp(item));
      });

      // Step 1: Get the last items of every column
      // a: Group the items with attribute(e.g. column=1)
      var distance_left = testimonial_items[0].offsetLeft;
      var current_column = 1;
      var last_in_column = [];
      testimonial_items.forEach((item, i) => {
        const item_distance_left = item.offsetLeft;
        if (item_distance_left > distance_left) {
          current_column++;
          distance_left = item_distance_left;
          // b: Add the last item of every column to an array of all last items
          last_in_column.push(testimonial_items[i - 1]);
        }
        item.setAttribute("column", current_column);
      });
      // add the last item of the last column to the array, because the loop adds the last item of the previous column
      last_in_column.push(testimonial_items[testimonial_items.length - 1]);

      last_in_column.forEach((item, i) => {
        // Step 2: Get the distance from last element's bottom to the bottom of the testimonials_list
        const itemTop = item.offsetTop; // Distance from the top of the item to the top of the container
        const itemHeight = item.offsetHeight + parseFloat(window.getComputedStyle(item).getPropertyValue("margin-bottom"));
        const containerHeight = testimonials_list.current.clientHeight;

        // Distance from the bottom of the item to the bottom of the container
        const distance = containerHeight - (itemTop + itemHeight) - 5;

        // Step 3: Step 3: Divide the distance by 3 and add this amount as a height to every element in that column
        const columnItems = testimonials_list.current.querySelectorAll(`.testimonial_item[column="${parseInt(item.getAttribute("column"))}"]`);
        columnItems.forEach((col_item, i) => {
          const getPropVal = (prop) => parseFloat(window.getComputedStyle(col_item).getPropertyValue(prop));
          const extra_padding = distance / columnItems.length / 2;
          col_item.style.paddingTop = `${getPropVal("padding-top") + extra_padding}px`;
          col_item.style.paddingBottom = `${getPropVal("padding-bottom") + extra_padding}px`;
        });
      });
    }

    adjustMasonryLayout();

    // Debounced resize handler for performance
    let resizeTimeout;
    function onResize() {
      /*       clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(adjustMasonryLayout, 100); // 100ms debounce */
      adjustMasonryLayout();
    }

    window.addEventListener("resize", onResize);

    // Horizontal Scroll Effect

    var isPaused = false;
    const list = testimonials_list.current;
    var animationFrame;
    var scrollSpeed = window.innerWidth / 1000 > 1 ? 1.5 : 0.5; // Adjust scroll speed as needed

    function scrollLoop() {
      animationFrame = requestAnimationFrame(scrollLoop);
      if (!list || isPaused) return;
      list.scrollLeft += scrollSpeed;
      if (list.scrollLeft >= list.scrollWidth / 2) {
        list.scrollLeft = 0;
      }
    }

    var isMounted = true;
    function checkAllItemsVisible() {
      return new Promise((resolve) => {
        function check() {
          // Only run if still mounted and ref is valid
          // For background info: When going to a different page, the Timeout loop is still running and throws an error because the ref is null
          if (!isMounted || !testimonials_list.current) return;
          const testimonialItems = testimonials_list.current.querySelectorAll(".testimonial_item");
          const allVisible = [...testimonialItems].every((item) => {
            const item_opacity = window.getComputedStyle(item).getPropertyValue("opacity");
            return item.classList.contains("visible") || item_opacity === "1";
          });
          if (allVisible) {
            resolve(true);
          } else {
            setTimeout(check, 10); // Check again after 10ms
          }
        }
        check();
      });
    }

    function pauseScroll() {
      checkAllItemsVisible().then(() => {
        isPaused = true;
      });
    }

    let scrollStarted = false;
    function resumeScroll() {
      checkAllItemsVisible().then(() => {
        const visibleItems = document.querySelectorAll(".testimonial_item.visible");
        const lastVisible = visibleItems[visibleItems.length - 1];
        const distance_to_left_percentage = lastVisible.getBoundingClientRect().left / window.innerWidth;
        // from useScrollReveal.js
        if (!scrollStarted) {
          scrollStarted = true;
          setTimeout(() => {
            isPaused = false;
            scrollLoop();
          }, distance_to_left_percentage * 500 + 400);
        } else {
          isPaused = false;
        }
      });
    }

    // stop scroll when mouse is being held
    list.addEventListener("mousedown", pauseScroll);
    list.addEventListener("mouseup", resumeScroll);

    // Start the scroll loop when the list intersects

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Pause scroll when not visible
          if (entry.intersectionRatio === 0) {
            pauseScroll();
          }

          // Resume scroll when at least 10% is visible
          if (entry.intersectionRatio >= 0.1) {
            resumeScroll();
          }
        });
      },
      { threshold: Array.from({ length: 11 }, (_, i) => i * 0.1) }
    );

    observer.observe(list);

    return () => {
      // Scroll animation cleanup
      isMounted = false;
      list.removeEventListener("mousedown", pauseScroll);
      list.removeEventListener("mouseup", resumeScroll);
      cancelAnimationFrame(animationFrame);
      observer.unobserve(list);
      testimonial_items.forEach((item) => {
        item.removeEventListener("mousedown", item_handleMouseDown);
        item.removeEventListener("mouseup", () => item_handleMouseUp(item));
      });
      // Masonry layout cleanup
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimeout);
    };
  }, [testimonials]);

  return (
    <>
      <section className="testimonials_section">
        <h2 className="section_title title">{title}</h2>
        <ul className="testimonials_list" ref={testimonials_list}>
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <Reveal as="li" key={index} url={testimonial.url} className="testimonial_item">
              <div className="item_header">
                <div className="header_img_container">
                  <img src={testimonial.image} className="item_image" />
                </div>
                <div className="header_content">
                  <p className="item_name">{testimonial.name}</p>
                  <span className="item_stars">
                    {Array.from({ length: testimonial.stars }).map((_, i) => {
                      return <i key={i} className="fas fa-star"></i>;
                    })}

                    {Array.from({ length: 5 - testimonial.stars }).map((_, i) => {
                      return <i key={i} className="far fa-star"></i>;
                    })}
                  </span>
                </div>
              </div>
              <div className="item_content">
                <p className="item_description">{testimonial.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
