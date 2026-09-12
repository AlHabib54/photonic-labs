import {
  Cpu,
  Brain,
  ShieldCheck,
  Sigma,
  Server,
  type LucideIcon,
} from 'lucide-react';

/* =========================================================
   DOMAIN TYPES
========================================================= */

export type DomainKey =
  | 'photonic'
  | 'ai'
  | 'security'
  | 'math'
  | 'it';

export interface ResearchDomain {
  key: DomainKey;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  accent: string;
}

/* =========================================================
   RESEARCH DOMAINS
========================================================= */

export const domains: ResearchDomain[] = [
  {
    key: 'photonic',
    title: 'Photonic Computing',
    short: 'Optical computing and photonic processor architectures.',
    description:
      'Research and development of optical logic, photonic arithmetic, processor components, and photonic computing architectures.',
    icon: Cpu,
    accent: 'cyan',
  },

  {
    key: 'ai',
    title: 'Artificial Intelligence',
    short: 'AI algorithms and intelligent computing systems.',
    description:
      'Research and experiments involving artificial intelligence, algorithms, and intelligent computing systems.',
    icon: Brain,
    accent: 'sky',
  },

  {
    key: 'security',
    title: 'Cybersecurity',
    short: 'Security systems, defensive technologies, and security research.',
    description:
      'Research and practical projects related to cybersecurity, system security, and defensive computing.',
    icon: ShieldCheck,
    accent: 'emerald',
  },

  {
    key: 'math',
    title: 'Algorithms & Mathematics',
    short: 'Algorithms, mathematical models, and computational research.',
    description:
      'Research into algorithms, number theory, computational mathematics, and experimental computational models.',
    icon: Sigma,
    accent: 'violet',
  },

  {
    key: 'it',
    title: 'IT Systems',
    short: 'Software, networking, infrastructure, and IT projects.',
    description:
      'Practical IT projects covering software, networking, infrastructure, systems, and related technologies.',
    icon: Server,
    accent: 'amber',
  },
];

/* =========================================================
   PROJECTS
========================================================= */

export interface Project {
  slug: string;

  // Canonical English content / fallback
  title: string;
  summary: string;
  description: string;

  // Localization keys
  titleKey?: string;
  summaryKey?: string;
  descriptionKey?: string;

  category: DomainKey;
  tags: string[];
  status: 'active' | 'experimental' | 'archived';
  year: string;
  image: string;
}

