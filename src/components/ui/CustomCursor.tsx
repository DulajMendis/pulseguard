'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [trailing, setTrailing] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate on devices with fine pointer (desktop mouse)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let animFrame: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.intro-card') ||
        target.closest('.cta-link') ||
        target.closest('.faq-item') ||
        target.closest('.interactive-target')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const animateTrailing = () => {
      // Smooth lerp (linear interpolation)
      currentX += (targetX - currentX) * 0.28;
      currentY += (targetY - currentY) * 0.28;
      setTrailing({ x: currentX, y: currentY });
      animFrame = requestAnimationFrame(animateTrailing);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    animFrame = requestAnimationFrame(animateTrailing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animFrame);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed z-[9999] top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,opacity,background-color] duration-200 ease-out will-change-transform"
      style={{
        transform: `translate3d(${trailing.x}px, ${trailing.y}px, 0)`,
        width: isHovered ? '48px' : isClicking ? '16px' : '20px',
        height: isHovered ? '48px' : isClicking ? '16px' : '20px',
        backgroundColor: isHovered ? 'rgba(0, 109, 219, 0.15)' : 'rgba(152, 152, 152, 0.45)',
        border: isHovered ? '1.5px solid rgba(0, 109, 219, 0.4)' : 'none',
        backdropFilter: isHovered ? 'blur(2px)' : 'none',
      }}
    />
  );
}

