'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Search, ArrowUpRight, FileText, Cpu, Brain, ShieldCheck } from 'lucide-react';
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

type Result =
  | {
      kind: 'page';
      title: string;
      href: string;
      desc: string;
      icon: React.ElementType;
    }
  | { kind: 'project'; title: string; href: string; desc: string }
  | { kind: 'publication'; title: string; href: string; desc: string }
  | { kind: 'algorithm'; title: string; href: string; desc: string }
  | { kind: 'blog'; title: string; href: string; desc: string }
  | { kind: 'version'; title: string; href: string; desc: string };

const pages: {
  title: string;
  href: string;
  desc: string;
  icon: React.ElementType;
}[] = [
  { title: 'Home', href: '/', desc: 'Landing page', icon: Cpu },
  {
    title: 'About',
    href: '/about',
    desc: 'Mission, vision, technology domains',
    icon: FileText,
  },
  {
    title: 'Photonic CPU',
    href: '/photonic-cpu',
    desc: 'Optical processor architecture & versions',
    icon: Cpu,
  },
  {
    title: 'Research',
    href: '/research',
    desc: 'Papers, optical switch, ALU, memory',
    icon: FileText,
  },
  {
    title: 'Algorithms',
    href: '/algorithms',
    desc: 'Prime detection, AI, math models',
    icon: Brain,
  },
  {
    title: 'IT Projects',
    href: '/projects',
    desc: 'Software, AI, security, network tools',
    icon: FileText,
  },
  {
    title: 'Downloads',
    href: '/downloads',
    desc: 'Papers, PDFs, source, datasets',
    icon: FileText,
  },
  {
    title: 'Blog',
    href: '/blog',
    desc: 'Photonic computing & AI insights',
    icon: FileText,
  },
  {
    title: 'Contact',
    href: '/contact',
    desc: 'Email, GitHub, LinkedIn',
    icon: FileText,
  },
  {
    title: 'Admin',
    href: '/admin',
    desc: 'Admin dashboard',
    icon: ShieldCheck,
  },
];

const domainLabel: Record<DomainKey, string> = {
  photonic: 'Photonic',
  ai: 'AI',
  security: 'Security',
  math: 'Math',
  it: 'IT',
};

function buildIndex(
  locale: 'en' | 'de' | 'ar',
  t: (key: string) => string,
): Result[] {
  const items: Result[] = [];

  pages.forEach((page) => {
    items.push({
      kind: 'page',
      title: page.title,
      href: page.href,
      desc: page.desc,
      icon: page.icon,
    });
  });

  projects.forEach((project) => {
    const title = project.titleKey
      ? t(project.titleKey)
      : project.title;

    const summary = project.summaryKey
      ? t(project.summaryKey)
      : project.summary;

    items.push({
      kind: 'project',
      title,
      href: `/projects/${project.slug}`,
      desc: `${domainLabel[project.category]} · ${summary}`,
    });
  });

  publications.forEach((publication) => {
    items.push({
      kind: 'publication',
      title: publication.title,
      href: '/research',
      desc: `${publication.venue} · ${publication.year}`,
    });
  });

  algorithms.forEach((algorithm) => {
    items.push({
      kind: 'algorithm',
      title: algorithm.title,
      href: '/algorithms',
      desc: `${algorithm.category} · ${algorithm.complexity}`,
    });
  });

  blogPosts.forEach((blog) => {
    items.push({
      kind: 'blog',
      title: blog.title[locale],
      href: '/blog',
      desc: blog.excerpt[locale],
    });
  });

  photonicVersions.forEach((version) => {
    items.push({
      kind: 'version',
      title: `Photonic CPU ${version.version} · ${version.codename}`,
      href: '/photonic-cpu',
      desc: `${version.year} · ${version.cores} cores · ${version.clockGHz} GHz`,
    });
  });

  return items;
}

export function SearchDialog() {
  const { open, setOpen } = useSearchOpen();
  const { t, locale } = useLanguage();
  const [query, setQuery] = useState('');

  const index = useMemo(
    () => buildIndex(locale, t),
    [locale, t],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === 'k'
      ) {
        event.preventDefault();
        setOpen(!open);
      }

      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (!open) {
      setQuery('');
    }
  }, [open]);

  if (!open) return null;

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = normalizedQuery
    ? index.filter(
        (result) =>
          result.title.toLowerCase().includes(normalizedQuery) ||
          result.desc.toLowerCase().includes(normalizedQuery),
      )
    : index.slice(0, 8);

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh] animate-fade-up">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      <CommandPrimitive
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-cyan-400/20 glass-strong shadow-2xl shadow-cyan-500/20"
        label={t('search_title')}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4">
          <Search className="h-5 w-5 shrink-0 text-cyan-300" />

          <CommandPrimitive.Input
            autoFocus
            placeholder={t('search_placeholder')}
            value={query}
            onValueChange={setQuery}
            className="flex h-14 w-full bg-transparent text-sm text-white outline-none placeholder:text-muted-foreground"
          />

          <kbd className="hidden items-center gap-1 rounded border border-white/10 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground sm:inline-flex">
            ESC
          </kbd>
        </div>

        <CommandPrimitive.List className="max-h-[50vh] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <CommandPrimitive.Empty className="py-10 text-center text-sm text-muted-foreground">
              {t('search_empty')}
            </CommandPrimitive.Empty>
          )}

          {filtered.map((result) => (
            <CommandPrimitive.Item
              key={`${result.kind}-${result.href}-${result.title}`}
              value={`${result.title} ${result.desc}`}
              onSelect={() => {
                setOpen(false);
                window.location.href = result.href;
              }}
              className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors aria-selected:bg-cyan-500/10 aria-selected:text-cyan-200"
            >
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg glass text-cyan-300">
                {result.kind === 'page' && 'icon' in result && result.icon ? (
                  <result.icon className="h-4 w-4" />
                ) : (
                  <span className="text-[9px] font-mono uppercase">
                    {result.kind === 'project'
                      ? 'PRJ'
                      : result.kind === 'publication'
                        ? 'PUB'
                        : result.kind === 'algorithm'
                          ? 'ALG'
                          : result.kind === 'blog'
                            ? 'BLOG'
                            : 'CPU'}
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-white">
                  {result.title}
                </div>
                <div className="truncate text-xs text-muted-foreground">
                  {result.desc}
                </div>
              </div>

              <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-aria-selected:opacity-100" />
            </CommandPrimitive.Item>
          ))}
        </CommandPrimitive.List>

        <div className="flex items-center justify-between border-t border-white/10 px-4 py-2.5 text-[10px] font-mono text-muted-foreground">
          <span>↑↓ navigate · ↵ select</span>
          <span>{filtered.length} results</span>
        </div>
      </CommandPrimitive>
    </div>
  );
}