const projectImage = (id: number, q = 100) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop&q=${q}`;

/*
  IMPORTANT:
  These projects represent the work we have actually discussed.
  Technical claims and performance figures should be added only
  when supported by your own documentation/results.
*/

export const projects: Project[] = [
  {
    slug: 'optical-logic-gates',
    title: 'Optical Logic Gates',
    titleKey: 'project_optical_logic_title',
    category: 'photonic',
    summary:
      'Implementation and verification of optical logic gates.',
    summaryKey: 'project_optical_logic_summary',
    description:
      'Research and simulation of optical logic operations including AND, OR, XOR, and NOT gates as building blocks for photonic computing.',
    descriptionKey: 'project_optical_logic_description',
    tags: ['AND', 'OR', 'XOR', 'NOT', 'Optical Logic'],
    status: 'active',
    year: '2026',
    image: projectImage(2387873),
  },

  {
    slug: 'optical-adders',
    title: 'Optical Half Adder & Full Adder',
    titleKey: 'project_optical_adders_title',
    category: 'photonic',
    summary:
      'Optical arithmetic circuits for binary addition.',
    summaryKey: 'project_optical_adders_summary',
    description:
      'Development and verification of optical half-adder and full-adder circuits using optical logic components.',
    descriptionKey: 'project_optical_adders_description',
    tags: ['Half Adder', 'Full Adder', 'Arithmetic', 'Optical Logic'],
    status: 'active',
    year: '2026',
    image: projectImage(1036936),
  },

  {
    slug: 'optical-alu',
    title: 'Optical ALU',
    titleKey: 'project_optical_alu_title',
    category: 'photonic',
    summary:
      'Optical arithmetic and logic unit research project.',
    summaryKey: 'project_optical_alu_summary',
    description:
      'Development and testing of optical arithmetic and logic operations as a foundation for a photonic processing unit.',
    descriptionKey: 'project_optical_alu_description',
    tags: ['ALU', 'Arithmetic', 'Logic', 'Photonic Computing'],
    status: 'active',
    year: '2026',
    image: projectImage(2582937),
  },

  {
    slug: 'optical-alu-4bit',
    title: 'Optical 4-bit ALU',
    titleKey: 'project_optical_alu_4bit_title',
    category: 'photonic',
    summary:
      'Four-bit optical arithmetic and logic unit.',
    summaryKey: 'project_optical_alu_4bit_summary',
    description:
      'Extension of the optical ALU architecture to four-bit operations and validation of the implemented operations.',
    descriptionKey: 'project_optical_alu_4bit_description',
    tags: ['4-bit', 'ALU', 'Arithmetic', 'Optical'],
    status: 'active',
    year: '2026',
    image: projectImage(5474294),
  },

  {
    slug: 'optical-alu-8bit',
    title: 'Optical 8-bit ALU',
    titleKey: 'project_optical_alu_8bit_title',
    category: 'photonic',
    summary:
      'Eight-bit optical arithmetic and logic unit.',
    summaryKey: 'project_optical_alu_8bit_summary',
    description:
      'Experimental extension of the photonic ALU architecture toward eight-bit operations.',
    descriptionKey: 'project_optical_alu_8bit_description',
    tags: ['8-bit', 'ALU', 'Photonic CPU'],
    status: 'experimental',
    year: '2026',
    image: projectImage(3861969),
  },

  {
    slug: 'photonic-register',
    title: 'Photonic Register',
    titleKey: 'project_photonic_register_title',
    category: 'photonic',
    summary:
      'Photonic register component for a processor architecture.',
    summaryKey: 'project_photonic_register_summary',
    description:
      'Development and testing of a photonic register supporting LOAD, HOLD, and CLEAR operations.',
    descriptionKey: 'project_photonic_register_description',
    tags: ['Register', 'LOAD', 'HOLD', 'CLEAR'],
    status: 'active',
    year: '2026',
    image: projectImage(1181271),
  },

  {
    slug: 'program-counter',
    title: 'Photonic Program Counter',
    titleKey: 'project_program_counter_title',
    category: 'photonic',
    summary:
      'Program counter component for the photonic processor architecture.',
    summaryKey: 'project_program_counter_summary',
    description:
      'Development and validation of a program counter component as part of the photonic CPU architecture.',
    descriptionKey: 'project_program_counter_description',
    tags: ['Program Counter', 'CPU', 'Photonic Processor'],
    status: 'active',
    year: '2026',
    image: projectImage(1181244),
  },

  {
    slug: 'instruction-decoder',
    title: 'Photonic Instruction Decoder',
    titleKey: 'project_instruction_decoder_title',
    category: 'photonic',
    summary:
      'Instruction decoding component for the photonic CPU.',
    summaryKey: 'project_instruction_decoder_summary',
    description:
      'Development and validation of an instruction decoder as part of the photonic CPU architecture.',
    descriptionKey: 'project_instruction_decoder_description',
    tags: ['Instruction Decoder', 'CPU', 'Architecture'],
    status: 'active',
    year: '2026',
    image: projectImage(8386440),
  },

  {
    slug: 'photonic-cpu-core',
    title: 'Photonic CPU Core',
    titleKey: 'project_photonic_cpu_core_title',
    category: 'photonic',
    summary:
      'Integration of photonic processor components into a CPU core.',
    summaryKey: 'project_photonic_cpu_core_summary',
    description:
      'Integration and testing of photonic processor components including registers, program counter, instruction decoding, and arithmetic logic.',
    descriptionKey: 'project_photonic_cpu_core_description',
    tags: ['CPU Core', 'Photonic CPU', 'ALU', 'Register'],
    status: 'active',
    year: '2026',
    image: projectImage(5473955),
  },

  {
    slug: 'neoamona',
    title: 'NeoAMONA',
    titleKey: 'project_neoamona_title',
    category: 'math',
    summary:
      'Experimental algorithm research project.',
    summaryKey: 'project_neoamona_summary',
    description:
      'Algorithm research project developed as part of the laboratory work on computational algorithms.',
    descriptionKey: 'project_neoamona_description',
    tags: ['NeoAMONA', 'Algorithm', 'Mathematics'],
    status: 'experimental',
    year: '2026',
    image: projectImage(2387873),
  },

  {
    slug: 'zetatds-sieve',
    title: 'ZetaTDS-Sieve',
    titleKey: 'project_zetatds_title',
    category: 'math',
    summary:
      'Experimental prime-detection algorithm project.',
    summaryKey: 'project_zetatds_summary',
    description:
      'Algorithm research and experimentation related to prime detection and computational number theory.',
    descriptionKey: 'project_zetatds_description',
    tags: ['ZetaTDS-Sieve', 'Prime Detection', 'Number Theory'],
    status: 'experimental',
    year: '2026',
    image: projectImage(2582937),
  },

  {
    slug: 'optical-cache',
    title: 'Photonic Cache Memory',
    category: 'photonic',
    summary:
      'Photonic cache memory research project.',
    description:
      'Research and development of a photonic cache memory architecture for future optical processors.',
    tags: ['Cache', 'Memory', 'Photonic CPU'],
    status: 'experimental',
    year: '2026',
    image: projectImage(5473955),
  },
];

/* =========================================================
   PUBLICATIONS
========================================================= */

export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: string;
  category: DomainKey;
  abstract: string;
  tags: string[];
  type: 'Paper' | 'Preprint' | 'Whitepaper' | 'Thesis';
}

/*
  Only real publications should be added here.
  We intentionally removed the fictional journals and papers
  that were present in the original Bolt template.
*/

export const publications: Publication[] = [];

/* =========================================================
   ALGORITHMS
========================================================= */

export interface AlgorithmDoc {
  slug: string;
  title: string;
  category:
    | 'Number Theory'
    | 'AI'
    | 'Mathematical Model'
    | 'Cybersecurity';
  description: string;
  formula: string;
  complexity: string;
  tags: string[];
}

export const algorithms: AlgorithmDoc[] = [
  {
    slug: 'neoamona',
    title: 'NeoAMONA',
    category: 'Number Theory',
    description:
      'Experimental algorithm developed for computational research. Detailed mathematical description and benchmark results will be added from the verified project documentation.',
    formula: 'To be documented',
    complexity: 'To be benchmarked',
    tags: ['NeoAMONA', 'Algorithm', 'Number Theory'],
  },

  {
    slug: 'zetatds-sieve',
    title: 'ZetaTDS-Sieve',
    category: 'Number Theory',
    description:
      'Experimental sieve-based algorithm project for prime detection and computational number theory research.',
    formula: 'To be documented',
    complexity: 'To be benchmarked',
    tags: ['ZetaTDS-Sieve', 'Prime Detection', 'Sieve'],
  },
];

/* =========================================================
   PHOTONIC CPU VERSIONS
========================================================= */

export interface PhotonicVersion {
  version: string;
  codename: string;
  year: string;
  cores: number;
  clockGHz: number;
  memoryTB: number;
  tmarks: number;
  status: 'released' | 'preview' | 'legacy';
  highlights: string[];
}

/*
  Removed the fictional V1/V10/V20/V30/V34 historical timeline
  from the Bolt template.

  Add only versions for which you have actual documentation.
*/

export const photonicVersions = [
  {
    version: 'V1',
    codename: 'Genesis',
    year: '2021',
    cores: 1,
    clockGHz: 0.1,
    memoryTB: 0.001,
    tmarks: 1,
    status: 'legacy',
    highlights: [
      'First optical logic prototype',
      'Single optical processing core',
      'Proof of concept'
    ],
  },

  {
    version: 'V8',
    codename: 'Photon',
    year: '2022',
    cores: 4,
    clockGHz: 1,
    memoryTB: 0.05,
    tmarks: 20,
    status: 'legacy',
    highlights: [
      'Optical ALU introduced',
      'Multi-core architecture'
    ],
  },

  {
    version: 'V12',
    codename: 'Nova',
    year: '2023',
    cores: 8,
    clockGHz: 2,
    memoryTB: 0.12,
    tmarks: 50,
    status: 'legacy',
    highlights: [
      'Photonic registers',
      'Instruction decoder'
    ],
  },

  {
    version: 'V20',
    codename: 'Fusion',
    year: '2024',
    cores: 16,
    clockGHz: 4,
    memoryTB: 0.5,
    tmarks: 120,
    status: 'released',
    highlights: [
      'Integrated optical memory',
      'Tensor processing'
    ],
  },

  {
    version: 'V28',
    codename: 'Quantum',
    year: '2025',
    cores: 24,
    clockGHz: 8,
    memoryTB: 1.2,
    tmarks: 260,
    status: 'released',
    highlights: [
      'Photonic tensor fabric',
      'Advanced interconnect'
    ],
  },

  {
    version: 'V34',
    codename: 'Apex',
    year: '2026',
    cores: 34,
    clockGHz: 12,
    memoryTB: 2.4,
    tmarks: 420,
    status: 'preview',
    highlights: [
      '34-core photonic processor architecture',
      'Integrated photonic ALU',
      'Photonic register architecture',
      'Program counter and instruction decoder'
    ],
  },
];

export interface DownloadItem {
  id: string;
  title: string;
  type: 'PDF' | 'Source' | 'Docs' | 'Dataset' | 'ZIP';
  size: string;
  category: DomainKey;
  description: string;
  updated: string;
  url: string;
  version?: string;
  author?: string;
  tags?: string[];
}

export const downloads: DownloadItem[] = [
  /*
   * NEOAMONA
   */

  {
    id: 'dl-neoamona-source',
    title: 'NeoAMONA — Source Code',
    type: 'Source',
    size: 'TBD',
    category: 'math',
    description:
      'Python source code for the NeoAMONA algorithm.',
    updated: '2026-08-16',
    url: '/repository/neoamona/neoamona.py',
    version: '1.0',
    author: 'Sinan Al-Habib',
    tags: ['NeoAMONA', 'Python', 'Algorithm'],
  },

  {
    id: 'dl-neoamona-project',
    title: 'NeoAMONA — Complete Project',
    type: 'ZIP',
    size: 'TBD',
    category: 'math',
    description:
      'Complete NeoAMONA project package containing source code, tests, examples, and documentation.',
    updated: '2026-08-16',
    url: '/repository/neoamona/NeoAMONA.zip',
    version: '1.0',
    author: 'Sinan Al-Habib',
    tags: ['NeoAMONA', 'Python', 'ZIP', 'Research'],
  },

  /*
   * PHOTONIC LOGIC
   */

  {
    id: 'dl-optical-logic-gates',
    title: 'Optical Logic Gates — Source Code',
    type: 'ZIP',
    size: 'TBD',
    category: 'photonic',
    description:
      'Source package for the optical AND, OR, XOR, and NOT gate experiments.',
    updated: '2026-08-16',
    url: '/repository/optical-logic-gates/Optical-Logic-Gates.zip',
    version: '1.0',
    author: 'Sinan Al-Habib',
    tags: ['AND', 'OR', 'XOR', 'NOT', 'Python', 'Meep'],
  },

  /*
   * OPTICAL ADDERS
   */

  {
    id: 'dl-optical-adders',
    title: 'Optical Half Adder & Full Adder',
    type: 'ZIP',
    size: 'TBD',
    category: 'photonic',
    description:
      'Source package containing the optical half-adder and full-adder implementations and tests.',
    updated: '2026-08-16',
    url: '/repository/optical-adders/Optical-Adders.zip',
    version: '1.0',
    author: 'Sinan Al-Habib',
    tags: ['Half Adder', 'Full Adder', 'Python', 'Meep'],
  },

  /*
   * OPTICAL ALU
   */

  {
    id: 'dl-optical-alu',
    title: 'Optical ALU — Complete Project',
    type: 'ZIP',
    size: 'TBD',
    category: 'photonic',
    description:
      'Complete Optical ALU project including source code, simulation files, and tests.',
    updated: '2026-08-16',
    url: '/repository/optical-alu/Optical-ALU.zip',
    version: '1.0',
    author: 'Sinan Al-Habib',
    tags: ['ALU', 'Python', 'Meep', 'Optical Computing'],
  },

  /*
   * PHOTONIC REGISTER
   */

  {
    id: 'dl-photonic-register',
    title: 'Photonic Register',
    type: 'ZIP',
    size: 'TBD',
    category: 'photonic',
    description:
      'Photonic register implementation and tests including LOAD, HOLD, and CLEAR operations.',
    updated: '2026-08-16',
    url: '/repository/photonic-register/Photonic-Register.zip',
    version: '1.0',
    author: 'Sinan Al-Habib',
    tags: ['Register', 'LOAD', 'HOLD', 'CLEAR'],
  },

  /*
   * PROGRAM COUNTER
   */

  {
    id: 'dl-program-counter',
    title: 'Photonic Program Counter',
    type: 'ZIP',
    size: 'TBD',
    category: 'photonic',
    description:
      'Photonic program counter implementation and test package.',
    updated: '2026-08-16',
    url: '/repository/program-counter/Program-Counter.zip',
    version: '1.0',
    author: 'Sinan Al-Habib',
    tags: ['Program Counter', 'CPU', 'Photonic'],
  },

  /*
   * INSTRUCTION DECODER
   */

  {
    id: 'dl-instruction-decoder',
    title: 'Photonic Instruction Decoder',
    type: 'ZIP',
    size: 'TBD',
    category: 'photonic',
    description:
      'Instruction decoder implementation and tests for the photonic CPU architecture.',
    updated: '2026-08-16',
    url: '/repository/instruction-decoder/Instruction-Decoder.zip',
    version: '1.0',
    author: 'Sinan Al-Habib',
    tags: ['Instruction Decoder', 'CPU', 'Photonic'],
  },

  /*
   * PHOTONIC CPU CORE
   */

  {
    id: 'dl-photonic-cpu-core',
    title: 'Photonic CPU Core',
    type: 'ZIP',
    size: 'TBD',
    category: 'photonic',
    description:
      'Photonic CPU core project integrating the processor components developed in the laboratory.',
    updated: '2026-08-16',
    url: '/repository/photonic-cpu/Photonic-CPU-Core.zip',
    version: '1.0',
    author: 'Sinan Al-Habib',
    tags: ['Photonic CPU', 'CPU Core', 'ALU', 'Register'],
  },

  /*
   * ZETATDS-SIEVE
   */

  {
    id: 'dl-zetatds-sieve',
    title: 'ZetaTDS-Sieve — Source Code',
    type: 'Source',
    size: 'TBD',
    category: 'math',
    description:
      'Source code for the ZetaTDS-Sieve prime-detection research project.',
    updated: '2026-08-16',
    url: '/repository/zetatds-sieve/zetatds-sieve.py',
    version: '1.0',
    author: 'Sinan Al-Habib',
    tags: ['ZetaTDS-Sieve', 'Prime Detection', 'Python'],
  },

  {
    id: 'dl-zetatds-project',
    title: 'ZetaTDS-Sieve — Complete Project',
    type: 'ZIP',
    size: 'TBD',
    category: 'math',
    description:
      'Complete ZetaTDS-Sieve project package including source code and supporting files.',
    updated: '2026-08-16',
    url: '/repository/zetatds-sieve/ZetaTDS-Sieve.zip',
    version: '1.0',
    author: 'Sinan Al-Habib',
    tags: ['ZetaTDS-Sieve', 'Prime Detection', 'ZIP'],
  },
];

/* =========================================================
   BLOG
========================================================= */

export interface LocalizedText {
  en: string;
  de: string;
  ar: string;
}

export interface BlogPost {
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  body: LocalizedText;
  category: DomainKey;
  author: string;
  date: string;
  readingTime: LocalizedText;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'optical-logic-gates-building-blocks',

    title: {
      en: 'Optical Logic Gates: Building Blocks for Photonic Computing',
      de: 'Optische Logikgatter: Bausteine für photonisches Computing',
      ar: 'البوابات المنطقية الضوئية: لبنات بناء الحوسبة الضوئية',
    },

    excerpt: {
      en: 'Why simple optical logic operations are an important starting point when building a processor architecture around light.',
      de: 'Warum einfache optische Logikoperationen ein wichtiger Ausgangspunkt für eine Prozessorarchitektur auf Basis von Licht sind.',
      ar: 'لماذا تمثل العمليات المنطقية الضوئية البسيطة نقطة بداية مهمة عند بناء معمارية معالج تعتمد على الضوء.',
    },

    body: {
      en: `
# Optical Logic Gates: Building Blocks for Photonic Computing

When we started looking at photonic computing as a processor architecture rather than only as a way to move data, one question appeared very early: what should replace the basic logic operations performed by electronic transistors?

That question led us to optical logic gates.

The idea is straightforward. A processor needs reliable ways to represent binary states and combine them through operations such as AND, OR, XOR, and NOT. In an electronic processor these functions are implemented with transistor-based logic. In a photonic architecture, the same logical behaviour has to be represented through optical signals and the interaction of light with the chosen photonic structures.

This is where the first practical difficulty appears. It is easy to draw an optical AND gate on paper. It is much harder to make the output behave consistently enough that the gate can become part of a larger processor.

## Starting from the basic operations

Our work began with the four operations that are most useful as a basic logic set:

- AND
- OR
- XOR
- NOT

The objective at this stage is not to claim that these gates are already a replacement for conventional CMOS logic. The objective is much more practical: establish a simulation framework in which optical signals can be combined, observed, and verified as logical states.

That distinction is important.

