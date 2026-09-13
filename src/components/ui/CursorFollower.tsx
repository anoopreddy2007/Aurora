import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorFollower() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, {
    stiffness: 900,
    damping: 45,
    mass: 0.15,
  });

  const dotY = useSpring(mouseY, {
    stiffness: 900,
    damping: 45,
    mass: 0.15,
  });

  const ringX = useSpring(mouseX, {
    stiffness: 180,
    damping: 24,
    mass: 0.5,
  });

  const ringY = useSpring(mouseY, {
    stiffness: 180,
    damping: 24,
    mass: 0.5,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)"
    );

    const updateEnabled = () => {
      setEnabled(mediaQuery.matches);
    };

    updateEnabled();

    mediaQuery.addEventListener("change", updateEnabled);

    return () => {
      mediaQuery.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      const interactiveElement = target.closest(
        "a, button, input, textarea, select, [role='button']"
      );

      setHovering(Boolean(interactiveElement));
    };

    const handlePointerOut = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      const interactiveElement = target.closest(
        "a, button, input, textarea, select, [role='button']"
      );

      if (interactiveElement) {
        setHovering(false);
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerover", handlePointerOver);
    window.addEventListener("pointerout", handlePointerOut);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerout", handlePointerOut);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      {/* Cursor dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-[#F2F2F3] mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hovering ? 0.65 : 1,
          opacity: hovering ? 0.9 : 1,
        }}
        transition={{
          duration: 0.18,
          ease: "easeOut",
        }}
      />

      {/* Cursor ring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-[#7C83FF]/50"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 38 : 26,
          height: hovering ? 38 : 26,
          opacity: hovering ? 0.75 : 0.45,
          borderColor: hovering
            ? "rgba(124, 131, 255, 0.75)"
            : "rgba(124, 131, 255, 0.45)",
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 22,
        }}
      />

      {/* Soft cursor glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9997] rounded-full bg-[#7C83FF]/10 blur-xl"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 72 : 50,
          height: hovering ? 72 : 50,
          opacity: hovering ? 0.5 : 0.3,
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
      />
    </>
  );
}