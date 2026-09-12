'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Target,
  Eye,
  Compass,
  CheckCircle2,
} from 'lucide-react';

import { SectionHeader, Container, Badge } from '@/components/site/section';
import { domains } from '@/lib/data';
import { useLanguage } from '@/lib/i18n-store';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  const { t } = useLanguage();

  /* =========================================================
     RESEARCH GOALS
  ========================================================= */

  const goals = [
    t('about_goal_1'),
    t('about_goal_2'),
    t('about_goal_3'),
    t('about_goal_4'),
    t('about_goal_5'),
  ];

  return (
    <div className="pt-24">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden py-16">

        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="absolute inset-0 grid-bg opacity-30" />
        </div>

        <Container>

          <div className="max-w-3xl">

            <Badge>
              {t('about_badge')}
            </Badge>

            <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-white text-glow leading-[1.05]">
              {t('about_title_before')}{' '}
              <span className="gradient-text">
                {t('about_title_highlight')}
              </span>
              .
            </h1>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {t('about_description')}
            </p>

          </div>

        </Container>
      </section>


      {/* =====================================================
          MISSION / VISION
      ===================================================== */}

      <section className="pb-8">

        <Container>

          <div className="grid md:grid-cols-2 gap-5">

            {/* Mission */}

            <Card className="glass card-hover p-8 bg-transparent border-white/5">

              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-400/30 grid place-items-center mb-5">

                <Target className="h-5 w-5 text-cyan-300" />

              </div>

              <h2 className="text-2xl font-bold text-white">
                {t('about_mission_title')}
              </h2>

              <p className="mt-3 text-muted-foreground leading-relaxed">
                {t('about_mission_text')}
              </p>

            </Card>


            {/* Vision */}

            <Card className="glass card-hover p-8 bg-transparent border-white/5">

              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-cyan-400/30 grid place-items-center mb-5">

                <Eye className="h-5 w-5 text-cyan-300" />

              </div>

              <h2 className="text-2xl font-bold text-white">
                {t('about_vision_title')}
              </h2>

              <p className="mt-3 text-muted-foreground leading-relaxed">
                {t('about_vision_text')}
              </p>

            </Card>

          </div>

        </Container>

      </section>


      {/* =====================================================
          RESEARCH GOALS
      ===================================================== */}

      <section className="py-16">

        <Container>

          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* Left */}

            <div>

              <div className="flex items-center gap-2 mb-4">

                <Compass className="h-4 w-4 text-cyan-300" />

                <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-cyan-300/80">
                  {t('about_research_goals')}
                </span>

              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white text-glow-soft">
                {t('about_goals_title')}
              </h2>

              <p className="mt-4 text-muted-foreground leading-relaxed">
                {t('about_goals_description')}
              </p>

            </div>


            {/* Right */}

            <div className="space-y-3">

              {goals.map((goal, index) => (

                <div
                  key={index}
                  className="flex items-start gap-3 glass rounded-xl p-4 border-white/5"
                >

                  <CheckCircle2 className="h-5 w-5 text-cyan-300 shrink-0 mt-0.5" />

                  <span className="text-sm text-foreground/90 leading-relaxed">
                    {goal}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </Container>

      </section>


      {/* =====================================================
          TECHNOLOGY DOMAINS
      ===================================================== */}

      <section className="py-16">

        <Container>

          <SectionHeader
            align="center"
            eyebrow={t('about_domains_eyebrow')}
            title={
              <>
                {t('about_domains_title_before')}{' '}
                <span className="gradient-text">
                  {t('about_domains_title_highlight')}
                </span>
              </>
            }
            description={t('about_domains_description')}
          />


          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">

            {domains.map((domain, index) => {

              const Icon = domain.icon;

              return (

                <Card
                  key={domain.key}
                  className={`glass card-hover p-6 bg-transparent border-white/5 ${
                    index === 4 ? 'lg:col-start-2' : ''
                  }`}
                >

                  <div className="flex items-start justify-between mb-4">

                    <div className="h-11 w-11 rounded-xl bg-cyan-500/10 border border-cyan-400/20 grid place-items-center">

                      <Icon className="h-5 w-5 text-cyan-300" />

                    </div>

                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                      0{index + 1}
                    </span>

                  </div>


                  <h3 className="text-lg font-semibold text-white">
                    {t(`domain_${domain.key}_title`)}
                  </h3>

                  <p className="text-sm text-cyan-300/70 mt-1">
                    {t(`domain_${domain.key}_short`)}
                  </p>

                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                    {t(`domain_${domain.key}_description`)}
                  </p>

                </Card>

              );

            })}

          </div>

        </Container>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="py-16">

        <Container>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 glass-strong rounded-3xl p-8 border border-cyan-400/20">

            <div>

              <h3 className="text-2xl font-bold text-white">
                {t('about_collaborate_title')}
              </h3>

              <p className="text-muted-foreground mt-2">
                {t('about_collaborate_text')}
              </p>

            </div>


            <Link href="/contact">

              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white btn-glow gap-2"
              >

                {t('about_contact_button')}

                <ArrowRight className="h-4 w-4" />

              </Button>

            </Link>

          </div>

        </Container>

      </section>

    </div>
  );
}