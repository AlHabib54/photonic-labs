'use client';
import React, { useState } from 'react';
import { Sigma, Brain, ShieldCheck, Hash, ArrowRight, Copy, Check } from 'lucide-react';
import { SectionHeader, Container, Badge } from '@/components/site/section';
import { algorithms, type AlgorithmDoc } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const categoryIcon: Record<AlgorithmDoc['category'], React.ElementType> = {
  'Number Theory': Hash,
  'AI': Brain,
  'Mathematical Model': Sigma,
  'Cybersecurity': ShieldCheck,
};

const categories = ['All', 'Number Theory', 'AI', 'Mathematical Model', 'Cybersecurity'] as const;

export default function AlgorithmsPage() {
  const [filter, setFilter] = useState<typeof categories[number]>('All');
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = filter === 'All' ? algorithms : algorithms.filter((a) => a.category === filter);

  const copyFormula = (formula: string, slug: string) => {
    navigator.clipboard?.writeText(formula);
    setCopied(slug);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="pt-24">
      {/* HERO */}
      <section className="relative overflow-hidden py-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="absolute inset-0 grid-bg opacity-30" />
        </div>
        <Container>
          <Badge>Algorithms</Badge>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-white text-glow leading-[1.05]">
            Algorithms & <span className="gradient-text">mathematical models</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Formal documentation for the algorithms powering the photonic stack — from optical prime
            detection to lattice-based key derivation. Each entry includes its complexity model and the
            underlying formula.
          </p>
        </Container>
      </section>

      {/* FILTERS */}
      <section className="py-6">
        <Container>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                  filter === c
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/30'
                    : 'glass text-muted-foreground hover:text-white border border-transparent',
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* ALGORITHM DOCS */}
      <section className="py-8 pb-16">
        <Container>
          <div className="space-y-5">
            {filtered.map((a, i) => {
              const Icon = categoryIcon[a.category];
              return (
                <Card key={a.slug} className="glass card-hover overflow-hidden bg-transparent border-white/5 p-0">
                  <div className="grid lg:grid-cols-3 gap-0">
                    {/* Left: header */}
                    <div className="p-6 lg:border-r border-white/5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-400/20 grid place-items-center">
                          <Icon className="h-4 w-4 text-cyan-300" />
                        </div>
                        <div>
                          <Badge>{a.category}</Badge>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white leading-tight">{a.title}</h3>
                      <div className="mt-4 space-y-2 text-xs">
                        <div className="flex items-center justify-between glass rounded-lg px-3 py-2">
                          <span className="text-muted-foreground uppercase tracking-wider font-mono text-[10px]">Complexity</span>
                          <span className="font-mono text-cyan-300">{a.complexity}</span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                        {a.tags.map((t) => (
                          <span key={t} className="text-[10px] font-mono uppercase tracking-wider text-cyan-300/60">#{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Middle: description */}
                    <div className="p-6 lg:border-r border-white/5">
                      <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-cyan-300/80 mb-3">Overview</div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{a.description}</p>
                      <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-mono">DOC-{String(i + 1).padStart(3, '0')}</span>
                        <span>·</span>
                        <span>Revision {a.slug.split('-').pop()}</span>
                      </div>
                    </div>

                    {/* Right: formula */}
                    <div className="p-6 bg-cyan-500/[0.02]">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-cyan-300/80">Formula</div>
                        <button
                          onClick={() => copyFormula(a.formula, a.slug)}
                          className="h-7 w-7 grid place-items-center rounded-lg glass text-muted-foreground hover:text-cyan-300"
                          aria-label="Copy formula"
                        >
                          {copied === a.slug ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                      <div className="rounded-xl border border-cyan-400/15 bg-[#02040a] p-5 grid place-items-center min-h-[100px]">
                        <code className="font-mono text-sm text-cyan-200 text-center leading-relaxed break-words">
                          {a.formula}
                        </code>
                      </div>
                      <p className="text-[10px] text-muted-foreground/60 mt-2">LaTeX source — copy to render in your editor.</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-10 glass-strong rounded-3xl p-8 border border-cyan-400/20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white">Reference implementations</h3>
              <p className="text-muted-foreground mt-2">Source code for these algorithms is available in Downloads.</p>
            </div>
            <a href="/downloads">
              <span className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-sm text-white btn-glow">
                Browse Source <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