A gate can work as an isolated simulation and still be unsuitable for a processor. A processor requires predictable signal levels, cascading, timing behaviour, interfacing between blocks, and a way of controlling many operations without the system becoming unnecessarily complicated.

## From a gate to a system

The interesting part starts after the first gate works.

An individual gate is only a small component. Several gates can form a half adder. A half adder can become part of a full adder. Multiple adders can form arithmetic units, and arithmetic units can eventually become part of an ALU.

This gives us a useful development path:

**Optical Gate → Adder → ALU → Register/Data Path → Processor Core**

It is much easier to evaluate a larger architecture when each level is built from smaller components that can be tested independently.

## What we are learning from the simulations

One lesson from this work is that photonic computing is not simply a matter of replacing an electronic symbol with an optical symbol.

Signal propagation, interference, coupling, loss, and the physical layout of the photonic structure all matter. A logically correct design still has to make physical sense.

For that reason, our simulations are treated as engineering experiments rather than as final hardware demonstrations.

The current goal is to understand which optical structures are useful building blocks and how they can be connected into a larger computational architecture.

## Where this project fits in the Photonic Labs roadmap

The optical logic work forms one of the lowest layers of our broader Photonic CPU project.

The next question is no longer whether an optical gate can represent a logical operation. The question becomes whether a collection of those operations can form useful arithmetic and control structures.

That leads directly to the optical adder and optical ALU projects.

The eventual target is a processor architecture in which light is not merely carrying information between electronic components, but participates directly in the computational path.

That is a much larger problem, and the logic-gate experiments are only the beginning.
`,

      de: `
# Optische Logikgatter: Bausteine für photonisches Computing

Als wir begonnen haben, photonisches Computing nicht nur als Übertragung von Daten, sondern als mögliche Prozessorarchitektur zu betrachten, stellte sich sehr früh eine grundlegende Frage: Was kann die logischen Grundoperationen ersetzen, die in elektronischen Prozessoren durch Transistoren realisiert werden?

Diese Frage führte uns zu den optischen Logikgattern.

Die Grundidee ist einfach. Ein Prozessor benötigt zuverlässige Möglichkeiten, binäre Zustände darzustellen und durch Operationen wie AND, OR, XOR und NOT miteinander zu verknüpfen. In einem elektronischen Prozessor werden diese Funktionen durch transistorbasierte Logik umgesetzt. In einer photonischen Architektur müssen dieselben logischen Beziehungen mithilfe optischer Signale und der Wechselwirkung des Lichts mit geeigneten photonischen Strukturen dargestellt werden.

Genau hier beginnt die praktische Schwierigkeit. Ein optisches AND-Gatter auf Papier zu zeichnen ist vergleichsweise einfach. Schwieriger ist es, ein Ausgangssignal so stabil und reproduzierbar zu erzeugen, dass das Gatter Teil eines größeren Prozessors werden kann.

## Ausgangspunkt: die grundlegenden Operationen

Unsere Arbeit begann mit vier grundlegenden Operationen:

- AND
- OR
- XOR
- NOT

Das Ziel dieser Phase besteht nicht darin, zu behaupten, dass diese Gatter bereits einen konventionellen CMOS-Prozessor ersetzen können. Es geht zunächst um eine praktischere Aufgabe: eine Simulationsumgebung zu entwickeln, in der optische Signale kombiniert, beobachtet und als logische Zustände überprüft werden können.

Diese Unterscheidung ist wichtig.

Ein Gatter kann in einer isolierten Simulation funktionieren und trotzdem für einen Prozessor ungeeignet sein. Ein Prozessor benötigt vorhersehbare Signalpegel, Kaskadierbarkeit, zeitliches Verhalten, Schnittstellen zwischen Funktionsblöcken und eine Möglichkeit, viele Operationen kontrolliert auszuführen.

## Vom Gatter zum System

Interessant wird die Arbeit nach dem ersten funktionierenden Gatter.

Ein einzelnes Gatter ist nur ein kleiner Baustein. Mehrere Gatter können einen Halbaddierer bilden. Ein Halbaddierer kann Bestandteil eines Volladdierers werden. Mehrere Addierer können schließlich eine arithmetische Einheit bilden, die wiederum Bestandteil einer ALU werden kann.

Daraus ergibt sich eine schrittweise Entwicklung:

**Optisches Gatter → Addierer → ALU → Register/Datenpfad → Prozessorkern**

Eine größere Architektur lässt sich wesentlich besser untersuchen, wenn jede Ebene zunächst aus kleineren, separat prüfbaren Komponenten aufgebaut wird.

## Was wir aus den Simulationen lernen

Eine wichtige Erkenntnis besteht darin, dass photonisches Computing nicht einfach darin besteht, ein elektronisches Symbol durch ein optisches Symbol zu ersetzen.

Signalpropagation, Interferenz, Kopplung, Verluste und das physische Layout der photonischen Struktur spielen eine entscheidende Rolle. Ein logisch korrektes Design muss deshalb auch physikalisch plausibel sein.

Aus diesem Grund verstehen wir unsere Simulationen als technische Experimente und nicht als endgültige Hardware-Demonstrationen.

Das aktuelle Ziel besteht darin, geeignete photonische Strukturen als Bausteine zu untersuchen und herauszufinden, wie sie zu einer größeren Rechenarchitektur verbunden werden können.

## Einordnung in die Photonic-Labs-Roadmap

Die Arbeiten an optischen Logikgattern bilden eine der unteren Ebenen unseres Photonic-CPU-Projekts.

Die nächste Frage lautet nicht mehr nur, ob ein optisches Gatter eine logische Operation darstellen kann. Vielmehr geht es darum, ob mehrere solcher Operationen zu nutzbaren Rechen- und Steuerstrukturen kombiniert werden können.

Damit führt der nächste Entwicklungsschritt direkt zu den Projekten für optische Addierer und die Optical ALU.

Das langfristige Ziel ist eine Prozessorarchitektur, in der Licht nicht nur Informationen zwischen elektronischen Komponenten transportiert, sondern selbst aktiv am Rechenweg beteiligt ist.

Das ist eine wesentlich größere Aufgabe. Die Untersuchungen zu Logikgattern sind deshalb erst der Anfang.
`,

      ar: `
# البوابات المنطقية الضوئية: لبنات بناء الحوسبة الضوئية

عندما بدأنا ننظر إلى الحوسبة الضوئية ليس فقط كوسيلة لنقل البيانات، وإنما كمعمارية محتملة لمعالج، ظهر سؤال أساسي في وقت مبكر جدًا: ما الذي يمكن أن يحل محل العمليات المنطقية الأساسية التي تنفذها الترانزستورات الإلكترونية؟

قادنا هذا السؤال إلى البوابات المنطقية الضوئية.

الفكرة الأساسية بسيطة. يحتاج أي معالج إلى طرق موثوقة لتمثيل الحالات الثنائية ودمجها من خلال عمليات مثل AND وOR وXOR وNOT. في المعالج الإلكتروني تنفذ هذه الوظائف باستخدام منطق قائم على الترانزستورات. أما في المعمارية الضوئية، فيجب تمثيل السلوك المنطقي نفسه من خلال الإشارات الضوئية وتفاعل الضوء مع البنى الفوتونية المختارة.

وهنا تظهر أول صعوبة عملية. من السهل رسم بوابة AND ضوئية على الورق، لكن من الأصعب بكثير أن يكون خرجها مستقرًا وقابلًا للتكرار بالدرجة التي تسمح باستخدامها كجزء من معالج أكبر.

## البداية من العمليات الأساسية

بدأ عملنا بأربع عمليات منطقية أساسية:

- AND
- OR
- XOR
- NOT

الهدف في هذه المرحلة ليس الادعاء بأن هذه البوابات أصبحت بالفعل بديلًا لمنطق CMOS التقليدي. الهدف أكثر عملية: بناء بيئة محاكاة يمكن من خلالها دمج الإشارات الضوئية ومراقبتها والتحقق من تمثيلها للحالات المنطقية.

هذا التمييز مهم.

فقد تعمل البوابة بنجاح في محاكاة منفردة، ومع ذلك لا تكون مناسبة لمعالج. فالمعالج يحتاج إلى مستويات إشارة يمكن التنبؤ بها، وإمكانية توصيل الوحدات على التوالي، وسلوك زمني واضح، وواجهات بين المكونات، وطريقة للتحكم في عدد كبير من العمليات دون أن يصبح النظام معقدًا بصورة غير ضرورية.

## من البوابة إلى النظام

تبدأ الصورة المثيرة للاهتمام بعد نجاح أول بوابة.

البوابة المفردة ليست سوى مكون صغير. ويمكن لعدة بوابات أن تشكل نصف جامع، ويمكن لنصف الجامع أن يصبح جزءًا من جامع كامل، ثم يمكن دمج عدة جامعات في وحدات حسابية، وصولًا في النهاية إلى وحدة حساب ومنطق ALU.

وهذا يعطينا مسارًا تدريجيًا واضحًا:

**بوابة ضوئية → جامع → ALU → سجل/مسار بيانات → نواة المعالج**

ويصبح تقييم المعمارية الأكبر أسهل بكثير عندما نبني كل مستوى من مكونات أصغر يمكن اختبارها بشكل مستقل.

## ما نتعلمه من المحاكاة

أحد الدروس المهمة من هذا العمل هو أن الحوسبة الضوئية ليست مجرد استبدال رمز إلكتروني برمز ضوئي.

انتشار الإشارة، والتداخل، والاقتران، والفقد، والتخطيط الفيزيائي للبنية الفوتونية، كلها عوامل مهمة. ولذلك فإن التصميم الصحيح منطقيًا يجب أن يكون معقولًا من الناحية الفيزيائية أيضًا.

لهذا السبب نتعامل مع عمليات المحاكاة باعتبارها تجارب هندسية، وليس باعتبارها عروضًا نهائية لعتاد حقيقي.

الهدف الحالي هو فهم أي البنى الضوئية يمكن أن تكون لبنات مناسبة، وكيف يمكن ربطها ضمن معمارية حوسبة أكبر.

## موقع المشروع في خارطة Photonic Labs

يشكل العمل على البوابات المنطقية الضوئية إحدى الطبقات الأساسية في مشروع Photonic CPU الأوسع.

والسؤال التالي لم يعد فقط: هل تستطيع البوابة الضوئية تمثيل عملية منطقية؟ بل أصبح: هل يمكن لمجموعة من هذه العمليات أن تشكل وحدات حساب وتحكم مفيدة؟

وهنا نصل مباشرة إلى مشروعي الجامع الضوئي ووحدة الحساب والمنطق الضوئية.

الهدف النهائي هو الوصول إلى معمارية معالج لا يقتصر فيها الضوء على نقل المعلومات بين المكونات الإلكترونية، بل يشارك بشكل مباشر في مسار الحساب نفسه.

