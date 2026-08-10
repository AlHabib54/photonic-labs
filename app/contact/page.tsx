'use client';
import React, { useState } from 'react';
import { Mail, Github, Linkedin, MapPin, Send, CheckCircle2, Loader2, ArrowUpRight } from 'lucide-react';
import { SectionHeader, Container, Badge } from '@/components/site/section';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase-client';
import { useToast } from '@/hooks/use-toast';

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com', handle: '@photoniclabs' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com', handle: 'photonic-labs' },
  { icon: Mail, label: 'Email', href: 'mailto:contact@photoniclabs.io', handle: 'contact@photoniclabs.io' },
];

export default function ContactPage() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    try {
      const { error } = supabase
        ? await supabase.from('contact_messages').insert({
            name: form.name,
            email: form.email,
            subject: form.subject || 'General Inquiry',
            message: form.message,
          })
        : { error: null };
      if (error) throw error;
      setDone(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      toast({ title: 'Message sent', description: 'We will get back to you shortly.' });
    } catch (err) {
      toast({ title: 'Something went wrong', description: 'Please try again later.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24">
      <section className="relative overflow-hidden py-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="absolute inset-0 grid-bg opacity-30" />
        </div>
        <Container>
          <Badge>Contact</Badge>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-white text-glow leading-[1.05]">
            Let's build the <span className="gradient-text">optical future</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Research collaboration, technical partnerships, or general inquiries — reach out through the form
            below or via our direct channels.
          </p>
        </Container>
      </section>

      <section className="py-8 pb-16">
        <Container>
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Form */}
            <Card className="glass p-8 bg-transparent border-white/5 lg:col-span-3">
              <h2 className="text-xl font-semibold text-white mb-1">Send us a message</h2>
              <p className="text-sm text-muted-foreground mb-6">We typically respond within 48 hours.</p>

              {done ? (
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-8 text-center">
                  <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white">Message received</h3>
                  <p className="text-sm text-muted-foreground mt-1">Thank you for reaching out. We'll be in touch soon.</p>
                  <Button variant="outline" className="glass border-white/15 mt-5" onClick={() => setDone(false)}>
                    Send another
                  </Button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-cyan-300/80 text-xs uppercase tracking-wider">Name</Label>
                      <Input
                        id="name" required value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Your full name"
                        className="glass bg-transparent border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-cyan-300/80 text-xs uppercase tracking-wider">Email</Label>
                      <Input
                        id="email" type="email" required value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        placeholder="you@example.com"
                        className="glass bg-transparent border-white/10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-cyan-300/80 text-xs uppercase tracking-wider">Subject</Label>
                    <Input
                      id="subject" value={form.subject}
                      onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                      placeholder="What is this about?"
                      className="glass bg-transparent border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-cyan-300/80 text-xs uppercase tracking-wider">Message</Label>
                    <Textarea
                      id="message" required rows={6} value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Tell us about your project, question, or collaboration idea…"
                      className="glass bg-transparent border-white/10 resize-none"
                    />
                  </div>
                  <Button
                    type="submit" disabled={loading}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white btn-glow gap-2"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    {loading ? 'Sending…' : 'Send Message'}
                  </Button>
                </form>
              )}
            </Card>

            {/* Direct channels */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="glass p-6 bg-transparent border-white/5">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-cyan-300" /> Direct Channels
                </h3>
                <div className="space-y-3">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg glass hover:border-cyan-400/30 transition-colors group">
                      <div className="h-9 w-9 rounded-lg bg-cyan-500/10 border border-cyan-400/20 grid place-items-center">
                        <s.icon className="h-4 w-4 text-cyan-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white">{s.label}</div>
                        <div className="text-xs text-muted-foreground truncate">{s.handle}</div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-cyan-300 transition-colors" />
                    </a>
                  ))}
                </div>
              </Card>

              <Card className="glass p-6 bg-transparent border-white/5">
                <h3 className="font-semibold text-white mb-2">Laboratory</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Photonic Labs is an independent research laboratory. We do not maintain a public office;
                  all collaboration is conducted remotely with partner institutions.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="glass rounded-lg p-3">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">Response</div>
                    <div className="text-sm font-bold text-white">~48h</div>
                  </div>
                  <div className="glass rounded-lg p-3">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">Status</div>
                    <div className="text-sm font-bold text-emerald-300 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Open
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
