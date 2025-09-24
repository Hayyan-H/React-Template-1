import { useEffect, useref } from "react";

export default function useScrollReveal(threshold = 0.2, ref) {
  useEffect(() => {
    if (!ref.current || !(ref.current.getBoundingClientRect().left < window.innerWidth)) {
      return;
    }
    ref.current.classList.add("reveal");

    const ref_rect = ref.current.getBoundingClientRect();
    const inViewport = window.innerHeight > ref_rect.top && ref_rect.bottom > 0;

    if (inViewport) {
      //checks if element is already visible when the page loaded
      const ref_transition_value = window.getComputedStyle(ref.current).getPropertyValue("transition"); // save the transition value
      ref.current.style.transition = "none"; // remove transition, so there is no transition when the class is added
      ref.current.classList.add("reveal--visible"); // add visible class
      ref.current.style.transition = ref_transition_value; //add the transition back
      return;
    }

    const baseTransition = window.getComputedStyle(ref.current).getPropertyValue("transition");
    const revealTransition = "opacity 0.5s ease-in-out, transform 0.5s ease-in-out";
    ref.current.style.transition = baseTransition && baseTransition !== "all 0s ease 0s" ? baseTransition + ", " + revealTransition : revealTransition;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        const visibleHeightRatio = entry.intersectionRect.height / entry.boundingClientRect.height; // how much percent of the element is visible
        if (visibleHeightRatio >= threshold) {
          // Check if the element is intersecting/visible
          const distance_to_left_percentage = ref.current.getBoundingClientRect().left / window.innerWidth;
          ref.current.classList.add("visible");
          setTimeout(() => {
            ref.current.classList.add("reveal--visible");
            observer.unobserve(ref.current); // Stop  observing once the element is visible
          }, distance_to_left_percentage * 500);
        }
      },
      { threshold: Array.from({ length: 100 }, (_, i) => i / 100) } // checking on every 1% to check when 15% of the HEIGHT is visible, of the whole element
    );

    observer.observe(ref.current); // Start observing the element

    return () => observer.disconnect();
  }, [threshold, ref]); // Re-run effect if threshold changes
}