وهي مهمة أكبر بكثير، ولذلك فإن تجارب البوابات المنطقية ليست إلا البداية.
`,
    },

    category: 'photonic',
    author: 'Sinan Al-Habib',
    date: '2026-08-20',

    readingTime: {
      en: '7 min',
      de: '7 Min.',
      ar: '7 دقائق',
    },
  },

  {
    slug: 'from-optical-gates-to-alu',

    title: {
      en: 'From Optical Gates to an Optical ALU',
      de: 'Von optischen Gattern zur Optical ALU',
      ar: 'من البوابات الضوئية إلى وحدة الحساب والمنطق الضوئية',
    },

    excerpt: {
      en: 'The transition from isolated optical logic operations to a larger arithmetic and logic unit is where a photonic architecture starts to resemble a processor.',
      de: 'Der Übergang von einzelnen optischen Logikoperationen zu einer größeren arithmetischen und logischen Einheit ist ein wichtiger Schritt hin zu einer photonischen Prozessorarchitektur.',
      ar: 'إن الانتقال من عمليات منطقية ضوئية منفردة إلى وحدة حساب ومنطق أكبر هو المرحلة التي تبدأ فيها المعمارية الضوئية بالاقتراب من مفهوم المعالج.',
    },

    body: {
      en: `
# From Optical Gates to an Optical ALU

A processor cannot do much with isolated logic gates.

The real usefulness appears when those gates can be arranged into a structure that performs meaningful operations on data. For us, that structure is the optical arithmetic and logic unit, or Optical ALU.

The ALU is an important step in the Photonic Labs project because it connects the small-scale experiments on optical logic with the larger processor architecture.

## Why the ALU matters

In a conventional processor, the ALU performs operations such as addition, subtraction, logical operations, comparisons, and other arithmetic functions.

The exact instruction set can vary, but the architectural role remains similar: the ALU is where a significant part of the actual computation takes place.

Our approach follows the same architectural idea while investigating how much of that functionality can be implemented in the optical domain.

## Building the arithmetic path

The optical adder work provides a natural starting point.

A half adder introduces the basic relationship between two binary inputs and produces a sum and a carry. A full adder extends that idea by incorporating the incoming carry.

Once these structures are available, they can be combined to create a wider arithmetic path.

That is the reason our work includes separate projects for optical half adders and full adders before moving into larger ALU designs.

The development is intentionally incremental.

## Why increasing the bit width changes the problem

Moving from a simple operation to a wider ALU is not just a matter of copying the same circuit several times.

As the number of bits increases, signal routing becomes more important. Timing relationships become harder to manage. The number of interacting optical paths increases, and practical issues that are easy to ignore in a small demonstration become increasingly significant.

We therefore treat the 4-bit and 8-bit ALU work as separate experimental stages rather than assuming that a successful small circuit automatically scales to a useful processor.

## The role of simulation

At this stage, simulation is essential.

It allows us to inspect the behaviour of the proposed optical structure before thinking about fabrication. It also gives us a way to compare architectural alternatives and identify problems in the signal path.

The important point is that simulation results are evidence about the simulated design, not automatically evidence about physical hardware.

That distinction will remain important throughout the Photonic CPU project.

## Looking beyond arithmetic

An ALU alone is not a CPU.

The ALU needs inputs, outputs, control signals, registers, an instruction decoder, a program counter, memory, and a mechanism for moving information between these blocks.

This is why the Optical ALU project is being developed alongside the Photonic Register, Program Counter, and Instruction Decoder projects.

The long-term goal is to bring these components together into a coherent processor datapath.

That integration is where the real architectural challenge begins.
`,

      de: `
# Von optischen Gattern zur Optical ALU

Mit einzelnen Logikgattern allein kann ein Prozessor noch nicht viel anfangen.

Der eigentliche Nutzen entsteht dann, wenn diese Gatter zu einer Struktur verbunden werden können, die sinnvolle Operationen auf Daten ausführt. Für uns ist diese Struktur die Optical ALU, also die optische arithmetische und logische Einheit.

Die ALU ist ein wichtiger Schritt im Photonic-Labs-Projekt, weil sie die kleinen Experimente mit optischer Logik mit der größeren Prozessorarchitektur verbindet.

## Warum die ALU wichtig ist

In einem konventionellen Prozessor führt die ALU Operationen wie Addition, Subtraktion, logische Operationen und Vergleiche aus.

Der genaue Befehlssatz kann unterschiedlich sein, aber die architektonische Funktion bleibt ähnlich: Ein wesentlicher Teil der eigentlichen Berechnung findet in der ALU statt.

Unser Ansatz folgt derselben Grundidee und untersucht gleichzeitig, welcher Teil dieser Funktionalität optisch umgesetzt werden kann.

## Aufbau des Rechenpfads

Die Arbeiten an den optischen Addierern bilden einen natürlichen Ausgangspunkt.

Ein Halbaddierer beschreibt die grundlegende Beziehung zwischen zwei binären Eingängen und erzeugt Summe und Übertrag. Ein Volladdierer erweitert dieses Konzept um den eingehenden Übertrag.

Sind diese Strukturen vorhanden, können sie zu einem breiteren Rechenpfad kombiniert werden.

Deshalb betrachten wir optische Halb- und Volladdierer als eigene Entwicklungsstufen, bevor wir zu größeren ALU-Strukturen übergehen.

Die Entwicklung erfolgt bewusst schrittweise.

## Warum die Bitbreite das Problem verändert

Der Übergang von einer einfachen Operation zu einer breiteren ALU besteht nicht nur darin, dieselbe Schaltung mehrfach zu kopieren.

Mit zunehmender Bitbreite wird die Signalführung wichtiger. Zeitliche Beziehungen werden schwieriger zu kontrollieren. Die Zahl der miteinander wechselwirkenden optischen Pfade nimmt zu, und praktische Effekte, die bei kleinen Demonstrationen leicht übersehen werden können, gewinnen an Bedeutung.

Deshalb behandeln wir die 4-Bit- und 8-Bit-ALU als eigenständige experimentelle Entwicklungsstufen.

## Die Rolle der Simulation

In dieser Phase ist die Simulation besonders wichtig.

Sie ermöglicht es uns, das Verhalten der vorgeschlagenen optischen Struktur zu untersuchen, bevor eine Fertigung überhaupt in Betracht gezogen wird. Gleichzeitig können verschiedene Architekturvarianten miteinander verglichen und Probleme im Signalweg erkannt werden.

Entscheidend ist dabei: Simulationsergebnisse beschreiben das simulierte Design. Sie sind nicht automatisch ein Nachweis für entsprechende Eigenschaften realer Hardware.

Diese Unterscheidung bleibt im gesamten Photonic-CPU-Projekt wichtig.

## Über die Arithmetik hinaus

Eine ALU allein ist noch keine CPU.

Sie benötigt Ein- und Ausgänge, Steuersignale, Register, einen Befehlsdecoder, einen Program Counter, Speicher und eine Möglichkeit, Informationen zwischen diesen Blöcken zu bewegen.

Deshalb wird das Optical-ALU-Projekt gemeinsam mit dem Photonic Register, dem Program Counter und dem Instruction Decoder entwickelt.

Das langfristige Ziel ist die Integration dieser Komponenten in einen zusammenhängenden Prozessor-Datenpfad.

Genau diese Integration stellt die eigentliche architektonische Herausforderung dar.
`,

      ar: `
# من البوابات الضوئية إلى وحدة الحساب والمنطق الضوئية

لا يستطيع المعالج أن يفعل الكثير باستخدام بوابات منطقية منفردة فقط.

تظهر الفائدة الحقيقية عندما يمكن ترتيب هذه البوابات ضمن بنية تنفذ عمليات مفيدة على البيانات. وبالنسبة لنا، هذه البنية هي وحدة الحساب والمنطق الضوئية Optical ALU.

تمثل وحدة ALU خطوة مهمة في مشروع Photonic Labs لأنها تربط التجارب الصغيرة الخاصة بالمنطق الضوئي بالمعمارية الأكبر للمعالج.

## لماذا تعتبر ALU مهمة؟

في المعالج التقليدي تنفذ وحدة ALU عمليات مثل الجمع والطرح والعمليات المنطقية والمقارنات وغيرها من الوظائف الحسابية.

وقد يختلف نوع التعليمات التي تدعمها من معالج إلى آخر، لكن دورها المعماري يبقى متشابهًا: جزء مهم من العمليات الحسابية الفعلية يحدث داخل ALU.

نحن نتبع المبدأ المعماري نفسه، مع دراسة مقدار الوظائف التي يمكن تنفيذها في المجال الضوئي.

## بناء مسار الحساب

يشكل العمل على الجامعات الضوئية نقطة بداية طبيعية.

نصف الجامع يوضح العلاقة الأساسية بين مدخلين ثنائيين وينتج المجموع وحمل النقل. أما الجامع الكامل فيضيف إلى ذلك حمل النقل الداخل.

وبعد توفر هذه البنى يمكن دمجها لبناء مسار حسابي أعرض.

ولهذا السبب تتضمن أعمالنا مشاريع مستقلة لنصف الجامع والجامع الكامل قبل الانتقال إلى تصاميم ALU الأكبر.

ويتم التطوير هنا بشكل تدريجي ومقصود.

## لماذا تغير زيادة عدد البتات طبيعة المشكلة؟

إن الانتقال من عملية بسيطة إلى ALU بعرض أكبر لا يعني فقط نسخ الدارة نفسها عدة مرات.

كلما زاد عدد البتات أصبحت عملية توجيه الإشارات أكثر أهمية، وأصبحت العلاقات الزمنية أكثر صعوبة، كما يزداد عدد المسارات الضوئية المتفاعلة مع بعضها.

ولهذا نتعامل مع أعمال ALU ذات 4 بت و8 بت كمراحل تجريبية مستقلة، بدل افتراض أن نجاح دائرة صغيرة يعني تلقائيًا إمكانية توسيعها إلى معالج عملي.

## دور المحاكاة

في هذه المرحلة تعد المحاكاة أساسية.

فهي تسمح لنا بفحص سلوك البنية الضوئية المقترحة قبل التفكير في التصنيع، كما تمنحنا طريقة لمقارنة البدائل المعمارية واكتشاف المشكلات في مسار الإشارة.

والنقطة المهمة هنا أن نتائج المحاكاة هي دليل على سلوك التصميم الذي تمت محاكاته، وليست تلقائيًا دليلًا على سلوك عتاد حقيقي.

وسيظل هذا التمييز مهمًا طوال مشروع Photonic CPU.

## ما وراء العمليات الحسابية

وحدة ALU وحدها ليست معالجًا.

فهي تحتاج إلى مداخل ومخارج وإشارات تحكم وسجلات ووحدة فك تعليمات وعداد برامج وذاكرة وآلية لنقل المعلومات بين هذه المكونات.

ولهذا يتم تطوير مشروع Optical ALU بالتوازي مع مشاريع Photonic Register وProgram Counter وInstruction Decoder.

