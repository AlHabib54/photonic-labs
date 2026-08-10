'use client';
import Link from 'next/link';
import { Cpu, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n-store';

const footerLinks = [
  {
    title: 'Laboratory',
    links: [
      { href: '/about', label: 'About' },
      { href: '/photonic-cpu', label: 'Photonic CPU' },
      { href: '/research', label: 'Research' },
      { href: '/blog', label: 'Blog' },
    ],
  },
  {
    title: 'Engineering',
    links: [
      { href: '/algorithms', label: 'Algorithms' },
      { href: '/projects', label: 'IT Projects' },
      { href: '/downloads', label: 'Downloads' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/admin', label: 'Admin Dashboard' },
      { href: '/research', label: 'Publications' },
      { href: '/blog', label: 'Technical Articles' },
      { href: '/contact', label: 'Collaboration' },
    ],
  },
];

const socials = [
  { href: 'https://github.com', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:contact@photoniclabs.io', icon: Mail, label: 'Email' },
];

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative mt-24 border-t border-white/5">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400/30 to-blue-500/20 border border-cyan-400/40 grid place-items-center">
                <Cpu className="h-5 w-5 text-cyan-300" />
              </div>
              <div className="leading-none">
                <span className="font-mono text-base font-semibold text-white">
                  PHOTONIC<span className="text-cyan-300">/</span>LABS
                </span>
                <div className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground mt-1">
                  Research · Optics · AI
                </div>
              </div>
            </Link>
            <p className="mt-5 text-sm text-muted-foreground max-w-sm leading-relaxed">
              {t('footer_tagline')}
            </p>
            <div className="flex items-center gap-2 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="h-9 w-9 grid place-items-center rounded-lg glass text-muted-foreground hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs uppercase tracking-[0.2em] text-cyan-300/80 font-semibold mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-white transition-colors"
                    >
                      {l.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Photonic Labs. {t('footer_rights')}
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            Built with photons · Next.js · Supabase
          </p>
        </div>
      </div>
    </footer>
  );
}
