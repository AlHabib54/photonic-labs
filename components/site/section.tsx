import React from 'react';
import { cn } from '@/lib/utils';

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <div className={cn('flex items-center gap-2 mb-4', align === 'center' && 'justify-center')}>
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-400/60" />
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-cyan-300/80">
            {eyebrow}
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-400/60" />
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white text-glow-soft leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('container mx-auto px-4', className)}>{children}</div>;
}

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider',
        'glass border-cyan-400/20 text-cyan-300/90',
        className,
      )}
    >
      {children}
    </span>
  );
}
