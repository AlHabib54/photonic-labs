'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Area, AreaChart, RadarChart, PolarGrid, PolarAngleAxis, Radar,
} from 'recharts';
import {
  ArrowRight, Cpu, Layers, GitBranch, Activity, Clock, Database, Gauge, CheckCircle2, Zap,
} from 'lucide-react';
import { SectionHeader, Container, Badge } from '@/components/site/section';
import { photonicVersions } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PhotonicVisualizer } from '@/components/site/photonic-visualizer';
import { cn } from '@/lib/utils';

const architectureLayers = [
  { title: 'Compiler & API Layer', desc: 'Standard tensor/MATMUL APIs compiled to optical instruction streams.', icon: Layers, color: 'text-cyan-300' },
  { title: 'Electro-Optic Control Fabric', desc: 'Phase modulators, detectors, and routing in the control plane.', icon: Zap, color: 'text-sky-300' },
  { title: 'Photonic Tensor Cores', desc: 'Interferometric networks executing GEMM in constant optical depth.', icon: Cpu, color: 'text-indigo-300' },
  { title: 'On-Die Optical Memory', desc: 'Photonic memory banks with optical read/write across cores.', icon: Database, color: 'text-teal-300' },
];

const roadmap = [
  { phase: 'Completed', year: '2024', title: 'V30 Cascade', text: '30-core fabric with photonic memory banks and electro-optic control.', done: true },
  { phase: 'Preview', year: '2025', title: 'V34 Apex', text: '34-core interferometric processor with integrated photonic AI tensor core.', done: true },
  { phase: 'In Progress', year: '2026', title: 'V40 Lumos', text: 'Hybrid opto-electronic system targeting 1000+ TOPS tensor throughput.', done: false },
  { phase: 'Research', year: '2027', title: 'Full Optical SoC', text: 'Entire SoC datapath optical — control plane remains electronic.', done: false },
];

const statusStyle: Record<string, string> = {
  released: 'bg-emerald-500/10 text-emerald-300 border-emerald-400/20',
  preview: 'bg-cyan-500/10 text-cyan-300 border-cyan-400/20',
  legacy: 'bg-white/5 text-muted-foreground border-white/10',
};

