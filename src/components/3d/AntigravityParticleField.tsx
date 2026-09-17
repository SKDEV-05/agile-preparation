import React, { useEffect, useRef } from 'react';

interface Particle {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  angle: number;
  targetAngle: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  orbitRadius: number;
  orbitAngle: number;
  orbitSpeed: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  force: number;
  alpha: number;
}

export function AntigravityParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Disable heavy 60fps canvas particle simulation on mobile / touch screens for maximum CPU performance
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
      if (isMobile) return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: -9999,
      y: -9999,
      radius: 260,
      isHovered: false,
    };

    const shockwaves: Shockwave[] = [];

    // Google Antigravity Vivid Tech Colors (High Contrast & Glowing)
    const colors = [
      '#00E5FF', // Electric Cyan
      '#38BDF8', // Sky Blue
      '#6366F1', // Electric Indigo
      '#818CF8', // Soft Purple
      '#A855F7', // Vivid Violet
      '#EC4899', // Hot Pink
      '#34D399', // Emerald Neon
      '#FBBF24', // Warm Amber
    ];

    // High density particle field for full screen coverage
    const particleCount = Math.min(480, Math.max(220, Math.floor((width * height) / 3000)));
    const particles: Particle[] = [];

    const initParticles = () => {
      particles.length = 0;
      const centerX = width * 0.5;
      const centerY = height * 0.45;

      for (let i = 0; i < particleCount; i++) {
        // Multi-ring galactic spiral distribution
        const ring = Math.floor(i / 20);
        const ringAngle = (i % 20) * ((Math.PI * 2) / 20) + ring * 0.35;
        const dist = 60 + ring * 55 + (Math.random() * 40 - 20);

        const px = centerX + Math.cos(ringAngle) * dist;
        const py = centerY + Math.sin(ringAngle) * dist * 0.75;

        const color = colors[Math.floor(Math.random() * colors.length)];
        const baseAlpha = 0.4 + Math.random() * 0.5;

        particles.push({
          baseX: px,
          baseY: py,
          x: px + (Math.random() * 100 - 50),
          y: py + (Math.random() * 100 - 50),
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          length: 10 + Math.random() * 14,
          angle: ringAngle + Math.PI / 2,
          targetAngle: ringAngle + Math.PI / 2,
          color,
          alpha: baseAlpha,
          baseAlpha,
          orbitRadius: dist,
          orbitAngle: ringAngle,
          orbitSpeed: (0.0006 + (1 / (dist + 80)) * 0.15) * (Math.random() > 0.45 ? 1 : -0.7),
        });
      }
    };

    initParticles();

    // Window resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Global mouse tracking across the entire website
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.isHovered = false;
    };

    // Global click listener for gravitational pulse
    const handleClick = (e: MouseEvent) => {
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 420,
        force: 22,
        alpha: 0.9,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    // 60FPS Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Process Gravitational Shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += 16;
        sw.alpha *= 0.93;

        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 229, 255, ${sw.alpha * 0.5})`;
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 8]);
        ctx.stroke();
        ctx.restore();

        if (sw.radius >= sw.maxRadius || sw.alpha <= 0.03) {
          shockwaves.splice(s, 1);
        }
      }

      // 2. Update and Draw Particles
      const currentCenterX = width * 0.5;
      const currentCenterY = height * 0.45;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Cosmic rotation
        p.orbitAngle += p.orbitSpeed;
        const targetBaseX = currentCenterX + Math.cos(p.orbitAngle) * p.orbitRadius;
        const targetBaseY = currentCenterY + Math.sin(p.orbitAngle) * p.orbitRadius * 0.75;

        // Home attraction spring
        const homeDx = targetBaseX - p.x;
        const homeDy = targetBaseY - p.y;
        p.vx += homeDx * 0.03;
        p.vy += homeDy * 0.03;

        p.targetAngle = p.orbitAngle + Math.PI / 2;

        // Global Mouse Interaction (Hover & Proximity Repulsion/Alignment)
        if (mouse.isHovered) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 1) {
            const force = (1 - dist / mouse.radius) * 9.5;
            const normX = dx / dist;
            const normY = dy / dist;

            p.vx += normX * force;
            p.vy += normY * force;

            // Orient particle needle with mouse magnetic vector
            p.targetAngle = Math.atan2(dy, dx);
            p.alpha = Math.min(1.0, p.baseAlpha + (1 - dist / mouse.radius) * 0.6);
          } else {
            p.alpha += (p.baseAlpha - p.alpha) * 0.05;
          }
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
        }

        // Gravitational Shockwaves force
        for (let s = 0; s < shockwaves.length; s++) {
          const sw = shockwaves[s];
          const sdx = p.x - sw.x;
          const sdy = p.y - sw.y;
          const sdist = Math.sqrt(sdx * sdx + sdy * sdy);
          const diff = Math.abs(sdist - sw.radius);

          if (diff < 45 && sdist > 1) {
            const push = (1 - diff / 45) * sw.force;
            p.vx += (sdx / sdist) * push;
            p.vy += (sdy / sdist) * push;
            p.targetAngle = Math.atan2(sdy, sdx);
          }
        }

        // Damping / Friction
        p.vx *= 0.88;
        p.vy *= 0.88;

        p.x += p.vx;
        p.y += p.vy;

        // Angular smoothing
        let angleDiff = p.targetAngle - p.angle;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        p.angle += angleDiff * 0.18;

        // Draw glowing particle needle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        ctx.beginPath();
        const halfLen = p.length / 2;
        ctx.moveTo(-halfLen, 0);
        ctx.lineTo(halfLen, 0);

        ctx.strokeStyle = p.color;
        ctx.globalAlpha = Math.max(0.2, Math.min(1, p.alpha));
        ctx.lineWidth = 2.6;
        ctx.lineCap = 'round';
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.alpha > 0.6 ? 10 : 3;
        ctx.stroke();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none select-none z-[1] opacity-90"
      aria-hidden="true"
    />
  );
}