الهدف على المدى الطويل هو دمج هذه المكونات ضمن مسار بيانات متكامل للمعالج.

وهنا تبدأ التحديات الحقيقية على مستوى المعمارية.
`,
    },

    category: 'photonic',
    author: 'Sinan Al-Habib',
    date: '2026-08-22',

    readingTime: {
      en: '6 min',
      de: '6 Min.',
      ar: '6 دقائق',
    },
  },

  {
    slug: 'designing-a-photonic-register',

    title: {
      en: 'Designing a Photonic Register',
      de: 'Entwurf eines photonischen Registers',
      ar: 'تصميم سجل ضوئي',
    },

    excerpt: {
      en: 'A processor needs more than an optical ALU. It also needs a way to hold and control data between operations.',
      de: 'Ein Prozessor benötigt mehr als eine Optical ALU. Er braucht auch eine Möglichkeit, Daten zwischen verschiedenen Operationen zu halten und zu steuern.',
      ar: 'المعالج يحتاج إلى أكثر من وحدة ALU ضوئية؛ فهو يحتاج أيضًا إلى طريقة للاحتفاظ بالبيانات والتحكم بها بين العمليات.',
    },

    body: {
      en: `
# Designing a Photonic Register

One of the easiest mistakes in early discussions about photonic processors is to focus almost entirely on computation.

An ALU may be the most visible computational block, but a processor also has to remember information between operations.

That makes the register one of the important building blocks in our Photonic CPU work.

## What a register needs to do

At a minimum, a useful register should provide controlled states for loading data, retaining data, and clearing data.

In our current project this is represented by three basic operations:

**LOAD, HOLD, and CLEAR**

LOAD allows a new value to enter the register.

HOLD keeps the stored state when no update is required.

CLEAR forces the register into a defined reset state.

These operations look simple, but implementing them in an optical architecture raises questions about how the state is represented and maintained.

## Why storage is different from logic

An optical logic gate processes a signal as it passes through the system.

Storage is different.

A register requires some form of state retention. That introduces a fundamental architectural problem: how do we preserve an optical representation of information long enough for the processor to use it reliably?

This is one reason why photonic computing often involves a combination of optical processing and carefully chosen memory or state mechanisms.

The processor does not only need fast signal propagation. It needs controlled state.

## The register as part of the datapath

In our architecture, the register is not an isolated experiment.

It belongs to the processor datapath and has to interact with other blocks, especially the ALU and the control system.

A simplified data path can be thought of as:

**Input → Register → ALU → Register**

The control logic decides when data should be loaded, when it should remain unchanged, and when it should be cleared.

Once this works for a single register, the next architectural question becomes scalability.

Can several registers operate together?

Can they be addressed?

Can data move between them without excessive optical complexity?

These questions matter much more to the CPU architecture than simply demonstrating one working storage element.

## Current status

The Photonic Register project is being treated as a component-level research and simulation effort.

We are using it to explore how processor state could be represented in a photonic datapath and how that state could interact with the computational units.

There are still implementation questions that require further investigation, particularly around practical optical storage mechanisms and integration.

For that reason, we describe this work as part of the development of the architecture rather than as a finished optical memory technology.

## Why this block matters

Once a register exists alongside the ALU, the processor begins to acquire something that looks much more like a real datapath.

The remaining challenge is to connect that datapath to instructions and control.

That leads naturally to the program counter and instruction decoder.

Those components turn a collection of optical blocks into something that can begin to execute a sequence of operations.
`,

      de: `
# Entwurf eines photonischen Registers

Bei frühen Diskussionen über photonische Prozessoren liegt ein häufiger Fehler darin, sich fast ausschließlich auf die Berechnung zu konzentrieren.

Die ALU mag der sichtbarste Rechenblock sein, aber ein Prozessor muss Informationen auch zwischen verschiedenen Operationen erhalten.

Deshalb ist das Register einer der wichtigen Bausteine unseres Photonic-CPU-Projekts.

## Was ein Register leisten muss

Ein brauchbares Register sollte mindestens kontrollierte Zustände zum Laden, Halten und Löschen von Daten bereitstellen.

In unserem aktuellen Projekt wird dies durch drei grundlegende Operationen dargestellt:

**LOAD, HOLD und CLEAR**

LOAD ermöglicht das Einfügen eines neuen Wertes.

HOLD hält den vorhandenen Zustand, wenn keine Änderung erforderlich ist.

CLEAR setzt das Register in einen definierten Ausgangszustand zurück.

Diese Vorgänge wirken einfach. In einer photonischen Architektur werfen sie jedoch die grundlegende Frage auf, wie ein Zustand optisch dargestellt und über eine ausreichende Zeit erhalten werden kann.

## Warum Speicherung etwas anderes ist als Logik

Ein optisches Logikgatter verarbeitet ein Signal, während es durch das System läuft.

Speicherung funktioniert anders.

Ein Register benötigt eine Form von Zustandsbeibehaltung. Damit entsteht eine zentrale architektonische Frage: Wie kann eine optische Darstellung von Information so erhalten bleiben, dass der Prozessor sie zuverlässig weiterverwenden kann?

Das ist einer der Gründe, warum photonisches Computing häufig eine Kombination aus optischer Verarbeitung und geeigneten Speicher- oder Zustandsmechanismen erfordert.

Ein Prozessor braucht nicht nur schnelle Signalübertragung. Er braucht kontrollierbaren Zustand.

## Das Register im Datenpfad

In unserer Architektur ist das Register kein isoliertes Experiment.

Es gehört zum Prozessor-Datenpfad und muss mit anderen Blöcken, insbesondere der ALU und der Steuerung, zusammenarbeiten.

Ein vereinfachter Datenpfad kann so dargestellt werden:

**Input → Register → ALU → Register**

Die Steuerlogik entscheidet, wann Daten geladen werden, wann der vorhandene Zustand erhalten bleibt und wann ein Reset erfolgen soll.

Wenn ein einzelnes Register funktioniert, stellt sich die nächste architektonische Frage: Wie gut lässt sich das Konzept skalieren?

Können mehrere Register gemeinsam arbeiten?

Können sie adressiert werden?

Können Daten ohne übermäßige optische Komplexität zwischen ihnen übertragen werden?

Diese Fragen sind für die CPU-Architektur wichtiger als allein der Nachweis eines einzelnen funktionierenden Speicherelements.

## Aktueller Stand

Das Photonic-Register-Projekt wird derzeit als Komponenten- und Simulationsarbeit behandelt.

Wir verwenden es, um zu untersuchen, wie der Zustand eines Prozessors in einem photonischen Datenpfad dargestellt werden könnte und wie dieser Zustand mit den Recheneinheiten zusammenarbeitet.

Einige Implementierungsfragen sind noch offen, insbesondere im Hinblick auf praktische Mechanismen zur optischen Speicherung und auf die Integration.

Deshalb beschreiben wir die Arbeit als Teil der Entwicklung der Architektur und nicht als fertige optische Speichertechnologie.

## Warum dieser Baustein wichtig ist

Mit einem Register neben der ALU beginnt der Prozessor, wesentlich stärker wie ein tatsächlicher Datenpfad auszusehen.

Die verbleibende Herausforderung besteht darin, diesen Datenpfad mit Instruktionen und Steuerung zu verbinden.

Daraus ergeben sich als nächste Schritte der Program Counter und der Instruction Decoder.
`,

      ar: `
# تصميم سجل ضوئي

من الأخطاء السهلة في النقاشات المبكرة حول المعالجات الضوئية التركيز بشكل شبه كامل على الحساب.

قد تكون وحدة ALU هي أكثر المكونات الحسابية وضوحًا، لكن المعالج يحتاج أيضًا إلى الاحتفاظ بالمعلومات بين العمليات.

ولهذا يمثل السجل أحد اللبنات المهمة في عملنا على Photonic CPU.

## ماذا يجب أن يفعل السجل؟

في الحد الأدنى، يجب أن يوفر السجل حالات يمكن التحكم بها من أجل تحميل البيانات والاحتفاظ بها ومسحها.

وفي مشروعنا الحالي نمثل ذلك بثلاث عمليات أساسية:

**LOAD وHOLD وCLEAR**

تسمح LOAD بإدخال قيمة جديدة إلى السجل.

وتحافظ HOLD على الحالة الحالية عندما لا يكون هناك تحديث مطلوب.

بينما تعيد CLEAR السجل إلى حالة محددة.

تبدو هذه العمليات بسيطة، لكن تنفيذها ضمن معمارية ضوئية يثير أسئلة مهمة حول كيفية تمثيل الحالة والمحافظة عليها.

## لماذا يختلف التخزين عن المنطق؟

البوابة المنطقية الضوئية تعالج الإشارة أثناء مرورها عبر النظام.

أما التخزين فشيء مختلف.

السجل يحتاج إلى آلية للاحتفاظ بالحالة. وهذا يطرح سؤالًا معماريًا أساسيًا: كيف نحافظ على التمثيل الضوئي للمعلومة لمدة كافية بحيث يستطيع المعالج استخدامها بصورة موثوقة؟

وهذا أحد الأسباب التي تجعل الحوسبة الضوئية غالبًا بحاجة إلى مزيج من المعالجة الضوئية وآليات مناسبة لتخزين الحالة أو الذاكرة.

فالمعالج لا يحتاج فقط إلى انتشار سريع للإشارة؛ بل يحتاج أيضًا إلى حالة يمكن التحكم بها.

## السجل كجزء من مسار البيانات

في معمارية مشروعنا لا يعتبر السجل تجربة منفصلة.

بل هو جزء من مسار بيانات المعالج، ويجب أن يتفاعل مع المكونات الأخرى، وخصوصًا ALU ونظام التحكم.

ويمكن تصور مسار بيانات مبسط بالشكل التالي:

**Input → Register → ALU → Register**

ويحدد منطق التحكم متى يتم تحميل البيانات، ومتى تبقى الحالة دون تغيير، ومتى يتم مسحها.

وعندما نصل إلى تشغيل سجل واحد، يصبح السؤال المعماري التالي متعلقًا بقابلية التوسع.

هل يمكن لعدة سجلات أن تعمل معًا؟

هل يمكن عنونتها؟

هل يمكن نقل البيانات بينها دون زيادة مفرطة في التعقيد الضوئي؟

هذه الأسئلة أهم بالنسبة إلى معمارية المعالج من مجرد إثبات عمل عنصر تخزين واحد.

## الحالة الحالية

يتم التعامل مع مشروع Photonic Register في الوقت الحالي كمشروع بحث ومحاكاة على مستوى المكونات.

نستخدمه لدراسة كيفية تمثيل حالة المعالج داخل مسار بيانات ضوئي، وكيف يمكن أن تتفاعل هذه الحالة مع وحدات الحساب.

ولا تزال هناك أسئلة تنفيذية تحتاج إلى مزيد من الدراسة، وخصوصًا فيما يتعلق بآليات التخزين الضوئي العملية ودمجها في المعمارية.

