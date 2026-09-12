'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  Cpu,
  CalendarDays,
  FlaskConical,
  Tags,
  Download,
  GitBranch,
  CircuitBoard,
} from 'lucide-react';

import { Container, Badge } from '@/components/site/section';
import {
  projects,
  downloads,
  type Project,
} from '@/lib/data';

import { useLanguage } from '@/lib/i18n-store';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default function ProjectDetailPage({
  params,
}: ProjectPageProps) {
  const { t } = useLanguage();

  const project = projects.find(
    (item) => item.slug === params.slug,
  );

  /* =========================================================
     PROJECT NOT FOUND
  ========================================================= */

  if (!project) {
    return (
      <div className="pt-24">
        <Container className="py-16">
          <div className="glass rounded-2xl p-10 text-center">
            <h1 className="text-2xl font-bold text-white">
              {t('projects_detail_not_found')}
            </h1>

            <p className="mt-3 text-sm text-muted-foreground">
              {t(
                'projects_detail_not_found_description',
              )}
            </p>

            <Link
              href="/projects"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 transition-colors hover:bg-cyan-500/20"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('projects_detail_back')}
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  /* =========================================================
     LOCALIZED CONTENT
  ========================================================= */

  const getLocalizedValue = (
    field: 'title' | 'summary' | 'description',
  ) => {
    const key =
      project[`${field}Key` as keyof Project];

    if (
      typeof key === 'string' &&
      key.trim()
    ) {
      return t(key);
    }

    return project[field];
  };

  const title = getLocalizedValue('title');
  const summary = getLocalizedValue('summary');
  const description =
    getLocalizedValue('description');

  /* =========================================================
     RELATED DOWNLOADS
  ========================================================= */

  const relatedDownloads = downloads.filter((item) => {
    const downloadPath =
      item.url.toLowerCase();

    const projectSlug =
      project.slug.toLowerCase();

    return (
      downloadPath.includes(projectSlug) ||
      item.tags?.some(
        (tag) =>
          tag.toLowerCase() ===
          projectSlug,
      )
    );
  });

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
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-cyan-300"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('projects_detail_back')}
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-5">
            {/* IMAGE */}

            <div className="lg:col-span-3">
              <div className="relative overflow-hidden rounded-2xl border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={title}
                  className="aspect-[16/10] h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#04060d] via-[#04060d]/10 to-transparent" />

                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  <Badge>
                    {t(
                      `projects_category_${project.category}`,
                    )}
                  </Badge>

                  <Badge>
                    {t(
                      `projects_status_${project.status}`,
                    )}
                  </Badge>

                  <Badge>
                    {project.year}
                  </Badge>
                </div>
              </div>
            </div>

            {/* TITLE */}

            <div className="flex flex-col justify-center lg:col-span-2">
              <div className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-cyan-300/80">
                <Cpu className="h-4 w-4" />
                {t('projects_detail_project')}
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-white text-glow md:text-5xl">
                {title}
              </h1>

              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-cyan-400/10 bg-cyan-500/5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-cyan-300/70"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          PROJECT INFORMATION
      ===================================================== */}

      <section className="py-8">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            <div className="glass rounded-xl border border-white/5 p-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                <FlaskConical className="h-4 w-4 text-cyan-300" />
                {t('projects_detail_status')}
              </div>

              <div className="mt-3 text-lg font-semibold text-white">
                {t(
                  `projects_status_${project.status}`,
                )}
              </div>
            </div>

            <div className="glass rounded-xl border border-white/5 p-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                <CalendarDays className="h-4 w-4 text-cyan-300" />
                {t('projects_detail_year')}
              </div>

              <div className="mt-3 text-lg font-semibold text-white">
                {project.year}
              </div>
            </div>

            <div className="glass rounded-xl border border-white/5 p-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                <Tags className="h-4 w-4 text-cyan-300" />
                {t('projects_detail_category')}
              </div>

              <div className="mt-3 text-lg font-semibold text-white">
                {t(
                  `projects_category_${project.category}`,
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          PROJECT OVERVIEW
      ===================================================== */}

      <section className="py-8">
        <Container>
          <div className="glass rounded-2xl border border-white/5 p-7">
            <div className="mb-5 flex items-center gap-2">
              <Cpu className="h-5 w-5 text-cyan-300" />

              <h2 className="text-xl font-semibold text-white">
                {t('projects_detail_overview')}
              </h2>
            </div>

            <p className="max-w-4xl text-base leading-8 text-muted-foreground">
              {description}
            </p>
          </div>
        </Container>
      </section>

      {/* =====================================================
          OPTICAL ALU RESEARCH OBJECTIVE
      ===================================================== */}

      {project.slug === 'optical-alu' && (
        <>
          <section className="py-8">
            <Container>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="glass rounded-2xl border border-white/5 p-7">
                  <div className="flex items-center gap-3">
                    <FlaskConical className="h-5 w-5 text-cyan-300" />

                    <h2 className="text-xl font-semibold text-white">
                      {t(
                        'projects_alu_objective_title',
                      )}
                    </h2>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-muted-foreground">
                    {t(
                      'projects_alu_objective_text',
                    )}
                  </p>
                </div>

                <div className="glass rounded-2xl border border-white/5 p-7">
                  <div className="flex items-center gap-3">
                    <CircuitBoard className="h-5 w-5 text-cyan-300" />

                    <h2 className="text-xl font-semibold text-white">
                      {t(
                        'projects_alu_architecture_title',
                      )}
                    </h2>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-muted-foreground">
                    {t(
                      'projects_alu_architecture_text',
                    )}
                  </p>
                </div>
              </div>
            </Container>
          </section>

          {/* =====================================================
              ARCHITECTURE DIAGRAM
          ===================================================== */}

          <section className="py-8">
            <Container>
              <div className="glass rounded-2xl border border-cyan-400/10 p-7">
                <div>
                  <div className="text-sm font-medium uppercase tracking-wider text-cyan-300">
                    {t('projects_detail_focus')}
                  </div>

                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    {t('projects_alu_architecture_title')}
                  </h2>

                  <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
                    {t('projects_alu_architecture_text')}
                  </p>
                </div>

                <div className="mt-8 overflow-x-auto">
                  <svg
                    viewBox="0 0 1200 520"
                    className="mx-auto w-full min-w-[900px] max-w-6xl"
                    role="img"
                    aria-label="Optical ALU conceptual architecture"
                  >
                    <defs>
                      <linearGradient
                        id="aluFlowGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="50%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#a78bfa" />
                      </linearGradient>

                      <marker
                        id="aluArrow"
                        markerWidth="10"
                        markerHeight="10"
                        refX="8"
                        refY="3"
                        orient="auto"
                        markerUnits="strokeWidth"
                      >
                        <path
                          d="M0,0 L0,6 L9,3 z"
                          fill="#67e8f9"
                        />
                      </marker>
                    </defs>

                    {/* TITLE */}
                    <text
                      x="600"
                      y="35"
                      textAnchor="middle"
                      fill="white"
                      fontSize="22"
                      fontWeight="600"
                    >
                      Photonic Arithmetic Data Path
                    </text>

                    {/* INPUT A */}
                    <g>
                      <rect
                        x="40"
                        y="150"
                        width="180"
                        height="90"
                        rx="18"
                        fill="rgba(8,47,73,0.55)"
                        stroke="#22d3ee"
                        strokeWidth="2"
                      />

                      <text
                        x="130"
                        y="185"
                        textAnchor="middle"
                        fill="#67e8f9"
                        fontSize="14"
                        fontWeight="600"
                      >
                        INPUT A
                      </text>

                      <text
                        x="130"
                        y="213"
                        textAnchor="middle"
                        fill="white"
                        fontSize="17"
                      >
                        Optical Operand A
                      </text>

                      <text
                        x="130"
                        y="233"
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontSize="11"
                      >
                        Encoded optical signal
                      </text>
                    </g>

                    {/* INPUT B */}
                    <g>
                      <rect
                        x="40"
                        y="300"
                        width="180"
                        height="90"
                        rx="18"
                        fill="rgba(8,47,73,0.55)"
                        stroke="#22d3ee"
                        strokeWidth="2"
                      />

                      <text
                        x="130"
                        y="335"
                        textAnchor="middle"
                        fill="#67e8f9"
                        fontSize="14"
                        fontWeight="600"
                      >
                        INPUT B
                      </text>

                      <text
                        x="130"
                        y="363"
                        textAnchor="middle"
                        fill="white"
                        fontSize="17"
                      >
                        Optical Operand B
                      </text>

                      <text
                        x="130"
                        y="383"
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontSize="11"
                      >
                        Encoded optical signal
                      </text>
                    </g>

                    {/* OPTICAL LOGIC */}
                    <g>
                      <rect
                        x="300"
                        y="205"
                        width="190"
                        height="130"
                        rx="20"
                        fill="rgba(15,23,42,0.75)"
                        stroke="#38bdf8"
                        strokeWidth="2"
                      />

                      <text
                        x="395"
                        y="240"
                        textAnchor="middle"
                        fill="#7dd3fc"
                        fontSize="14"
                        fontWeight="600"
                      >
                        OPTICAL LOGIC
                      </text>

                      <text
                        x="395"
                        y="274"
                        textAnchor="middle"
                        fill="white"
                        fontSize="18"
                        fontWeight="600"
                      >
                        Logic Network
                      </text>

                      <text
                        x="395"
                        y="301"
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontSize="12"
                      >
                        AND / OR / XOR / NOT
                      </text>

                      <text
                        x="395"
                        y="322"
                        textAnchor="middle"
                        fill="#64748b"
                        fontSize="11"
                      >
                        Optical signal transformation
                      </text>
                    </g>

                    {/* OPTICAL ADDER */}
                    <g>
                      <rect
                        x="560"
                        y="205"
                        width="190"
                        height="130"
                        rx="20"
                        fill="rgba(15,23,42,0.75)"
                        stroke="#60a5fa"
                        strokeWidth="2"
                      />

                      <text
                        x="655"
                        y="240"
                        textAnchor="middle"
                        fill="#93c5fd"
                        fontSize="14"
                        fontWeight="600"
                      >
                        OPTICAL ADDER
                      </text>

                      <text
                        x="655"
                        y="274"
                        textAnchor="middle"
                        fill="white"
                        fontSize="18"
                        fontWeight="600"
                      >
                        Arithmetic Core
                      </text>

                      <text
                        x="655"
                        y="301"
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontSize="12"
                      >
                        Sum + Carry
                      </text>

                      <text
                        x="655"
                        y="322"
                        textAnchor="middle"
                        fill="#64748b"
                        fontSize="11"
                      >
                        Optical arithmetic stage
                      </text>
                    </g>

                    {/* PHOTONIC ALU */}
                    <g>
                      <rect
                        x="820"
                        y="170"
                        width="220"
                        height="200"
                        rx="24"
                        fill="rgba(30,27,75,0.70)"
                        stroke="url(#aluFlowGradient)"
                        strokeWidth="3"
                      />

                      <text
                        x="930"
                        y="215"
                        textAnchor="middle"
                        fill="#c4b5fd"
                        fontSize="14"
                        fontWeight="600"
                      >
                        PHOTONIC ALU
                      </text>

                      <text
                        x="930"
                        y="255"
                        textAnchor="middle"
                        fill="white"
                        fontSize="24"
                        fontWeight="700"
                      >
                        ALU CORE
                      </text>

                      <text
                        x="930"
                        y="290"
                        textAnchor="middle"
                        fill="#cbd5e1"
                        fontSize="13"
                      >
                        Operation Selection
                      </text>

                      <text
                        x="930"
                        y="313"
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontSize="12"
                      >
                        Logic + Arithmetic
                      </text>

                      <text
                        x="930"
                        y="336"
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontSize="12"
                      >
                        Controlled optical data path
                      </text>
                    </g>

                    {/* OUTPUT */}
                    <g>
                      <rect
                        x="1080"
                        y="225"
                        width="90"
                        height="90"
                        rx="18"
                        fill="rgba(17,24,39,0.85)"
                        stroke="#a78bfa"
                        strokeWidth="2"
                      />

                      <text
                        x="1125"
                        y="258"
                        textAnchor="middle"
                        fill="#c4b5fd"
                        fontSize="12"
                        fontWeight="600"
                      >
                        OUTPUT
                      </text>

                      <text
                        x="1125"
                        y="285"
                        textAnchor="middle"
                        fill="white"
                        fontSize="15"
                      >
                        Result
                      </text>

                      <text
                        x="1125"
                        y="304"
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontSize="10"
                      >
                        Optical
                      </text>
                    </g>

                    {/* CONNECTION A */}
                    <line
                      x1="220"
                      y1="195"
                      x2="300"
                      y2="245"
                      stroke="url(#aluFlowGradient)"
                      strokeWidth="4"
                      markerEnd="url(#aluArrow)"
                    />

                    {/* CONNECTION B */}
                    <line
                      x1="220"
                      y1="345"
                      x2="300"
                      y2="295"
                      stroke="url(#aluFlowGradient)"
                      strokeWidth="4"
                      markerEnd="url(#aluArrow)"
                    />

                    {/* LOGIC → ADDER */}
                    <line
                      x1="490"
                      y1="270"
                      x2="560"
                      y2="270"
                      stroke="url(#aluFlowGradient)"
                      strokeWidth="4"
                      markerEnd="url(#aluArrow)"
                    />

                    {/* ADDER → ALU */}
                    <line
                      x1="750"
                      y1="270"
                      x2="820"
                      y2="270"
                      stroke="url(#aluFlowGradient)"
                      strokeWidth="4"
                      markerEnd="url(#aluArrow)"
                    />

                    {/* ALU → OUTPUT */}
                    <line
                      x1="1040"
                      y1="270"
                      x2="1080"
                      y2="270"
                      stroke="url(#aluFlowGradient)"
                      strokeWidth="4"
                      markerEnd="url(#aluArrow)"
                    />

                    {/* CONTROL */}
                    <g>
                      <rect
                        x="410"
                        y="420"
                        width="380"
                        height="55"
                        rx="14"
                        fill="rgba(15,23,42,0.65)"
                        stroke="#334155"
                        strokeWidth="1.5"
                      />

                      <text
                        x="600"
                        y="443"
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontSize="12"
                        fontWeight="600"
                      >
                        CONTROL / OPERATION SELECT
                      </text>

                      <text
                        x="600"
                        y="462"
                        textAnchor="middle"
                        fill="#64748b"
                        fontSize="11"
                      >
                        Selects the active logical or arithmetic path
                      </text>
                    </g>

                    {/* CONTROL CONNECTION */}
                    <line
                      x1="600"
                      y1="420"
                      x2="600"
                      y2="335"
                      stroke="#64748b"
                      strokeWidth="2"
                      strokeDasharray="7 7"
                    />
                  </svg>
                </div>

                <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <p className="text-sm leading-7 text-muted-foreground">
                    This diagram represents the current conceptual
                    architecture of the Optical ALU research direction.
                    It describes the intended optical data flow and
                    functional organization rather than a claim of
                    fabricated hardware.
                  </p>
                </div>
              </div>
            </Container>
          </section> 

          <section className="py-8">
            <Container>
              <div className="glass rounded-2xl border border-white/5 p-7">

                <h2 className="text-xl font-semibold text-white">
                  {t('projects_alu_blocks_title')}
                </h2>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {t('projects_alu_blocks_text')}
                </p>

                <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                  <div className="rounded-xl border border-cyan-400/10 bg-cyan-500/5 p-5">
                    <h3 className="font-semibold text-cyan-200">
                      Logic Unit
                    </h3>

                    <p className="mt-3 text-sm text-muted-foreground">
                      AND, OR, XOR and NOT operations implemented using
                      photonic logic structures.
                    </p>
                  </div>

                  <div className="rounded-xl border border-cyan-400/10 bg-cyan-500/5 p-5">
                    <h3 className="font-semibold text-cyan-200">
                      Arithmetic Unit
                    </h3>

                    <p className="mt-3 text-sm text-muted-foreground">
                      Half-Adder and Full-Adder based arithmetic operations.
                    </p>
                  </div>

                  <div className="rounded-xl border border-cyan-400/10 bg-cyan-500/5 p-5">
                    <h3 className="font-semibold text-cyan-200">
                      Operation Selector
                    </h3>

                    <p className="mt-3 text-sm text-muted-foreground">
                      Chooses which optical path becomes the active output.
                    </p>
                  </div>

                  <div className="rounded-xl border border-cyan-400/10 bg-cyan-500/5 p-5">
                    <h3 className="font-semibold text-cyan-200">
                      Output Interface
                    </h3>

                    <p className="mt-3 text-sm text-muted-foreground">
                      Produces the final optical result signal.
                    </p>
                  </div>

                </div>
              </div>
            </Container>
          </section>             
          {/* ===================================================
              OPERATIONS
          =================================================== */}

          <section className="py-8">
            <Container>
              <div className="glass rounded-2xl border border-white/5 p-7">
                <div className="flex items-center gap-3">
                  <Cpu className="h-5 w-5 text-cyan-300" />

                  <h2 className="text-xl font-semibold text-white">
                    {t(
                      'projects_alu_operations_title',
                    )}
                  </h2>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {[
                    'projects_alu_operation_1',
                    'projects_alu_operation_2',
                    'projects_alu_operation_3',
                    'projects_alu_operation_4',
                  ].map((key) => (
                    <div
                      key={key}
                      className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4"
                    >
                      <span className="mt-1 text-cyan-400">
                        ▸
                      </span>

                      <span className="text-sm leading-6 text-muted-foreground">
                        {t(key)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </section>

          {/* ===================================================
              SIMULATION
          =================================================== */}

          <section className="py-8">
            <Container>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="glass rounded-2xl border border-white/5 p-7">
                  <h2 className="text-xl font-semibold text-white">
                    {t(
                      'projects_alu_simulation_title',
                    )}
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-muted-foreground">
                    {t(
                      'projects_alu_simulation_text',
                    )}
                  </p>
                </div>

                <div className="glass rounded-2xl border border-white/5 p-7">
                  <h2 className="text-xl font-semibold text-white">
                    {t('projects_alu_scope_title')}
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-muted-foreground">
                    {t(
                      'projects_alu_scope_text',
                    )}
                  </p>
                </div>
              </div>
            </Container>
          </section>
        </>
      )}

      {/* =====================================================
          RESEARCH FOCUS
      ===================================================== */}

      <section className="py-8">
        <Container>
          <div className="glass rounded-2xl border border-white/5 p-7">
            <h2 className="text-lg font-semibold text-white">
              {t('projects_detail_focus')}
            </h2>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <div
                  key={tag}
                  className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/10 bg-cyan-500/5 px-3 py-2 text-sm text-muted-foreground"
                >
                  <span className="text-cyan-400">
                    ▸
                  </span>

                  {tag}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          RESOURCES
      ===================================================== */}

      {relatedDownloads.length > 0 && (
        <section className="py-8 pb-16">
          <Container>
            <div className="glass rounded-2xl border border-cyan-400/10 p-7">
              <div className="flex flex-col gap-5">
                <div>
                  <div className="flex items-center gap-3">
                    <Download className="h-5 w-5 text-cyan-300" />

                    <h2 className="text-xl font-semibold text-white">
                      {t(
                        'projects_alu_resource_title',
                      )}
                    </h2>
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(
                      'projects_alu_resource_description',
                    )}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {relatedDownloads.map((download) => (
                    <a
                      key={download.id}
                      href={download.url}
                      download
                      className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 transition-colors hover:bg-cyan-500/20"
                    >
                      <Download className="h-4 w-4" />

                      {download.title}

                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* =====================================================
          BACK TO PROJECTS
      ===================================================== */}

      <section className="pb-16">
        <Container>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-cyan-300"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('projects_detail_back')}
          </Link>
        </Container>
      </section>
    </div>
  );
}