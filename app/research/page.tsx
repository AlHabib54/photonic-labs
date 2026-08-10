'use client';
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, BookOpen, Cpu, Brain, ShieldCheck, Sigma, Server, ArrowUpRight, FileText, X } from 'lucide-react';
import { SectionHeader, Container, Badge } from '@/components/site/section';
import { publications, domains, type DomainKey, type Publication } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const streams = [
  { key: 'switch', title: 'Optical Binary Switch', desc: 'Mach–Zehnder bistable switch with sub-nanosecond switching for light-gated logic.', icon: Cpu },
  { key: 'alu', title: 'Optical ALU', desc: 'Complete arithmetic logic unit implemented entirely with optical gates.', icon: Cpu },
  { key: 'memory', title: 'Optical Memory Concepts', desc: 'Photonic memory banks with optical read/write across cores.', icon: BookOpen },
  { key: 'parallel', title: 'Parallel Light Processing', desc: 'Wavelength-division multiplexing for simultaneous compute streams.', icon: BookOpen },
];

const domainIcon: Record<DomainKey, React.ElementType> = {
  photonic: Cpu, ai: Brain, security: ShieldCheck, math: Sigma, it: Server,
};

const filters: { key: DomainKey | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'photonic', label: 'Photonic' },
  { key: 'ai', label: 'AI' },
  { key: 'security', label: 'Security' },
  { key: 'math', label: 'Math' },
  { key: 'it', label: 'IT' },
];

export default function ResearchPage() {
  const [filter, setFilter] = useState<DomainKey | 'all'>('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Publication | null>(null);

  const filtered = useMemo(() => {
    return publications.filter((p) => {
      const matchDomain = filter === 'all' || p.category === filter;
      const q = query.toLowerCase();
      const matchQuery =
        !q || p.title.toLowerCase().includes(q) || p.abstract.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q));
      return matchDomain && matchQuery;
    });
  }, [filter, query]);

  return (
    <div className="pt-24">
      {/* HERO */}
      <section className="relative overflow-hidden py-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="absolute inset-0 grid-bg opacity-30" />
        </div>
        <Container>
          <Badge>Research</Badge>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-white text-glow leading-[1.05]">
            Publications & <span className="gradient-text">optical research</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Peer-reviewed papers, preprints, and whitepapers spanning the photonic core stack — from the
            bistable optical switch up through whole-system optical arithmetic.
          </p>
        </Container>
      </section>

      {/* STREAMS */}
      <section className="py-10">
        <Container>
          <SectionHeader eyebrow="Core Research Streams" title="Four streams of optical computing" />
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {streams.map((s) => (
              <Card key={s.key} className="glass card-hover p-6 bg-transparent border-white/5">
                <div className="h-11 w-11 rounded-xl bg-cyan-500/10 border border-cyan-400/20 grid place-items-center mb-4">
                  <s.icon className="h-5 w-5 text-cyan-300" />
                </div>
                <h3 className="font-semibold text-white">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* FILTERS + LIST */}
      <section className="py-10">
        <Container>
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-8">
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                    filter === f.key
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/30'
                      : 'glass text-muted-foreground hover:text-white border border-transparent',
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filter publications..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 glass bg-transparent border-white/10"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center text-muted-foreground">
              No publications match your filter.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {filtered.map((pub) => {
                const Icon = domainIcon[pub.category];
                return (
                  <Card key={pub.id} className="glass card-hover p-5 bg-transparent border-white/5 cursor-pointer" >
                    <div className="flex items-start gap-4" onClick={() => setSelected(pub)}>
                      <div className="h-11 w-11 shrink-0 rounded-lg glass border-cyan-400/20 grid place-items-center">
                        <Icon className="h-4 w-4 text-cyan-300" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <Badge>{pub.type}</Badge>
                          <span className="text-[11px] text-muted-foreground font-mono">{pub.venue} · {pub.year}</span>
                          <Badge className="border-white/10 text-muted-foreground">{pub.category}</Badge>
                        </div>
                        <h3 className="font-semibold text-white leading-tight hover:text-cyan-300 transition-colors">{pub.title}</h3>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-2">{pub.abstract}</p>
                        <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                          {pub.tags.map((t) => (
                            <span key={t} className="text-[10px] font-mono uppercase tracking-wider text-cyan-300/60">#{t}</span>
                          ))}
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground shrink-0" />
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      {/* DETAIL DIALOG */}
      {selected && (
        <div className="fixed inset-0 z-[100] grid place-items-center p-4 animate-fade-up">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <Card className="relative glass-strong rounded-2xl border-cyan-400/20 max-w-2xl w-full p-8 max-h-[80vh] overflow-y-auto">
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 h-8 w-8 grid place-items-center rounded-lg glass text-muted-foreground hover:text-cyan-300">
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge>{selected.type}</Badge>
              <Badge className="border-white/10 text-muted-foreground">{selected.category}</Badge>
              <span className="text-[11px] text-muted-foreground font-mono">{selected.venue} · {selected.year}</span>
            </div>
            <h2 className="text-2xl font-bold text-white text-glow-soft leading-tight">{selected.title}</h2>
            <p className="text-xs text-cyan-300/70 mt-2 font-mono">{selected.authors}</p>
            <div className="mt-5 prose-invert">
              <p className="text-sm text-muted-foreground leading-relaxed">{selected.abstract}</p>
            </div>
            <div className="mt-5 flex items-center gap-1.5 flex-wrap">
              {selected.tags.map((t) => (
                <span key={t} className="text-[10px] font-mono uppercase tracking-wider text-cyan-300/60">#{t}</span>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <Link href="/downloads" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-sm text-white btn-glow">
                <FileText className="h-4 w-4" /> Download PDF
              </Link>
              <button onClick={() => setSelected(null)} className="rounded-lg glass px-4 py-2 text-sm text-muted-foreground hover:text-white">Close</button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