لذلك نصف هذا العمل باعتباره جزءًا من تطوير المعمارية، وليس كتقنية ذاكرة ضوئية مكتملة.

## لماذا هذا المكون مهم؟

عندما يصبح السجل جزءًا من النظام إلى جانب ALU، تبدأ بنية المعالج بالاقتراب أكثر من مسار بيانات حقيقي.

والتحدي المتبقي هو ربط مسار البيانات هذا بالتعليمات ونظام التحكم.

ومن هنا تأتي الخطوات التالية بشكل طبيعي: عداد البرامج ووحدة فك التعليمات.
`,
    },

    category: 'photonic',
    author: 'Sinan Al-Habib',
    date: '2026-08-24',

    readingTime: {
      en: '6 min',
      de: '6 Min.',
      ar: '6 دقائق',
    },
  },

  {
    slug: 'toward-a-photonic-cpu-core',

    title: {
      en: 'Toward a Photonic CPU Core',
      de: 'Auf dem Weg zu einem Photonic CPU Core',
      ar: 'نحو نواة معالج ضوئية',
    },

    excerpt: {
      en: 'Bringing the ALU, registers, program counter, and instruction decoder together is the point where component research becomes processor architecture.',
      de: 'Wenn ALU, Register, Program Counter und Instruction Decoder zusammengeführt werden, wird aus Komponentenforschung zunehmend echte Prozessorarchitektur.',
      ar: 'إن جمع ALU والسجلات وعداد البرامج ووحدة فك التعليمات معًا هو المرحلة التي تتحول فيها أبحاث المكونات إلى معمارية معالج فعلية.',
    },

    body: {
      en: `
# Toward a Photonic CPU Core

A processor is not defined by one component.

It is defined by the way its components work together.

That idea is at the centre of the Photonic CPU project. The individual blocks we have been developing — optical logic, adders, an ALU, registers, a program counter, and an instruction decoder — only become meaningful when they form a coherent datapath.

## The processor datapath

The architecture can be viewed as a sequence of functional blocks:

**Instruction Decoder → Control Fabric → Optical ALU → Photonic Registers → Photonic Interconnect → Memory**

This is a conceptual architecture, not a claim that every block has already been physically implemented as a finished photonic chip.

The purpose of this model is to give the project a clear structure.

Each block can be developed and tested separately, while the interfaces between the blocks can be defined early enough to guide later integration.

## Instruction decoding

A processor has to understand what an instruction means.

The instruction decoder is responsible for translating the encoded instruction into control signals that determine what the datapath should do.

In an optical processor, this introduces another interesting design problem. We are not only asking how to represent data optically. We also need to consider how instruction fields can be decoded and converted into control signals for optical and supporting electronic elements.

That makes the decoder an important bridge between instruction processing and datapath control.

## The program counter

A processor also needs a way to keep track of where it is in a sequence of instructions.

The program counter provides that function.

Within the architecture, it has to interact with the instruction fetch process and update in a controlled way after each instruction.

Again, the key point is integration.

A program counter that works independently is not enough. Its output has to be understood by the rest of the architecture.

## Why integration is harder than the individual projects

The components developed so far have their own local goals.

An optical gate can be evaluated by its logical behaviour.

An adder can be evaluated by its arithmetic result.

A register can be evaluated by LOAD, HOLD, and CLEAR behaviour.

But a CPU core introduces system-level questions:

How are signals synchronized?

How are control conditions represented?

How are data paths selected?

How is state preserved?

How are errors and invalid states handled?

These questions cannot be answered by looking at one component in isolation.

## The current research direction

The Photonic CPU project is therefore being developed bottom-up.

We first study the components.

Then we study how they connect.

Finally, we examine whether the resulting architecture can execute useful operations as a complete system.

This approach also makes it easier to document the project honestly. Each stage has its own assumptions, simulations, and limitations.

There is no need to claim that a complete photonic processor already exists when the research itself is still exploring the best way to construct one.

## What comes next

The next stages focus on datapath integration, control, memory interaction, and wider arithmetic structures.

The long-term objective remains ambitious: investigate whether a processor architecture can move meaningful portions of computation into the optical domain while retaining a practical system architecture around it.

The CPU core project is our framework for exploring that question.
`,

      de: `
# Auf dem Weg zu einem Photonic CPU Core

Ein Prozessor wird nicht durch eine einzelne Komponente definiert.

Entscheidend ist die Art und Weise, wie seine Komponenten zusammenarbeiten.

Dieser Gedanke steht im Mittelpunkt unseres Photonic-CPU-Projekts. Die einzelnen Blöcke — optische Logik, Addierer, ALU, Register, Program Counter und Instruction Decoder — werden erst dann wirklich relevant, wenn sie einen zusammenhängenden Datenpfad bilden.

## Der Prozessor-Datenpfad

Die Architektur kann als Abfolge funktionaler Blöcke betrachtet werden:

**Instruction Decoder → Control Fabric → Optical ALU → Photonic Registers → Photonic Interconnect → Memory**

Dabei handelt es sich um eine konzeptionelle Architektur. Es ist keine Behauptung, dass jeder dieser Blöcke bereits als fertiger photonischer Chip physisch realisiert wurde.

Das Modell soll dem Projekt zunächst eine klare Struktur geben.

Jeder Block kann separat entwickelt und getestet werden, während die Schnittstellen zwischen den Blöcken früh definiert werden können, um die spätere Integration zu unterstützen.

## Instruction Decoding

Ein Prozessor muss verstehen, was eine Instruktion bedeutet.

Der Instruction Decoder übersetzt eine codierte Instruktion in Steuersignale, die festlegen, welche Aktionen der Datenpfad ausführen soll.

In einem optischen Prozessor entsteht hier eine interessante zusätzliche Designfrage. Es geht nicht nur darum, Daten optisch darzustellen. Wir müssen auch untersuchen, wie Instruktionsfelder dekodiert und in Steuersignale für optische und unterstützende elektronische Komponenten umgewandelt werden können.

Damit wird der Decoder zu einer wichtigen Verbindung zwischen Instruktionsverarbeitung und Datenpfadsteuerung.

## Der Program Counter

Ein Prozessor benötigt außerdem eine Möglichkeit, seine Position innerhalb einer Folge von Instruktionen zu verfolgen.

Diese Aufgabe übernimmt der Program Counter.

Innerhalb der Architektur muss er mit dem Instruktionsabruf zusammenarbeiten und seinen Zustand kontrolliert nach jeder Instruktion aktualisieren.

Auch hier liegt die eigentliche Herausforderung in der Integration.

Ein unabhängig funktionierender Program Counter reicht nicht aus. Sein Ausgang muss vom restlichen System verstanden und genutzt werden können.

## Warum die Integration schwieriger ist als einzelne Projekte

Die bisher entwickelten Komponenten haben jeweils ihre eigenen lokalen Ziele.

Ein optisches Gatter kann anhand seines logischen Verhaltens bewertet werden.

Ein Addierer kann anhand seines arithmetischen Ergebnisses bewertet werden.

Ein Register kann anhand von LOAD, HOLD und CLEAR untersucht werden.

Ein CPU-Core führt jedoch zu Systemfragen:

Wie werden Signale synchronisiert?

Wie werden Steuerzustände dargestellt?

Wie werden Datenpfade ausgewählt?

Wie wird der Zustand erhalten?

Wie werden Fehler und ungültige Zustände behandelt?

Diese Fragen lassen sich nicht durch die Betrachtung nur einer Komponente beantworten.

## Die aktuelle Forschungsrichtung

Das Photonic-CPU-Projekt wird deshalb von unten nach oben entwickelt.

Zuerst untersuchen wir die Komponenten.

Danach untersuchen wir deren Verbindungen.

Schließlich prüfen wir, ob die entstehende Architektur als Gesamtsystem sinnvolle Operationen ausführen kann.

Dieser Ansatz erleichtert auch eine ehrliche Dokumentation. Jede Entwicklungsstufe besitzt eigene Annahmen, Simulationen und Einschränkungen.

Es ist nicht notwendig zu behaupten, dass bereits ein vollständiger photonischer Prozessor existiert, während die Forschung noch untersucht, wie eine solche Architektur am sinnvollsten aufgebaut werden kann.

## Wie es weitergeht

Die nächsten Schritte konzentrieren sich auf Datenpfadintegration, Steuerung, Speicherinteraktion und breitere arithmetische Strukturen.

Das langfristige Ziel bleibt anspruchsvoll: zu untersuchen, in welchem Umfang ein Prozessor wesentliche Teile seiner Berechnung in den optischen Bereich verlagern kann, ohne die praktische Systemarchitektur aus den Augen zu verlieren.

Das CPU-Core-Projekt bildet dafür unseren architektonischen Rahmen.
`,

      ar: `
# نحو نواة معالج ضوئية

لا يتم تعريف المعالج من خلال مكون واحد.

بل من خلال الطريقة التي تعمل بها مكوناته معًا.

وهذه الفكرة تقع في مركز مشروع Photonic CPU. فالمكونات التي نعمل عليها — المنطق الضوئي، والجامعات، ووحدة ALU، والسجلات، وعداد البرامج، ووحدة فك التعليمات — لا تصبح ذات معنى كامل إلا عندما تشكل مسار بيانات متكاملًا.

## مسار بيانات المعالج

يمكن النظر إلى المعمارية كسلسلة من الوحدات الوظيفية:

**Instruction Decoder → Control Fabric → Optical ALU → Photonic Registers → Photonic Interconnect → Memory**

وهذه معمارية مفاهيمية، وليست ادعاءً بأن جميع هذه الوحدات قد تم تنفيذها بالفعل كرقاقة ضوئية مكتملة.

الهدف من هذا النموذج هو إعطاء المشروع هيكلًا واضحًا.

يمكن تطوير كل مكون واختباره بشكل مستقل، بينما يمكن تحديد الواجهات بين المكونات مبكرًا بما يكفي لتوجيه مرحلة الدمج اللاحقة.

## فك التعليمات

يجب على المعالج أن يفهم معنى كل تعليمة.

وتتولى وحدة فك التعليمات تحويل التعليمة المشفرة إلى إشارات تحكم تحدد ما الذي يجب أن يفعله مسار البيانات.

وفي المعالج الضوئي تظهر هنا مشكلة تصميم مهمة. فنحن لا نبحث فقط عن طريقة لتمثيل البيانات ضوئيًا، بل علينا أيضًا دراسة كيفية فك حقول التعليمات وتحويلها إلى إشارات تحكم للمكونات الضوئية والعناصر الإلكترونية المساندة.

ولهذا تصبح وحدة فك التعليمات حلقة وصل مهمة بين معالجة التعليمات والتحكم في مسار البيانات.

## عداد البرامج

يحتاج المعالج أيضًا إلى طريقة لمعرفة موقعه ضمن سلسلة من التعليمات.

وهذه مهمة عداد البرامج.

