'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
  side?: 'top' | 'bottom';
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  delayMs = 300, // UX Rule: 300ms hover-intent delay
  className,
  side = 'top',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const show = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delayMs);
  };

  const hide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') hide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className={cn(
            'absolute z-50 px-2.5 py-1.5 text-xs font-medium rounded shadow-lg border pointer-events-none transition-opacity duration-150 max-w-[280px] whitespace-normal text-center',
            'bg-slate-900 text-slate-100 border-slate-700/80 dark:bg-slate-950 dark:border-slate-800',
            side === 'top' && 'bottom-full left-1/2 -translate-x-1/2 mb-2',
            side === 'bottom' && 'top-full left-1/2 -translate-x-1/2 mt-2',
            className
          )}
        >
          {content}
          {/* Arrow */}
          <span
            className={cn(
              'absolute left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-slate-900 dark:bg-slate-950 border-slate-700/80 dark:border-slate-800',
              side === 'top' && '-bottom-1 border-b border-r',
              side === 'bottom' && '-top-1 border-t border-l'
            )}
          />
        </div>
      )}
    </div>
  );
};
