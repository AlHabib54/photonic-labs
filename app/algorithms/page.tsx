'use client';

import React, { useState } from 'react';

import {
  Sigma,
  Brain,
  ShieldCheck,
  Hash,
  ArrowRight,
  Copy,
  Check,
} from 'lucide-react';

import {
  SectionHeader,
  Container,
  Badge,
} from '@/components/site/section';

import {
  algorithms,
  type AlgorithmDoc,
} from '@/lib/data';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n-store';

/* =========================================================
   CATEGORY ICONS
========================================================= */

const categoryIcon: Record<
  AlgorithmDoc['category'],
  React.ElementType
> = {
  'Number Theory': Hash,
  AI: Brain,
  'Mathematical Model': Sigma,
  Cybersecurity: ShieldCheck,
};

const categoryTranslationKey: Record<
  AlgorithmDoc['category'],
  string
> = {
  'Number Theory':
    'algorithms_category_number_theory',

  AI:
    'algorithms_category_ai',

  'Mathematical Model':
    'algorithms_category_mathematical_model',

  Cybersecurity:
    'algorithms_category_cybersecurity',
};

/* =========================================================
   CATEGORY CONFIG
========================================================= */

const categoryConfig = [
  {
    key: 'all',
    labelKey: 'algorithms_filter_all',
  },
  {
    key: 'Number Theory',
    labelKey: 'algorithms_filter_number_theory',
  },
  {
    key: 'AI',
    labelKey: 'algorithms_filter_ai',
  },
  {
    key: 'Mathematical Model',
    labelKey: 'algorithms_filter_mathematical_model',
  },
  {
    key: 'Cybersecurity',
    labelKey: 'algorithms_filter_cybersecurity',
  },
] as const;

/* =========================================================
   PAGE
========================================================= */

