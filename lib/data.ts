import {
  Cpu,
  Brain,
  ShieldCheck,
  Sigma,
  Server,
  type LucideIcon,
} from 'lucide-react';

export type DomainKey = 'photonic' | 'ai' | 'security' | 'math' | 'it';

export interface ResearchDomain {
  key: DomainKey;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  accent: string;
}

export const domains: ResearchDomain[] = [
  {
    key: 'photonic',
    title: 'Photonic Computing',
    short: 'Optical circuits operating at the speed of light.',
    description:
      'Designing optical logic gates, interferometric switches, and full photonic datapaths that process information without electronic conversion.',
    icon: Cpu,
    accent: 'cyan',
  },
  {
    key: 'ai',
    title: 'Artificial Intelligence',
    short: 'Neural models accelerated on photonic substrates.',
    description:
      'Building machine-learning architectures tailored to optical acceleration — from matrix multiplication at light-speed to photonic attention layers.',
    icon: Brain,
    accent: 'sky',
  },
  {
    key: 'security',
    title: 'Cybersecurity',
    short: 'Quantum-resistant cryptography on optical hardware.',
    description:
      'Developing post-quantum protocols, optical key distribution, and intrusion-resilient processing primitives built directly into silicon photonics.',
    icon: ShieldCheck,
    accent: 'emerald',
  },
  {
    key: 'math',
    title: 'Advanced Mathematics',
    short: 'New models for parallel optical computation.',
    description:
      'Formalizing the mathematics of light-based computation — group theory for interferometric networks, optical number theory, and parallel algorithms.',
    icon: Sigma,
    accent: 'violet',
  },
  {
    key: 'it',
    title: 'IT Systems',
    short: 'Software stacks for hybrid opto-electronic compute.',
    description:
      'Compilers, network tooling, and operating environments that bridge classical IT infrastructure with the photonic accelerator layer underneath.',
    icon: Server,
    accent: 'amber',
  },
];

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

