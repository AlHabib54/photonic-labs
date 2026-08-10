'use client';
import React, { useMemo, useState } from 'react';
import { Cpu, Brain, ShieldCheck, Server, Terminal, Search, ArrowUpRight, Network } from 'lucide-react';
import { SectionHeader, Container, Badge } from '@/components/site/section';
import { projects, type DomainKey } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const filters: { key: DomainKey | 'all'; label: string; icon: React.ElementType }[] = [
  { key: 'all', label: 'All Projects', icon: Server },
  { key: 'photonic', label: 'Photonic', icon: Cpu },
  { key: 'ai', label: 'AI Projects', icon: Brain },
  { key: 'security', label: 'Cybersecurity', icon: ShieldCheck },
  { key: 'it', label: 'Software / Network', icon: Network },
];

const projectTypes: Record<string, string[]> = {
  'Software Projects': ['DOS GUI Project', 'Photon Network Toolkit'],
  'AI Projects': ['PhotonNet AI Accelerator'],
  'Cybersecurity Projects': ['Optical QKD Stack'],
  'Network Tools': ['Photon Network Toolkit'],
};

const statusColors: Record<string, string> = {
  active: 'bg-emerald-500/10 text-emerald-300 border-emerald-400/20',
  experimental: 'bg-cyan-500/10 text-cyan-300 border-cyan-400/20',
  archived: 'bg-white/5 text-muted-foreground border-white/10',
};

export default function ProjectsPage() {
  const [filter, setFilter] = useState<DomainKey | 'all'>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchDomain = filter === 'all' || p.category === filter;
      const q = query.toLowerCase();
      const matchQuery =
        !q || p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q));
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
          <Badge>IT Projects</Badge>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-white text-glow leading-[1.05]">
            Software, AI, security & <span className="gradient-text">network tools</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            The engineering side of the laboratory — software projects, AI accelerators, cybersecurity
            frameworks, network tooling, and the DOS GUI experiment.
          </p>
        </Container>
      </section>

      {/* Project category strip */}
      <section className="py-8">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.entries(projectTypes).map(([type, items]) => (
              <Card key={type} className="glass p-5 bg-transparent border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal className="h-4 w-4 text-cyan-300" />
                  <h3 className="font-semibold text-white text-sm">{type}</h3>
                </div>
                <ul className="space-y-1">
                  {items.map((it) => (
                    <li key={it} className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <span className="text-cyan-400/60">▸</span> {it}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* FILTERS */}
      <section className="py-6">
        <Container>
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                    filter === f.key
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/30'
                      : 'glass text-muted-foreground hover:text-white border border-transparent',
                  )}
                >
                  <f.icon className="h-3.5 w-3.5" /> {f.label}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 glass bg-transparent border-white/10"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* PROJECT GALLERY */}
      <section className="py-8 pb-16">
        <Container>
          {filtered.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center text-muted-foreground">
              No projects match your filter.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((p) => (
                <Card key={p.slug} className="glass card-hover overflow-hidden bg-transparent border-white/5 p-0 group cursor-pointer">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#04060d] via-[#04060d]/30 to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge className={statusColors[p.status]}>{p.status}</Badge>
                      <Badge>{p.year}</Badge>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <Badge>{p.category}</Badge>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                      {p.title}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-2">{p.summary}</p>
                    <div className="mt-4 flex items-center gap-1.5 flex-wrap">
                      {p.tags.map((t) => (
                        <span key={t} className="text-[10px] font-mono uppercase tracking-wider text-cyan-300/60">#{t}</span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