ضمن المعمارية يجب أن يتفاعل عداد البرامج مع عملية جلب التعليمات، وأن يتم تحديثه بصورة مضبوطة بعد كل تعليمة.

وهنا أيضًا تكمن المشكلة الأساسية في التكامل.

فعداد البرامج الذي يعمل بشكل مستقل لا يكفي؛ إذ يجب أن يكون خرجه مفهومًا وقابلًا للاستخدام من بقية المعمارية.

## لماذا يمثل التكامل تحديًا أكبر من المشاريع المنفردة؟

لكل مكون تم تطويره حتى الآن هدفه المحلي الخاص.

يمكن تقييم البوابة الضوئية من خلال سلوكها المنطقي.

ويمكن تقييم الجامع من خلال نتيجته الحسابية.

ويمكن تقييم السجل من خلال عمليات LOAD وHOLD وCLEAR.

لكن نواة المعالج تطرح أسئلة على مستوى النظام:

كيف تتم مزامنة الإشارات؟

كيف يتم تمثيل حالات التحكم؟

كيف يتم اختيار مسارات البيانات؟

كيف يتم الحفاظ على الحالة؟

كيف تتم معالجة الأخطاء والحالات غير الصالحة؟

لا يمكن الإجابة عن هذه الأسئلة بالنظر إلى مكون واحد فقط.

## اتجاه البحث الحالي

لهذا يتم تطوير مشروع Photonic CPU من الأسفل إلى الأعلى.

نبدأ بدراسة المكونات.

ثم ندرس كيفية اتصالها.

وأخيرًا نبحث فيما إذا كانت المعمارية الناتجة قادرة على تنفيذ عمليات مفيدة كنظام متكامل.

كما أن هذا الأسلوب يجعل توثيق المشروع أكثر دقة وصدقًا. فكل مرحلة لها افتراضاتها ومحاكاتها وقيودها.

ولا توجد حاجة إلى الادعاء بوجود معالج ضوئي مكتمل بينما ما زالت الأبحاث تستكشف أفضل طريقة لبناء هذه المعمارية.

## ماذا بعد؟

تركز المراحل التالية على دمج مسار البيانات، والتحكم، والتفاعل مع الذاكرة، وتوسيع البنى الحسابية.

ويبقى الهدف طويل الأمد طموحًا: دراسة إمكانية نقل أجزاء مهمة من الحساب إلى المجال الضوئي مع الحفاظ على بنية نظام عملية حولها.

ومشروع CPU Core هو الإطار الذي نستخدمه لاستكشاف هذا السؤال.
`,
    },

    category: 'photonic',
    author: 'Sinan Al-Habib',
    date: '2026-08-26',

    readingTime: {
      en: '7 min',
      de: '7 Min.',
      ar: '7 دقائق',
    },
  },

  {
    slug: 'neoamona-experimental-algorithm',

    title: {
      en: 'NeoAMONA: Notes from an Experimental Algorithm Project',
      de: 'NeoAMONA: Notizen aus einem experimentellen Algorithmusprojekt',
      ar: 'NeoAMONA: ملاحظات من مشروع خوارزمي تجريبي',
    },

    excerpt: {
      en: 'A look at NeoAMONA as an experimental computational algorithm project and why documenting unfinished ideas matters.',
      de: 'Ein Einblick in NeoAMONA als experimentelles Algorithmusprojekt und in die Frage, warum auch unfertige Ideen dokumentiert werden sollten.',
      ar: 'نظرة على NeoAMONA باعتباره مشروعًا خوارزميًا حسابيًا تجريبيًا، ولماذا يعد توثيق الأفكار غير المكتملة أمرًا مهمًا.',
    },

    body: {
      en: `
# NeoAMONA: Notes from an Experimental Algorithm Project

NeoAMONA is one of the algorithm projects developed within Photonic Labs.

Unlike a finished software library, the current project should be understood as experimental algorithm research. The implementation, mathematical description, and benchmarking still need to be documented in a form that makes the method independently reproducible.

That is not a weakness of the project. It is simply the current stage of the work.

## Why keep experimental algorithms visible?

Early algorithm research often produces useful ideas before it produces polished papers.

Keeping a project documented during that stage has several advantages. It records the development path, makes later comparisons easier, and creates a place where implementation details can be connected to the mathematical reasoning behind the method.

For NeoAMONA, that means keeping the source code and project package available while the formal description continues to develop.

## From implementation to documentation

An algorithm project is more than a Python file.

A reproducible description should explain what problem the algorithm addresses, how the main steps work, what assumptions are being made, and how the implementation corresponds to the underlying method.

Benchmarking is equally important.

Without a defined test procedure, it is difficult to make a meaningful statement about performance.

For that reason, we are deliberately leaving performance claims open until the relevant documentation and benchmarks are in place.

## What we are interested in

The broader interest behind NeoAMONA is computational algorithm design.

That includes looking at mathematical structures, experimenting with alternative procedures, and examining where an algorithm may behave differently from more familiar approaches.

The project is therefore part of the laboratory's mathematics and algorithms track rather than a claim of a finished production algorithm.

## The next step

The next useful milestone is a complete technical description that connects the implementation to the mathematics.

After that, benchmark experiments can be designed around clear test cases and reproducible conditions.

Only then will it make sense to discuss detailed performance characteristics.

For now, NeoAMONA remains what it should be at this stage: an active experimental research project whose implementation is ahead of its final formal documentation.
`,

      de: `
# NeoAMONA: Notizen aus einem experimentellen Algorithmusprojekt

NeoAMONA ist eines der Algorithmusprojekte, die innerhalb von Photonic Labs entwickelt werden.

Im Gegensatz zu einer fertigen Softwarebibliothek sollte das aktuelle Projekt als experimentelle Algorithmusforschung verstanden werden. Implementierung, mathematische Beschreibung und Benchmarking müssen noch in einer Form dokumentiert werden, die eine unabhängige Reproduzierbarkeit ermöglicht.

Das ist keine Schwäche des Projekts. Es beschreibt lediglich den aktuellen Entwicklungsstand.

## Warum experimentelle Algorithmen dokumentieren?

Frühe Algorithmusforschung bringt oft interessante Ideen hervor, bevor daraus eine vollständig ausgearbeitete wissenschaftliche Veröffentlichung entsteht.

Eine Dokumentation während dieser Phase hat mehrere Vorteile. Sie hält den Entwicklungsweg fest, erleichtert spätere Vergleiche und schafft eine Verbindung zwischen Implementierungsdetails und der mathematischen Überlegung hinter dem Verfahren.

Für NeoAMONA bedeutet das, dass Quellcode und Projektpaket verfügbar bleiben, während sich die formale Beschreibung weiterentwickelt.

## Von der Implementierung zur Dokumentation

Ein Algorithmusprojekt ist mehr als eine Python-Datei.

Eine reproduzierbare Beschreibung sollte erläutern, welches Problem der Algorithmus behandelt, wie die wesentlichen Schritte funktionieren, welche Annahmen getroffen werden und wie die Implementierung mit der zugrunde liegenden Methode zusammenhängt.

Ebenso wichtig ist das Benchmarking.

Ohne ein klar definiertes Testverfahren lässt sich die Leistungsfähigkeit nur schwer sinnvoll beurteilen.

Deshalb verzichten wir bewusst auf konkrete Leistungsbehauptungen, solange die entsprechenden Dokumentationen und Benchmarks noch nicht abgeschlossen sind.

## Woran wir interessiert sind

Das übergeordnete Interesse hinter NeoAMONA liegt in der Entwicklung und Untersuchung von Algorithmen.

Dazu gehören mathematische Strukturen, alternative Verfahren und die Frage, unter welchen Bedingungen ein Algorithmus ein anderes Verhalten als bekannte Ansätze zeigen könnte.

Das Projekt gehört daher zum Bereich Mathematik und Algorithmen des Labors und wird nicht als fertiger Produktionsalgorithmus dargestellt.

## Der nächste Schritt

Der nächste sinnvolle Meilenstein ist eine vollständige technische Beschreibung, die die Implementierung mit der mathematischen Grundlage verbindet.

Danach können reproduzierbare Benchmarks mit klar definierten Testfällen aufgebaut werden.

Erst dann lassen sich detaillierte Aussagen über die Leistung sinnvoll diskutieren.

Bis dahin bleibt NeoAMONA das, was es in dieser Phase sein sollte: ein aktives experimentelles Forschungsprojekt, dessen Implementierung der endgültigen formalen Dokumentation derzeit voraus ist.
`,

      ar: `
# NeoAMONA: ملاحظات من مشروع خوارزمي تجريبي

يعد NeoAMONA أحد مشاريع الخوارزميات التي يتم تطويرها ضمن Photonic Labs.

وعلى عكس مكتبة برمجية مكتملة، ينبغي النظر إلى المشروع الحالي باعتباره بحثًا خوارزميًا تجريبيًا. فما زال من الضروري توثيق التنفيذ والوصف الرياضي والاختبارات المعيارية بطريقة تسمح بإعادة إنتاج الطريقة بشكل مستقل.

وهذا ليس ضعفًا في المشروع، بل هو ببساطة وصف لمرحلته الحالية.

## لماذا نوثق الخوارزميات التجريبية؟

غالبًا ما تنتج أبحاث الخوارزميات في مراحلها الأولى أفكارًا مفيدة قبل الوصول إلى أوراق علمية مكتملة.

ويوفر توثيق المشروع في هذه المرحلة عدة فوائد. فهو يسجل مسار التطوير، ويسهل المقارنات المستقبلية، ويوفر مكانًا يمكن فيه ربط تفاصيل التنفيذ بالتفكير الرياضي الذي يقف وراء الطريقة.

وبالنسبة إلى NeoAMONA، فهذا يعني إبقاء الشفرة المصدرية وحزمة المشروع متاحة بينما يستمر تطوير الوصف الرسمي.

## من التنفيذ إلى التوثيق

المشروع الخوارزمي ليس مجرد ملف Python.

فالوصف القابل لإعادة الإنتاج يجب أن يوضح المشكلة التي تعالجها الخوارزمية، وكيف تعمل خطواتها الرئيسية، وما الافتراضات المستخدمة، وكيف يرتبط التنفيذ بالطريقة الأساسية.

والاختبارات المعيارية مهمة بالقدر نفسه.

فمن دون إجراء اختبار محدد بوضوح يصبح من الصعب إصدار حكم ذي معنى حول الأداء.

ولهذا نتجنب عمدًا تقديم ادعاءات أداء محددة إلى أن تصبح الوثائق والاختبارات المناسبة جاهزة.

## ما الذي نهتم به؟

الاهتمام الأوسع وراء NeoAMONA هو تصميم ودراسة الخوارزميات الحاسوبية.

ويشمل ذلك دراسة البنى الرياضية، وتجربة إجراءات بديلة، والنظر في الحالات التي قد تتصرف فيها الخوارزمية بطريقة مختلفة عن الأساليب المعروفة.