const px = (id: number, q = 100) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop&q=${q}`;

export const projects: Project[] = [
  {
    slug: 'photonic-cpu-v34',
    title: 'Photonic CPU V34',
    category: 'photonic',
    summary: '34-core interferometric optical processor with on-chip memory banks.',
    description:
      'The V34 is the latest generation optical processor, integrating 34 parallel photonic cores with on-die optical memory banks and an electro-optic control fabric.',
    tags: ['optical', 'interferometry', 'silicon-photonics'],
    status: 'active',
    year: '2025',
    image: px(2280579),
  },
  {
    slug: 'optical-binary-switch',
    title: 'Optical Binary Switch',
    category: 'photonic',
    summary: 'Mach–Zehnder based bistable optical switch with sub-nanosecond switching.',
    description:
      'A bistable optical switch built on a Mach–Zehnder interferometer with nonlinear phase modulation, enabling light-gated logic at sub-nanosecond timescales.',
    tags: ['mach-zehnder', 'bistable', 'logic'],
    status: 'active',
    year: '2024',
    image: px(1036936),
  },
  {
    slug: 'optical-alu',
    title: 'Optical ALU',
    category: 'photonic',
    summary: 'Full arithmetic logic unit implemented entirely with optical gates.',
    description:
      'A complete arithmetic logic unit implementing addition, subtraction, bitwise, and comparison operations purely through optical interference and phase encoding.',
    tags: ['alu', 'arithmetic', 'phase-encoding'],
    status: 'active',
    year: '2024',
    image: px(2582937),
  },
  {
    slug: 'photon-net',
    title: 'PhotonNet AI Accelerator',
    category: 'ai',
    summary: 'Photonic tensor core for low-latency LLM inference.',
    description:
      'A photonic tensor-core accelerator achieving ultra-low latency matrix multiplication for transformer and convolutional workloads using coherent light.',
    tags: ['ml', 'transformer', 'acceleration'],
    status: 'experimental',
    year: '2025',
    image: px(8386440),
  },
  {
    slug: 'optical-key-distribution',
    title: 'Optical QKD Stack',
    category: 'security',
    summary: 'Quantum key distribution over a photonic fiber backbone.',
    description:
      'A hardened quantum key distribution framework running over photonic fiber, with optical eavesdropper detection and post-quantum key derivation.',
    tags: ['qkd', 'cryptography', 'fiber'],
    status: 'active',
    year: '2024',
    image: px(60504),
  },
  {
    slug: 'parallel-light-processing',
    title: 'Parallel Light Processing',
    category: 'photonic',
    summary: 'Wavelength-division parallelism for simultaneous compute streams.',
    description:
      'Executing many independent computation streams concurrently across wavelength-division multiplexed channels within a single optical path.',
    tags: ['wdm', 'parallelism', 'multiplexing'],
    status: 'experimental',
    year: '2025',
    image: px(2387873),
  },
  {
    slug: 'dos-gui',
    title: 'DOS GUI Project',
    category: 'it',
    summary: 'A modern graphical shell layered over the classic DOS interface.',
    description:
      'A composable GUI framework that overlays a windowing system on top of the DOS command-line environment, preserving legacy compatibility while adding modern UX.',
    tags: ['dos', 'gui', 'retro-computing'],
    status: 'active',
    year: '2023',
    image: px(1181244),
  },
  {
    slug: 'network-toolkit',
    title: 'Photon Network Toolkit',
    category: 'it',
    summary: 'Optimized packet capture and analysis suite for opto-electronic NICs.',
    description:
      'A performant network analysis and packet capture suite tuned for opto-electronic network interface cards, with live optical-link telemetry.',
    tags: ['networking', 'telemetry', 'tools'],
    status: 'active',
    year: '2024',
    image: px(1181271),
  },
];

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

export const publications: Publication[] = [
  {
    id: 'pub-001',
    title: 'A 34-Core Interferometric Photonic Processor for General-Purpose Computation',
    authors: 'Photonic Labs Research Group',
    venue: 'Journal of Optical Computing',
    year: '2025',
    category: 'photonic',
    abstract:
      'We present the V34 photonic processor: 34 parallel cores with on-die optical memory, achieving linear scaling of throughput with core count across arithmetic and tensor workloads.',
    tags: ['photonic-cpu', 'interferometry', 'parallelism'],
    type: 'Paper',
  },
  {
    id: 'pub-002',
    title: 'Bistable Optical Switching with Nonlinear Mach–Zehnder Interferometers',
    authors: 'Photonic Labs Research Group',
    venue: 'Photonics Letters',
    year: '2024',
    category: 'photonic',
    abstract:
      'A sub-nanosecond bistable optical switch leveraging Kerr-effect nonlinear phase modulation for light-gated binary logic.',
    tags: ['mach-zehnder', 'nonlinear', 'switch'],
    type: 'Paper',
  },
  {
    id: 'pub-003',
    title: 'PhotonNet: Photonic Tensor Cores for Transformer Inference',
    authors: 'AI Division',
    venue: 'arXiv preprint',
    year: '2025',
    category: 'ai',
    abstract:
      'Coherent-light matrix multiplication cores integrated into transformer inference pipelines, reducing attention-layer latency by an order of magnitude.',
    tags: ['transformer', 'acceleration', 'tensor'],
    type: 'Preprint',
  },
  {
    id: 'pub-004',
    title: 'Post-Quantum Key Distribution over Photonic Fiber Backbones',
    authors: 'Security Division',
    venue: 'ICCS Proceedings',
    year: '2024',
    category: 'security',
    abstract:
      'A hybrid QKD framework combining optical eavesdropper detection with lattice-based post-quantum key derivation for resilient transport.',
    tags: ['qkd', 'post-quantum', 'cryptography'],
    type: 'Paper',
  },
  {
    id: 'pub-005',
    title: 'Optical Number Theory: Prime Detection with Phase Interference',
    authors: 'Math Division',
    venue: 'Journal of Computational Optics',
    year: '2024',
    category: 'math',
    abstract:
      'Encoding natural numbers as optical phase vectors enables parallel primality screening through interference patterns, exposing composites in constant depth.',
    tags: ['number-theory', 'primes', 'interference'],
    type: 'Paper',
  },
  {
    id: 'pub-006',
    title: 'A Complete Optical Arithmetic Logic Unit',
    authors: 'Photonic Labs Research Group',
    venue: 'Optics Express',
    year: '2024',
    category: 'photonic',
    abstract:
      'A full ALU implementing addition, subtraction, bitwise logic and comparison entirely with optical gates and phase-encoded operands.',
    tags: ['alu', 'arithmetic', 'logic'],
    type: 'Paper',
  },
];

export interface AlgorithmDoc {
  slug: string;
  title: string;
  category: 'Number Theory' | 'AI' | 'Mathematical Model' | 'Cybersecurity';
  description: string;
  formula: string;
  complexity: string;
  tags: string[];
}

export const algorithms: AlgorithmDoc[] = [
  {
    slug: 'prime-detection',
    title: 'Prime Number Detection Algorithm',
    category: 'Number Theory',
    description:
      'A parallel optical primality screen that encodes integers as phase vectors and uses interference patterns to reveal composite factors in constant depth.',
    formula: 'P(n) = \\bigvee_{d=2}^{\\lfloor\\sqrt{n}\\rfloor} \\neg\\,\\mathrm{int}(n/d)',
    complexity: 'O(√n) classical · O(1) depth optical',
    tags: ['primes', 'interference', 'parallel'],
  },
  {
    slug: 'optical-matrix-model',
    title: 'Optical Matrix Multiplication Model',
    category: 'Mathematical Model',
    description:
      'A coherent-light model for general matrix multiplication where each matrix entry becomes an amplitude modulation and the dot product emerges through interference.',
    formula: 'C_{ij} = \\sum_{k=1}^{n} A_{ik} \\cdot B_{kj}',
    complexity: 'O(n³) classical · O(1) optical depth',
    tags: ['matrix', 'coherent', 'acceleration'],
  },
  {
    slug: 'photon-attention',
    title: 'Photonic Attention Mechanism',
    category: 'AI',
    description:
      'An attention layer implemented on a photonic tensor core, computing scaled dot-product attention through phase-encoded vector interference.',
    formula: '\\mathrm{Attn}(Q,K,V) = \\mathrm{softmax}\\!\\left(\\frac{QK^{T}}{\\sqrt{d_k}}\\right) V',
    complexity: 'O(n²d) classical · O(1) optical depth',
    tags: ['attention', 'transformer', 'ml'],
  },
  {
    slug: 'lattice-key-derivation',
    title: 'Lattice Key Derivation',
    category: 'Cybersecurity',
    description:
      'Module-LWE based key derivation hardened for optical quantum channels, producing post-quantum shared keys under active-channel interception.',
    formula: 'a \\cdot s + e \\equiv b \\pmod{q},\\quad s \\leftarrow \\mathcal{D}_\\sigma',
    complexity: 'O(n log n) per round',
    tags: ['lattice', 'post-quantum', 'key'],
  },
];

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

export const photonicVersions: PhotonicVersion[] = [
  {
    version: 'V1',
    codename: 'Genesis',
    year: '2019',
    cores: 1,
    clockGHz: 0.4,
    memoryTB: 0.002,
    tmarks: 0.8,
    status: 'legacy',
    highlights: ['First single-core optical prototype', 'Proof of concept bistable gate'],
  },
  {
    version: 'V10',
    codename: 'Prism',
    year: '2021',
    cores: 10,
    clockGHz: 2.5,
    memoryTB: 0.05,
    tmarks: 24,
    status: 'legacy',
    highlights: ['Multi-core fabric', 'On-die optical cache'],
  },
  {
    version: 'V20',
    codename: 'Lumen',
    year: '2023',
    cores: 20,
    clockGHz: 5.2,
    memoryTB: 0.25,
    tmarks: 96,
    status: 'released',
    highlights: ['Wavelength-division parallel streams', 'First optical ALU'],
  },
  {
    version: 'V30',
    codename: 'Cascade',
    year: '2024',
    cores: 30,
    clockGHz: 8.8,
    memoryTB: 1.0,
    tmarks: 260,
    status: 'released',
    highlights: ['Photonic memory banks', 'Electro-optic control fabric'],
  },
  {
    version: 'V34',
    codename: 'Apex',
    year: '2025',
    cores: 34,
    clockGHz: 12.0,
    memoryTB: 2.4,
    tmarks: 420,
    status: 'preview',
    highlights: ['34-core interferometric design', 'Integrated photonic AI tensor core'],
  },
];

export interface DownloadItem {
  id: string;
  title: string;
  type: 'PDF' | 'Source' | 'Docs' | 'Dataset';
  size: string;
  category: DomainKey;
  description: string;
  updated: string;
}

export const downloads: DownloadItem[] = [
  { id: 'dl-photonic-cpu', title: 'Photonic CPU V34 Architecture', type: 'PDF', size: '4.2 MB', category: 'photonic', description: 'Full technical architecture document for the V34 photonic processor.', updated: '2025-03-14' },
  { id: 'dl-optical-switch', title: 'Optical Binary Switch — Paper', type: 'PDF', size: '1.8 MB', category: 'photonic', description: 'Mach–Zehnder bistable optical switch research paper.', updated: '2024-11-02' },
  { id: 'dl-alu-source', title: 'Optical ALU Simulator', type: 'Source', size: '640 KB', category: 'photonic', description: 'Source code for the optical arithmetic logic unit simulator.', updated: '2024-09-20' },
  { id: 'dl-primality', title: 'Prime Detection Algorithm', type: 'Source', size: '180 KB', category: 'math', description: 'Reference implementation of the optical prime-number detection algorithm.', updated: '2024-07-11' },
  { id: 'dl-qkd-docs', title: 'Optical QKD Stack — Documentation', type: 'Docs', size: '2.1 MB', category: 'security', description: 'API and protocol documentation for the optical QKD framework.', updated: '2025-01-08' },
  { id: 'dl-dataset-wdm', title: 'WDM Parallelism Dataset', type: 'Dataset', size: '48 MB', category: 'photonic', description: 'Benchmark dataset for wavelength-division parallel light processing.', updated: '2024-12-19' },
];

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

export const blogPosts: BlogPost[] = [
  {
    slug: 'why-photonic-computing-now',
    title: 'Why Photonic Computing, and Why Now',
    excerpt: 'The convergence of silicon photonics maturity and the AI compute wall has opened a window for optical processors to go mainstream.',
    body: `# Why Photonic Computing, and Why Now

