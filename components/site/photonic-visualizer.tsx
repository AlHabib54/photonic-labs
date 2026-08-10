'use client';
import React, { useMemo } from 'react';

export function PhotonicVisualizer({ className }: { className?: string }) {
  // 3 concentric orbital rings
  const rings = useMemo(
    () => [
      { r: 70, count: 8, duration: 12, color: '#67e8f9', reverse: false },
      { r: 110, count: 12, duration: 20, color: '#38bdf8', reverse: true },
      { r: 150, count: 16, duration: 28, color: '#818cf8', reverse: false },
    ],
    [],
  );

  const coreDots = useMemo(() => {
    const out: { x: number; y: number; delay: number; r: number }[] = [];
    const n = 6;
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2;
      out.push({
        x: Math.cos(angle) * 28,
        y: Math.sin(angle) * 28,
        delay: (i / n) * 1.5,
        r: 1.5 + Math.random() * 1.2,
      });
    }
    return out;
  }, []);

  return (
    <div className={className}>
      <svg viewBox="-200 -200 400 400" className="w-full h-full overflow-visible">
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ringGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.5" />
          </linearGradient>
          <filter id="blur1"><feGaussianBlur stdDeviation="2" /></filter>
          <filter id="blur2"><feGaussianBlur stdDeviation="6" /></filter>
        </defs>

        {/* Background grid */}
        <g opacity="0.12">
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`v${i}`} x1={-180 + i * 45} y1="-180" x2={-180 + i * 45} y2="180" stroke="#67e8f9" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`h${i}`} x1="-180" y1={-180 + i * 45} x2="180" y2={-180 + i * 45} stroke="#67e8f9" strokeWidth="0.5" />
          ))}
        </g>

        {/* Outer glow */}
        <circle cx="0" cy="0" r="180" fill="none" stroke="#38bdf8" strokeWidth="0.4" opacity="0.4" className="animate-pulse-glow" />

        {/* Ring rings */}
        {rings.map((ring, i) => (
          <g key={i}>
            <circle
              cx="0" cy="0" r={ring.r}
              fill="none"
              stroke="url(#ringGradient)"
              strokeWidth="1"
              strokeDasharray="4 8"
              className={ring.reverse ? 'animate-spin-reverse' : 'animate-spin-slow'}
              style={{ transformOrigin: 'center', animationDuration: `${ring.duration}s` }}
            />
            <circle
              cx="0" cy="0" r={ring.r}
              fill="none"
              stroke={ring.color}
              strokeWidth="0.5"
              opacity="0.15"
            />
            {/* Photons on the ring */}
            {Array.from({ length: ring.count }).map((_, j) => {
              const angle = (j / ring.count) * 360;
              return (
                <g
                  key={j}
                  className={ring.reverse ? 'animate-spin-reverse' : 'animate-spin-slow'}
                  style={{ transformOrigin: 'center', animationDuration: `${ring.duration}s`, animationDelay: `${-(j / ring.count) * ring.duration}s` }}
                >
                  <g transform={`rotate(${angle}) translate(${ring.r} 0)`}>
                    <circle cx="0" cy="0" r="3" fill={ring.color} filter="url(#blur1)" opacity="0.8" />
                    <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
                  </g>
                </g>
              );
            })}
          </g>
        ))}

        {/* Connection beams from core to inner ring */}
        <g opacity="0.5">
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const x = Math.cos(angle) * 70;
            const y = Math.sin(angle) * 70;
            return (
              <line key={i} x1="0" y1="0" x2={x} y2={y} stroke="#67e8f9" strokeWidth="0.6" opacity="0.4" />
            );
          })}
        </g>

        {/* Scanning beam */}
        <g className="animate-spin-slow" style={{ transformOrigin: 'center', animationDuration: '6s' }}>
          <defs>
            <linearGradient id="scanGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#67e8f9" stopOpacity="0" />
              <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <line x1="0" y1="0" x2="190" y2="0" stroke="url(#scanGrad)" strokeWidth="1.5" filter="url(#blur1)" opacity="0.7" />
        </g>

        {/* Core glow */}
        <circle cx="0" cy="0" r="70" fill="url(#coreGlow)" className="animate-pulse-glow" />

        {/* Hexagonal core */}
        <g>
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
            const x = Math.cos(angle) * 34;
            const y = Math.sin(angle) * 34;
            const next = ((i + 1) / 6) * Math.PI * 2 - Math.PI / 2;
            const nx = Math.cos(next) * 34;
            const ny = Math.sin(next) * 34;
            return <line key={i} x1={x} y1={y} x2={nx} y2={ny} stroke="#67e8f9" strokeWidth="1.4" opacity="0.8" />;
          })}
        </g>

        {/* Core dots */}
        {coreDots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#67e8f9" filter="url(#blur1)" className="animate-blink" style={{ animationDelay: `${d.delay}s` }} />
        ))}

        {/* Central core */}
        <circle cx="0" cy="0" r="14" fill="#67e8f9" filter="url(#blur2)" opacity="0.6" />
        <circle cx="0" cy="0" r="10" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.8" />
        <circle cx="0" cy="0" r="5" fill="#ffffff" className="animate-pulse-glow" />

        {/* Corner brackets */}
        {[
          { x: -180, y: -180, d: 'M0,20 L0,0 L20,0' },
          { x: 160, y: -180, d: 'M-20,0 L0,0 L0,20' },
          { x: -180, y: 160, d: 'M0,-20 L0,0 L20,0' },
          { x: 160, y: 160, d: 'M-20,0 L0,0 L0,-20' },
        ].map((b, i) => (
          <path key={i} d={b.d} transform={`translate(${b.x} ${b.y})`} stroke="#67e8f9" strokeWidth="1.5" fill="none" opacity="0.5" />
        ))}
      </svg>
    </div>
  );
}
