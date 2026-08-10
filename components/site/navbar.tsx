'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, Cpu, ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/lib/i18n-store';
import { locales, localeNames } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { useSearchOpen } from '@/components/site/search-open';

const nav = [
  { href: '/', key: 'nav_home' as const },
  { href: '/about', key: 'nav_about' as const },
  { href: '/photonic-cpu', key: 'nav_photonic' as const },
  { href: '/research', key: 'nav_research' as const },
  { href: '/algorithms', key: 'nav_algorithms' as const },
  { href: '/projects', key: 'nav_it' as const },
  { href: '/downloads', key: 'nav_downloads' as const },
  { href: '/blog', key: 'nav_blog' as const },
  { href: '/contact', key: 'nav_contact' as const },
];

export function Navbar() {
  const pathname = usePathname();
  const { t, locale, setLocale } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { setOpen: setSearchOpen } = useSearchOpen();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        scrolled ? 'py-2' : 'py-4',
      )}
    >
      <div className="container mx-auto px-4">
        <div
          className={cn(
            'flex items-center justify-between gap-4 rounded-2xl px-4 lg:px-6 h-16 transition-all duration-500',
            scrolled
              ? 'glass-strong border-glow shadow-2xl shadow-cyan-500/10'
              : 'glass',
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative h-9 w-9 grid place-items-center">
              <div className="absolute inset-0 rounded-xl bg-cyan-400/20 blur-md group-hover:blur-lg transition-all" />
              <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400/30 to-blue-500/20 border border-cyan-400/40 grid place-items-center">
                <Cpu className="h-5 w-5 text-cyan-300" />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-mono text-[15px] font-semibold tracking-tight text-white">
                PHOTONIC<span className="text-cyan-300">/</span>LABS
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground mt-0.5">
                Research · Optics · AI
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {nav.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative px-3 py-2 text-[13px] font-medium rounded-lg transition-colors',
                    active ? 'text-cyan-300' : 'text-muted-foreground hover:text-white',
                  )}
                >
                  {t(item.key)}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="hidden sm:grid h-9 w-9 place-items-center rounded-lg glass text-muted-foreground hover:text-cyan-300 transition-colors"
            >
              <Search className="h-4 w-4" />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5 glass hover:text-cyan-300 px-2.5">
                  <Globe className="h-4 w-4" />
                  <span className="text-[11px] font-mono uppercase">{locale}</span>
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 bg-card/95 backdrop-blur-xl border-white/10">
                {locales.map((l) => (
                  <DropdownMenuItem
                    key={l}
                    onClick={() => setLocale(l)}
                    className={cn('cursor-pointer', locale === l && 'text-cyan-300')}
                  >
                    <span className="font-mono text-xs uppercase mr-2 opacity-60">{l}</span>
                    {localeNames[l]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/contact" className="hidden sm:block">
              <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white btn-glow font-medium">
                {t('cta_contact')}
              </Button>
            </Link>

            <button
              className="xl:hidden h-9 w-9 grid place-items-center rounded-lg glass text-muted-foreground"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {open && (
          <div className="xl:hidden mt-2 rounded-2xl glass-strong p-3 animate-fade-up">
            <nav className="grid grid-cols-2 gap-1">
              {nav.map((item) => {
                const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'px-3 py-2.5 text-sm rounded-lg transition-colors',
                      active
                        ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-400/20'
                        : 'text-muted-foreground hover:text-white hover:bg-white/5',
                    )}
                  >
                    {t(item.key)}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
