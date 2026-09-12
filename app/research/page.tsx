'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';

import {
  Search,
  BookOpen,
  Cpu,
  Brain,
  ShieldCheck,
  Sigma,
  Server,
  ArrowUpRight,
  FileText,
  X,
} from 'lucide-react';

import {
  SectionHeader,
  Container,
  Badge,
} from '@/components/site/section';

import {
  projects,
  publications,
  type DomainKey,
  type Publication,
} from '@/lib/data';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { useLanguage } from '@/lib/i18n-store';

/* =========================================================
   RESEARCH STREAMS
========================================================= */

const streamConfig = [
  {
    key: 'switch',
    titleKey: 'research_stream_switch_title',
    descKey: 'research_stream_switch_description',
    icon: Cpu,
  },
  {
    key: 'alu',
    titleKey: 'research_stream_alu_title',
    descKey: 'research_stream_alu_description',
    icon: Cpu,
  },
  {
    key: 'memory',
    titleKey: 'research_stream_memory_title',
    descKey: 'research_stream_memory_description',
    icon: BookOpen,
  },
  {
    key: 'parallel',
    titleKey: 'research_stream_parallel_title',
    descKey: 'research_stream_parallel_description',
    icon: BookOpen,
  },
];

/* =========================================================
   DOMAIN ICONS
========================================================= */

const domainIcon: Record<
  DomainKey,
  React.ElementType
> = {
  photonic: Cpu,
  ai: Brain,
  security: ShieldCheck,
  math: Sigma,
  it: Server,
};

/* =========================================================
   FILTERS
========================================================= */

