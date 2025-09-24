import { useEffect, useRef } from "react";
import useScrollReveal from "./useScrollReveal";

export default function Reveal({ children, as: Tag = "div", ref, ...props }) {
  var localRef = useRef();
  var ref = ref || localRef;
  const threshold = Tag === "img" ? 0.15 : undefined; // Use a lower threshold for images
  useScrollReveal(threshold, ref);

  return (
    <Tag ref={ref} {...props}>
      {children}
    </Tag>
  );
}
