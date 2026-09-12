'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from 'recharts';

import {
  ArrowRight,
  Cpu,
  Layers,
  GitBranch,
  Activity,
  Clock,
  Database,
  Gauge,
  CheckCircle2,
  Zap,
} from 'lucide-react';

import {
  SectionHeader,
  Container,
  Badge,
} from '@/components/site/section';

import { photonicVersions } from '@/lib/data';
import { useLanguage } from '@/lib/i18n-store';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { PhotonicVisualizer } from '@/components/site/photonic-visualizer';
import { cn } from '@/lib/utils';

/* =========================================================
   STATUS STYLES
========================================================= */

const statusStyle: Record<string, string> = {
  released:
    'bg-emerald-500/10 text-emerald-300 border-emerald-400/20',

  preview:
    'bg-cyan-500/10 text-cyan-300 border-cyan-400/20',

  legacy:
    'bg-white/5 text-muted-foreground border-white/10',
};

/* =========================================================
   PAGE
========================================================= */

export default function PhotonicCPUPage() {
  const { t } = useLanguage();

  const [activeVersion, setActiveVersion] = useState(
    photonicVersions.length - 1,
  );

  const v = photonicVersions[activeVersion];

  /* =========================================================
     ARCHITECTURE LAYERS
  ========================================================= */

  const architectureLayers = [
    {
      title: t('architecture_compiler'),
      desc: t('architecture_compiler_desc'),
      icon: Layers,
      color: 'text-cyan-300',
    },

    {
      title: t('architecture_control'),
      desc: t('architecture_control_desc'),
      icon: Zap,
      color: 'text-sky-300',
    },

    {
      title: t('architecture_cores'),
      desc: t('architecture_cores_desc'),
      icon: Cpu,
      color: 'text-indigo-300',
    },

    {
      title: t('architecture_memory'),
      desc: t('architecture_memory_desc'),
      icon: Database,
      color: 'text-teal-300',
    },
  ];

  /* =========================================================
     ROADMAP
     
     The technical roadmap data remains unchanged.
     Only the visible text is translated.
  ========================================================= */

  const roadmap = [
    {
      phase: 'completed',
      year: '2024',
      title: 'V30 Cascade',
      text: '30-core fabric with photonic memory banks and electro-optic control.',
      done: true,
    },

    {
      phase: 'preview',
      year: '2025',
      title: 'V34 Apex',
      text: '34-core interferometric processor with integrated photonic AI tensor core.',
      done: true,
    },

    {
      phase: 'in_progress',
      year: '2026',
      title: 'V40 Lumos',
      text: 'Hybrid opto-electronic system targeting 1000+ TOPS tensor throughput.',
      done: false,
    },

    {
      phase: 'research',
      year: '2027',
      title: 'Full Optical SoC',
      text: 'Entire SoC datapath optical — control plane remains electronic.',
      done: false,
    },
  ];

  /* =========================================================
     CHART DATA
  ========================================================= */

  const chartData = photonicVersions.map((pv) => ({
    name: pv.version,
    cores: pv.cores,
    clock: pv.clockGHz,
    tmarks: pv.tmarks,
  }));

  /* =========================================================
     RADAR DATA
  ========================================================= */

  const radarData = [
    {
      metric: t('cpu_radar_cores'),
      value: v.cores,
      full: 34,
    },

    {
      metric: t('cpu_radar_clock'),
      value: v.clockGHz,
      full: 12,
    },

    {
      metric: t('cpu_radar_memory'),
      value: v.memoryTB / 0.4,
      full: 6,
    },

    {
      metric: t('cpu_radar_throughput'),
      value: v.tmarks / 10,
      full: 42,
    },
  ];

  return (
    <div className="pt-24">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden py-12">

        <div className="pointer-events-none absolute inset-0 -z-10">

          <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px]" />

          <div className="absolute top-10 right-1/4 w-80 h-80 rounded-full bg-blue-600/10 blur-[100px]" />

          <div className="absolute inset-0 grid-bg opacity-30" />

        </div>

        <Container>

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            <div>

              <Badge>
                {t('cpu_badge')} · {v.version} {v.codename}
              </Badge>

              <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-white text-glow leading-[1.05]">

                {t('cpu_optical_processor')}

                <br />

                <span className="gradient-text">
                  {v.version} · {v.codename}
                </span>

              </h1>

              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">

                {t('cpu_description')}

                {' — '}

                {v.cores} {t('cpu_cores').toLowerCase()},
                {' '}

                {v.clockGHz} GHz {t('cpu_clock').toLowerCase()},
                {' '}

                {v.memoryTB} TB {t('cpu_memory').toLowerCase()}.

              </p>

              {/* =================================================
                  CPU STATS
              ================================================= */}

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">

                {[
                  {
                    label: t('cpu_cores'),
                    value: v.cores,
                    icon: Cpu,
                  },

                  {
                    label: t('cpu_clock'),
                    value: `${v.clockGHz} GHz`,
                    icon: Clock,
                  },

                  {
                    label: t('cpu_memory'),
                    value: `${v.memoryTB} TB`,
                    icon: Database,
                  },

                  {
                    label: t('cpu_throughput'),
                    value: `${v.tmarks} TOp/s`,
                    icon: Gauge,
                  },
                ].map((stat) => {

                  const Icon = stat.icon;

                  return (
                    <div
                      key={stat.label}
                      className="glass rounded-xl p-3.5"
                    >

                      <Icon className="h-4 w-4 text-cyan-300 mb-2" />

                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">
                        {stat.label}
                      </div>

                      <div className="text-lg font-bold text-white">
                        {stat.value}
                      </div>

                    </div>
                  );
                })}

              </div>

              <div className="mt-4 rounded-xl border border-amber-400/10 bg-amber-400/[0.03] px-4 py-3">
                <p className="text-xs leading-relaxed text-amber-200/80">
                  {t('cpu_metrics_disclaimer')}
                </p>
              </div>

            </div>

            {/* ===================================================
                VISUALIZER
            =================================================== */}

            <div className="relative aspect-square max-w-[500px] mx-auto">

              <div className="absolute inset-0 rounded-full bg-gradient-radial from-cyan-500/10 to-transparent blur-3xl" />

              <PhotonicVisualizer className="relative w-full h-full" />

            </div>

          </div>

        </Container>

      </section>


      {/* =====================================================
          VERSION SELECTOR
      ===================================================== */}

      <section className="pb-8">

        <Container>

          <div className="glass-strong rounded-2xl p-2 flex flex-wrap gap-2">

            {photonicVersions.map((pv, index) => (

              <button
                key={pv.version}
                onClick={() => setActiveVersion(index)}
                className={cn(
                  'flex-1 min-w-[120px] rounded-xl px-4 py-3 text-left transition-all',

                  index === activeVersion
                    ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-400/30'
                    : 'hover:bg-white/5 border border-transparent',
                )}
              >

                <div className="flex items-center justify-between">

                  <span className="font-mono text-sm font-semibold text-white">
                    {pv.version}
                  </span>

                  <span
                    className={cn(
                      'inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] uppercase tracking-wider',
                      statusStyle[pv.status],
                    )}
                  >
                    {t(`status_${pv.status}`)}
                  </span>

                </div>

                <div className="text-[11px] text-muted-foreground mt-0.5">
                  {pv.codename} · {pv.year}
                </div>

              </button>

            ))}

          </div>


          {/* =================================================
              ACTIVE VERSION DETAIL
          ================================================= */}

          <Card className="glass mt-4 p-8 bg-transparent border-white/5">

            <div className="grid md:grid-cols-3 gap-6">

              <div className="md:col-span-2">

                <div className="flex items-center gap-3 mb-4">

                  <h2 className="text-2xl font-bold text-white">
                    {v.version} · {v.codename}
                  </h2>

                  <span className="font-mono text-xs text-muted-foreground">
                    {v.year}
                  </span>

                </div>

                <ul className="space-y-2.5">

                  {v.highlights.map((highlight, index) => (

                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >

                      <CheckCircle2 className="h-4 w-4 text-cyan-300 shrink-0 mt-0.5" />

                      {highlight}

                    </li>

                  ))}

                </ul>

              </div>


              {/* =================================================
                  PROFILE
              ================================================= */}

              <div className="rounded-xl glass p-4">

                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono mb-3">
                  {t('cpu_profile')}
                </div>

                <div className="space-y-2 text-sm">

                  <div className="flex justify-between">

                    <span className="text-muted-foreground">
                      {t('cpu_cores')}
                    </span>

                    <span className="font-mono text-cyan-300">
                      {v.cores}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-muted-foreground">
                      {t('cpu_clock')}
                    </span>

                    <span className="font-mono text-cyan-300">
                      {v.clockGHz} GHz
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-muted-foreground">
                      {t('cpu_memory')}
                    </span>

                    <span className="font-mono text-cyan-300">
                      {v.memoryTB} TB
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-muted-foreground">
                      {t('cpu_throughput')}
                    </span>

                    <span className="font-mono text-cyan-300">
                      {v.tmarks} TOp/s
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </Card>

        </Container>

      </section>


      {/* =====================================================
          ARCHITECTURE
      ===================================================== */}

      <section className="py-16">

        <Container>

          <SectionHeader
            eyebrow={t('cpu_architecture')}
            title={
              <>
                {t('cpu_full_optical_stack')}{' '}
                <span className="gradient-text">
                  {t('cpu_optical_stack')}
                </span>
              </>
            }
            description={t('cpu_architecture_description')}
          />


          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">

            {architectureLayers.map((layer, index) => {

              const Icon = layer.icon;

              return (

                <Card
                  key={index}
                  className="glass card-hover p-6 bg-transparent border-white/5 relative overflow-hidden"
                >

                  <div className="absolute top-4 right-4 font-mono text-[10px] text-muted-foreground">
                    L{index + 1}
                  </div>

                  <div className="h-11 w-11 rounded-xl bg-cyan-500/10 border border-cyan-400/20 grid place-items-center mb-4">

                    <Icon
                      className={`h-5 w-5 ${layer.color}`}
                    />

                  </div>

                  <h3 className="font-semibold text-white">
                    {layer.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {layer.desc}
                  </p>

                </Card>

              );
            })}

          </div>


          {/* =================================================
              DATAPATH DIAGRAM
          ================================================= */}

          <Card className="glass mt-6 p-6 bg-transparent border-white/5">

            <div className="flex items-center justify-between mb-4">

              <div>

                <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-cyan-300/80">
                  {t('cpu_figure_1')}
                </div>

                <h3 className="font-semibold text-white mt-1">
                  {t('cpu_datapath')}
                </h3>

              </div>

              <Badge>
                {t('cpu_technical_diagram')}
              </Badge>

            </div>


            {/* -------------------------------------------------
                Current visual representation
            ------------------------------------------------- */}

            <div className="rounded-xl border border-dashed border-cyan-400/20 bg-cyan-500/[0.02] aspect-[16/7] grid place-items-center grid-bg">

              <div className="text-center max-w-2xl px-6">

                <Layers className="h-8 w-8 text-cyan-300/40 mx-auto mb-3" />

                <p className="text-sm text-cyan-300/80 font-medium">
                  {t('cpu_datapath_description')}
                </p>

                <div className="mt-5 flex flex-wrap justify-center items-center gap-2">

                  <span className="glass rounded-lg border border-cyan-400/20 px-3 py-2 text-xs text-cyan-300">
                    {t('cpu_instruction_decoder')}
                  </span>

                  <span className="text-cyan-400">
                    →
                  </span>

                  <span className="glass rounded-lg border border-cyan-400/20 px-3 py-2 text-xs text-cyan-300">
                    {t('cpu_control_fabric')}
                  </span>

                  <span className="text-cyan-400">
                    →
                  </span>

                  <span className="glass rounded-lg border border-cyan-400/20 px-3 py-2 text-xs text-cyan-300">
                    {t('cpu_optical_alu')}
                  </span>

                  <span className="text-cyan-400">
                    →
                  </span>

                  <span className="glass rounded-lg border border-cyan-400/20 px-3 py-2 text-xs text-cyan-300">
                    {t('cpu_registers')}
                  </span>

                  <span className="text-cyan-400">
                    →
                  </span>

                  <span className="glass rounded-lg border border-cyan-400/20 px-3 py-2 text-xs text-cyan-300">
                    {t('cpu_interconnect')}
                  </span>

                  <span className="text-cyan-400">
                    →
                  </span>

                  <span className="glass rounded-lg border border-cyan-400/20 px-3 py-2 text-xs text-cyan-300">
                    {t('cpu_memory_block')}
                  </span>

                </div>

              </div>

            </div>

          </Card>

        </Container>

      </section>


      {/* =====================================================
          PERFORMANCE & SIMULATION
      ===================================================== */}

      <section className="py-16">

        <Container>

          <SectionHeader
            eyebrow={t('cpu_performance')}
            title={t('cpu_scaling')}
            description={t('cpu_scaling_description')}
          />


          <div className="mt-10 grid lg:grid-cols-3 gap-5">

            {/* =================================================
                AREA CHART
            ================================================= */}

            <Card className="glass p-6 bg-transparent border-white/5 lg:col-span-2">

              <div className="flex items-center justify-between mb-4">

                <h3 className="font-semibold text-white flex items-center gap-2">

                  <Activity className="h-4 w-4 text-cyan-300" />

                  {t('cpu_throughput_cores_clock')}

                </h3>

                <Badge>
                  {t('cpu_simulated')}
                </Badge>

              </div>

              <div className="h-72">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <AreaChart data={chartData}>

                    <defs>

                      <linearGradient
                        id="g1"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >

                        <stop
                          offset="0%"
                          stopColor="#67e8f9"
                          stopOpacity={0.6}
                        />

                        <stop
                          offset="100%"
                          stopColor="#67e8f9"
                          stopOpacity={0}
                        />

                      </linearGradient>

                    </defs>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.05)"
                    />

                    <XAxis
                      dataKey="name"
                      stroke="rgba(255,255,255,0.4)"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />

                    <YAxis
                      stroke="rgba(255,255,255,0.4)"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />

                    <Tooltip
                      contentStyle={{
                        background: 'rgba(4,6,13,0.95)',
                        border: '1px solid rgba(34,211,238,0.2)',
                        borderRadius: 12,
                      }}
                      labelStyle={{
                        color: '#67e8f9',
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="tmarks"
                      stroke="#67e8f9"
                      strokeWidth={2}
                      fill="url(#g1)"
                      name={t('cpu_throughput')}
                    />

                  </AreaChart>

                </ResponsiveContainer>

              </div>

            </Card>


            {/* =================================================
                RADAR
            ================================================= */}

            <Card className="glass p-6 bg-transparent border-white/5">

              <h3 className="font-semibold text-white mb-4">
                {v.version} {t('cpu_profile')}
              </h3>

              <div className="h-72">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <RadarChart
                    data={radarData}
                    outerRadius="70%"
                  >

                    <PolarGrid
                      stroke="rgba(255,255,255,0.1)"
                    />

                    <PolarAngleAxis
                      dataKey="metric"
                      stroke="rgba(255,255,255,0.5)"
                      fontSize={10}
                    />

                    <Radar
                      dataKey="value"
                      stroke="#67e8f9"
                      fill="#67e8f9"
                      fillOpacity={0.3}
                    />

                    <Tooltip
                      contentStyle={{
                        background: 'rgba(4,6,13,0.95)',
                        border: '1px solid rgba(34,211,238,0.2)',
                        borderRadius: 12,
                      }}
                    />

                  </RadarChart>

                </ResponsiveContainer>

              </div>

            </Card>

          </div>


          {/* =================================================
              VERSION SCALING
          ================================================= */}

          <Card className="glass mt-5 p-6 bg-transparent border-white/5">

            <div className="flex items-center justify-between mb-4">

              <h3 className="font-semibold text-white flex items-center gap-2">

                <GitBranch className="h-4 w-4 text-cyan-300" />

                {t('cpu_version_scaling')}

                <span className="text-muted-foreground">
                  ({t('cpu_version_scaling_sub')})
                </span>

              </h3>

            </div>

            <div className="h-56">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <LineChart data={chartData}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                  />

                  <XAxis
                    dataKey="name"
                    stroke="rgba(255,255,255,0.4)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />

                  <YAxis
                    stroke="rgba(255,255,255,0.4)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />

                  <Tooltip
                    contentStyle={{
                      background: 'rgba(4,6,13,0.95)',
                      border: '1px solid rgba(34,211,238,0.2)',
                      borderRadius: 12,
                    }}
                    labelStyle={{
                      color: '#67e8f9',
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="cores"
                    stroke="#818cf8"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name={t('cpu_cores')}
                  />

                  <Line
                    type="monotone"
                    dataKey="clock"
                    stroke="#38bdf8"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name={t('cpu_clock')}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </Card>

        </Container>

      </section>


      {/* =====================================================
          VERSION HISTORY
      ===================================================== */}

      <section className="py-16">

        <Container>

          <SectionHeader
            eyebrow={t('cpu_version_history')}
            title={t('cpu_from_v1_v34')}
            description={t('cpu_version_history_description')}
          />

          <div className="mt-12 relative">

            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/30 via-blue-400/20 to-transparent" />

            <div className="space-y-6">

              {photonicVersions
                .slice()
                .reverse()
                .map((pv, index) => (

                  <div
                    key={pv.version}
                    className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8"
                  >

                    <div className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 h-3 w-3 rounded-full bg-cyan-400 border-2 border-[#04060d] shadow-[0_0_12px_rgba(34,211,238,0.6)]" />

                    {index % 2 === 0 ? (

                      <Card className="glass card-hover p-5 bg-transparent border-white/5 md:col-start-1">

                        <VersionCard
                          pv={pv}
                          t={t}
                        />

                      </Card>

                    ) : (

                      <Card className="glass card-hover p-5 bg-transparent border-white/5 md:col-start-2">

                        <VersionCard
                          pv={pv}
                          t={t}
                        />

                      </Card>

                    )}

                  </div>

                ))}

            </div>

          </div>

        </Container>

      </section>


      {/* =====================================================
          ROADMAP
      ===================================================== */}

      <section className="py-16">

        <Container>

          <SectionHeader
            eyebrow={t('cpu_roadmap')}
            title={t('cpu_after_v34')}
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">

            {roadmap.map((item, index) => (

              <Card
                key={index}
                className="glass card-hover p-6 bg-transparent border-white/5 relative"
              >

                <div className="flex items-center justify-between mb-4">

                  <span
                    className={cn(
                      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] uppercase tracking-wider',

                      item.done
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-400/20'
                        : 'bg-cyan-500/10 text-cyan-300 border-cyan-400/20',
                    )}
                  >
                    {t(`roadmap_${item.phase}`)}
                  </span>

                  <span className="font-mono text-[10px] text-muted-foreground">
                    {item.year}
                  </span>

                </div>

                <h3 className="font-semibold text-white">
                  {item.title}
                </h3>

                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {t(`roadmap_item_${item.phase}`)}
                </p>

              </Card>

            ))}

          </div>

        </Container>

      </section>


      {/* =====================================================
          RESEARCH CTA
      ===================================================== */}

      <section className="pb-16">

        <Container>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 glass-strong rounded-3xl p-8 border border-cyan-400/20">

            <div>

              <h3 className="text-2xl font-bold text-white">
                {t('cpu_architecture_paper')}
              </h3>

              <p className="text-muted-foreground mt-2">
                {t('cpu_architecture_paper_description')}
              </p>

            </div>

            <Link href="/research">

              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white btn-glow gap-2"
              >

                {t('cpu_view_research')}

                <ArrowRight className="h-4 w-4" />

              </Button>

            </Link>

          </div>

        </Container>

      </section>

    </div>
  );
}


/* =========================================================
   VERSION CARD
========================================================= */

function VersionCard({
  pv,
  t,
}: {
  pv: (typeof photonicVersions)[number];
  t: (key: string) => string;
}) {
  return (
    <div>

      <div className="flex items-center justify-between">

        <h4 className="font-bold text-white text-lg">

          {pv.version}

          <span className="text-cyan-300 font-mono">
            {' · '}
          </span>

          <span className="text-cyan-300">
            {pv.codename}
          </span>

        </h4>

        <span className="font-mono text-[11px] text-muted-foreground">
          {pv.year}
        </span>

      </div>


      {/* =====================================================
          VERSION METRICS
      ===================================================== */}

      <div className="mt-3 grid grid-cols-4 gap-2 text-center">

        <div className="glass rounded-lg p-2">

          <div className="text-[9px] uppercase text-muted-foreground font-mono">
            {t('cpu_cores')}
          </div>

          <div className="text-sm font-bold text-white">
            {pv.cores}
          </div>

        </div>


        <div className="glass rounded-lg p-2">

          <div className="text-[9px] uppercase text-muted-foreground font-mono">
            {t('cpu_ghz_short')}
          </div>

          <div className="text-sm font-bold text-white">
            {pv.clockGHz}
          </div>

        </div>


        <div className="glass rounded-lg p-2">

          <div className="text-[9px] uppercase text-muted-foreground font-mono">
            TB
          </div>

          <div className="text-sm font-bold text-white">
            {pv.memoryTB}
          </div>

        </div>


        <div className="glass rounded-lg p-2">

          <div className="text-[9px] uppercase text-muted-foreground font-mono">
            TOp/s
          </div>

          <div className="text-sm font-bold text-white">
            {pv.tmarks}
          </div>

        </div>

      </div>


      {/* =====================================================
          HIGHLIGHTS
      ===================================================== */}

      <ul className="mt-3 space-y-1.5">

        {pv.highlights.map((highlight, index) => (

          <li
            key={index}
            className="flex items-start gap-2 text-xs text-muted-foreground"
          >

            <span className="text-cyan-400 mt-1">
              ▸
            </span>

            {highlight}

          </li>

        ))}

      </ul>

    </div>
  );
}