import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'emerald' | 'blue' | 'amber' | 'purple' | 'outline' | 'neutral';
  size?: 'sm' | 'md';
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  pulse = false,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-slate-800/80 text-slate-200 border-slate-700/60',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 dark:bg-emerald-950/40',
    blue: 'bg-sky-500/10 text-sky-400 border-sky-500/30 dark:bg-sky-950/40',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30 dark:bg-amber-950/40',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30 dark:bg-purple-950/40',
    neutral: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800',
    outline: 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-transparent',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-mono uppercase tracking-wider',
    md: 'text-xs px-2.5 py-1 font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current" />
        </span>
      )}
      {children}
    </span>
  );
};
