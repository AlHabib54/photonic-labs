'use client';
import React, { useMemo, useState } from 'react';
import { Search, Clock, ArrowLeft, FileText, ArrowUpRight, CalendarDays } from 'lucide-react';
import { SectionHeader, Container, Badge } from '@/components/site/section';
import { blogPosts, type BlogPost } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Markdown } from '@/components/site/markdown';
import { cn } from '@/lib/utils';

const categories = ['All', 'photonic', 'ai', 'security', 'math', 'it'] as const;

export default function BlogPage() {
  const [filter, setFilter] = useState<typeof categories[number]>('All');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<BlogPost | null>(null);

  const filtered = useMemo(() => {
    return blogPosts.filter((p) => {
      const matchCat = filter === 'All' || p.category === filter;
      const q = query.toLowerCase();
      const matchQuery = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [filter, query]);

  if (selected) {
    return (
      <div className="pt-24">
        <Container className="py-8 max-w-3xl">
          <button onClick={() => setSelected(null)} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-cyan-300 transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to all articles
          </button>
          <Badge>{selected.category}</Badge>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold text-white text-glow leading-tight">{selected.title}</h1>
          <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> {selected.date}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {selected.readingTime}</span>
            <span className="font-mono">{selected.author}</span>
          </div>

          {/* PDF viewer placeholder */}
          <Card className="glass mt-6 p-3 bg-transparent border-white/5">
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <FileText className="h-3.5 w-3.5 text-cyan-300" /> Article PDF Preview
              </div>
              <Badge>PDF Viewer</Badge>
            </div>
            <div className="rounded-xl border border-cyan-400/10 bg-[#02040a] p-6 min-h-[120px]">
              <Markdown content={selected.body} />
            </div>
          </Card>

          <div className="mt-10 glass-strong rounded-2xl p-6 border border-cyan-400/20 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Found this useful? Share with your peers.</span>
            <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white btn-glow gap-1.5">
              <ArrowUpRight className="h-3.5 w-3.5" /> Share
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <section className="relative overflow-hidden py-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="absolute inset-0 grid-bg opacity-30" />
        </div>
        <Container>
          <Badge>Blog</Badge>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-white text-glow leading-[1.05]">
            Technical articles & <span className="gradient-text">insights</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Photonic computing news, AI deep-dives, and cybersecurity insights from the laboratory.
          </p>
        </Container>
      </section>

      <section className="py-6">
        <Container>
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-xs font-medium transition-all capitalize',
                    filter === c
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/30'
                      : 'glass text-muted-foreground hover:text-white border border-transparent',
                  )}
                >
                  {c === 'All' ? 'All' : c}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((post) => (
              <Card key={post.slug} className="glass card-hover p-6 bg-transparent border-white/5 cursor-pointer group" onClick={() => setSelected(post)}>
                <div className="flex items-center gap-2 mb-3">
                  <Badge>{post.category}</Badge>
                  <span className="text-[11px] text-muted-foreground font-mono inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {post.readingTime}
                  </span>
                </div>
                <h3 className="font-semibold text-white text-lg group-hover:text-cyan-300 transition-colors leading-tight">{post.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-3">{post.excerpt}</p>
                <div className="mt-5 flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-[11px] text-muted-foreground font-mono">{post.date}</span>
                  <span className="text-xs text-cyan-300 inline-flex items-center gap-1">
                    Read <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
