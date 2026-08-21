'use client';
import React, { useMemo, useState } from 'react';
import { FileText, Code, BookOpen, Database, Download, Search, File, Filter, Archive } from 'lucide-react';
import { SectionHeader, Container, Badge } from '@/components/site/section';
import { downloads, type DownloadItem, type DomainKey } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';



const typeIcon: Record<DownloadItem['type'], React.ElementType> = {
  PDF: FileText,
  Source: Code,
  Docs: BookOpen,
  Dataset: Database,
  ZIP: Archive,
};

const filters: { key: DomainKey | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'photonic', label: 'Photonic' },
  { key: 'security', label: 'Security' },
  { key: 'math', label: 'Math' },
];

export default function DownloadsPage() {
  const [filter, setFilter] = useState<DomainKey | 'all'>('all');
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<DownloadItem['type'] | 'all'>('all');

  const filtered = useMemo(() => {
    return downloads.filter((d) => {
      const matchDomain = filter === 'all' || d.category === filter;
      const matchType = typeFilter === 'all' || d.type === typeFilter;
      const q = query.toLowerCase();
      const matchQuery = !q || d.title.toLowerCase().includes(q) || d.description.toLowerCase().includes(q);
      return matchDomain && matchType && matchQuery;
    });
  }, [filter, typeFilter, query]);

  return (
    <div className="pt-24">
      <section className="relative overflow-hidden py-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="absolute inset-0 grid-bg opacity-30" />
        </div>
        <Container>
          <Badge>Downloads</Badge>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-white text-glow leading-[1.05]">
            Papers, source, <span className="gradient-text">& documentation</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Open research artifacts — PDF papers, reference source code, API documentation, and benchmark
            datasets from across the laboratory.
          </p>
        </Container>
      </section>

      <section className="py-6">
        <Container>
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2 items-center">
              <Filter className="h-3.5 w-3.5 text-muted-foreground" />
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
              <span className="text-muted-foreground/40 mx-1">|</span>
              {(['all', 'PDF', 'Source', 'Docs', 'Dataset', 'ZIP'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={cn(
                    'rounded-lg px-2.5 py-1 text-[11px] font-mono uppercase transition-all',
                    typeFilter === t
                      ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-400/20'
                      : 'text-muted-foreground hover:text-white border border-transparent',
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search downloads..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 glass bg-transparent border-white/10"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-8 pb-16">
        <Container>
          {filtered.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center text-muted-foreground">No downloads match your filters.</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {filtered.map((d) => {
                const Icon = typeIcon[d.type];
                return (
                  <Card key={d.id} className="glass card-hover p-5 bg-transparent border-white/5 group">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 shrink-0 rounded-xl bg-cyan-500/10 border border-cyan-400/20 grid place-items-center relative">
                        <Icon className="h-5 w-5 text-cyan-300" />
                        <File className="h-3 w-3 text-cyan-300/40 absolute -bottom-0.5 -right-0.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <Badge>{d.type}</Badge>
                          <Badge className="border-white/10 text-muted-foreground">{d.category}</Badge>
                          <span className="text-[11px] text-muted-foreground font-mono">{d.size}</span>
                        </div>
                        <h3 className="font-semibold text-white">{d.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{d.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-[10px] font-mono text-muted-foreground/60">
                            Updated {d.updated}
                          </span>

                          <Button
                            asChild
                            size="sm"
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white btn-glow gap-1.5"
                          >
                            <a href={d.url || "#"} download>
                              <Download className="h-3.5 w-3.5" />
                              Download
                            </a>
                          </Button>

                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
