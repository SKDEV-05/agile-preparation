import React, { useEffect, useRef } from 'react';

interface InteractiveGridBackgroundProps {
  intensity?: 'hero' | 'default' | 'subtle';
  className?: string;
}

export function InteractiveGridBackground({
  intensity = 'default',
  className = ''
}: InteractiveGridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isDestroyed = false;

    // Device capability & reduced motion check
    const isTouch = typeof window !== 'undefined' && 
      (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
    const prefersReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Config based on intensity prop
    const cellSize = 26; // Cell dimensions in px
    const cellGap = 1;   // Gap between squares
    const step = cellSize + cellGap;

    const proximityRadius = intensity === 'hero' ? 220 : intensity === 'subtle' ? 120 : 170;
    const maxActiveAlpha = intensity === 'hero' ? 0.32 : intensity === 'subtle' ? 0.14 : 0.24;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with smooth interpolation
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      isActive: false
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      if (isTouch || prefersReducedMotion) {
        drawStaticGrid();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -9999;
      mouse.targetY = -9999;
      mouse.isActive = false;
    };

    // Draw static lightweight grid for touch or reduced-motion
    const drawStaticGrid = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains('dark');
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(10, 10, 10, 0.04)';
      ctx.lineWidth = 1;

      for (let x = 0; x < width; x += step) {
        for (let y = 0; y < height; y += step) {
          ctx.strokeRect(x + 0.5, y + 0.5, cellSize, cellSize);
        }
      }
    };

    if (isTouch || prefersReducedMotion) {
      drawStaticGrid();
      window.addEventListener('resize', handleResize, { passive: true });
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

    // Interactive 60fps loop for desktop mouse proximity
    const render = () => {
      if (isDestroyed) return;

      // Smooth cursor lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');
      const baseCellStroke = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(10, 10, 10, 0.04)';

      // Draw base grid
      ctx.lineWidth = 1;
      ctx.strokeStyle = baseCellStroke;

      const cols = Math.ceil(width / step);
      const rows = Math.ceil(height / step);

      // Fast full-grid base lines
      for (let c = 0; c < cols; c++) {
        const x = c * step;
        for (let r = 0; r < rows; r++) {
          const y = r * step;
          ctx.strokeRect(x + 0.5, y + 0.5, cellSize, cellSize);
        }
      }

      // Proximity glow highlighting around mouse
      if (mouse.x > -100 && mouse.x < width + 100 && mouse.y > -100 && mouse.y < height + 100) {
        const minCol = Math.max(0, Math.floor((mouse.x - proximityRadius) / step));
        const maxCol = Math.min(cols - 1, Math.ceil((mouse.x + proximityRadius) / step));
        const minRow = Math.max(0, Math.floor((mouse.y - proximityRadius) / step));
        const maxRow = Math.min(rows - 1, Math.ceil((mouse.y + proximityRadius) / step));

        for (let c = minCol; c <= maxCol; c++) {
          const cellX = c * step;
          const cellCenterX = cellX + cellSize * 0.5;

          for (let r = minRow; r <= maxRow; r++) {
            const cellY = r * step;
            const cellCenterY = cellY + cellSize * 0.5;

            const dx = cellCenterX - mouse.x;
            const dy = cellCenterY - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < proximityRadius) {
              // Smooth gaussian-like proximity curve
              const factor = 1 - dist / proximityRadius;
              const smoothFactor = factor * factor; // Non-linear falloff
              const alpha = smoothFactor * maxActiveAlpha;

              // Alternating subtle emerald and secondary green blend
              const isEven = (c + r) % 2 === 0;
              const fillR = isEven ? 16 : 34;
              const fillG = isEven ? 185 : 197;
              const fillB = isEven ? 129 : 94;

              // Subtle cell fill
              ctx.fillStyle = `rgba(${fillR}, ${fillG}, ${fillB}, ${alpha * 0.6})`;
              ctx.fillRect(cellX + 1, cellY + 1, cellSize - 1, cellSize - 1);

              // Illuminated cell border
              ctx.strokeStyle = `rgba(${fillR}, ${fillG}, ${fillB}, ${alpha * 1.5})`;
              ctx.strokeRect(cellX + 0.5, cellY + 0.5, cellSize, cellSize);
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    render();

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{
        width: '100vw',
        height: '100vh',
        contain: 'strict',
      }}
    />
  );
}
