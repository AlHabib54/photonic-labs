'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Cpu,
  Brain,
  ShieldCheck,
  Server,
  Search,
  ArrowUpRight,
  Network,
} from 'lucide-react';

import { Container, Badge } from '@/components/site/section';
import {
  projects,
  type DomainKey,
  type Project,
} from '@/lib/data';
import { useLanguage } from '@/lib/i18n-store';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

/* =========================================================
   FILTERS
========================================================= */

const filterConfig: {
  key: DomainKey | 'all';
  labelKey: string;
  icon: React.ElementType;
}[] = [
  {
    key: 'all',
    labelKey: 'projects_filter_all',
    icon: Server,
  },
  {
    key: 'photonic',
    labelKey: 'projects_filter_photonic',
    icon: Cpu,
  },
  {
    key: 'ai',
    labelKey: 'projects_filter_ai',
    icon: Brain,
  },
  {
    key: 'security',
    labelKey: 'projects_filter_security',
    icon: ShieldCheck,
  },
  {
    key: 'it',
    labelKey: 'projects_filter_it',
    icon: Network,
  },
];

/* =========================================================
   TRANSLATION KEYS
========================================================= */

const categoryTranslationKey: Record<DomainKey, string> = {
  photonic: 'projects_filter_photonic',
  ai: 'projects_filter_ai',
  security: 'projects_filter_security',
  math: 'projects_category_math',
  it: 'projects_filter_it',
};

const statusTranslationKey: Record<Project['status'], string> = {
  active: 'projects_status_active',
  experimental: 'projects_status_experimental',
  archived: 'projects_status_archived',
};

/* =========================================================
   STATUS STYLES
========================================================= */

const statusColors: Record<Project['status'], string> = {
  active:
    'bg-emerald-500/10 text-emerald-300 border-emerald-400/20',

  experimental:
    'bg-cyan-500/10 text-cyan-300 border-cyan-400/20',

  archived:
    'bg-white/5 text-muted-foreground border-white/10',
};

/* =========================================================
   PAGE
========================================================= */

export default function ProjectsPage() {
  const { t, locale } = useLanguage();

  const [filter, setFilter] =
    useState<DomainKey | 'all'>('all');

  const [query, setQuery] = useState('');

  /* =========================================================
     LOCALIZED PROJECT CONTENT
  ========================================================= */

  const localizedProject = (
    project: Project,
    field: 'title' | 'summary' | 'description',
  ) => {
    const key =
      project[`${field}Key` as keyof Project];

    if (typeof key === 'string' && key.trim()) {
      return t(key);
    }

    return project[field];
  };

  /* =========================================================
     FILTER PROJECTS
  ========================================================= */

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const matchDomain =
        filter === 'all' ||
        project.category === filter;

      const localizedTitle = project.titleKey
        ? t(project.titleKey)
        : project.title;

      const localizedSummary = project.summaryKey
        ? t(project.summaryKey)
        : project.summary;

      const matchQuery =
        !normalizedQuery ||
        localizedTitle
          .toLowerCase()
          .includes(normalizedQuery) ||
        localizedSummary
          .toLowerCase()
          .includes(normalizedQuery) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(normalizedQuery),
        );

      return matchDomain && matchQuery;
    });
  }, [filter, query, locale, t]);  


  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="pt-24">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden py-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="absolute inset-0 grid-bg opacity-30" />
        </div>

        <Container>
          <Badge>
            {t('projects_badge')}
          </Badge>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white text-glow leading-[1.05] md:text-6xl">
            {t('projects_title_before')}{' '}
            <span className="gradient-text">
              {t('projects_title_highlight')}
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t('projects_description')}
          </p>
        </Container>
      </section>

      {/* =====================================================
          FILTERS + SEARCH
      ===================================================== */}

      <section className="py-6">
        <Container>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* FILTER BUTTONS */}

            <div className="flex flex-wrap gap-2">
              {filterConfig.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setFilter(item.key)}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all',

                      filter === item.key
                        ? 'border border-cyan-400/30 bg-cyan-500/15 text-cyan-300'
                        : 'border border-transparent glass text-muted-foreground hover:text-white',
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />

                    {t(item.labelKey)}
                  </button>
                );
              })}
            </div>

            {/* SEARCH */}

            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                type="search"
                placeholder={t('projects_search_placeholder')}
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                className="glass bg-transparent border-white/10 pl-9"
                aria-label={t('projects_search_placeholder')}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          PROJECT GALLERY
      ===================================================== */}

      <section className="py-8 pb-16">
        <Container>
          {filtered.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center text-muted-foreground">
              {t('projects_no_results')}
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project) => {
                const title =
                  localizedProject(project, 'title');

                const summary =
                  localizedProject(project, 'summary');

                const statusKey =
                  statusTranslationKey[
                    project.status
                  ];

                const categoryKey =
                  categoryTranslationKey[
                    project.category
                  ];

                return (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="block"
                  >
                    <Card
                      className="glass card-hover group cursor-pointer overflow-hidden border-white/5 bg-transparent p-0"
                    >
                    {/* IMAGE */}

                    <div className="relative aspect-[16/10] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={title}
                        loading="lazy"
                        className="h-full w-full object-cover opacity-50 transition-all duration-700 group-hover:scale-105 group-hover:opacity-70"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#04060d] via-[#04060d]/30 to-transparent" />

                      {/* STATUS + YEAR */}

                      <div className="absolute left-3 top-3 flex gap-2">
                        <Badge
                          className={
                            statusColors[project.status]
                          }
                        >
                          {t(statusKey)}
                        </Badge>

                        <Badge>
                          {project.year}
                        </Badge>
                      </div>

                      {/* CATEGORY */}

                      <div className="absolute bottom-3 left-3">
                        <Badge>
                          {t(categoryKey)}
                        </Badge>
                      </div>
                    </div>

                    {/* CONTENT */}

                    <div className="p-5">
                      <h3 className="flex items-center gap-1.5 font-semibold leading-tight text-white transition-colors group-hover:text-cyan-300">
                        {title}

                        <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {summary}
                      </p>

                      {/* TAGS */}

                      <div className="mt-4 flex flex-wrap items-center gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono uppercase tracking-wider text-cyan-300/60"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Link>
                );
              })}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}