'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Command, Search, ArrowUpRight, FileText, Cpu, Brain, ShieldCheck } from 'lucide-react';
import { Command as CommandPrimitive } from 'cmdk';
import { useSearchOpen } from '@/components/site/search-open';
import { useLanguage } from '@/lib/i18n-store';
import {
  projects,
  publications,
  algorithms,
  blogPosts,
  photonicVersions,
  type DomainKey,
} from '@/lib/data';
import { cn } from '@/lib/utils';

type Result =
  | { kind: 'page'; title: string; href: string; desc: string; icon: React.ElementType }
  | { kind: 'project'; title: string; href: string; desc: string }
  | { kind: 'publication'; title: string; href: string; desc: string }
  | { kind: 'algorithm'; title: string; href: string; desc: string }
  | { kind: 'blog'; title: string; href: string; desc: string }
  | { kind: 'version'; title: string; href: string; desc: string };

const pages: { title: string; href: string; desc: string; icon: React.ElementType }[] = [
  { title: 'Home', href: '/', desc: 'Landing page', icon: Cpu },
  { title: 'About', href: '/about', desc: 'Mission, vision, technology domains', icon: FileText },
  { title: 'Photonic CPU', href: '/photonic-cpu', desc: 'Optical processor architecture & versions', icon: Cpu },
  { title: 'Research', href: '/research', desc: 'Papers, optical switch, ALU, memory', icon: FileText },
  { title: 'Algorithms', href: '/algorithms', desc: 'Prime detection, AI, math models', icon: Brain },
  { title: 'IT Projects', href: '/projects', desc: 'Software, AI, security, network tools', icon: FileText },
  { title: 'Downloads', href: '/downloads', desc: 'Papers, PDFs, source, datasets', icon: FileText },
  { title: 'Blog', href: '/blog', desc: 'Photonic computing & AI insights', icon: FileText },
  { title: 'Contact', href: '/contact', desc: 'Email, GitHub, LinkedIn', icon: FileText },
  { title: 'Admin', href: '/admin', desc: 'Admin dashboard placeholder', icon: ShieldCheck },
];

const domainLabel: Record<DomainKey, string> = {
  photonic: 'Photonic',
  ai: 'AI',
  security: 'Security',
  math: 'Math',
  it: 'IT',
};

function buildIndex(): Result[] {
  const items: Result[] = [];
  pages.forEach((p) =>
    items.push({ kind: 'page', title: p.title, href: p.href, desc: p.desc, icon: p.icon }),
  );
  projects.forEach((p) =>
    items.push({ kind: 'project', title: p.title, href: '/projects', desc: `${domainLabel[p.category]} · ${p.summary}` }),
  );
  publications.forEach((p) =>
    items.push({ kind: 'publication', title: p.title, href: '/research', desc: `${p.venue} · ${p.year}` }),
  );
  algorithms.forEach((a) =>
    items.push({ kind: 'algorithm', title: a.title, href: '/algorithms', desc: `${a.category} · ${a.complexity}` }),
  );
  blogPosts.forEach((b) =>
    items.push({ kind: 'blog', title: b.title, href: '/blog', desc: b.excerpt }),
  );
  photonicVersions.forEach((v) =>
    items.push({ kind: 'version', title: `Photonic CPU ${v.version} · ${v.codename}`, href: '/photonic-cpu', desc: `${v.year} · ${v.cores} cores · ${v.clockGHz} GHz` }),
  );
  return items;
}

export function SearchDialog() {
  const { open, setOpen } = useSearchOpen();
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const index = React.useMemo(buildIndex, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  if (!open) return null;

  const filtered = query
    ? index.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.desc.toLowerCase().includes(query.toLowerCase()),
      )
    : index.slice(0, 8);

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4 animate-fade-up">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <CommandPrimitive
        className="relative w-full max-w-2xl glass-strong rounded-2xl border border-cyan-400/20 overflow-hidden shadow-2xl shadow-cyan-500/20"
        label={t('search_title')}
      >
        <div className="flex items-center gap-3 px-4 border-b border-white/10">
          <Search className="h-5 w-5 text-cyan-300 shrink-0" />
          <CommandPrimitive.Input
            autoFocus
            placeholder={t('search_placeholder')}
            value={query}
            onValueChange={setQuery}
            className="flex h-14 w-full bg-transparent text-sm text-white placeholder:text-muted-foreground outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-white/10 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
            ESC
          </kbd>
        </div>
        <CommandPrimitive.List className="max-h-[50vh] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <CommandPrimitive.Empty className="py-10 text-center text-sm text-muted-foreground">
              {t('search_empty')}
            </CommandPrimitive.Empty>
          )}
          {filtered.map((r) => (
            <CommandPrimitive.Item
              key={`${r.kind}-${r.title}`}
              value={`${r.title} ${r.desc}`}
              onSelect={() => {
                setOpen(false);
                window.location.href = r.href;
              }}
              className="group flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer aria-selected:bg-cyan-500/10 aria-selected:text-cyan-200 transition-colors"
            >
              <div className="h-8 w-8 rounded-lg glass grid place-items-center shrink-0 text-cyan-300">
                {r.kind === 'page' && 'icon' in r && r.icon ? (
                  <r.icon className="h-4 w-4" />
                ) : (
                  <span className="text-[9px] font-mono uppercase">
                    {r.kind === 'project' ? 'PRJ' : r.kind === 'publication' ? 'PUB' : r.kind === 'algorithm' ? 'ALG' : r.kind === 'blog' ? 'BLOG' : 'CPU'}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-white truncate">{r.title}</div>
                <div className="text-xs text-muted-foreground truncate">{r.desc}</div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-aria-selected:opacity-100 transition-opacity" />
            </CommandPrimitive.Item>
          ))}
        </CommandPrimitive.List>
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/10 text-[10px] font-mono text-muted-foreground">
          <span>↑↓ navigate · ↵ select</span>
          <span>{filtered.length} results</span>
        </div>
      </CommandPrimitive>
    </div>
  );
}

// satisfies unused import warnings if Command not used
void Command;
void cn;