const filterConfig: {
  key: DomainKey | 'all';
  labelKey: string;
}[] = [
  {
    key: 'all',
    labelKey: 'research_filter_all',
  },
  {
    key: 'photonic',
    labelKey: 'research_filter_photonic',
  },
  {
    key: 'ai',
    labelKey: 'research_filter_ai',
  },
  {
    key: 'security',
    labelKey: 'research_filter_security',
  },
  {
    key: 'math',
    labelKey: 'research_filter_math',
  },
  {
    key: 'it',
    labelKey: 'research_filter_it',
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function ResearchPage() {
  const { t } = useLanguage();

  const [filter, setFilter] =
    useState<DomainKey | 'all'>('all');

  const [query, setQuery] = useState('');

  const [selected, setSelected] =
    useState<Publication | null>(null);

  /* =========================================================
     FILTER PUBLICATIONS
  ========================================================= */

  const filtered = useMemo(() => {
    const normalizedQuery = query
      .trim()
      .toLowerCase();

    return publications.filter((publication) => {
      const matchDomain =
        filter === 'all' ||
        publication.category === filter;

      const matchQuery =
        !normalizedQuery ||
        publication.title
          .toLowerCase()
          .includes(normalizedQuery) ||
        publication.abstract
          .toLowerCase()
          .includes(normalizedQuery) ||
        publication.tags.some((tag) =>
          tag.toLowerCase().includes(normalizedQuery),
        );

      return matchDomain && matchQuery;
    });
  }, [filter, query]);

  return (
    <div className="pt-24">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden py-12">

        <div className="pointer-events-none absolute inset-0 -z-10">

          <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px]" />

          <div className="absolute inset-0 grid-bg opacity-30" />

        </div>

        <Container>

          <Badge>
            {t('research_badge')}
          </Badge>

          <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-white text-glow leading-[1.05]">

            {t('research_title_before')}{' '}

            <span className="gradient-text">
              {t('research_title_highlight')}
            </span>

          </h1>

          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {t('research_description')}
          </p>

        </Container>

      </section>


      {/* =====================================================
          CORE RESEARCH STREAMS
      ===================================================== */}

      <section className="py-10">

        <Container>

          <SectionHeader
            eyebrow={t('research_streams_eyebrow')}
            title={t('research_streams_title')}
          />

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">

            {streamConfig.map((stream) => {

              const Icon = stream.icon;

              return (

                <Card
                  key={stream.key}
                  className="glass card-hover p-6 bg-transparent border-white/5"
                >

                  <div className="h-11 w-11 rounded-xl bg-cyan-500/10 border border-cyan-400/20 grid place-items-center mb-4">

                    <Icon className="h-5 w-5 text-cyan-300" />

                  </div>

                  <h3 className="font-semibold text-white">
                    {t(stream.titleKey)}
                  </h3>

                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {t(stream.descKey)}
                  </p>

                </Card>

              );
            })}

          </div>

        </Container>

      </section>


      {/* =====================================================
          CURRENT RESEARCH PROJECTS
      ===================================================== */}

      <section className="py-10">
        <Container>

          <SectionHeader
            eyebrow={t('research_projects_eyebrow')}
            title={t('research_projects_title')}
            description={t('research_projects_description')}
          />

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">

            {projects.map((project) => {

              const Icon = domainIcon[project.category];

              const title = project.titleKey
                ? t(project.titleKey)
                : project.title;

              const summary = project.summaryKey
                ? t(project.summaryKey)
                : project.summary;

              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="block"
                >
                  <Card className="glass card-hover h-full p-6 bg-transparent border-white/5">

                    <div className="flex items-start justify-between gap-4">

                      <div className="h-11 w-11 shrink-0 rounded-xl bg-cyan-500/10 border border-cyan-400/20 grid place-items-center">
                        <Icon className="h-5 w-5 text-cyan-300" />
                      </div>

                      <ArrowUpRight className="h-4 w-4 text-muted-foreground shrink-0" />

                    </div>

                    <h3 className="mt-5 font-semibold text-white leading-tight">
                      {title}
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {summary}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-3">

                      <Badge className="border-white/10 text-muted-foreground">
                        {t(`projects_category_${project.category}`)}
                      </Badge>

                      <span className="text-[10px] font-mono text-muted-foreground">
                        {project.year}
                      </span>

                    </div>

                  </Card>
                </Link>
              );
            })}

          </div>

        </Container>
      </section>      

      {/* =====================================================
          FILTERS + LIST
      ===================================================== */}

      <section className="py-10">

        <Container>

          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-8">

            {/* FILTERS */}

            <div className="flex flex-wrap gap-2">

              {filterConfig.map((item) => (

                <button
                  key={item.key}
                  onClick={() => setFilter(item.key)}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-xs font-medium transition-all',

                    filter === item.key
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/30'
                      : 'glass text-muted-foreground hover:text-white border border-transparent',
                  )}
                >
                  {t(item.labelKey)}
                </button>

              ))}

            </div>


            {/* SEARCH */}

            <div className="relative w-full lg:w-72">

              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder={t(
                  'research_search_placeholder',
                )}
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                className="pl-9 glass bg-transparent border-white/10"
              />

            </div>

          </div>


          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {filtered.length === 0 ? (

            <div className="glass rounded-2xl p-12 text-center text-muted-foreground">

              {t('research_no_results')}

            </div>

          ) : (

            /* =================================================
               PUBLICATION GRID
            ================================================= */

            <div className="grid md:grid-cols-2 gap-4">

              {filtered.map((publication) => {

                const Icon =
                  domainIcon[publication.category];

                return (

                  <Card
                    key={publication.id}
                    className="glass card-hover p-5 bg-transparent border-white/5 cursor-pointer"
                  >

                    <div
                      className="flex items-start gap-4"
                      onClick={() =>
                        setSelected(publication)
                      }
                    >

                      {/* ICON */}

                      <div className="h-11 w-11 shrink-0 rounded-lg glass border-cyan-400/20 grid place-items-center">

                        <Icon className="h-4 w-4 text-cyan-300" />

                      </div>


                      {/* CONTENT */}

                      <div className="min-w-0 flex-1">

                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">

                          <Badge>
                            {publication.type}
                          </Badge>

                          <span className="text-[11px] text-muted-foreground font-mono">
                            {publication.venue} · {publication.year}
                          </span>

                          <Badge className="border-white/10 text-muted-foreground">
                            {publication.category}
                          </Badge>

                        </div>


                        <h3 className="font-semibold text-white leading-tight hover:text-cyan-300 transition-colors">
                          {publication.title}
                        </h3>


                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-2">
                          {publication.abstract}
                        </p>


                        <div className="mt-3 flex items-center gap-1.5 flex-wrap">

                          {publication.tags.map((tag) => (

                            <span
                              key={tag}
                              className="text-[10px] font-mono uppercase tracking-wider text-cyan-300/60"
                            >
                              #{tag}
                            </span>

                          ))}

                        </div>

                      </div>


                      {/* ARROW */}

                      <ArrowUpRight className="h-4 w-4 text-muted-foreground shrink-0" />

                    </div>

                  </Card>

                );

              })}

            </div>

          )}

        </Container>

      </section>


      {/* =====================================================
          DETAIL DIALOG
      ===================================================== */}

      {selected && (

        <div className="fixed inset-0 z-[100] grid place-items-center p-4 animate-fade-up">

          {/* BACKDROP */}

          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />


          {/* DIALOG */}

          <Card className="relative glass-strong rounded-2xl border-cyan-400/20 max-w-2xl w-full p-8 max-h-[80vh] overflow-y-auto">

            {/* CLOSE */}

            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 h-8 w-8 grid place-items-center rounded-lg glass text-muted-foreground hover:text-cyan-300"
              aria-label={t('research_close')}
            >

              <X className="h-4 w-4" />

            </button>


            {/* META */}

            <div className="flex items-center gap-2 mb-3 flex-wrap">

              <Badge>
                {selected.type}
              </Badge>

              <Badge className="border-white/10 text-muted-foreground">
                {selected.category}
              </Badge>

              <span className="text-[11px] text-muted-foreground font-mono">
                {selected.venue} · {selected.year}
              </span>

            </div>


            {/* TITLE */}

            <h2 className="text-2xl font-bold text-white text-glow-soft leading-tight">
              {selected.title}
            </h2>


            {/* AUTHORS */}

            <p className="text-xs text-cyan-300/70 mt-2 font-mono">
              {selected.authors}
            </p>


            {/* ABSTRACT */}

            <div className="mt-5 prose-invert">

              <p className="text-sm text-muted-foreground leading-relaxed">
                {selected.abstract}
              </p>

            </div>


            {/* TAGS */}

            <div className="mt-5 flex items-center gap-1.5 flex-wrap">

              {selected.tags.map((tag) => (

                <span
                  key={tag}
                  className="text-[10px] font-mono uppercase tracking-wider text-cyan-300/60"
                >
                  #{tag}
                </span>

              ))}

            </div>


            {/* ACTIONS */}

            <div className="mt-6 flex gap-3">

              <Link
                href="/downloads"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-sm text-white btn-glow"
              >

                <FileText className="h-4 w-4" />

                {t('research_download_pdf')}

              </Link>


              <button
                onClick={() => setSelected(null)}
                className="rounded-lg glass px-4 py-2 text-sm text-muted-foreground hover:text-white"
              >

                {t('research_close')}

              </button>

            </div>

          </Card>

        </div>

      )}

    </div>
  );
}