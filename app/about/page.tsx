import Link from 'next/link';
import { ArrowRight, Target, Eye, Compass, CheckCircle2 } from 'lucide-react';
import { SectionHeader, Container, Badge } from '@/components/site/section';
import { domains } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const goals = [
  'Ship a production-grade optical processor accessible through standard software APIs.',
  'Build the compiler stack that bridges classical IT to the photonic acceleration layer.',
  'Prove post-quantum cryptographic protocols on photonic channels.',
  'Demonstrate order-of-magnitude speedups for transformer inference on optical tensor cores.',
  'Publish reproducible research at the intersection of optics, mathematics, and machine learning.',
];

export const metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* hero */}
      <section className="relative overflow-hidden py-16">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="absolute inset-0 grid-bg opacity-30" />
        </div>
        <Container>
          <div className="max-w-3xl">
            <Badge>About Photonic Labs</Badge>
            <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-white text-glow leading-[1.05]">
              An independent laboratory at the <span className="gradient-text">speed of light</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Photonic Labs is an independent research laboratory focused on Photonic Computing, Optical
              Processors, Artificial Intelligence, Advanced Algorithms, Cybersecurity, and IT Innovation —
              building the full stack from optical logic primitives to the compilers that target them.
            </p>
          </div>
        </Container>
      </section>

      {/* mission / vision */}
      <section className="pb-8">
        <Container>
          <div className="grid md:grid-cols-2 gap-5">
            <Card className="glass card-hover p-8 bg-transparent border-white/5">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-400/30 grid place-items-center mb-5">
                <Target className="h-5 w-5 text-cyan-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">Mission</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                To advance the science and engineering of photonic computing — moving computation from
                electrons to photons — and to make that capability rigorous, reproducible, and accessible
                to the wider research and engineering community.
              </p>
            </Card>
            <Card className="glass card-hover p-8 bg-transparent border-white/5">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-cyan-400/30 grid place-items-center mb-5">
                <Eye className="h-5 w-5 text-cyan-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">Vision</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                A future in which dense linear algebra, neural inference, and secure communication are
                accelerated natively by light — where the limits of computation are set by physics, not by
                the thermal wall of electronic transistors.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* research goals */}
      <section className="py-16">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Compass className="h-4 w-4 text-cyan-300" />
                <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-cyan-300/80">
                  Research Goals
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white text-glow-soft">
                Five concrete north stars
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Each goal is scoped to be measurable, reproducible, and published openly so external
                researchers can verify and build on the results.
              </p>
            </div>
            <div className="space-y-3">
              {goals.map((g, i) => (
                <div key={i} className="flex items-start gap-3 glass rounded-xl p-4 border-white/5">
                  <CheckCircle2 className="h-5 w-5 text-cyan-300 shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/90 leading-relaxed">{g}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* technology domains */}
      <section className="py-16">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Technology Domains"
            title={<>Five domains, <span className="gradient-text">one stack</span></>}
            description="Our research is organized into five interlocking domains — each feeding the next in the optical computing pipeline."
          />
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {domains.map((d, i) => (
              <Card
                key={d.key}
                className={`glass card-hover p-6 bg-transparent border-white/5 ${i === 4 ? 'lg:col-start-2' : ''}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="h-11 w-11 rounded-xl bg-cyan-500/10 border border-cyan-400/20 grid place-items-center">
                    <d.icon className="h-5 w-5 text-cyan-300" />
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">{d.title}</h3>
                <p className="text-sm text-cyan-300/70 mt-1">{d.short}</p>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{d.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 glass-strong rounded-3xl p-8 border border-cyan-400/20">
            <div>
              <h3 className="text-2xl font-bold text-white">Want to collaborate?</h3>
              <p className="text-muted-foreground mt-2">
                We partner with institutions, engineers, and researchers on the optical stack.
              </p>
            </div>
            <Link href="/contact">
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white btn-glow gap-2">
                Get in touch <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
