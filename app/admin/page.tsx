'use client';
import React, { useEffect, useState } from 'react';
import { LayoutDashboard, Mail, Inbox, BarChart3, Activity, Cpu, Brain, ShieldCheck, Server, Search, Lock, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Container, Badge } from '@/components/site/section';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase-client';

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

const stats = [
  { label: 'Total Messages', value: '—', icon: Inbox, color: 'text-cyan-300' },
  { label: 'Active Projects', value: '8', icon: Cpu, color: 'text-sky-300' },
  { label: 'Publications', value: '6', icon: BarChart3, color: 'text-indigo-300' },
  { label: 'System Status', value: 'Online', icon: Activity, color: 'text-emerald-300' },
];

const trafficData = [
  { name: 'Mon', visits: 240 },
  { name: 'Tue', visits: 320 },
  { name: 'Wed', visits: 280 },
  { name: 'Thu', visits: 410 },
  { name: 'Fri', visits: 380 },
  { name: 'Sat', visits: 220 },
  { name: 'Sun', visits: 180 },
];

export default function AdminPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!supabase) { setLoading(false); return; }
      const { data } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      setMessages((data as Message[]) ?? []);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.subject.toLowerCase().includes(query.toLowerCase()) ||
      m.message.toLowerCase().includes(query.toLowerCase()),
  );

  stats[0].value = String(messages.length);

  return (
    <div className="pt-24">
      <section className="relative overflow-hidden py-8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/4 w-80 h-80 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="absolute inset-0 grid-bg opacity-30" />
        </div>
        <Container>
          <div className="flex items-center gap-2 mb-4">
            <Badge><Lock className="h-3 w-3 mr-1" /> Admin · Placeholder</Badge>
            <Badge className="border-amber-400/20 text-amber-300 bg-amber-500/10">Read-Only Demo</Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white text-glow leading-[1.05] flex items-center gap-3">
            <LayoutDashboard className="h-9 w-9 text-cyan-300" />
            Admin Dashboard
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            A placeholder control surface for laboratory operations — message inbox, project counters, and
            system telemetry. Authentication is intentionally omitted in this build.
          </p>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-6">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map((s) => (
              <Card key={s.label} className="glass p-5 bg-transparent border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-9 w-9 rounded-lg bg-cyan-500/10 border border-cyan-400/20 grid place-items-center">
                    <s.icon className={`h-4 w-4 ${s.color}`} />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground/40" />
                </div>
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-mono mt-1">{s.label}</div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Grid: chart + domain overview */}
      <section className="py-6">
        <Container>
          <div className="grid lg:grid-cols-3 gap-5">
            <Card className="glass p-6 bg-transparent border-white/5 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Activity className="h-4 w-4 text-cyan-300" /> Weekly Traffic (simulated)
                </h3>
                <Badge>Last 7 days</Badge>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trafficData}>
                    <defs>
                      <linearGradient id="adminG" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#67e8f9" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#67e8f9" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: 'rgba(4,6,13,0.95)', border: '1px solid rgba(34,211,238,0.2)', borderRadius: 12 }} labelStyle={{ color: '#67e8f9' }} />
                    <Area type="monotone" dataKey="visits" stroke="#67e8f9" strokeWidth={2} fill="url(#adminG)" name="Visits" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="glass p-6 bg-transparent border-white/5">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Cpu className="h-4 w-4 text-cyan-300" /> Domain Distribution
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Cpu, label: 'Photonic', count: 4, pct: 50 },
                  { icon: Brain, label: 'AI', count: 1, pct: 12 },
                  { icon: ShieldCheck, label: 'Security', count: 1, pct: 12 },
                  { icon: Server, label: 'IT', count: 2, pct: 26 },
                ].map((d) => (
                  <div key={d.label}>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                        <d.icon className="h-3.5 w-3.5 text-cyan-300" /> {d.label}
                      </span>
                      <span className="font-mono text-cyan-300">{d.count}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" style={{ width: `${d.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Inbox */}
      <section className="py-6 pb-16">
        <Container>
          <Card className="glass p-6 bg-transparent border-white/5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Mail className="h-4 w-4 text-cyan-300" /> Contact Inbox
              </h3>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-9 glass bg-transparent border-white/10"
                />
              </div>
            </div>

            {loading ? (
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-16 rounded-lg bg-white/5 animate-pulse" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/10 p-12 text-center text-sm text-muted-foreground">
                {messages.length === 0 ? 'No messages yet. Submit the contact form to populate this inbox.' : 'No messages match your search.'}
              </div>
            ) : (
              <div className="space-y-2">
                {filtered.map((m) => (
                  <div key={m.id} className="rounded-lg glass p-4 hover:border-cyan-400/30 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-white text-sm">{m.name}</span>
                          <span className="text-[11px] text-muted-foreground font-mono">{m.email}</span>
                          <Badge>{m.subject}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">{m.message}</p>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground/60 shrink-0">
                        {new Date(m.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </Container>
      </section>
    </div>
  );
}