For decades optical computing was a laboratory curiosity. Two recent shifts have changed that calculus entirely.

First, **silicon photonics has matured**. Foundries now ship integrated Mach–Zehnder modulators, ring resonators, and hybrid III–V/silicon lasers at scale. The fabrication problem — long the bottleneck — is largely solved.

Second, **the AI compute wall is real**. Transformer training FLOPs double every few months while electronic clock scaling has flatlined. Light carries information at the physical limit and interacts in parallel through interference, which is exactly the structure that matrix multiplication needs.

> Photonic processors do not replace electronic ones. They **accelerate the dense linear algebra** that today dominates every machine-learning pipeline.

At Photonic Labs we are building the full stack — from the optical ALU up to the compiler that targets it — so that the next decade of compute is not bottlenecked by copper.`,
    category: 'photonic',
    author: 'Photonic Labs Editorial',
    date: '2025-05-12',
    readingTime: '6 min',
  },
  {
    slug: 'optical-attention',
    title: 'Running Transformer Attention on Light',
    excerpt: 'How a coherent-light tensor core computes scaled dot-product attention in constant optical depth.',
    body: `# Running Transformer Attention on Light

The dominant cost in modern transformer inference is the attention layer:

$$\\mathrm{Attn}(Q,K,V) = \\mathrm{softmax}\\!\\left(\\frac{QK^{T}}{\\sqrt{d_k}}\\right)V$$

