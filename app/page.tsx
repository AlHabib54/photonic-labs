'use client';

import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Sparkles,
  BookOpen,
  Circle,
  Activity,
} from 'lucide-react';

import { PhotonicVisualizer } from '@/components/site/photonic-visualizer';
import { SectionHeader, Container, Badge } from '@/components/site/section';
import { useLanguage } from '@/lib/i18n-store';

import {
  domains,
  projects,
  publications,
  photonicVersions,
} from '@/lib/data';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

/* =========================================================
   HOME PAGE
========================================================= */

export default function HomePage() {
  const { t } = useLanguage();

  const featuredProjects = projects.slice(0, 3);
  const latestPubs = publications.slice(0, 4);
  const latestVersion =
    photonicVersions[photonicVersions.length - 1];

  /* =========================================================
     HERO STATS
  ========================================================= */

  const heroStats = [
    {
      label: t('home_stat_cpu'),
      value: latestVersion
        ? latestVersion.version
        : 'V34',
      sub: latestVersion
        ? `${latestVersion.codename} · ${latestVersion.cores} ${t(
            'home_cores_short',
          )}`
        : t('home_stat_cpu_sub'),
    },

    {
      label: t('home_stat_clock'),
      value: latestVersion
        ? `${latestVersion.clockGHz} GHz`
        : '12 GHz',
      sub: t('home_stat_clock_sub'),
    },

    {
      label: t('home_stat_throughput'),
      value: latestVersion
        ? `${latestVersion.tmarks} TOp/s`
        : '420 TOp/s',
      sub: t('home_stat_throughput_sub'),
    },

    {
      label: t('home_stat_memory'),
      value: latestVersion
        ? `${latestVersion.memoryTB} TB`
        : '2.4 TB',
      sub: t('home_stat_memory_sub'),
    },
  ];

  /* =========================================================
     RESEARCH HIGHLIGHTS
  ========================================================= */

  const highlights = [
    {
      icon: Cpu,
      title: t('highlight_cpu_title'),
      text: t('highlight_cpu_text'),
      color: 'text-cyan-300',
    },

    {
      icon: Sparkles,
      title: t('highlight_neoamona_title'),
      text: t('highlight_neoamona_text'),
      color: 'text-sky-300',
    },

    {
      icon: BookOpen,
      title: t('highlight_alu_title'),
      text: t('highlight_alu_text'),
      color: 'text-indigo-300',
    },

    {
      icon: Activity,
      title: t('highlight_parallel_title'),
      text: t('highlight_parallel_text'),
      color: 'text-teal-300',
    },
  ];

  return (
    <div className="pt-24">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden">

        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="absolute top-20 right-1/4 w-80 h-80 rounded-full bg-blue-600/10 blur-[100px]" />
          <div className="absolute inset-0 grid-bg opacity-40" />
        </div>

        <Container className="py-10 lg:py-16">

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* -------------------------------------------------
                LEFT
            ------------------------------------------------- */}

            <div className="animate-fade-up">

              <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 mb-6">

                <Circle className="h-2 w-2 fill-cyan-400 text-cyan-400 animate-pulse-glow" />

                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  {t('home_independent_lab')}
                </span>

              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white text-glow leading-[1.0]">
                <span>
                  {t('home_title_1')}
                </span>

                <span className="block gradient-text">
                  {t('home_title_2')}
                </span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                {t('home_description')}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">

                <Link href="/research">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white btn-glow font-medium gap-2"
                  >
                    {t('home_explore_research')}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <Link href="/photonic-cpu">
                  <Button
                    size="lg"
                    variant="outline"
                    className="glass border-white/15 hover:border-cyan-400/40 hover:text-cyan-300 gap-2"
                  >
                    {t('home_explore_cpu')}
                    <Cpu className="h-4 w-4" />
                  </Button>
                </Link>

              </div>

              {/* -------------------------------------------------
                  HERO STATS
              ------------------------------------------------- */}

              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">

                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="glass rounded-xl p-3.5"
                  >
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">
                      {stat.label}
                    </div>

                    <div className="text-xl font-bold text-white mt-1 text-glow-soft">
                      {stat.value}
                    </div>

                    <div className="text-[10px] text-cyan-300/70 mt-0.5">
                      {stat.sub}
                    </div>
                  </div>
                ))}

              </div>

            </div>

            {/* -------------------------------------------------
                RIGHT — PHOTONIC VISUALIZER
            ------------------------------------------------- */}

            <div className="relative animate-fade-up delay-200">

              <div className="relative aspect-square max-w-[560px] mx-auto">

                <div className="absolute inset-0 rounded-full bg-gradient-radial from-cyan-500/10 to-transparent blur-3xl" />

                <PhotonicVisualizer className="relative w-full h-full" />

                <div className="absolute top-4 left-4 glass rounded-lg px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-cyan-300">
                  {t('home_core_label')}
                </div>

                <div className="absolute bottom-4 right-4 glass rounded-lg px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-cyan-300/70">
                  {latestVersion
                    ? `${latestVersion.version}.${latestVersion.codename.toUpperCase()}`
                    : 'V34.APEX'}
                </div>

                <div className="absolute bottom-4 left-4 glass rounded-lg px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">

                  <Activity className="h-3 w-3 text-emerald-400 animate-pulse" />

                  {t('home_online')}

                </div>

              </div>

            </div>

          </div>

        </Container>

      </section>

      {/* =====================================================
          RESEARCH HIGHLIGHTS
      ===================================================== */}

      <section className="py-20">

        <Container>

          <SectionHeader
            eyebrow={t('home_research_highlights')}
            title={
              <>
                {t('home_where_light')}{' '}
                <span className="gradient-text">
                  {t('home_computation')}
                </span>
              </>
            }
            description={t('home_research_description')}
          />

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {highlights.map((highlight) => {
              const Icon = highlight.icon;

              return (
                <Card
                  key={highlight.title}
                  className="glass card-hover p-6 bg-transparent border-white/5"
                >

                  <div className="h-11 w-11 rounded-xl bg-cyan-500/10 border border-cyan-400/20 grid place-items-center mb-4">

                    <Icon
                      className={`h-5 w-5 ${highlight.color}`}
                    />

                  </div>

                  <h3 className="font-semibold text-white">
                    {highlight.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {highlight.text}
                  </p>

                </Card>
              );
            })}

          </div>

        </Container>

      </section>

      {/* =====================================================
          FEATURED PROJECTS
      ===================================================== */}

      <section className="py-20 relative">

        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/3 w-72 h-72 rounded-full bg-blue-600/10 blur-[120px]" />
        </div>

        <Container>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

            <SectionHeader
              eyebrow={t('home_featured_projects')}
              title={t('home_engineering_stack')}
              description={t('home_featured_description')}
            />

            <Link
              href="/projects"
              className="shrink-0"
            >
              <Button
                variant="ghost"
                className="glass hover:text-cyan-300 gap-2"
              >
                {t('home_view_all')}
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>

          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-5">

            {featuredProjects.map((project) => (

              <Link
                key={project.slug}
                href="/projects"
                className="group block"
              >

                <Card className="glass card-hover overflow-hidden bg-transparent border-white/5 p-0">

                  <div className="relative aspect-[4/3] overflow-hidden">

                    {/* eslint-disable-next-line @next/next/no-img-element */}

                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#04060d] via-[#04060d]/40 to-transparent" />

                    <div className="absolute top-3 left-3">
                      <Badge>
                        {project.status}
                      </Badge>
                    </div>

                    <div className="absolute top-3 right-3">
                      <Badge>
                        {project.year}
                      </Badge>
                    </div>

                  </div>

                  <div className="p-5">

                    <h3 className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {project.summary}
                    </p>

                    <div className="mt-4 flex items-center gap-1.5 flex-wrap">

                      {project.tags
                        .slice(0, 3)
                        .map((tag) => (

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

            ))}

          </div>

        </Container>

      </section>

      {/* =====================================================
          LATEST PUBLICATIONS
      ===================================================== */}

      <section className="py-20">

        <Container>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

            <SectionHeader
              eyebrow={t('home_latest_publications')}
              title={t('home_from_lab_press')}
              description={t('home_publications_description')}
            />

            <Link
              href="/research"
              className="shrink-0"
            >
              <Button
                variant="ghost"
                className="glass hover:text-cyan-300 gap-2"
              >
                {t('home_all_publications')}
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>

          </div>

          {latestPubs.length > 0 ? (

            <div className="mt-10 grid md:grid-cols-2 gap-4">

              {latestPubs.map((publication) => (

                <Card
                  key={publication.id}
                  className="glass card-hover p-5 bg-transparent border-white/5"
                >

                  <div className="flex items-start gap-4">

                    <div className="h-10 w-10 shrink-0 rounded-lg glass border-cyan-400/20 grid place-items-center">

                      <BookOpen className="h-4 w-4 text-cyan-300" />

                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="flex items-center gap-2 mb-1.5">

                        <Badge>
                          {publication.type}
                        </Badge>

                        <span className="text-[11px] text-muted-foreground font-mono">
                          {publication.venue} · {publication.year}
                        </span>

                      </div>

                      <h3 className="font-semibold text-white leading-tight">
                        {publication.title}
                      </h3>

                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-2">
                        {publication.abstract}
                      </p>

                    </div>

                  </div>

                </Card>

              ))}

            </div>

          ) : (

            <div className="mt-10 glass rounded-2xl p-8 text-center">

              <BookOpen className="h-8 w-8 text-cyan-300/50 mx-auto mb-3" />

              <p className="text-sm text-muted-foreground">
                {t('home_publications_empty')}
              </p>

            </div>

          )}

        </Container>

      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="py-16">

        <Container>

          <div className="relative overflow-hidden rounded-3xl glass-strong p-8 md:p-12 border border-cyan-400/20">

            <div className="absolute inset-0 -z-10">

              <div className="absolute -top-20 -right-10 w-80 h-80 rounded-full bg-cyan-500/15 blur-[100px]" />

              <div className="absolute -bottom-20 -left-10 w-80 h-80 rounded-full bg-blue-600/15 blur-[100px]" />

            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

              <div className="max-w-xl">

                <Badge>
                  {t('cpu_badge')} {latestVersion?.version ?? 'V34'} · {latestVersion?.codename ?? 'Apex'}
                </Badge>

                <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white text-glow-soft leading-tight">
                  {t('home_ready')}
                </h2>

                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {t('home_browse_full')}
                </p>

              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">

                <Link href="/photonic-cpu">

                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white btn-glow gap-2"
                  >
                    {t('home_view_cpu')}
                    <ArrowRight className="h-4 w-4" />
                  </Button>

                </Link>

                <Link href="/contact">

                  <Button
                    size="lg"
                    variant="outline"
                    className="glass border-white/15 hover:border-cyan-400/40 gap-2"
                  >
                    {t('cta_contact')}
                  </Button>

                </Link>

              </div>

            </div>

          </div>

        </Container>

      </section>

      {/* =====================================================
          RESEARCH DOMAINS
      ===================================================== */}

      <section className="pb-20">

        <Container>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">

            {domains.map((domain) => {

              const Icon = domain.icon;

              return (

                <Link
                  key={domain.key}
                  href="/about"
                  className="group"
                >

                  <Card className="glass card-hover p-4 bg-transparent border-white/5 h-full">

                    <div className="h-9 w-9 rounded-lg bg-cyan-500/10 border border-cyan-400/20 grid place-items-center mb-3">

                      <Icon className="h-4 w-4 text-cyan-300" />

                    </div>

                    <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {domain.title}
                    </div>

                    <div className="text-[11px] text-muted-foreground mt-1 leading-snug">
                      {domain.short}
                    </div>

                  </Card>

                </Link>

              );

            })}

          </div>

        </Container>

      </section>

    </div>
  );
}