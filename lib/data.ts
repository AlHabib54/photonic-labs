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
  title: string;
  category: DomainKey;
  summary: string;
  description: string;
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
    category: 'photonic',
    summary:
      'Implementation and verification of optical logic gates.',
    description:
      'Research and simulation of optical logic operations including AND, OR, XOR, and NOT gates as building blocks for photonic computing.',
    tags: ['AND', 'OR', 'XOR', 'NOT', 'Optical Logic'],
    status: 'active',
    year: '2026',
    image: projectImage(2387873),
  },

  {
    slug: 'optical-adders',
    title: 'Optical Half Adder & Full Adder',
    category: 'photonic',
    summary:
      'Optical arithmetic circuits for binary addition.',
    description:
      'Development and verification of optical half-adder and full-adder circuits using optical logic components.',
    tags: ['Half Adder', 'Full Adder', 'Arithmetic', 'Optical Logic'],
    status: 'active',
    year: '2026',
    image: projectImage(1036936),
  },

  {
    slug: 'optical-alu',
    title: 'Optical ALU',
    category: 'photonic',
    summary:
      'Optical arithmetic and logic unit research project.',
    description:
      'Development and testing of optical arithmetic and logic operations as a foundation for a photonic processing unit.',
    tags: ['ALU', 'Arithmetic', 'Logic', 'Photonic Computing'],
    status: 'active',
    year: '2026',
    image: projectImage(2582937),
  },

  {
    slug: 'optical-alu-4bit',
    title: 'Optical 4-bit ALU',
    category: 'photonic',
    summary:
      'Four-bit optical arithmetic and logic unit.',
    description:
      'Extension of the optical ALU architecture to four-bit operations and validation of the implemented operations.',
    tags: ['4-bit', 'ALU', 'Arithmetic', 'Optical'],
    status: 'active',
    year: '2026',
    image: projectImage(2280579),
  },

  {
    slug: 'optical-alu-8bit',
    title: 'Optical 8-bit ALU',
    category: 'photonic',
    summary:
      'Eight-bit optical arithmetic and logic unit.',
    description:
      'Experimental extension of the photonic ALU architecture toward eight-bit operations.',
    tags: ['8-bit', 'ALU', 'Photonic CPU'],
    status: 'experimental',
    year: '2026',
    image: projectImage(60504),
  },

  {
    slug: 'photonic-register',
    title: 'Photonic Register',
    category: 'photonic',
    summary:
      'Photonic register component for a processor architecture.',
    description:
      'Development and testing of a photonic register supporting LOAD, HOLD, and CLEAR operations.',
    tags: ['Register', 'LOAD', 'HOLD', 'CLEAR'],
    status: 'active',
    year: '2026',
    image: projectImage(1181271),
  },

  {
    slug: 'program-counter',
    title: 'Photonic Program Counter',
    category: 'photonic',
    summary:
      'Program counter component for the photonic processor architecture.',
    description:
      'Development and validation of a program counter component as part of the photonic CPU architecture.',
    tags: ['Program Counter', 'CPU', 'Photonic Processor'],
    status: 'active',
    year: '2026',
    image: projectImage(1181244),
  },

  {
    slug: 'instruction-decoder',
    title: 'Photonic Instruction Decoder',
    category: 'photonic',
    summary:
      'Instruction decoding component for the photonic CPU.',
    description:
      'Development and validation of an instruction decoder as part of the photonic CPU architecture.',
    tags: ['Instruction Decoder', 'CPU', 'Architecture'],
    status: 'active',
    year: '2026',
    image: projectImage(8386440),
  },

  {
    slug: 'photonic-cpu-core',
    title: 'Photonic CPU Core',
    category: 'photonic',
    summary:
      'Integration of photonic processor components into a CPU core.',
    description:
      'Integration and testing of photonic processor components including registers, program counter, instruction decoding, and arithmetic logic.',
    tags: ['CPU Core', 'Photonic CPU', 'ALU', 'Register'],
    status: 'active',
    year: '2026',
    image: projectImage(2280579),
  },

  {
    slug: 'neoamona',
    title: 'NeoAMONA',
    category: 'math',
    summary:
      'Experimental algorithm research project.',
    description:
      'Algorithm research project developed as part of the laboratory work on computational algorithms.',
    tags: ['NeoAMONA', 'Algorithm', 'Mathematics'],
    status: 'experimental',
    year: '2026',
    image: projectImage(2387873),
  },

  {
    slug: 'zetatds-sieve',
    title: 'ZetaTDS-Sieve',
    category: 'math',
    summary:
      'Experimental prime-detection algorithm project.',
    description:
      'Algorithm research and experimentation related to prime detection and computational number theory.',
    tags: ['ZetaTDS-Sieve', 'Prime Detection', 'Number Theory'],
    status: 'experimental',
    year: '2026',
    image: projectImage(2582937),
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

export const photonicVersions: PhotonicVersion[] = [
  {
    version: 'V1',
    codename: 'Photonic CPU Core',
    year: '2026',
    cores: 1,
    clockGHz: 0,
    memoryTB: 0,
    tmarks: 0,
    status: 'released',
    highlights: [
      'Optical logic gates',
      'Optical ALU',
      'Photonic register',
      'Program counter',
      'Instruction decoder',
      'Photonic CPU core',
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

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: DomainKey;
  author: string;
  date: string;
  readingTime: string;
}

/*
  Bolt's fictional editorial articles were removed.
  Real articles can be added later.
*/

export const blogPosts: BlogPost[] = [];