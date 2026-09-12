'use client';

import React, { useState } from 'react';
import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  Send,
  CheckCircle2,
  Loader2,
  ArrowUpRight,
} from 'lucide-react';

import { SectionHeader, Container, Badge } from '@/components/site/section';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase-client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/lib/i18n-store';

const socials = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com',
    handle: '@photoniclabs',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    handle: 'photonic-labs',
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:contact@photoniclabs.io',
    handle: 'contact@photoniclabs.io',
  },
];

export default function ContactPage() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.message) {
    return;
  }

  if (!supabase) {
    toast({
      title: t('contact_toast_error_title'),
      description: t('contact_toast_error_description'),
      variant: 'destructive',
    });

    return;
  }

  setLoading(true);

  try {
    const { error } = await supabase
      .from('contact_messages')
      .insert({
        name: form.name,
        email: form.email,
        subject:
          form.subject || t('contact_general_inquiry'),
        message: form.message,
      });

    if (error) {
      throw error;
    }

    setDone(true);

    setForm({
      name: '',
      email: '',
      subject: '',
      message: '',
    });

    toast({
      title: t('contact_toast_success_title'),
      description: t(
        'contact_toast_success_description',
      ),
    });
  } catch (err) {
    console.error('Contact form submission error:', err);

    toast({
      title: t('contact_toast_error_title'),
      description: t('contact_toast_error_description'),
      variant: 'destructive',
    });
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
          <Badge>{t('contact_badge')}</Badge>

          <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-white text-glow leading-[1.05]">
            {t('contact_title_before')}{' '}
            <span className="gradient-text">
              {t('contact_title_highlight')}
            </span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {t('contact_description')}
          </p>
        </Container>
      </section>

      <section className="py-8 pb-16">
        <Container>
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Form */}
            <Card className="glass p-8 bg-transparent border-white/5 lg:col-span-3">
              <h2 className="text-xl font-semibold text-white mb-1">
                {t('contact_form_title')}
              </h2>

              <p className="text-sm text-muted-foreground mb-6">
                {t('contact_form_response_time')}
              </p>

              {done ? (
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-8 text-center">
                  <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto mb-3" />

                  <h3 className="text-lg font-semibold text-white">
                    {t('contact_success_title')}
                  </h3>

                  <p className="text-sm text-muted-foreground mt-1">
                    {t('contact_success_description')}
                  </p>

                  <Button
                    variant="outline"
                    className="glass border-white/15 mt-5"
                    onClick={() => setDone(false)}
                  >
                    {t('contact_send_another')}
                  </Button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-cyan-300/80 text-xs uppercase tracking-wider"
                      >
                        {t('contact_name')}
                      </Label>

                      <Input
                        id="name"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            name: e.target.value,
                          }))
                        }
                        placeholder={t('contact_name_placeholder')}
                        className="glass bg-transparent border-white/10"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-cyan-300/80 text-xs uppercase tracking-wider"
                      >
                        {t('contact_email')}
                      </Label>

                      <Input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            email: e.target.value,
                          }))
                        }
                        placeholder={t('contact_email_placeholder')}
                        className="glass bg-transparent border-white/10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="subject"
                      className="text-cyan-300/80 text-xs uppercase tracking-wider"
                    >
                      {t('contact_subject')}
                    </Label>

                    <Input
                      id="subject"
                      value={form.subject}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          subject: e.target.value,
                        }))
                      }
                      placeholder={t('contact_subject_placeholder')}
                      className="glass bg-transparent border-white/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-cyan-300/80 text-xs uppercase tracking-wider"
                    >
                      {t('contact_message')}
                    </Label>

                    <Textarea
                      id="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          message: e.target.value,
                        }))
                      }
                      placeholder={t('contact_message_placeholder')}
                      className="glass bg-transparent border-white/10 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white btn-glow gap-2"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}

                    {loading
                      ? t('contact_sending')
                      : t('contact_send_message')}
                  </Button>
                </form>
              )}
            </Card>

            {/* Direct channels */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="glass p-6 bg-transparent border-white/5">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-cyan-300" />
                  {t('contact_direct_channels')}
                </h3>

                <div className="space-y-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg glass hover:border-cyan-400/30 transition-colors group"
                    >
                      <div className="h-9 w-9 rounded-lg bg-cyan-500/10 border border-cyan-400/20 grid place-items-center">
                        <s.icon className="h-4 w-4 text-cyan-300" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white">
                          {s.label}
                        </div>

                        <div className="text-xs text-muted-foreground truncate">
                          {s.handle}
                        </div>
                      </div>

                      <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-cyan-300 transition-colors" />
                    </a>
                  ))}
                </div>
              </Card>

              <Card className="glass p-6 bg-transparent border-white/5">
                <h3 className="font-semibold text-white mb-2">
                  {t('contact_laboratory_title')}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('contact_laboratory_description')}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="glass rounded-lg p-3">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">
                      {t('contact_response')}
                    </div>

                    <div className="text-sm font-bold text-white">
                      ~48h
                    </div>
                  </div>

                  <div className="glass rounded-lg p-3">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">
                      {t('contact_status')}
                    </div>

                    <div className="text-sm font-bold text-emerald-300 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {t('contact_open')}
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