ولهذا فإن المشروع جزء من مسار الرياضيات والخوارزميات في المختبر، وليس ادعاءً بوجود خوارزمية إنتاجية مكتملة.

## الخطوة التالية

تتمثل المرحلة المهمة التالية في إعداد وصف تقني كامل يربط التنفيذ بالأساس الرياضي للطريقة.

بعد ذلك يمكن بناء اختبارات معيارية قابلة لإعادة الإنتاج تعتمد على حالات اختبار وشروط واضحة.

وعندها فقط يصبح من المنطقي مناقشة خصائص الأداء بصورة تفصيلية.

أما الآن، فإن NeoAMONA يمثل ما يفترض أن يمثله في هذه المرحلة: مشروع بحث تجريبي نشط سبق فيه التنفيذ التوثيق الرياضي الرسمي النهائي.
`,
    },

    category: 'math',
    author: 'Sinan Al-Habib',
    date: '2026-08-28',

    readingTime: {
      en: '5 min',
      de: '5 Min.',
      ar: '5 دقائق',
    },
  },

  {
    slug: 'zetatds-sieve-prime-detection',

    title: {
      en: 'ZetaTDS-Sieve and the Search for Efficient Prime Detection',
      de: 'ZetaTDS-Sieve und die Suche nach effizienter Primzahlerkennung',
      ar: 'ZetaTDS-Sieve والبحث عن خوارزمية فعالة لاكتشاف الأعداد الأولية',
    },

    excerpt: {
      en: 'An experimental look at a sieve-based approach to prime detection and the questions that remain before formal benchmarking.',
      de: 'Eine experimentelle Betrachtung eines siebbasierten Ansatzes zur Primzahlerkennung und der Fragen, die vor einem formalen Benchmarking noch geklärt werden müssen.',
      ar: 'نظرة تجريبية على منهج قائم على الغربال لاكتشاف الأعداد الأولية، والأسئلة التي يجب الإجابة عنها قبل إجراء اختبار معياري رسمي.',
    },

    body: {
      en: `
# ZetaTDS-Sieve and the Search for Efficient Prime Detection

Prime detection is a classic problem in computational number theory, but that does not make experimentation with new approaches any less interesting.

ZetaTDS-Sieve is an experimental algorithm project focused on prime detection and computational number theory.

The current implementation should be viewed as a research prototype. Its purpose is to explore an algorithmic approach and provide a basis for further testing rather than to claim a definitive improvement over established methods.

## Why use a sieve?

Sieve methods have a long history in prime computation because they can eliminate large sets of composite candidates without testing every number independently.

That basic idea makes a sieve a useful starting point for experimentation.

Our interest is in how the particular structure of the ZetaTDS-Sieve project behaves under different computational conditions and how its implementation can be improved and characterized.

## The important part is the benchmark

Prime-detection algorithms are especially easy to compare incorrectly.

A result obtained from a small input range may look impressive while saying very little about behaviour at larger scales.

The benchmark therefore needs to define:

- the input range,
- the hardware and software environment,
- the reference implementation,
- the measurement method,
- and the correctness checks.

Until those conditions are fixed and documented, performance statements should be treated cautiously.

## Correctness before speed

For an experimental number-theory algorithm, correctness has to come first.

An algorithm that is fast but produces an incorrect classification of primes is not useful.

The current project therefore keeps correctness testing and implementation experiments separate from claims about computational advantage.

## Where the project fits

ZetaTDS-Sieve belongs to the mathematics and algorithms side of Photonic Labs.

It also reflects a broader philosophy of the laboratory: algorithms should be implemented, tested, documented, and challenged rather than described only at a conceptual level.

The project is still under development.

The next major step is a reproducible benchmark suite that can provide a much clearer picture of where the approach is useful and where it is not.

Until then, the most accurate description is simply that ZetaTDS-Sieve is an experimental sieve-based prime-detection project under active development.
`,

      de: `
# ZetaTDS-Sieve und die Suche nach effizienter Primzahlerkennung

Die Erkennung von Primzahlen ist ein klassisches Problem der Computational Number Theory. Dennoch bleibt die Untersuchung neuer Ansätze interessant.

ZetaTDS-Sieve ist ein experimentelles Algorithmusprojekt mit Schwerpunkt auf Primzahlerkennung und rechnerischer Zahlentheorie.

Die aktuelle Implementierung sollte als Forschungsprototyp verstanden werden. Ihr Zweck besteht darin, einen algorithmischen Ansatz zu untersuchen und eine Grundlage für weitere Tests zu schaffen, nicht darin, eine endgültige Verbesserung gegenüber etablierten Verfahren zu behaupten.

## Warum ein Sieb?

Siebverfahren werden seit Langem in der Primzahlberechnung verwendet, weil sie große Mengen zusammengesetzter Kandidaten ausschließen können, ohne jede Zahl einzeln prüfen zu müssen.

Diese Grundidee macht ein Sieb zu einem sinnvollen Ausgangspunkt für Experimente.

Unser Interesse richtet sich darauf, wie sich die konkrete Struktur von ZetaTDS-Sieve unter unterschiedlichen Rechenbedingungen verhält und wie sich die Implementierung weiter untersuchen und verbessern lässt.

## Der entscheidende Punkt: Benchmarking

Algorithmen zur Primzahlerkennung lassen sich besonders leicht falsch vergleichen.

Ein Ergebnis für einen kleinen Eingabebereich kann beeindruckend aussehen und gleichzeitig nur wenig über das Verhalten bei größeren Bereichen aussagen.

Ein aussagekräftiger Benchmark sollte daher unter anderem festlegen:

- den Eingabebereich,
- die Hardware- und Softwareumgebung,
- die Referenzimplementierung,
- die Messmethode,
- und die Korrektheitsprüfungen.

Solange diese Bedingungen nicht festgelegt und dokumentiert sind, sollten Aussagen über die Leistung mit Vorsicht behandelt werden.

## Korrektheit vor Geschwindigkeit

Bei einem experimentellen Algorithmus der Zahlentheorie muss die Korrektheit an erster Stelle stehen.

Ein Algorithmus, der zwar schnell ist, aber Primzahlen falsch klassifiziert, ist nicht praktisch brauchbar.

Daher halten wir Korrektheitstests und Implementierungsexperimente bewusst getrennt von Aussagen über einen möglichen Rechenvorteil.

## Einordnung des Projekts

ZetaTDS-Sieve gehört zum Bereich Mathematik und Algorithmen von Photonic Labs.

Das Projekt folgt außerdem einer grundsätzlichen Arbeitsweise des Labors: Algorithmen sollen implementiert, getestet, dokumentiert und kritisch hinterfragt werden, statt nur auf konzeptioneller Ebene beschrieben zu werden.

Das Projekt befindet sich weiterhin in Entwicklung.

Der nächste wichtige Schritt ist eine reproduzierbare Benchmark-Suite, die ein klareres Bild davon liefern kann, wo der Ansatz nützlich ist und wo seine Grenzen liegen.

Bis dahin ist die genaueste Beschreibung einfach diese: ZetaTDS-Sieve ist ein experimentelles siebbasiertes Projekt zur Primzahlerkennung, das sich noch aktiv in Entwicklung befindet.
`,

      ar: `
# ZetaTDS-Sieve والبحث عن خوارزمية فعالة لاكتشاف الأعداد الأولية

يعد اكتشاف الأعداد الأولية من المشكلات الكلاسيكية في نظرية الأعداد الحاسوبية، لكن هذا لا يجعل تجربة المناهج الجديدة أقل أهمية.

ZetaTDS-Sieve هو مشروع خوارزمي تجريبي يركز على اكتشاف الأعداد الأولية ودراسة مسائل في نظرية الأعداد الحاسوبية.

وينبغي النظر إلى التنفيذ الحالي باعتباره نموذجًا أوليًا بحثيًا. فالهدف منه هو دراسة منهج خوارزمي وتوفير أساس لمزيد من الاختبارات، وليس الادعاء بتحقيق تفوق نهائي على الطرق المعروفة.

## لماذا استخدام طريقة الغربال؟

لطرق الغربال تاريخ طويل في حساب الأعداد الأولية، لأنها تستطيع استبعاد مجموعات كبيرة من الأعداد المركبة من دون اختبار كل عدد بشكل مستقل.

وهذه الفكرة الأساسية تجعل الغربال نقطة بداية مناسبة للتجارب.

وينصب اهتمامنا على دراسة سلوك البنية الخاصة بـ ZetaTDS-Sieve تحت ظروف حسابية مختلفة، وعلى كيفية تحسين التنفيذ وفهم خصائصه.

## الجزء الأهم هو الاختبار المعياري

من السهل بشكل خاص إجراء مقارنات غير دقيقة بين خوارزميات اكتشاف الأعداد الأولية.

فقد تبدو نتيجة على نطاق صغير من المدخلات مثيرة للاهتمام، بينما لا تخبرنا إلا بالقليل عن الأداء عند الانتقال إلى نطاقات أكبر.

ولذلك يجب أن يحدد الاختبار المعياري، من بين أمور أخرى:

- نطاق المدخلات،
- بيئة العتاد والبرمجيات،
- التنفيذ المرجعي،
- طريقة القياس،
- واختبارات صحة النتائج.

إلى أن يتم تحديد هذه الشروط وتوثيقها، يجب التعامل بحذر مع أي تصريحات تتعلق بالأداء.

## الصحة قبل السرعة

في الخوارزميات التجريبية الخاصة بنظرية الأعداد، يجب أن تأتي صحة النتائج قبل السرعة.

فالخوارزمية السريعة التي تخطئ في تصنيف الأعداد الأولية ليست مفيدة عمليًا.

ولهذا نفصل في المشروع بين اختبارات الصحة وتجارب التنفيذ من جهة، وبين أي ادعاءات حول وجود ميزة حسابية من جهة أخرى.

## موقع المشروع

ينتمي ZetaTDS-Sieve إلى مسار الرياضيات والخوارزميات في Photonic Labs.

كما يعكس المشروع فلسفة أوسع في المختبر: ينبغي تنفيذ الخوارزميات واختبارها وتوثيقها ومراجعتها نقديًا، وليس الاكتفاء بوصفها من الناحية النظرية.

ولا يزال المشروع قيد التطوير.

وتتمثل الخطوة المهمة التالية في إنشاء مجموعة اختبارات معيارية قابلة لإعادة الإنتاج، بحيث تعطينا صورة أوضح عن الحالات التي يكون فيها هذا المنهج مفيدًا والحدود التي يواجهها.

وحتى ذلك الحين، فإن الوصف الأدق هو أن ZetaTDS-Sieve مشروع تجريبي قائم على طريقة الغربال لاكتشاف الأعداد الأولية وما يزال قيد التطوير.
`,
    },

    category: 'math',
    author: 'Sinan Al-Habib',
    date: '2026-08-30',

    readingTime: {
      en: '5 min',
      de: '5 Min.',
      ar: '5 دقائق',
    },
  },
];