export default function PhotonicCPUPage() {
  const [activeVersion, setActiveVersion] = useState(photonicVersions.length - 1);
  const v = photonicVersions[activeVersion];

  const chartData = photonicVersions.map((pv) => ({ name: pv.version, cores: pv.cores, clock: pv.clockGHz, tmarks: pv.tmarks }));
  const radarData = [
    { metric: 'Cores', value: v.cores, full: 34 },
    { metric: 'Clock GHz', value: v.clockGHz, full: 12 },
    { metric: 'Memory (×0.4TB)', value: v.memoryTB / 0.4, full: 6 },
    { metric: 'Throughput', value: v.tmarks / 10, full: 42 },
  ];

  return (
    <div className="pt-24">
      {/* HERO */}
      <section className="relative overflow-hidden py-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="absolute top-10 right-1/4 w-80 h-80 rounded-full bg-blue-600/10 blur-[100px]" />
          <div className="absolute inset-0 grid-bg opacity-30" />
        </div>
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <Badge>Photonic CPU · {v.version} {v.codename}</Badge>
              <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-white text-glow leading-[1.05]">
                Optical processor<br /><span className="gradient-text">{v.version} · {v.codename}</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
                A general-purpose photonic processor where computation happens as interference rather than as
                transistor switching — {v.cores} cores, {v.clockGHz} GHz optical fabric, {v.memoryTB} TB on-die
                photonic memory.
              </p>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Cores', value: v.cores, icon: Cpu },
                  { label: 'Clock', value: `${v.clockGHz} GHz`, icon: Clock },
                  { label: 'Memory', value: `${v.memoryTB} TB`, icon: Database },
                  { label: 'Throughput', value: `${v.tmarks} TOp/s`, icon: Gauge },
                ].map((s) => (
                  <div key={s.label} className="glass rounded-xl p-3.5">
                    <s.icon className="h-4 w-4 text-cyan-300 mb-2" />
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">{s.label}</div>
                    <div className="text-lg font-bold text-white">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square max-w-[500px] mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-radial from-cyan-500/10 to-transparent blur-3xl" />
              <PhotonicVisualizer className="relative w-full h-full" />
            </div>
          </div>
        </Container>
      </section>

      {/* VERSION SELECTOR */}
      <section className="pb-8">
        <Container>
          <div className="glass-strong rounded-2xl p-2 flex flex-wrap gap-2">
            {photonicVersions.map((pv, i) => (
              <button
                key={pv.version}
                onClick={() => setActiveVersion(i)}
                className={cn(
                  'flex-1 min-w-[120px] rounded-xl px-4 py-3 text-left transition-all',
                  i === activeVersion
                    ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-400/30'
                    : 'hover:bg-white/5 border border-transparent',
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold text-white">{pv.version}</span>
                  <span className={cn('inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] uppercase tracking-wider', statusStyle[pv.status])}>
                    {pv.status}
                  </span>
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{pv.codename} · {pv.year}</div>
              </button>
            ))}
          </div>

          {/* Active version detail */}
          <Card className="glass mt-4 p-8 bg-transparent border-white/5">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-2xl font-bold text-white">{v.version} · {v.codename}</h2>
                  <span className="font-mono text-xs text-muted-foreground">{v.year}</span>
                </div>
                <ul className="space-y-2.5">
                  {v.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-cyan-300 shrink-0 mt-0.5" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl glass p-4">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono mb-3">Profile</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Cores</span><span className="font-mono text-cyan-300">{v.cores}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Clock</span><span className="font-mono text-cyan-300">{v.clockGHz} GHz</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Memory</span><span className="font-mono text-cyan-300">{v.memoryTB} TB</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Throughput</span><span className="font-mono text-cyan-300">{v.tmarks} TOp/s</span></div>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* ARCHITECTURE */}
      <section className="py-16">
        <Container>
          <SectionHeader
            eyebrow="Architecture Overview"
            title={<>The full <span className="gradient-text">optical stack</span></>}
            description="From the compiler down to the photonic memory banks — a layered architecture built for optical acceleration."
          />
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {architectureLayers.map((l, i) => (
              <Card key={i} className="glass card-hover p-6 bg-transparent border-white/5 relative overflow-hidden">
                <div className="absolute top-4 right-4 font-mono text-[10px] text-muted-foreground">L{i + 1}</div>
                <div className="h-11 w-11 rounded-xl bg-cyan-500/10 border border-cyan-400/20 grid place-items-center mb-4">
                  <l.icon className={`h-5 w-5 ${l.color}`} />
                </div>
                <h3 className="font-semibold text-white">{l.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{l.desc}</p>
              </Card>
            ))}
          </div>

          {/* Technical diagram placeholder */}
          <Card className="glass mt-6 p-6 bg-transparent border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-cyan-300/80">Figure 1</div>
                <h3 className="font-semibold text-white mt-1">V34 Datapath Block Diagram</h3>
              </div>
              <Badge>Technical Diagram</Badge>
            </div>
            <div className="rounded-xl border border-dashed border-cyan-400/20 bg-cyan-500/[0.02] aspect-[16/7] grid place-items-center grid-bg">
              <div className="text-center">
                <Layers className="h-8 w-8 text-cyan-300/40 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Datapath schematic placeholder</p>
                <p className="text-[11px] text-muted-foreground/60 mt-1">
                  API → Control Fabric → Tensor Cores → Optical Memory
                </p>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* PERFORMANCE & SIMULATION */}
      <section className="py-16">
        <Container>
          <SectionHeader
            eyebrow="Performance & Simulation"
            title="Scaling across generations"
            description="Core count, optical clock, and tensor throughput from V1 to V34, with the active version profiled below."
          />
          <div className="mt-10 grid lg:grid-cols-3 gap-5">
            <Card className="glass p-6 bg-transparent border-white/5 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white flex items-center gap-2"><Activity className="h-4 w-4 text-cyan-300" /> Throughput vs Cores vs Clock</h3>
                <Badge>Simulated</Badge>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#67e8f9" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="#67e8f9" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: 'rgba(4,6,13,0.95)', border: '1px solid rgba(34,211,238,0.2)', borderRadius: 12 }} labelStyle={{ color: '#67e8f9' }} />
                    <Area type="monotone" dataKey="tmarks" stroke="#67e8f9" strokeWidth={2} fill="url(#g1)" name="Throughput (TOp/s)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card className="glass p-6 bg-transparent border-white/5">
              <h3 className="font-semibold text-white mb-4">{v.version} Profile</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} outerRadius="70%">
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="metric" stroke="rgba(255,255,255,0.5)" fontSize={10} />
                    <Radar dataKey="value" stroke="#67e8f9" fill="#67e8f9" fillOpacity={0.3} />
                    <Tooltip contentStyle={{ background: 'rgba(4,6,13,0.95)', border: '1px solid rgba(34,211,238,0.2)', borderRadius: 12 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <Card className="glass mt-5 p-6 bg-transparent border-white/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white flex items-center gap-2"><GitBranch className="h-4 w-4 text-cyan-300" /> Version scaling (Cores & Clock)</h3>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: 'rgba(4,6,13,0.95)', border: '1px solid rgba(34,211,238,0.2)', borderRadius: 12 }} labelStyle={{ color: '#67e8f9' }} />
                  <Line type="monotone" dataKey="cores" stroke="#818cf8" strokeWidth={2} dot={{ r: 4 }} name="Cores" />
                  <Line type="monotone" dataKey="clock" stroke="#38bdf8" strokeWidth={2} dot={{ r: 4 }} name="Clock GHz" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Container>
      </section>

      {/* VERSION HISTORY TIMELINE */}
      <section className="py-16">
        <Container>
          <SectionHeader eyebrow="Version History" title="From V1 to V34" description="Five years of optical processor iterations." />
          <div className="mt-12 relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/30 via-blue-400/20 to-transparent" />
            <div className="space-y-6">
              {photonicVersions.slice().reverse().map((pv, i) => (
                <div key={pv.version} className={cn('relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8')}>
                  <div className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 h-3 w-3 rounded-full bg-cyan-400 border-2 border-[#04060d] shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
                  {i % 2 === 0 ? (
                    <Card className="glass card-hover p-5 bg-transparent border-white/5 md:col-start-1">
                      <VersionCard pv={pv} />
                    </Card>
                  ) : (
                    <Card className="glass card-hover p-5 bg-transparent border-white/5 md:col-start-2">
                      <VersionCard pv={pv} />
                    </Card>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ROADMAP */}
      <section className="py-16">
        <Container>
          <SectionHeader eyebrow="Development Roadmap" title="What comes after V34" />
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {roadmap.map((r, i) => (
              <Card key={i} className="glass card-hover p-6 bg-transparent border-white/5 relative">
                <div className="flex items-center justify-between mb-4">
                  <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] uppercase tracking-wider',
                    r.done ? 'bg-emerald-500/10 text-emerald-300 border-emerald-400/20' : 'bg-cyan-500/10 text-cyan-300 border-cyan-400/20')}>
                    {r.phase}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">{r.year}</span>
                </div>
                <h3 className="font-semibold text-white">{r.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{r.text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 glass-strong rounded-3xl p-8 border border-cyan-400/20">
            <div>
              <h3 className="text-2xl font-bold text-white">Read the architecture paper</h3>
              <p className="text-muted-foreground mt-2">Full technical breakdown of the V34 photonic processor.</p>
            </div>
            <Link href="/research">
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white btn-glow gap-2">
                View Research <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}

function VersionCard({ pv }: { pv: typeof photonicVersions[number] }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-white text-lg">{pv.version} <span className="text-cyan-300 font-mono">·</span> <span className="text-cyan-300">{pv.codename}</span></h4>
        <span className="font-mono text-[11px] text-muted-foreground">{pv.year}</span>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2 text-center">
        <div className="glass rounded-lg p-2">
          <div className="text-[9px] uppercase text-muted-foreground font-mono">Cores</div>
          <div className="text-sm font-bold text-white">{pv.cores}</div>
        </div>
        <div className="glass rounded-lg p-2">
          <div className="text-[9px] uppercase text-muted-foreground font-mono">GHz</div>
          <div className="text-sm font-bold text-white">{pv.clockGHz}</div>
        </div>
        <div className="glass rounded-lg p-2">
          <div className="text-[9px] uppercase text-muted-foreground font-mono">TB</div>
          <div className="text-sm font-bold text-white">{pv.memoryTB}</div>
        </div>
        <div className="glass rounded-lg p-2">
          <div className="text-[9px] uppercase text-muted-foreground font-mono">TOp/s</div>
          <div className="text-sm font-bold text-white">{pv.tmarks}</div>
        </div>
      </div>
      <ul className="mt-3 space-y-1.5">
        {pv.highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
            <span className="text-cyan-400 mt-1">▸</span> {h}
          </li>
        ))}
      </ul>
    </div>
  );
}
