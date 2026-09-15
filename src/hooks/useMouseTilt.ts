import { useState, useEffect, useRef, useCallback } from 'react';

interface TiltState {
  rotateX: number;
  rotateY: number;
  parallaxX: number;
  parallaxY: number;
  isHovered: boolean;
}

interface UseMouseTiltOptions {
  maxTilt?: number; // max tilt degrees (e.g. 2 to 6 degrees)
  perspective?: number;
  scale?: number;
  speed?: number; // interpolation speed
}

export function useMouseTilt(options: UseMouseTiltOptions = {}) {
  const { maxTilt = 4, scale = 1.02 } = options;

  const [tilt, setTilt] = useState<TiltState>({
    rotateX: 0,
    rotateY: 0,
    parallaxX: 0,
    parallaxY: 0,
    isHovered: false,
  });

  const elementRef = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!elementRef.current) return;
    const rect = elementRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = (x / rect.width) * 2 - 1; // -1 to 1
    const normalizedY = (y / rect.height) * 2 - 1; // -1 to 1

    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      setTilt({
        rotateX: -normalizedY * maxTilt,
        rotateY: normalizedX * maxTilt,
        parallaxX: normalizedX * 12,
        parallaxY: normalizedY * 12,
        isHovered: true,
      });
    });
  }, [maxTilt]);

  const handleMouseEnter = useCallback(() => {
    setTilt(prev => ({ ...prev, isHovered: true }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      setTilt({
        rotateX: 0,
        rotateY: 0,
        parallaxX: 0,
        parallaxY: 0,
        isHovered: false,
      });
    });
  }, []);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Check if device supports hover / not reduced motion
    const isTouch = window.matchMedia('(hover: none)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  const tiltStyle: React.CSSProperties = {
    transform: `perspective(1000px) rotateX(${tilt.rotateX.toFixed(2)}deg) rotateY(${tilt.rotateY.toFixed(2)}deg) scale3d(${tilt.isHovered ? scale : 1}, ${tilt.isHovered ? scale : 1}, 1)`,
    transition: tilt.isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
    transformStyle: 'preserve-3d',
  };

  return { elementRef, tilt, tiltStyle };
}