On an optical tensor core, the matrix product $QK^T$ is computed through **amplitude modulation and interference** in constant depth — the dot product materializes as a measured intensity rather than as a sequence of adds.

## What changes
- Latency for the attention layer drops by an order of magnitude.
- Energy per inference drops, since photons do not dissipate heat per gate.
- The softmax and normalization remain on the electronic control fabric.

This hybrid split — optical for linear algebra, electronic for nonlinearities — is where we see the largest near-term wins.`,
    category: 'ai',
    author: 'AI Division',
    date: '2025-04-02',
    readingTime: '8 min',
  },
  {
    slug: 'post-quantum-on-optics',
    title: 'Post-Quantum Cryptography on Optical Hardware',
    excerpt: 'Pairing lattice-based key derivation with optical QKD for channels that remain secure under active interception.',
    body: `# Post-Quantum Cryptography on Optical Hardware

Quantum computers threaten classical public-key cryptography. Photonic channels threaten it further — but they can also defend it.

## The hybrid stack

1. **Optical QKD** detects interception physically — any eavesdropper collapses photon states.
2. **Lattice key derivation** (Module-LWE) provides a post-quantum shared secret.
3. Both run side-by-side on the photonic fabric, with the electronic host handling framing and authentication.

The result is a channel that resists both quantum adversaries and physical compromise — exactly the properties demanded by infrastructure operators over the next decade.`,
    category: 'security',
    author: 'Security Division',
    date: '2025-02-18',
    readingTime: '5 min',
  },
];