export default function AlgorithmsPage() {
  const { t } = useLanguage();

  const [filter, setFilter] =
    useState<(typeof categoryConfig)[number]['key']>('all');

  const [copied, setCopied] =
    useState<string | null>(null);

  /* =========================================================
     FILTERED ALGORITHMS
  ========================================================= */

  const filtered =
    filter === 'all'
      ? algorithms
      : algorithms.filter(
          (algorithm) =>
            algorithm.category === filter,
        );

  /* =========================================================
     COPY FORMULA
  ========================================================= */

  const copyFormula = (
    formula: string,
    slug: string,
  ) => {
    navigator.clipboard?.writeText(formula);

    setCopied(slug);

    setTimeout(() => {
      setCopied(null);
    }, 1500);
  };

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
            {t('algorithms_badge')}
          </Badge>

          <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-white text-glow leading-[1.05]">

            {t('algorithms_title_before')}{' '}

            <span className="gradient-text">
              {t('algorithms_title_highlight')}
            </span>

          </h1>

          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {t('algorithms_description')}
          </p>

        </Container>

      </section>


      {/* =====================================================
          FILTERS
      ===================================================== */}

      <section className="py-6">

        <Container>

          <div className="flex flex-wrap gap-2">

            {categoryConfig.map((category) => (

              <button
                key={category.key}
                onClick={() => setFilter(category.key)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs font-medium transition-all',

                  filter === category.key
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/30'
                    : 'glass text-muted-foreground hover:text-white border border-transparent',
                )}
              >
                {t(category.labelKey)}
              </button>

            ))}

          </div>

        </Container>

      </section>


      {/* =====================================================
          ALGORITHM DOCUMENTS
      ===================================================== */}

      <section className="py-8 pb-16">

        <Container>

          {filtered.length === 0 ? (

            <div className="glass rounded-2xl p-12 text-center text-muted-foreground">
              {t('algorithms_no_results')}
            </div>

          ) : (

            <div className="space-y-5">

              {filtered.map((algorithm, index) => {

                const Icon =
                  categoryIcon[algorithm.category];

                return (

                  <Card
                    key={algorithm.slug}
                    className="glass card-hover overflow-hidden bg-transparent border-white/5 p-0"
                  >

                    <div className="grid lg:grid-cols-3 gap-0">

                      {/* =================================================
                          LEFT: HEADER
                      ================================================= */}

                      <div className="p-6 lg:border-r border-white/5">

                        <div className="flex items-center gap-3 mb-4">

                          <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-400/20 grid place-items-center">
                            <Icon className="h-4 w-4 text-cyan-300" />
                          </div>

                          <div>
                            <Badge>
                              {t(categoryTranslationKey[algorithm.category])}
                            </Badge>
                          </div>

                        </div>


                        <h3 className="text-xl font-bold text-white leading-tight">
                          {algorithm.title}
                        </h3>


                        {/* COMPLEXITY */}

                        <div className="mt-4 space-y-2 text-xs">

                          <div className="flex items-center justify-between glass rounded-lg px-3 py-2">

                            <span className="text-muted-foreground uppercase tracking-wider font-mono text-[10px]">
                              {t(
                                'algorithms_complexity',
                              )}
                            </span>

                            <span className="font-mono text-cyan-300">
                              {algorithm.complexity}
                            </span>

                          </div>

                        </div>


                        {/* TAGS */}

                        <div className="mt-3 flex items-center gap-1.5 flex-wrap">

                          {algorithm.tags.map((tag) => (

                            <span
                              key={tag}
                              className="text-[10px] font-mono uppercase tracking-wider text-cyan-300/60"
                            >
                              #{tag}
                            </span>

                          ))}

                        </div>

                      </div>


                      {/* =================================================
                          MIDDLE: DESCRIPTION
                      ================================================= */}

                      <div className="p-6 lg:border-r border-white/5">

                        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-cyan-300/80 mb-3">
                          {t('algorithms_overview')}
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {algorithm.description}
                        </p>

                        <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">

                          <span className="font-mono">
                            DOC-
                            {String(index + 1).padStart(
                              3,
                              '0',
                            )}
                          </span>

                          <span>·</span>

                          <span>
                            {t(
                              'algorithms_revision',
                            )}{' '}
                            {algorithm.slug
                              .split('-')
                              .pop()}
                          </span>

                        </div>

                      </div>


                      {/* =================================================
                          RIGHT: FORMULA
                      ================================================= */}

                      <div className="p-6 bg-cyan-500/[0.02]">

                        <div className="flex items-center justify-between mb-3">

                          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-cyan-300/80">
                            {t('algorithms_formula')}
                          </div>

                          <button
                            onClick={() =>
                              copyFormula(
                                algorithm.formula,
                                algorithm.slug,
                              )
                            }
                            className="h-7 w-7 grid place-items-center rounded-lg glass text-muted-foreground hover:text-cyan-300"
                            aria-label={t(
                              'algorithms_copy_formula',
                            )}
                          >

                            {copied ===
                            algorithm.slug ? (

                              <Check className="h-3.5 w-3.5 text-emerald-400" />

                            ) : (

                              <Copy className="h-3.5 w-3.5" />

                            )}

                          </button>

                        </div>


                        <div className="rounded-xl border border-cyan-400/15 bg-[#02040a] p-5 grid place-items-center min-h-[100px]">

                          <code className="font-mono text-sm text-cyan-200 text-center leading-relaxed break-words">
                            {algorithm.formula}
                          </code>

                        </div>


                        <p className="text-[10px] text-muted-foreground/60 mt-2">
                          {t(
                            'algorithms_latex_note',
                          )}
                        </p>

                      </div>

                    </div>

                  </Card>

                );
              })}

            </div>

          )}


          {/* =================================================
              CTA
          ================================================= */}

          <div className="mt-10 glass-strong rounded-3xl p-8 border border-cyan-400/20 flex flex-col md:flex-row items-center justify-between gap-6">

            <div>

              <h3 className="text-2xl font-bold text-white">
                {t(
                  'algorithms_reference_title',
                )}
              </h3>

              <p className="text-muted-foreground mt-2">
                {t(
                  'algorithms_reference_description',
                )}
              </p>

            </div>


            <a
              href="/downloads"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-sm text-white btn-glow"
            >

              {t('algorithms_browse_source')}

              <ArrowRight className="h-4 w-4" />

            </a>

          </div>

        </Container>

      </section>

    </div>
  );
}