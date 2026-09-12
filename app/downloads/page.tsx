'use client';

import React, { useMemo, useState } from 'react';

import {
  FileText,
  Code,
  BookOpen,
  Database,
  Download,
  Search,
  File,
  Filter,
  Archive,
} from 'lucide-react';

import {
  SectionHeader,
  Container,
  Badge,
} from '@/components/site/section';

import {
  downloads,
  type DownloadItem,
  type DomainKey,
} from '@/lib/data';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n-store';

/* =========================================================
   FILE TYPE ICONS
========================================================= */

const typeIcon: Record<
  DownloadItem['type'],
  React.ElementType
> = {
  PDF: FileText,
  Source: Code,
  Docs: BookOpen,
  Dataset: Database,
  ZIP: Archive,
};

/* =========================================================
   DOMAIN FILTERS
========================================================= */

const filterConfig: {
  key: DomainKey | 'all';
  labelKey: string;
}[] = [
  {
    key: 'all',
    labelKey: 'downloads_filter_all',
  },
  {
    key: 'photonic',
    labelKey: 'downloads_filter_photonic',
  },
  {
    key: 'security',
    labelKey: 'downloads_filter_security',
  },
  {
    key: 'math',
    labelKey: 'downloads_filter_math',
  },
];

/* =========================================================
   FILE TYPE FILTERS
========================================================= */

const typeFilters = [
  'all',
  'PDF',
  'Source',
  'Docs',
  'Dataset',
  'ZIP',
] as const;

type TypeFilter = (typeof typeFilters)[number];

/* =========================================================
   PAGE
========================================================= */

export default function DownloadsPage() {
  const { t } = useLanguage();

  const [filter, setFilter] =
    useState<DomainKey | 'all'>('all');

  const [query, setQuery] = useState('');

  const [typeFilter, setTypeFilter] =
    useState<TypeFilter>('all');

  /* =========================================================
     FILTER DOWNLOADS
  ========================================================= */

  const filtered = useMemo(() => {
    const normalizedQuery =
      query.trim().toLowerCase();

    return downloads.filter((download) => {
      const matchDomain =
        filter === 'all' ||
        download.category === filter;

      const matchType =
        typeFilter === 'all' ||
        download.type === typeFilter;

      const matchQuery =
        !normalizedQuery ||
        download.title
          .toLowerCase()
          .includes(normalizedQuery) ||
        download.description
          .toLowerCase()
          .includes(normalizedQuery);

      return (
        matchDomain &&
        matchType &&
        matchQuery
      );
    });
  }, [filter, typeFilter, query]);

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
            {t('downloads_badge')}
          </Badge>

          <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-white text-glow leading-[1.05]">

            {t('downloads_title_before')}{' '}

            <span className="gradient-text">
              {t('downloads_title_highlight')}
            </span>

          </h1>

          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {t('downloads_description')}
          </p>

        </Container>

      </section>


      {/* =====================================================
          FILTERS
      ===================================================== */}

      <section className="py-6">

        <Container>

          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

            {/* DOMAIN + TYPE FILTERS */}

            <div className="flex flex-wrap gap-2 items-center">

              <Filter className="h-3.5 w-3.5 text-muted-foreground" />

              {/* DOMAIN FILTERS */}

              {filterConfig.map((item) => (

                <button
                  key={item.key}
                  onClick={() =>
                    setFilter(item.key)
                  }
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


              <span className="text-muted-foreground/40 mx-1">
                |
              </span>


              {/* FILE TYPE FILTERS */}

              {typeFilters.map((type) => (

                <button
                  key={type}
                  onClick={() =>
                    setTypeFilter(type)
                  }
                  className={cn(
                    'rounded-lg px-2.5 py-1 text-[11px] font-mono uppercase transition-all',

                    typeFilter === type
                      ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-400/20'
                      : 'text-muted-foreground hover:text-white border border-transparent',
                  )}
                >
                  {type === 'all'
                    ? t('downloads_type_all')
                    : type === 'Source'
                      ? t('downloads_type_source')
                      : type === 'Docs'
                        ? t('downloads_type_docs')
                        : type === 'Dataset'
                          ? t('downloads_type_dataset')
                          : type === 'PDF'
                            ? t('downloads_type_pdf')
                            : t('downloads_type_zip')}
                </button>

              ))}

            </div>


            {/* SEARCH */}

            <div className="relative w-full lg:w-72">

              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder={t(
                  'downloads_search_placeholder',
                )}
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                className="pl-9 glass bg-transparent border-white/10"
              />

            </div>

          </div>

        </Container>

      </section>


      {/* =====================================================
          DOWNLOAD LIST
      ===================================================== */}

      <section className="py-8 pb-16">

        <Container>

          {filtered.length === 0 ? (

            <div className="glass rounded-2xl p-12 text-center text-muted-foreground">
              {t('downloads_no_results')}
            </div>

          ) : (

            <div className="grid md:grid-cols-2 gap-4">

              {filtered.map((download) => {

                const Icon =
                  typeIcon[download.type];

                return (

                  <Card
                    key={download.id}
                    className="glass card-hover p-5 bg-transparent border-white/5 group"
                  >

                    <div className="flex items-start gap-4">

                      {/* FILE ICON */}

                      <div className="h-12 w-12 shrink-0 rounded-xl bg-cyan-500/10 border border-cyan-400/20 grid place-items-center relative">

                        <Icon className="h-5 w-5 text-cyan-300" />

                        <File className="h-3 w-3 text-cyan-300/40 absolute -bottom-0.5 -right-0.5" />

                      </div>


                      {/* CONTENT */}

                      <div className="min-w-0 flex-1">

                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">

                          <Badge>
                            {download.type}
                          </Badge>

                          <Badge className="border-white/10 text-muted-foreground">
                            {download.category}
                          </Badge>

                          <span className="text-[11px] text-muted-foreground font-mono">
                            {download.size}
                          </span>

                        </div>


                        <h3 className="font-semibold text-white">
                          {download.title}
                        </h3>


                        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                          {download.description}
                        </p>


                        {/* FOOTER */}

                        <div className="mt-4 flex items-center justify-between gap-3">

                          <span className="text-[10px] font-mono text-muted-foreground/60">
                            {t('downloads_updated')}{' '}
                            {download.updated}
                          </span>


                          {/* DOWNLOAD BUTTON */}

                          <Button
                            asChild
                            size="sm"
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white btn-glow gap-1.5"
                          >

                            <a
                              href={download.url || '#'}
                              download
                              aria-label={`${t(
                                'downloads_download',
                              )} ${download.title}`}
                            >

                              <Download className="h-3.5 w-3.5" />

                              {t(
                                'downloads_download',
                              )}

                            </a>

                          </Button>

                        </div>

                      </div>

                    </div>

                  </Card>

                );
              })}

            </div>

          )}

        </Container>

      </section>

    </div>
  );
}