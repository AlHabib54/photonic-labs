'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

import type { Locale } from '@/lib/i18n';

/* =========================================================
   TYPES
========================================================= */

type Dict = Record<string, string>;

/* =========================================================
   ENGLISH
========================================================= */

const en: Dict = {
  /* ---------- Navigation ---------- */

  nav_home: 'Home',
  nav_about: 'About',
  nav_photonic: 'Photonic CPU',
  nav_research: 'Research',
  nav_algorithms: 'Algorithms',
  nav_it: 'IT Projects',
  nav_downloads: 'Downloads',
  nav_blog: 'Blog',
  nav_contact: 'Contact',

  /* ---------- General ---------- */

  search_placeholder:
    'Search research, projects, publications...',
  search_empty: 'No results found.',
  search_title: 'Search',

  footer_tagline:
    'An independent research laboratory advancing photonic computing and intelligent systems.',
  footer_rights: 'All rights reserved.',

  cta_explore: 'Explore Research',
  cta_contact: 'Contact Us',
  cta_read: 'Read More',
  cta_download: 'Download',
  cta_view_all: 'View All',

  lang_label: 'Language',

  /* =========================================================
     HOME
  ========================================================= */

  home_independent_lab:
    'Independent Research Laboratory',

  home_title_1: 'Photonic',
  home_title_2: 'Labs',

  home_description:
    'Exploring the Future of Photonic Computing and Advanced Computational Systems.',

  home_explore_research:
    'Explore Research',

  home_explore_cpu:
    'Explore Photonic CPU',

  home_stat_cpu:
    'Photonic CPU',

  home_stat_cpu_sub:
    'Apex · 34 cores',

  home_stat_clock:
    'Clock',

  home_stat_clock_sub:
    'optical fabric',

  home_stat_throughput:
    'Throughput',

  home_stat_throughput_sub:
    'tensor core',

  home_stat_memory:
    'Memory',

  home_stat_memory_sub:
    'on-die optical',

  home_core_label:
    'PHOTONIC CORE',

  home_online:
    'ONLINE',

  home_research_highlights:
    'Research Highlights',

  home_where_light:
    'Where light becomes',

  home_computation:
    'computation',

  home_research_description:
    'Photonic Labs operates across interlocking technology domains, from optical logic and photonic processors to advanced computational systems.',

  home_featured_projects:
    'Featured Projects',

  home_engineering_stack:
    'Engineering the optical stack',

  home_featured_description:
    'Selected active projects spanning photonic computing, algorithms, and intelligent systems.',

  home_view_all:
    'View All',

  home_latest_publications:
    'Latest Publications',

  home_from_lab_press:
    'From the lab press',

  home_publications_description:
    'Research papers, technical documents, and publications from across the laboratory.',

  home_all_publications:
    'All Publications',

  home_ready:
    'Ready to explore the optical stack?',

  home_browse_full:
    'Browse the architecture, development roadmap, and research behind the Photonic CPU.',

  home_view_cpu:
    'View Photonic CPU',

  /* ---------- Home highlight cards ---------- */

  highlight_cpu_title:
    'Photonic CPU V34',

  highlight_cpu_text:
    'Photonic processor architecture integrating optical computing components and processor subsystems.',

  highlight_neoamona_title:
    'NeoAMONA',

  highlight_neoamona_text:
    'Algorithm research focused on computational number theory and experimental algorithmic methods.',

  highlight_alu_title:
    'Optical ALU',

  highlight_alu_text:
    'Optical arithmetic and logic processing as a building block for photonic computing.',

  highlight_parallel_title:
    'Photonic Computing',

  highlight_parallel_text:
    'Research into parallel optical information processing and photonic processor architectures.',

  /* =========================================================
     PHOTONIC CPU
  ========================================================= */

  cpu_badge:
    'Photonic CPU',

  cpu_optical_processor:
    'Optical processor',

  cpu_description:
    'A photonic processor architecture in which computational operations are implemented using optical logic and photonic processing elements.',

  cpu_cores:
    'Cores',

  cpu_clock:
    'Clock',

  cpu_memory:
    'Memory',

  cpu_throughput:
    'Throughput',

  cpu_profile:
    'Profile',

  cpu_architecture:
    'Architecture Overview',

  cpu_full_optical_stack:
    'The full',

  cpu_optical_stack:
    'optical stack',

  cpu_architecture_description:
    'A layered photonic computing architecture connecting control, processing, registers, and optical memory.',

  cpu_figure_1:
    'Figure 1',

  cpu_datapath:
    'V34 Datapath Block Diagram',

  cpu_technical_diagram:
    'Technical Diagram',

  cpu_datapath_description:
    'Photonic processor datapath connecting instruction decoding, control, optical arithmetic, registers, interconnect, and memory.',

  cpu_instruction_decoder:
    'Instruction Decoder',

  cpu_control_fabric:
    'Control Fabric',

  cpu_optical_alu:
    'Optical ALU',

  cpu_registers:
    'Photonic Registers',

  cpu_interconnect:
    'Photonic Interconnect',

  cpu_memory_block:
    'Optical Memory',

  cpu_performance:
    'Performance & Simulation',

  cpu_scaling:
    'Scaling across generations',

  cpu_scaling_description:
    'Comparison of processor architecture parameters across development generations.',

  cpu_simulated:
    'Simulated',

  cpu_throughput_cores_clock:
    'Throughput vs Cores vs Clock',

  cpu_version_scaling:
    'Version scaling',

  cpu_version_scaling_sub:
    'Cores & Clock',

  cpu_version_history:
    'Version History',

  cpu_from_v1_v34:
    'From V1 to V34',

  cpu_version_history_description:
    'Development history of the photonic processor architecture.',

  cpu_roadmap:
    'Development Roadmap',

  cpu_after_v34:
    'What comes after V34',

  cpu_architecture_paper:
    'Read the architecture paper',

  cpu_architecture_paper_description:
    'Technical documentation and architectural details of the Photonic CPU.',

  cpu_view_research:
    'View Research',

  cpu_metrics_disclaimer:
  'Design and simulation targets shown for the current photonic processor concept. These values should not be interpreted as measured silicon or fabricated hardware results.',

  /* ---------- Version status ---------- */

  status_released:
    'Released',

  status_preview:
    'Preview',

  status_legacy:
    'Legacy',

  /* ---------- Architecture layers ---------- */

  architecture_compiler:
    'Compiler & API Layer',

  architecture_compiler_desc:
    'Software interfaces and compilation concepts for translating computational workloads into photonic instructions.',

  architecture_control:
    'Electro-Optic Control Fabric',

  architecture_control_desc:
    'Control structures coordinating optical processing elements and electronic control components.',

  architecture_cores:
    'Photonic Processing Cores',

  architecture_cores_desc:
    'Optical processing elements responsible for parallel computational operations.',

  architecture_memory:
    'Photonic Memory',

  architecture_memory_desc:
    'Optical memory subsystem associated with the processor architecture.',

  /* ---------- Roadmap ---------- */

  roadmap_completed:
    'Completed',

  roadmap_preview:
    'Current',

  roadmap_research:
    'Research',

  roadmap_future:
    'Future',

  roadmap_v34:
    'V34',

  roadmap_v34_text:
    'Current Photonic CPU architecture and integrated processor components.',

  roadmap_next:
    'Next Architecture',

  roadmap_next_text:
    'Future development of the photonic processor architecture.',

  roadmap_soc:
    'Photonic SoC Research',

  roadmap_soc_text:
    'Long-term research toward increasingly integrated optical computing systems.',
  
  home_cores_short: 'cores',
  home_publications_empty: 'No publications have been added yet.',

  /* =========================================================
     ABOUT
  ========================================================= */

  about_badge:
    'About Photonic Labs',

  about_title_before:
    'An independent laboratory at the',

  about_title_highlight:
    'speed of light',

  about_description:
    'Photonic Labs is an independent research laboratory focused on Photonic Computing, Optical Processors, Artificial Intelligence, Advanced Algorithms, Cybersecurity, and IT Innovation — building the full stack from optical logic primitives to the software and systems that use them.',

  about_mission_title:
    'Mission',

  about_mission_text:
    'To advance the science and engineering of photonic computing — moving computation from electrons to photons — and to make that capability rigorous, reproducible, and accessible to the wider research and engineering community.',

  about_vision_title:
    'Vision',

  about_vision_text:
    'A future in which dense linear algebra, neural inference, and secure communication are accelerated natively by light — where the limits of computation are increasingly shaped by physics and engineering.',

  about_research_goals:
    'Research Goals',

  about_goals_title:
    'Five concrete north stars',

  about_goals_description:
    'Each goal is intended to be measurable, reproducible, and documented so that external researchers can verify and build on the results.',

  about_goal_1:
    'Develop a production-grade optical processor accessible through standard software interfaces.',

  about_goal_2:
    'Build software and compiler components that bridge classical computing with photonic acceleration.',

  about_goal_3:
    'Investigate secure communication and cryptographic protocols using photonic channels.',

  about_goal_4:
    'Study potential acceleration of machine-learning workloads using optical processing architectures.',

  about_goal_5:
    'Publish reproducible research at the intersection of optics, mathematics, computer science, and engineering.',

  about_domains_eyebrow:
    'Technology Domains',

  about_domains_title_before:
    'Five domains,',

  about_domains_title_highlight:
    'one stack',

  about_domains_description:
    'Our research is organized into interconnected technology domains, with each domain contributing to the broader photonic computing stack.',

  about_collaborate_title:
    'Want to collaborate?',

  about_collaborate_text:
    'We welcome collaboration with institutions, engineers, and researchers working on photonic computing and related technologies.',

  about_contact_button:
    'Get in touch',

  /* ---------- Research Domains ---------- */

  domain_photonic_title:
    'Photonic Computing',

  domain_photonic_short:
    'Optical computing and photonic processor architectures.',

  domain_photonic_description:
    'Research and development of optical logic, photonic arithmetic, processor components, and photonic computing architectures.',

  domain_ai_title:
    'Artificial Intelligence',

  domain_ai_short:
    'AI algorithms and intelligent computing systems.',

  domain_ai_description:
    'Research and experiments involving artificial intelligence, algorithms, and intelligent computing systems.',

  domain_security_title:
    'Cybersecurity',

  domain_security_short:
    'Security systems, defensive technologies, and security research.',

  domain_security_description:
    'Research and practical projects related to cybersecurity, system security, and defensive computing.',

  domain_math_title:
    'Algorithms & Mathematics',

  domain_math_short:
    'Algorithms, mathematical models, and computational research.',

  domain_math_description:
    'Research into algorithms, number theory, computational mathematics, and experimental computational models.',

  domain_it_title:
    'IT Systems',

  domain_it_short:
    'Software, networking, infrastructure, and IT projects.',

  domain_it_description:
    'Practical IT projects covering software, networking, infrastructure, systems, and related technologies.',

  
  cpu_radar_cores: 'Cores',
  cpu_radar_clock: 'Clock GHz',
  cpu_radar_memory: 'Memory',
  cpu_radar_throughput: 'Throughput',

  cpu_ghz_short: 'GHz',

  roadmap_in_progress: 'In Progress',
 
  roadmap_item_completed:
    '30-core fabric with photonic memory banks and electro-optic control.',

  roadmap_item_preview:
    '34-core interferometric processor with integrated photonic AI tensor core.',

  roadmap_item_in_progress:
    'Hybrid opto-electronic system targeting 1000+ TOPS tensor throughput.',

  roadmap_item_research:
    'Entire SoC datapath optical — control plane remains electronic.',

  /* =========================================================
     PROJECTS
  ========================================================= */

  projects_badge:
    'IT Projects',

  projects_title_before:
    'Software, AI, security &',

  projects_title_highlight:
    'network tools',

  projects_description:
    'The engineering side of the laboratory — software projects, AI accelerators, cybersecurity frameworks, network tooling, and experimental computing systems.',

  projects_type_software:
    'Software Projects',

  projects_type_ai:
    'AI Projects',

  projects_type_security:
    'Cybersecurity Projects',

  projects_type_network:
    'Network Tools',

  projects_filter_all:
    'All Projects',

  projects_filter_photonic:
    'Photonic',

  projects_filter_ai:
    'AI Projects',

  projects_filter_security:
    'Cybersecurity',

  projects_filter_it:
    'Software / Network',

  projects_search_placeholder:
    'Search projects...',

  projects_no_results:
    'No projects match your filter.',

  project_optical_logic_title: 'Optical Logic Gates',
  project_optical_logic_summary:
    'Implementation and verification of optical logic gates.',
  project_optical_logic_description:
    'Research and simulation of optical logic operations including AND, OR, XOR, and NOT gates as building blocks for photonic computing.',

  project_optical_adders_title: 'Optical Half Adder & Full Adder',
  project_optical_adders_summary:
    'Optical arithmetic circuits for binary addition.',
  project_optical_adders_description:
    'Development and verification of optical half-adder and full-adder circuits using optical logic components.',

  project_optical_alu_title: 'Optical ALU',
  project_optical_alu_summary:
    'Optical arithmetic and logic unit research project.',
  project_optical_alu_description:
    'Development and testing of optical arithmetic and logic operations as a foundation for a photonic processing unit.',

  project_optical_alu_4bit_title: 'Optical 4-bit ALU',
  project_optical_alu_4bit_summary:
    'Four-bit optical arithmetic and logic unit.',
  project_optical_alu_4bit_description:
    'Extension of the optical ALU architecture to four-bit operations and validation of the implemented operations.',

  project_optical_alu_8bit_title: 'Optical 8-bit ALU',
  project_optical_alu_8bit_summary:
    'Eight-bit optical arithmetic and logic unit.',
  project_optical_alu_8bit_description:
    'Experimental extension of the photonic ALU architecture toward eight-bit operations.',

  project_photonic_register_title: 'Photonic Register',
  project_photonic_register_summary:
    'Photonic register component for a processor architecture.',
  project_photonic_register_description:
    'Development and testing of a photonic register supporting LOAD, HOLD, and CLEAR operations.',

  project_program_counter_title: 'Photonic Program Counter',
  project_program_counter_summary:
    'Program counter component for the photonic processor architecture.',
  project_program_counter_description:
    'Development and validation of a program counter component as part of the photonic CPU architecture.',

  project_instruction_decoder_title: 'Photonic Instruction Decoder',
  project_instruction_decoder_summary:
    'Instruction decoding component for the photonic CPU.',
  project_instruction_decoder_description:
    'Development and validation of an instruction decoder as part of the photonic CPU architecture.',

  project_photonic_cpu_core_title: 'Photonic CPU Core',
  project_photonic_cpu_core_summary:
    'Integration of photonic processor components into a CPU core.',
  project_photonic_cpu_core_description:
    'Integration and testing of photonic processor components including registers, program counter, instruction decoding, and arithmetic logic.',

  project_neoamona_title: 'NeoAMONA',
  project_neoamona_summary:
    'Experimental algorithm research project.',
  project_neoamona_description:
    'Algorithm research project developed as part of the laboratory work on computational algorithms.',

  project_zetatds_title: 'ZetaTDS-Sieve',
  project_zetatds_summary:
    'Experimental prime-detection algorithm project.',
  project_zetatds_description:
    'Algorithm research and experimentation related to prime detection and computational number theory.',


  projects_status_active: 'Active',
  projects_status_experimental: 'Experimental',
  projects_status_archived: 'Archived',

  projects_detail_project: 'Project',

  projects_detail_status: 'Status',
  projects_detail_year: 'Year',
  projects_detail_category: 'Category',

  projects_detail_overview: 'Project Overview',
  projects_detail_focus: 'Research Focus',

  projects_detail_resources: 'Project Resources',
  projects_detail_resources_description:
    'Source code and project files associated with this project.',

  projects_detail_back: 'Back to Projects',

  projects_detail_not_found: 'Project Not Found',
  projects_detail_not_found_description:
    'The requested project could not be found.',


  projects_category_photonic: 'Photonic',
  projects_category_ai: 'AI',
  projects_category_security: 'Cybersecurity',
  projects_category_math: 'Mathematics',
  projects_category_it: 'Software / Network',


  projects_alu_objective_title: 'Research Objective',
  projects_alu_objective_text:
    'The Optical ALU project investigates how arithmetic and logic operations can be organized within an optical processing architecture. The current work focuses on developing and evaluating the computational building blocks required for a larger photonic processor.',

  projects_alu_architecture_title: 'Architecture',
  projects_alu_architecture_text:
    'The Optical ALU is treated as a core computational block within the broader Photonic CPU architecture. Its development is connected to the optical logic gates, adders, registers, instruction decoder, and other processor components.',

  projects_alu_operations_title: 'Operations',
  projects_alu_operation_1: 'Arithmetic operations',
  projects_alu_operation_2: 'Logical operations',
  projects_alu_operation_3: 'Binary data processing',
  projects_alu_operation_4: 'Integration with photonic datapath components',

  projects_alu_simulation_title: 'Simulation & Validation',
  projects_alu_simulation_text:
    'Simulation is used to examine the proposed optical structures, verify their logical behaviour, and investigate how the arithmetic and logic paths can be connected before considering larger-scale processor integration.',

  projects_alu_scope_title: 'Current Scope',
  projects_alu_scope_text:
    'The project is currently treated as an experimental research and development effort. The 4-bit and 8-bit extensions represent development stages of the architecture and should not be interpreted as measurements of completed physical hardware.',

  projects_alu_architecture_flow_title: 'Computational Flow',
  projects_alu_flow_input: 'Input',
  projects_alu_flow_logic: 'Optical Logic',
  projects_alu_flow_adder: 'Optical Adder',
  projects_alu_flow_alu: 'Optical ALU',
  projects_alu_flow_output: 'Output',

  projects_alu_resource_title: 'Project Resources',
  projects_alu_resource_description:
    'Source code, simulation files, and related project material available through Photonic Labs.',


  projects_alu_blocks_title:
    'Optical ALU Building Blocks',
  projects_alu_blocks_text:
    'The Optical ALU is organized into logical, arithmetic and selection subsystems that cooperate to generate the final optical output.',

  /* =========================================================
     RESEARCH
  ========================================================= */

  research_badge:
    'Research',

  research_title_before:
    'Publications &',

  research_title_highlight:
    'optical research',

  research_description:
    'Research papers, preprints, technical documents, and other research outputs spanning the photonic computing stack.',

  research_streams_eyebrow:
    'Core Research Streams',

  research_streams_title:
    'Four streams of optical computing',

  research_stream_switch_title:
    'Optical Binary Switch',

  research_stream_switch_description:
    'Research into bistable optical switching and optical logic for photonic computing systems.',

  research_stream_alu_title:
    'Optical ALU',

  research_stream_alu_description:
    'Research into arithmetic and logic operations implemented with optical processing elements.',

  research_stream_memory_title:
    'Optical Memory Concepts',

  research_stream_memory_description:
    'Research into photonic memory concepts and optical read/write mechanisms.',

  research_stream_parallel_title:
    'Parallel Light Processing',

  research_stream_parallel_description:
    'Research into wavelength-based parallelism and simultaneous optical compute streams.',

  research_filter_all:
    'All',

  research_filter_photonic:
    'Photonic',

  research_filter_ai:
    'AI',

  research_filter_security:
    'Security',

  research_filter_math:
    'Math',

  research_filter_it:
    'IT',

  research_search_placeholder:
    'Filter publications...',

  research_no_results:
    'No publications match your filter.',

  research_download_pdf:
    'Download PDF',

  research_close:
    'Close',

  research_projects_eyebrow:
  'Current Research',

  research_projects_title:
    'Research Projects',

  research_projects_description:
    'Current research and development projects covering photonic computing, algorithms, and related computational technologies.',

  /* =========================================================
     ALGORITHMS
  ========================================================= */

  algorithms_badge:
    'Algorithms',

  algorithms_title_before:
    'Algorithms &',

  algorithms_title_highlight:
    'mathematical models',

  algorithms_description:
    'Formal documentation for the algorithms used across the research stack, including complexity models and mathematical formulations.',

  algorithms_filter_all:
    'All',

  algorithms_filter_number_theory:
    'Number Theory',

  algorithms_filter_ai:
    'AI',

  algorithms_filter_mathematical_model:
    'Mathematical Model',

  algorithms_filter_cybersecurity:
    'Cybersecurity',

  algorithms_category_Number_Theory:
    'Number Theory',

  algorithms_category_AI:
    'AI',

  algorithms_category_Mathematical_Model:
    'Mathematical Model',

  algorithms_category_Cybersecurity:
    'Cybersecurity',

  algorithms_complexity:
    'Complexity',

  algorithms_overview:
    'Overview',

  algorithms_revision:
    'Revision',

  algorithms_formula:
    'Formula',

  algorithms_copy_formula:
    'Copy formula',

  algorithms_latex_note:
    'LaTeX source — copy to render in your editor.',

  algorithms_no_results:
    'No algorithms match the selected filter.',

  algorithms_reference_title:
    'Reference implementations',

  algorithms_reference_description:
    'Source code for these algorithms is available in Downloads.',

  algorithms_browse_source:
    'Browse Source',
    
  /* =========================================================
     DOWNLOADS
  ========================================================= */

  downloads_badge:
    'Downloads',

  downloads_title_before:
    'Papers, source,',

  downloads_title_highlight:
    'documentation',

  downloads_description:
    'Open research artifacts — PDF papers, reference source code, technical documentation, and project archives from across the laboratory.',

  downloads_filter_all:
    'All',

  downloads_filter_photonic:
    'Photonic',

  downloads_filter_security:
    'Security',

  downloads_filter_math:
    'Math',

  downloads_type_all:
    'All',

  downloads_type_pdf:
    'PDF',

  downloads_type_source:
    'Source',

  downloads_type_docs:
    'Docs',

  downloads_type_dataset:
    'Dataset',

  downloads_type_zip:
    'ZIP',

  downloads_search_placeholder:
    'Search downloads...',

  downloads_no_results:
    'No downloads match your filters.',

  downloads_updated:
    'Updated',

  downloads_download:
    'Download',

  /* =========================================================
     Contact
  ========================================================= */

  contact_badge: 'Contact',
  contact_title_before: "Let's build the",
  contact_title_highlight: 'optical future',
  contact_description:
    'Research collaboration, technical partnerships, or general inquiries — reach out through the form below or via our direct channels.',

  contact_form_title: 'Send us a message',
  contact_form_response_time: 'We typically respond within 48 hours.',

  contact_success_title: 'Message received',
  contact_success_description:
    "Thank you for reaching out. We'll be in touch soon.",
  contact_send_another: 'Send another',

  contact_name: 'Name',
  contact_name_placeholder: 'Your full name',

  contact_email: 'Email',
  contact_email_placeholder: 'you@example.com',

  contact_subject: 'Subject',
  contact_subject_placeholder: 'What is this about?',

  contact_message: 'Message',
  contact_message_placeholder:
    'Tell us about your project, question, or collaboration idea…',

  contact_sending: 'Sending…',
  contact_send_message: 'Send Message',

  contact_direct_channels: 'Direct Channels',

  contact_laboratory_title: 'Laboratory',
  contact_laboratory_description:
    'Photonic Labs is an independent research laboratory. We do not maintain a public office; all collaboration is conducted remotely with partner institutions.',

  contact_response: 'Response',
  contact_status: 'Status',
  contact_open: 'Open',

  contact_general_inquiry: 'General Inquiry',

  contact_toast_success_title: 'Message sent',
  contact_toast_success_description: 'We will get back to you shortly.',

  contact_toast_error_title: 'Something went wrong',
  contact_toast_error_description: 'Please try again later.',

  /* =========================================================
     Blog
  ========================================================= */

  blog_badge: 'Blog',
  blog_title_before: 'Technical articles &',
  blog_title_highlight: 'insights',
  blog_description:
    'Photonic computing news, AI deep-dives, and cybersecurity insights from the laboratory.',

  blog_category_all: 'All',
  blog_category_photonic: 'Photonic',
  blog_category_ai: 'AI',
  blog_category_security: 'Security',
  blog_category_math: 'Mathematics',
  blog_category_it: 'IT',

  blog_search_placeholder: 'Search articles...',

  blog_back_to_articles: 'Back to all articles',
  blog_article_preview: 'Article PDF Preview',
  blog_pdf_viewer: 'PDF Viewer',

  blog_share_prompt: 'Found this useful? Share with your peers.',
  blog_share: 'Share',

  blog_read: 'Read',
  blog_no_results: 'No articles found.',
};

/* =========================================================
   ARABIC
========================================================= */

const ar: Dict = {
  ...en,

  /* ---------- Navigation ---------- */

  nav_home: 'الرئيسية',
  nav_about: 'من نحن',
  nav_photonic: 'المعالج الفوتوني',
  nav_research: 'الأبحاث',
  nav_algorithms: 'الخوارزميات',
  nav_it: 'مشاريع تقنية المعلومات',
  nav_downloads: 'التحميلات',
  nav_blog: 'المدونة',
  nav_contact: 'اتصل بنا',

  search_placeholder:
    'ابحث في الأبحاث والمشاريع والمنشورات...',
  search_empty: 'لا توجد نتائج.',
  search_title: 'بحث',

  footer_tagline:
    'مختبر أبحاث مستقل يطور الحوسبة الفوتونية والأنظمة الحاسوبية المتقدمة.',
  footer_rights: 'جميع الحقوق محفوظة.',

  cta_explore: 'استكشف الأبحاث',
  cta_contact: 'اتصل بنا',
  cta_read: 'اقرأ المزيد',
  cta_download: 'تحميل',
  cta_view_all: 'عرض الكل',

  lang_label: 'اللغة',

  /* ---------- Home ---------- */

  home_independent_lab:
    'مختبر أبحاث مستقل',

  home_title_1: 'Photonic',
  home_title_2: 'Labs',

  home_description:
    'استكشاف مستقبل الحوسبة الفوتونية والأنظمة الحاسوبية المتقدمة.',

  home_explore_research:
    'استكشف الأبحاث',

  home_explore_cpu:
    'استكشف المعالج الفوتوني',

  home_stat_cpu:
    'المعالج الفوتوني',

  home_stat_cpu_sub:
    'Apex · 34 نواة',

  home_stat_clock:
    'التردد',

  home_stat_clock_sub:
    'البنية الضوئية',

  home_stat_throughput:
    'المعدل الحسابي',

  home_stat_throughput_sub:
    'النواة المتجهية',

  home_stat_memory:
    'الذاكرة',

  home_stat_memory_sub:
    'ذاكرة ضوئية مدمجة',

  home_core_label:
    'النواة الفوتونية',

  home_online:
    'متصل',

  home_research_highlights:
    'أبرز الأبحاث',

  home_where_light:
    'حيث يتحول الضوء إلى',

  home_computation:
    'حوسبة',

  home_research_description:
    'يعمل Photonic Labs عبر مجموعة من مجالات التقنية المترابطة، من المنطق البصري والمعالجات الفوتونية إلى الأنظمة والخوارزميات الحاسوبية المتقدمة.',

  home_featured_projects:
    'المشاريع البارزة',

  home_engineering_stack:
    'هندسة المنظومة الفوتونية',

  home_featured_description:
    'مجموعة مختارة من المشاريع النشطة في الحوسبة الفوتونية والخوارزميات والأنظمة الذكية.',

  home_view_all:
    'عرض الكل',

  home_latest_publications:
    'أحدث المنشورات',

  home_from_lab_press:
    'من منشورات المختبر',

  home_publications_description:
    'أبحاث ووثائق تقنية ومنشورات علمية من مختلف أقسام المختبر.',

  home_all_publications:
    'جميع المنشورات',

  home_ready:
    'هل أنت مستعد لاستكشاف المنظومة الفوتونية؟',

  home_browse_full:
    'استكشف المعمارية وخارطة التطوير والأبحاث المرتبطة بالمعالج الفوتوني.',

  home_view_cpu:
    'عرض المعالج الفوتوني',

  highlight_cpu_title:
    'المعالج الفوتوني V34',

  highlight_cpu_text:
    'معمارية لمعالج فوتوني تجمع مكونات الحوسبة الضوئية ووحدات المعالج المختلفة.',

  highlight_neoamona_title:
    'NeoAMONA',

  highlight_neoamona_text:
    'بحث خوارزمي يركز على نظرية الأعداد والخوارزميات الحسابية التجريبية.',

  highlight_alu_title:
    'ALU ضوئية',

  highlight_alu_text:
    'تنفيذ العمليات الحسابية والمنطقية باستخدام المكونات الضوئية كأساس للحوسبة الفوتونية.',

  highlight_parallel_title:
    'الحوسبة الفوتونية',

  highlight_parallel_text:
    'أبحاث في المعالجة المتوازية للمعلومات ضوئيًا ومعمارية المعالجات الفوتونية.',

  /* ---------- CPU ---------- */

  cpu_badge:
    'المعالج الفوتوني',

  cpu_optical_processor:
    'المعالج البصري',

  cpu_description:
    'معمارية لمعالج فوتوني تُنفَّذ فيها العمليات الحسابية باستخدام المنطق البصري وعناصر المعالجة الفوتونية.',

  cpu_cores:
    'الأنوية',

  cpu_clock:
    'التردد',

  cpu_memory:
    'الذاكرة',

  cpu_throughput:
    'المعدل الحسابي',

  cpu_profile:
    'المواصفات',

  cpu_architecture:
    'نظرة عامة على المعمارية',

  cpu_full_optical_stack:
    'المنظومة',

  cpu_optical_stack:
    'الفوتونية الكاملة',

  cpu_architecture_description:
    'معمارية متعددة الطبقات للحوسبة الفوتونية تربط بين التحكم والمعالجة والسجلات والذاكرة الضوئية.',

  cpu_figure_1:
    'الشكل 1',

  cpu_datapath:
    'المخطط الكتلي لمسار البيانات V34',

  cpu_technical_diagram:
    'مخطط تقني',

  cpu_datapath_description:
    'مسار بيانات للمعالج الفوتوني يربط وحدة فك التعليمات والتحكم والوحدة الحسابية والسجلات والربط والذاكرة.',

  cpu_instruction_decoder:
    'وحدة فك التعليمات',

  cpu_control_fabric:
    'بنية التحكم',

  cpu_optical_alu:
    'الوحدة الحسابية والمنطقية الضوئية',

  cpu_registers:
    'السجلات الفوتونية',

  cpu_interconnect:
    'الربط الفوتوني',

  cpu_memory_block:
    'الذاكرة الضوئية',

  cpu_performance:
    'الأداء والمحاكاة',

  cpu_scaling:
    'التطور عبر الأجيال',

  cpu_scaling_description:
    'مقارنة معايير معمارية المعالج عبر أجيال التطوير.',

  cpu_simulated:
    'محاكاة',

  cpu_throughput_cores_clock:
    'المعدل الحسابي مقابل الأنوية والتردد',

  cpu_version_scaling:
    'تطور الإصدارات',

  cpu_version_scaling_sub:
    'الأنوية والتردد',

  cpu_version_history:
    'سجل الإصدارات',

  cpu_from_v1_v34:
    'من V1 إلى V34',

  cpu_version_history_description:
    'تاريخ تطور معمارية المعالج الفوتوني.',

  cpu_roadmap:
    'خارطة التطوير',

  cpu_after_v34:
    'ما بعد V34',

  cpu_architecture_paper:
    'قراءة وثيقة المعمارية',

  cpu_architecture_paper_description:
    'الوثائق التقنية والتفاصيل المعمارية للمعالج الفوتوني.',

  cpu_view_research:
    'عرض الأبحاث',

  cpu_metrics_disclaimer:
  'القيم المعروضة هي أهداف تصميم ومحاكاة لمفهوم المعالج الضوئي الحالي، ولا ينبغي تفسيرها على أنها نتائج قياس فعلية لشريحة مصنّعة.',

  status_released:
    'مُصدر',

  status_preview:
    'معاينة',

  status_legacy:
    'سابق',

  architecture_compiler:
    'طبقة المترجم وواجهة API',

  architecture_compiler_desc:
    'واجهات برمجية ومفاهيم ترجمة لتحويل الأحمال الحسابية إلى تعليمات فوتونية.',

  architecture_control:
    'بنية التحكم الكهروضوئية',

  architecture_control_desc:
    'هياكل تحكم تنسق عناصر المعالجة الضوئية والمكونات الإلكترونية.',

  architecture_cores:
    'أنوية المعالجة الفوتونية',

  architecture_cores_desc:
    'عناصر المعالجة الضوئية المسؤولة عن العمليات الحسابية المتوازية.',

  architecture_memory:
    'الذاكرة الفوتونية',

  architecture_memory_desc:
    'منظومة الذاكرة الضوئية المرتبطة بمعمارية المعالج.',

  roadmap_completed:
    'مكتمل',

  roadmap_preview:
    'الحالي',

  roadmap_research:
    'بحث',

  roadmap_future:
    'مستقبل',

  roadmap_v34:
    'V34',

  roadmap_v34_text:
    'المعمارية الحالية للمعالج الفوتوني ومكونات المعالج المتكاملة.',

  roadmap_next:
    'المعمارية التالية',

  roadmap_next_text:
    'تطويرات مستقبلية لمعمارية المعالج الفوتوني.',

  roadmap_soc:
    'أبحاث النظام الفوتوني على شريحة واحدة',

  roadmap_soc_text:
    'أبحاث طويلة المدى نحو أنظمة حوسبة ضوئية أكثر تكاملًا.',

  home_cores_short: 'نواة',
  home_publications_empty: 'لم تتم إضافة منشورات بعد.',

  /* =========================================================
     ABOUT
  ========================================================= */

  about_badge:
    'حول Photonic Labs',

  about_title_before:
    'مختبر أبحاث مستقل عند',

  about_title_highlight:
    'سرعة الضوء',

  about_description:
    'Photonic Labs هو مختبر أبحاث مستقل يركز على الحوسبة الفوتونية والمعالجات الضوئية والذكاء الاصطناعي والخوارزميات المتقدمة والأمن السيبراني وابتكارات تقنية المعلومات، مع تطوير المنظومة بدءًا من عناصر المنطق البصري وصولًا إلى البرمجيات والأنظمة المستخدمة معها.',

  about_mission_title:
    'المهمة',

  about_mission_text:
    'تطوير علم وهندسة الحوسبة الفوتونية ونقل العمليات الحسابية من الإلكترونات إلى الفوتونات، مع جعل هذه التقنيات دقيقة وقابلة لإعادة الإنتاج ومتاحة للمجتمع البحثي والهندسي.',

  about_vision_title:
    'الرؤية',

  about_vision_text:
    'الوصول إلى مستقبل يتم فيه تسريع الجبر الخطي الكثيف والاستدلال العصبي والاتصالات الآمنة باستخدام الضوء بصورة طبيعية، بحيث تلعب الفيزياء والهندسة دورًا أساسيًا في تحديد حدود الحوسبة.',

  about_research_goals:
    'أهداف البحث',

  about_goals_title:
    'خمسة أهداف رئيسية',

  about_goals_description:
    'نهدف إلى أن تكون الأهداف قابلة للقياس والتكرار والتوثيق، بحيث يستطيع الباحثون الخارجيون التحقق من النتائج والبناء عليها.',

  about_goal_1:
    'تطوير معالج ضوئي عملي يمكن الوصول إليه من خلال واجهات برمجية قياسية.',

  about_goal_2:
    'تطوير مكونات البرمجيات والمترجمات التي تربط الحوسبة التقليدية بالتسريع الفوتوني.',

  about_goal_3:
    'دراسة الاتصالات الآمنة والبروتوكولات التشفيرية باستخدام القنوات الفوتونية.',

  about_goal_4:
    'دراسة إمكانية تسريع أحمال التعلم الآلي باستخدام معمارية المعالجة الضوئية.',

  about_goal_5:
    'نشر أبحاث قابلة لإعادة الإنتاج عند تقاطع البصريات والرياضيات وعلوم الحاسوب والهندسة.',

  about_domains_eyebrow:
    'مجالات التقنية',

  about_domains_title_before:
    'خمسة مجالات،',

  about_domains_title_highlight:
    'منظومة واحدة',

  about_domains_description:
    'ينظم المختبر أبحاثه ضمن مجالات تقنية مترابطة، يساهم كل منها في بناء منظومة الحوسبة الفوتونية.',

  about_collaborate_title:
    'هل ترغب في التعاون؟',

  about_collaborate_text:
    'نرحب بالتعاون مع المؤسسات والمهندسين والباحثين العاملين في مجال الحوسبة الفوتونية والتقنيات ذات الصلة.',

  about_contact_button:
    'تواصل معنا',

  /* ---------- Research Domains ---------- */

  domain_photonic_title:
    'الحوسبة الفوتونية',

  domain_photonic_short:
    'الحوسبة الضوئية ومعماريات المعالجات الفوتونية.',

  domain_photonic_description:
    'البحث والتطوير في المنطق البصري والحسابات الضوئية ومكونات المعالج ومعماريات الحوسبة الفوتونية.',

  domain_ai_title:
    'الذكاء الاصطناعي',

  domain_ai_short:
    'خوارزميات الذكاء الاصطناعي وأنظمة الحوسبة الذكية.',

  domain_ai_description:
    'أبحاث وتجارب في الذكاء الاصطناعي والخوارزميات وأنظمة الحوسبة الذكية.',

  domain_security_title:
    'الأمن السيبراني',

  domain_security_short:
    'أنظمة الأمن والتقنيات الدفاعية وأبحاث الأمن.',

  domain_security_description:
    'أبحاث ومشاريع عملية متعلقة بالأمن السيبراني وأمن الأنظمة والحوسبة الدفاعية.',

  domain_math_title:
    'الخوارزميات والرياضيات',

  domain_math_short:
    'الخوارزميات والنماذج الرياضية والبحث الحاسوبي.',

  domain_math_description:
    'أبحاث في الخوارزميات ونظرية الأعداد والرياضيات الحاسوبية والنماذج الحسابية التجريبية.',

  domain_it_title:
    'أنظمة تقنية المعلومات',

  domain_it_short:
    'البرمجيات والشبكات والبنية التحتية ومشاريع تقنية المعلومات.',

  domain_it_description:
    'مشاريع عملية في البرمجيات والشبكات والبنية التحتية والأنظمة والتقنيات ذات الصلة.',

  cpu_radar_cores: 'الأنوية',
  cpu_radar_clock: 'التردد GHz',
  cpu_radar_memory: 'الذاكرة',
  cpu_radar_throughput: 'المعدل الحسابي',

  cpu_ghz_short: 'GHz',

  roadmap_in_progress: 'قيد التطوير',

  roadmap_item_completed:
    'بنية من 30 نواة مع بنوك ذاكرة فوتونية وتحكم كهروضوئي.',

  roadmap_item_preview:
    'معالج تداخلي من 34 نواة مع نواة فوتونية متكاملة لمعالجة الذكاء الاصطناعي.',

  roadmap_item_in_progress:
    'نظام هجين ضوئي-إلكتروني يستهدف معدلًا حسابيًا يتجاوز 1000 TOPS.',

  roadmap_item_research:
    'مسار بيانات بصري بالكامل ضمن النظام على الشريحة، مع بقاء طبقة التحكم إلكترونية.',

  /* =========================================================
     PROJECTS
  ========================================================= */

  projects_badge:
    'مشاريع تقنية المعلومات',

  projects_title_before:
    'البرمجيات والذكاء الاصطناعي والأمن و',

  projects_title_highlight:
    'أدوات الشبكات',

  projects_description:
    'الجانب الهندسي من المختبر — مشاريع البرمجيات، ومسرّعات الذكاء الاصطناعي، وأطر الأمن السيبراني، وأدوات الشبكات، وأنظمة الحوسبة التجريبية.',

  projects_type_software:
    'مشاريع البرمجيات',

  projects_type_ai:
    'مشاريع الذكاء الاصطناعي',

  projects_type_security:
    'مشاريع الأمن السيبراني',

  projects_type_network:
    'أدوات الشبكات',

  projects_filter_all:
    'جميع المشاريع',

  projects_filter_photonic:
    'فوتوني',

  projects_filter_ai:
    'مشاريع الذكاء الاصطناعي',

  projects_filter_security:
    'الأمن السيبراني',

  projects_filter_it:
    'البرمجيات / الشبكات',

  projects_search_placeholder:
    'ابحث في المشاريع...',

  projects_no_results:
    'لا توجد مشاريع تطابق الفلتر المحدد.',

  project_optical_logic_title: 'البوابات المنطقية الضوئية',
  project_optical_logic_summary:
    'تنفيذ والتحقق من البوابات المنطقية الضوئية.',
  project_optical_logic_description:
    'بحث ومحاكاة العمليات المنطقية الضوئية، بما في ذلك AND وOR وXOR وNOT، باعتبارها لبنات أساسية للحوسبة الضوئية.',

  project_optical_adders_title: 'نصف الجامع والجامع الكامل الضوئي',
  project_optical_adders_summary:
    'دوائر حسابية ضوئية لتنفيذ الجمع الثنائي.',
  project_optical_adders_description:
    'تطوير والتحقق من دوائر نصف الجامع والجامع الكامل باستخدام مكونات المنطق الضوئي.',

  project_optical_alu_title: 'وحدة الحساب والمنطق الضوئية',
  project_optical_alu_summary:
    'مشروع بحثي حول وحدة حساب ومنطق ضوئية.',
  project_optical_alu_description:
    'تطوير ودراسة العمليات الحسابية والمنطقية الضوئية كأساس لوحدة معالجة ضوئية.',

  project_optical_alu_4bit_title: 'وحدة ALU ضوئية ذات 4 بت',
  project_optical_alu_4bit_summary:
    'وحدة حساب ومنطق ضوئية بأربع بتات.',
  project_optical_alu_4bit_description:
    'توسيع معمارية ALU الضوئية لتنفيذ عمليات ذات أربع بتات والتحقق من العمليات المطبقة.',

  project_optical_alu_8bit_title: 'وحدة ALU ضوئية ذات 8 بت',
  project_optical_alu_8bit_summary:
    'وحدة حساب ومنطق ضوئية بثماني بتات.',
  project_optical_alu_8bit_description:
    'توسيع تجريبي لمعمارية ALU الضوئية نحو تنفيذ عمليات ذات ثماني بتات.',

  project_photonic_register_title: 'السجل الضوئي',
  project_photonic_register_summary:
    'مكون سجل ضوئي ضمن معمارية المعالج.',
  project_photonic_register_description:
    'تطوير ودراسة سجل ضوئي يدعم عمليات LOAD وHOLD وCLEAR.',

  project_program_counter_title: 'عداد البرامج الضوئي',
  project_program_counter_summary:
    'مكون عداد البرامج ضمن معمارية المعالج الضوئي.',
  project_program_counter_description:
    'تطوير والتحقق من مكون عداد البرامج كجزء من معمارية Photonic CPU.',

  project_instruction_decoder_title: 'وحدة فك التعليمات الضوئية',
  project_instruction_decoder_summary:
    'مكون لفك التعليمات ضمن المعالج الضوئي.',
  project_instruction_decoder_description:
    'تطوير والتحقق من وحدة فك التعليمات كجزء من معمارية Photonic CPU.',

  project_photonic_cpu_core_title: 'نواة المعالج الضوئي',
  project_photonic_cpu_core_summary:
    'دمج مكونات المعالج الضوئي في نواة معالج.',
  project_photonic_cpu_core_description:
    'دمج ودراسة مكونات المعالج الضوئي، بما في ذلك السجلات وعداد البرامج وفك التعليمات والمنطق الحسابي.',

  project_neoamona_title: 'NeoAMONA',
  project_neoamona_summary:
    'مشروع بحث خوارزمي تجريبي.',
  project_neoamona_description:
    'مشروع بحث في الخوارزميات تم تطويره ضمن أعمال المختبر في مجال الخوارزميات الحاسوبية.',

  project_zetatds_title: 'ZetaTDS-Sieve',
  project_zetatds_summary:
    'مشروع تجريبي لاكتشاف الأعداد الأولية.',
  project_zetatds_description:
    'بحث وتجارب خوارزمية مرتبطة باكتشاف الأعداد الأولية ونظرية الأعداد الحاسوبية.',


  projects_status_active: 'نشط',
  projects_status_experimental: 'تجريبي',
  projects_status_archived: 'مؤرشف',

  projects_detail_project: 'المشروع',

  projects_detail_status: 'الحالة',
  projects_detail_year: 'السنة',
  projects_detail_category: 'التصنيف',

  projects_detail_overview: 'نظرة عامة على المشروع',
  projects_detail_focus: 'مجالات البحث',

  projects_detail_resources: 'موارد المشروع',
  projects_detail_resources_description:
    'الشفرة المصدرية وملفات المشروع المرتبطة بهذا المشروع.',

  projects_detail_back: 'العودة إلى المشاريع',

  projects_detail_not_found: 'المشروع غير موجود',
  projects_detail_not_found_description:
    'تعذر العثور على المشروع المطلوب.',


  projects_category_photonic: 'الحوسبة الضوئية',
  projects_category_ai: 'الذكاء الاصطناعي',
  projects_category_security: 'الأمن السيبراني',
  projects_category_math: 'الرياضيات',
  projects_category_it: 'البرمجيات / الشبكات',


  projects_alu_objective_title: 'هدف البحث',
  projects_alu_objective_text:
    'يبحث مشروع Optical ALU في كيفية تنظيم العمليات الحسابية والمنطقية ضمن معمارية معالجة ضوئية. ويركز العمل الحالي على تطوير ودراسة اللبنات الحسابية المطلوبة لبناء معالج ضوئي أكبر.',

  projects_alu_architecture_title: 'المعمارية',
  projects_alu_architecture_text:
    'يتم التعامل مع Optical ALU باعتبارها وحدة حسابية أساسية ضمن معمارية Photonic CPU الأوسع. ويرتبط تطويرها بالبوابات المنطقية الضوئية والجامعات والسجلات ووحدة فك التعليمات وبقية مكونات المعالج.',

  projects_alu_operations_title: 'العمليات',
  projects_alu_operation_1: 'العمليات الحسابية',
  projects_alu_operation_2: 'العمليات المنطقية',
  projects_alu_operation_3: 'معالجة البيانات الثنائية',
  projects_alu_operation_4: 'التكامل مع مسار البيانات الضوئي',

  projects_alu_simulation_title: 'المحاكاة والتحقق',
  projects_alu_simulation_text:
    'تستخدم المحاكاة لدراسة البنى الضوئية المقترحة، والتحقق من سلوكها المنطقي، ودراسة كيفية ربط مسارات الحساب والمنطق قبل الانتقال إلى دمجها على نطاق أكبر ضمن المعالج.',

  projects_alu_scope_title: 'النطاق الحالي',
  projects_alu_scope_text:
    'يتم التعامل مع المشروع حاليًا باعتباره جهدًا بحثيًا وتطويريًا تجريبيًا. وتمثل امتدادات 4 بت و8 بت مراحل في تطوير المعمارية، ولا ينبغي تفسيرها على أنها قياسات لعتاد فيزيائي مكتمل.',

  projects_alu_architecture_flow_title: 'مسار المعالجة',
  projects_alu_flow_input: 'المدخل',
  projects_alu_flow_logic: 'المنطق الضوئي',
  projects_alu_flow_adder: 'الجامع الضوئي',
  projects_alu_flow_alu: 'وحدة ALU الضوئية',
  projects_alu_flow_output: 'المخرج',

  projects_alu_resource_title: 'موارد المشروع',
  projects_alu_resource_description:
    'الشفرة المصدرية وملفات المحاكاة والمواد الأخرى المرتبطة بالمشروع والمتاحة عبر Photonic Labs.',


  projects_alu_blocks_title:
    'الوحدات الأساسية للـ Optical ALU',

  projects_alu_blocks_text:
    'تتكون وحدة Optical ALU من وحدات منطقية وحسابية ووحدة اختيار للعمليات تتعاون لإنتاج النتيجة الضوئية النهائية.',

  /* =========================================================
     RESEARCH
  ========================================================= */

  research_badge:
    'الأبحاث',

  research_title_before:
    'المنشورات و',

  research_title_highlight:
    'الأبحاث الفوتونية',

  research_description:
    'أبحاث ومنشورات ووثائق تقنية ومخرجات بحثية أخرى تغطي منظومة الحوسبة الفوتونية.',

  research_streams_eyebrow:
    'محاور البحث الأساسية',

  research_streams_title:
    'أربعة محاور للحوسبة الفوتونية',

  research_stream_switch_title:
    'المفتاح الثنائي الضوئي',

  research_stream_switch_description:
    'أبحاث في التبديل الضوئي ثنائي الاستقرار والمنطق البصري لأنظمة الحوسبة الفوتونية.',

  research_stream_alu_title:
    'الوحدة الحسابية والمنطقية الضوئية',

  research_stream_alu_description:
    'أبحاث في تنفيذ العمليات الحسابية والمنطقية باستخدام عناصر المعالجة الضوئية.',

  research_stream_memory_title:
    'مفاهيم الذاكرة الضوئية',

  research_stream_memory_description:
    'أبحاث في مفاهيم الذاكرة الفوتونية وآليات القراءة والكتابة الضوئية.',

  research_stream_parallel_title:
    'المعالجة المتوازية بالضوء',

  research_stream_parallel_description:
    'أبحاث في المعالجة المتوازية باستخدام الأطوال الموجية ومسارات الحوسبة الضوئية المتزامنة.',

  research_filter_all:
    'الكل',

  research_filter_photonic:
    'فوتوني',

  research_filter_ai:
    'الذكاء الاصطناعي',

  research_filter_security:
    'الأمن',

  research_filter_math:
    'الرياضيات',

  research_filter_it:
    'تقنية المعلومات',

  research_search_placeholder:
    'تصفية المنشورات...',

  research_no_results:
    'لا توجد منشورات تطابق الفلتر المحدد.',

  research_download_pdf:
    'تحميل PDF',

  research_close:
    'إغلاق',

  research_projects_eyebrow:
  'البحث الحالي',

  research_projects_title:
    'المشاريع البحثية',

  research_projects_description:
    'المشاريع الحالية للبحث والتطوير في الحوسبة الضوئية والخوارزميات والتقنيات الحاسوبية المرتبطة بها.',

  /* =========================================================
     ALGORITHMS
  ========================================================= */

  algorithms_badge:
    'الخوارزميات',

  algorithms_title_before:
    'الخوارزميات و',

  algorithms_title_highlight:
    'النماذج الرياضية',

  algorithms_description:
    'توثيق رسمي للخوارزميات المستخدمة ضمن منظومة الأبحاث، بما في ذلك نماذج التعقيد والصياغات الرياضية.',

  algorithms_filter_all:
    'الكل',

  algorithms_filter_number_theory:
    'نظرية الأعداد',

  algorithms_filter_ai:
    'الذكاء الاصطناعي',

  algorithms_filter_mathematical_model:
    'نموذج رياضي',

  algorithms_filter_cybersecurity:
    'الأمن السيبراني',

  algorithms_category_number_theory:
    'نظرية الأعداد',

  algorithms_category_ai:
    'الذكاء الاصطناعي',

  algorithms_category_mathematical_model:
    'نموذج رياضي',

  algorithms_category_cybersecurity:
    'الأمن السيبراني',

  algorithms_complexity:
    'التعقيد',

  algorithms_overview:
    'نظرة عامة',

  algorithms_revision:
    'الإصدار',

  algorithms_formula:
    'الصيغة الرياضية',

  algorithms_copy_formula:
    'نسخ الصيغة',

  algorithms_latex_note:
    'مصدر LaTeX — انسخه لعرض الصيغة في محررك.',

  algorithms_no_results:
    'لا توجد خوارزميات تطابق الفلتر المحدد.',

  algorithms_reference_title:
    'التطبيقات المرجعية',

  algorithms_reference_description:
    'يتوفر الكود المصدري لهذه الخوارزميات في قسم التحميلات.',

  algorithms_browse_source:
    'تصفح المصدر',

  /* =========================================================
     DOWNLOADS
  ========================================================= */

  downloads_badge:
    'التحميلات',

  downloads_title_before:
    'الأبحاث والكود و',

  downloads_title_highlight:
    'الوثائق',

  downloads_description:
    'مخرجات بحثية مفتوحة تشمل ملفات PDF والكود المصدري والوثائق التقنية وأرشيفات المشاريع من مختلف أعمال المختبر.',

  downloads_filter_all:
    'الكل',

  downloads_filter_photonic:
    'فوتوني',

  downloads_filter_security:
    'الأمن',

  downloads_filter_math:
    'الرياضيات',

  downloads_type_all:
    'الكل',

  downloads_type_pdf:
    'PDF',

  downloads_type_source:
    'كود المصدر',

  downloads_type_docs:
    'وثائق',

  downloads_type_dataset:
    'بيانات',

  downloads_type_zip:
    'ZIP',

  downloads_search_placeholder:
    'ابحث في الملفات...',

  downloads_no_results:
    'لا توجد ملفات تحميل تطابق الفلاتر المحددة.',

  downloads_updated:
    'آخر تحديث',

  downloads_download:
    'تحميل',

  /* =========================================================
     Contact
  ========================================================= */

  contact_badge: 'تواصل معنا',
  contact_title_before: 'لنبنِ',
  contact_title_highlight: 'المستقبل الضوئي',
  contact_description:
    'للتعاون البحثي أو الشراكات التقنية أو الاستفسارات العامة — تواصل معنا عبر النموذج أدناه أو من خلال قنوات الاتصال المباشرة.',

  contact_form_title: 'أرسل لنا رسالة',
  contact_form_response_time: 'نقوم عادةً بالرد خلال 48 ساعة.',

  contact_success_title: 'تم استلام الرسالة',
  contact_success_description:
    'شكرًا لتواصلك معنا. سنعود إليك في أقرب وقت.',
  contact_send_another: 'إرسال رسالة أخرى',

  contact_name: 'الاسم',
  contact_name_placeholder: 'اسمك الكامل',

  contact_email: 'البريد الإلكتروني',
  contact_email_placeholder: 'you@example.com',

  contact_subject: 'الموضوع',
  contact_subject_placeholder: 'ما موضوع الرسالة؟',

  contact_message: 'الرسالة',
  contact_message_placeholder:
    'أخبرنا عن مشروعك أو سؤالك أو فكرة التعاون التي لديك…',

  contact_sending: 'جارٍ الإرسال…',
  contact_send_message: 'إرسال الرسالة',

  contact_direct_channels: 'قنوات الاتصال المباشر',

  contact_laboratory_title: 'المختبر',
  contact_laboratory_description:
    'Photonic Labs هو مختبر أبحاث مستقل. لا نملك مكتبًا عامًا؛ ويتم جميع التعاونات عن بُعد مع المؤسسات والشركاء.',

  contact_response: 'الاستجابة',
  contact_status: 'الحالة',
  contact_open: 'مفتوح',

  contact_general_inquiry: 'استفسار عام',

  contact_toast_success_title: 'تم إرسال الرسالة',
  contact_toast_success_description: 'سنعود إليك في أقرب وقت ممكن.',

  contact_toast_error_title: 'حدث خطأ ما',
  contact_toast_error_description: 'يرجى المحاولة مرة أخرى لاحقًا.',

  /* =========================================================
     blog
  ========================================================= */

  blog_badge: 'المدونة',
  blog_title_before: 'مقالات تقنية و',
  blog_title_highlight: 'رؤى',
  blog_description:
    'أخبار الحوسبة الضوئية، وتعمقات في الذكاء الاصطناعي، ورؤى في الأمن السيبراني من المختبر.',

  blog_category_all: 'الكل',
  blog_category_photonic: 'الحوسبة الضوئية',
  blog_category_ai: 'الذكاء الاصطناعي',
  blog_category_security: 'الأمن السيبراني',
  blog_category_math: 'الرياضيات',
  blog_category_it: 'تقنية المعلومات',

  blog_search_placeholder: 'البحث في المقالات...',

  blog_back_to_articles: 'العودة إلى جميع المقالات',
  blog_article_preview: 'معاينة المقال',
  blog_pdf_viewer: 'عارض PDF',

  blog_share_prompt: 'هل وجدت هذا المقال مفيدًا؟ شاركه مع زملائك.',
  blog_share: 'مشاركة',

  blog_read: 'قراءة',
  blog_no_results: 'لم يتم العثور على مقالات.',
};

/* =========================================================
   GERMAN
========================================================= */

const de: Dict = {
  ...en,

  nav_home: 'Startseite',
  nav_about: 'Über uns',
  nav_photonic: 'Photonische CPU',
  nav_research: 'Forschung',
  nav_algorithms: 'Algorithmen',
  nav_it: 'IT-Projekte',
  nav_downloads: 'Downloads',
  nav_blog: 'Blog',
  nav_contact: 'Kontakt',

  search_placeholder:
    'Suche nach Forschung, Projekten und Veröffentlichungen...',
  search_empty: 'Keine Ergebnisse gefunden.',
  search_title: 'Suche',

  footer_tagline:
    'Ein unabhängiges Forschungslabor für photonisches Rechnen und fortschrittliche Computersysteme.',
  footer_rights: 'Alle Rechte vorbehalten.',

  cta_explore: 'Forschung erkunden',
  cta_contact: 'Kontakt',
  cta_read: 'Mehr lesen',
  cta_download: 'Herunterladen',
  cta_view_all: 'Alle anzeigen',

  lang_label: 'Sprache',

  /* ---------- Home ---------- */

  home_independent_lab:
    'Unabhängiges Forschungslabor',

  home_title_1: 'Photonic',
  home_title_2: 'Labs',

  home_description:
    'Wir erforschen die Zukunft des photonischen Rechnens und fortschrittlicher Computersysteme.',

  home_explore_research:
    'Forschung erkunden',

  home_explore_cpu:
    'Photonische CPU erkunden',

  home_stat_cpu:
    'Photonische CPU',

  home_stat_cpu_sub:
    'Apex · 34 Kerne',

  home_stat_clock:
    'Takt',

  home_stat_clock_sub:
    'optische Struktur',

  home_stat_throughput:
    'Durchsatz',

  home_stat_throughput_sub:
    'Tensor-Core',

  home_stat_memory:
    'Speicher',

  home_stat_memory_sub:
    'optischer On-Chip-Speicher',

  home_core_label:
    'PHOTONISCHE KERN',

  home_online:
    'ONLINE',

  home_research_highlights:
    'Forschungsschwerpunkte',

  home_where_light:
    'Wo Licht zu',

  home_computation:
    'Rechenleistung wird',

  home_research_description:
    'Photonic Labs arbeitet an miteinander verbundenen Technologiebereichen – von optischer Logik und photonischen Prozessoren bis hin zu fortschrittlichen Algorithmen und Computersystemen.',

  home_featured_projects:
    'Ausgewählte Projekte',

  home_engineering_stack:
    'Entwicklung des photonischen Stacks',

  home_featured_description:
    'Ausgewählte aktive Projekte aus den Bereichen photonisches Rechnen, Algorithmen und intelligente Systeme.',

  home_view_all:
    'Alle anzeigen',

  home_latest_publications:
    'Neueste Veröffentlichungen',

  home_from_lab_press:
    'Aus dem Forschungslabor',

  home_publications_description:
    'Forschungsarbeiten, technische Dokumente und Veröffentlichungen aus dem Labor.',

  home_all_publications:
    'Alle Veröffentlichungen',

  home_ready:
    'Bereit, den photonischen Stack zu erkunden?',

  home_browse_full:
    'Entdecken Sie die Architektur, die Entwicklungs-Roadmap und die Forschung hinter der photonischen CPU.',

  home_view_cpu:
    'Photonische CPU anzeigen',

  highlight_cpu_title:
    'Photonische CPU V34',

  highlight_cpu_text:
    'Architektur eines photonischen Prozessors mit optischen Rechenkomponenten und Prozessor-Subsystemen.',

  highlight_neoamona_title:
    'NeoAMONA',

  highlight_neoamona_text:
    'Algorithmusforschung mit Schwerpunkt auf Zahlentheorie und experimentellen Rechenverfahren.',

  highlight_alu_title:
    'Optische ALU',

  highlight_alu_text:
    'Optische arithmetische und logische Verarbeitung als Grundlage des photonischen Rechnens.',

  highlight_parallel_title:
    'Photonisches Rechnen',

  highlight_parallel_text:
    'Forschung zur parallelen optischen Informationsverarbeitung und zu photonischen Prozessorarchitekturen.',

  /* ---------- CPU ---------- */

  cpu_badge:
    'Photonische CPU',

  cpu_optical_processor:
    'Optischer Prozessor',

  cpu_description:
    'Eine photonische Prozessorarchitektur, in der Rechenoperationen mit optischer Logik und photonischen Verarbeitungselementen umgesetzt werden.',

  cpu_cores:
    'Kerne',

  cpu_clock:
    'Takt',

  cpu_memory:
    'Speicher',

  cpu_throughput:
    'Durchsatz',

  cpu_profile:
    'Profil',

  cpu_architecture:
    'Architekturübersicht',

  cpu_full_optical_stack:
    'Der vollständige',

  cpu_optical_stack:
    'optische Stack',

  cpu_architecture_description:
    'Eine mehrschichtige Architektur für photonisches Rechnen, die Steuerung, Verarbeitung, Register und optischen Speicher verbindet.',

  cpu_figure_1:
    'Abbildung 1',

  cpu_datapath:
    'V34 Blockdiagramm des Datenpfads',

  cpu_technical_diagram:
    'Technisches Diagramm',

  cpu_datapath_description:
    'Datenpfad der photonischen CPU mit Befehlsdekodierung, Steuerung, optischer ALU, Registern, Interconnect und Speicher.',

  cpu_instruction_decoder:
    'Befehlsdecoder',

  cpu_control_fabric:
    'Steuerungsstruktur',

  cpu_optical_alu:
    'Optische ALU',

  cpu_registers:
    'Photonische Register',

  cpu_interconnect:
    'Photonischer Interconnect',

  cpu_memory_block:
    'Optischer Speicher',

  cpu_performance:
    'Leistung & Simulation',

  cpu_scaling:
    'Skalierung über Generationen',

  cpu_scaling_description:
    'Vergleich der Architekturparameter über die verschiedenen Entwicklungsstufen.',

  cpu_simulated:
    'Simulation',

  cpu_throughput_cores_clock:
    'Durchsatz vs. Kerne vs. Takt',

  cpu_version_scaling:
    'Versionsentwicklung',

  cpu_version_scaling_sub:
    'Kerne & Takt',

  cpu_version_history:
    'Versionshistorie',

  cpu_from_v1_v34:
    'Von V1 bis V34',

  cpu_version_history_description:
    'Entwicklungsgeschichte der photonischen Prozessorarchitektur.',

  cpu_roadmap:
    'Entwicklungs-Roadmap',

  cpu_after_v34:
    'Was kommt nach V34',

  cpu_architecture_paper:
    'Architekturpapier lesen',

  cpu_architecture_paper_description:
    'Technische Dokumentation und architektonische Details der photonischen CPU.',

  cpu_view_research:
    'Forschung anzeigen',

  cpu_metrics_disclaimer:
  'Die angezeigten Werte sind Design- und Simulationsziele des aktuellen Photonik-Prozessorkonzepts und stellen keine gemessenen Werte eines gefertigten Chips dar.',

  status_released:
    'Veröffentlicht',

  status_preview:
    'Vorschau',

  status_legacy:
    'Legacy',

  architecture_compiler:
    'Compiler- & API-Schicht',

  architecture_compiler_desc:
    'Softwareschnittstellen und Compiler-Konzepte zur Übersetzung von Rechenlasten in photonische Instruktionen.',

  architecture_control:
    'Elektro-optische Steuerstruktur',

  architecture_control_desc:
    'Steuerstrukturen zur Koordination optischer Verarbeitungselemente und elektronischer Komponenten.',

  architecture_cores:
    'Photonische Verarbeitungskerne',

  architecture_cores_desc:
    'Optische Verarbeitungselemente für parallele Rechenoperationen.',

  architecture_memory:
    'Photonischer Speicher',

  architecture_memory_desc:
    'Optisches Speichersubsystem der Prozessorarchitektur.',

  roadmap_completed:
    'Abgeschlossen',

  roadmap_preview:
    'Aktuell',

  roadmap_research:
    'Forschung',

  roadmap_future:
    'Zukunft',

  roadmap_v34:
    'V34',

  roadmap_v34_text:
    'Aktuelle photonische CPU-Architektur und integrierte Prozessor-Komponenten.',

  roadmap_next:
    'Nächste Architektur',

  roadmap_next_text:
    'Zukünftige Weiterentwicklung der photonischen Prozessorarchitektur.',

  roadmap_soc:
    'Photonische SoC-Forschung',

  roadmap_soc_text:
    'Langfristige Forschung an immer stärker integrierten optischen Computersystemen.',

  home_cores_short: 'Kerne',
  home_publications_empty: 'Es wurden noch keine Veröffentlichungen hinzugefügt.',

  /* =========================================================
     ABOUT
  ========================================================= */

  about_badge:
    'Über Photonic Labs',

  about_title_before:
    'Ein unabhängiges Forschungslabor mit',

  about_title_highlight:
    'Lichtgeschwindigkeit',

  about_description:
    'Photonic Labs ist ein unabhängiges Forschungslabor mit Schwerpunkt auf photonischem Rechnen, optischen Prozessoren, künstlicher Intelligenz, fortgeschrittenen Algorithmen, Cybersicherheit und IT-Innovation. Dabei wird der gesamte Stack von optischen Logikbausteinen bis zu Software und Systemen entwickelt.',

  about_mission_title:
    'Mission',

  about_mission_text:
    'Wir entwickeln die Wissenschaft und Ingenieurskunst des photonischen Rechnens weiter und untersuchen, wie Rechenoperationen von Elektronen auf Photonen verlagert werden können. Die Ergebnisse sollen präzise, reproduzierbar und für die Forschungs- und Engineering-Gemeinschaft zugänglich sein.',

  about_vision_title:
    'Vision',

  about_vision_text:
    'Eine Zukunft, in der lineare Algebra, neuronale Inferenz und sichere Kommunikation durch Licht beschleunigt werden und Physik sowie Ingenieurwissenschaften zunehmend die Grenzen des Rechnens bestimmen.',

  about_research_goals:
    'Forschungsziele',

  about_goals_title:
    'Fünf zentrale Ziele',

  about_goals_description:
    'Unsere Ziele sollen messbar, reproduzierbar und dokumentiert sein, damit externe Forschende die Ergebnisse überprüfen und darauf aufbauen können.',

  about_goal_1:
    'Entwicklung eines produktionsnahen optischen Prozessors mit standardisierten Software-Schnittstellen.',

  about_goal_2:
    'Entwicklung von Software- und Compiler-Komponenten zur Verbindung klassischer Rechner mit photonischer Beschleunigung.',

  about_goal_3:
    'Untersuchung sicherer Kommunikation und kryptografischer Protokolle über photonische Kanäle.',

  about_goal_4:
    'Untersuchung möglicher Beschleunigungen von Machine-Learning-Workloads durch optische Verarbeitungsarchitekturen.',

  about_goal_5:
    'Veröffentlichung reproduzierbarer Forschung an der Schnittstelle von Optik, Mathematik, Informatik und Ingenieurwesen.',

  about_domains_eyebrow:
    'Technologiebereiche',

  about_domains_title_before:
    'Fünf Bereiche,',

  about_domains_title_highlight:
    'ein Stack',

  about_domains_description:
    'Unsere Forschung ist in miteinander verbundene Technologiebereiche gegliedert, die gemeinsam den photonischen Computing-Stack bilden.',

  about_collaborate_title:
    'Interesse an einer Zusammenarbeit?',

  about_collaborate_text:
    'Wir begrüßen die Zusammenarbeit mit Institutionen, Ingenieuren und Forschenden im Bereich des photonischen Rechnens und verwandter Technologien.',

  about_contact_button:
    'Kontakt aufnehmen',

  /* ---------- Research Domains ---------- */

  domain_photonic_title:
    'Photonisches Rechnen',

  domain_photonic_short:
    'Optisches Rechnen und Architekturen photonischer Prozessoren.',

  domain_photonic_description:
    'Forschung und Entwicklung zu optischer Logik, photonischer Arithmetik, Prozessor-Komponenten und Architekturen für photonisches Rechnen.',

  domain_ai_title:
    'Künstliche Intelligenz',

  domain_ai_short:
    'KI-Algorithmen und intelligente Computersysteme.',

  domain_ai_description:
    'Forschung und Experimente mit künstlicher Intelligenz, Algorithmen und intelligenten Computersystemen.',

  domain_security_title:
    'Cybersicherheit',

  domain_security_short:
    'Sicherheitssysteme, defensive Technologien und Sicherheitsforschung.',

  domain_security_description:
    'Forschung und praktische Projekte zu Cybersicherheit, Systemsicherheit und defensivem Computing.',

  domain_math_title:
    'Algorithmen & Mathematik',

  domain_math_short:
    'Algorithmen, mathematische Modelle und Computerforschung.',

  domain_math_description:
    'Forschung zu Algorithmen, Zahlentheorie, Computermathematik und experimentellen Rechenmodellen.',

  domain_it_title:
    'IT-Systeme',

  domain_it_short:
    'Software, Netzwerke, Infrastruktur und IT-Projekte.',

  domain_it_description:
    'Praktische IT-Projekte aus den Bereichen Software, Netzwerke, Infrastruktur, Systeme und verwandte Technologien.',

  cpu_radar_cores: 'Kerne',
  cpu_radar_clock: 'Takt GHz',
  cpu_radar_memory: 'Speicher',
  cpu_radar_throughput: 'Durchsatz',

  cpu_ghz_short: 'GHz',

  roadmap_in_progress: 'In Entwicklung',

  roadmap_item_completed:
    '30-Kern-Struktur mit photonischen Speicherbänken und elektro-optischer Steuerung.',

  roadmap_item_preview:
    'Interferometrischer Prozessor mit 34 Kernen und integriertem photonischem KI-Tensorkern.',

  roadmap_item_in_progress:
    'Hybrides opto-elektronisches System mit einem Ziel von über 1000 TOPS Tensor-Durchsatz.',

  roadmap_item_research:
    'Vollständig optischer SoC-Datenpfad, während die Steuerebene elektronisch bleibt.',

  /* =========================================================
     PROJECTS
  ========================================================= */

  projects_badge:
    'IT-Projekte',

  projects_title_before:
    'Software, KI, Sicherheit &',

  projects_title_highlight:
    'Netzwerk-Tools',

  projects_description:
    'Die technische Seite des Labors — Softwareprojekte, KI-Beschleuniger, Cybersicherheits-Frameworks, Netzwerk-Tools und experimentelle Computersysteme.',

  projects_type_software:
    'Softwareprojekte',

  projects_type_ai:
    'KI-Projekte',

  projects_type_security:
    'Cybersicherheitsprojekte',

  projects_type_network:
    'Netzwerk-Tools',

  projects_filter_all:
    'Alle Projekte',

  projects_filter_photonic:
    'Photonisch',

  projects_filter_ai:
    'KI-Projekte',

  projects_filter_security:
    'Cybersicherheit',

  projects_filter_it:
    'Software / Netzwerk',

  projects_search_placeholder:
    'Projekte durchsuchen...',

  projects_no_results:
    'Keine Projekte entsprechen dem ausgewählten Filter.',

  project_optical_logic_title: 'Optische Logikgatter',
  project_optical_logic_summary:
    'Implementierung und Untersuchung optischer Logikgatter.',
  project_optical_logic_description:
    'Forschung und Simulation optischer Logikoperationen einschließlich AND, OR, XOR und NOT als Bausteine für photonisches Computing.',

  project_optical_adders_title: 'Optischer Halbaddierer & Volladdierer',
  project_optical_adders_summary:
    'Optische Rechenschaltungen für die binäre Addition.',
  project_optical_adders_description:
    'Entwicklung und Untersuchung optischer Halb- und Volladdierer auf Basis optischer Logikkomponenten.',

  project_optical_alu_title: 'Optical ALU',
  project_optical_alu_summary:
    'Forschungsprojekt zu einer optischen arithmetischen und logischen Einheit.',
  project_optical_alu_description:
    'Entwicklung und Untersuchung optischer arithmetischer und logischer Operationen als Grundlage für eine photonische Verarbeitungseinheit.',

  project_optical_alu_4bit_title: 'Optical 4-Bit ALU',
  project_optical_alu_4bit_summary:
    'Optische arithmetische und logische Einheit mit vier Bit.',
  project_optical_alu_4bit_description:
    'Erweiterung der Optical-ALU-Architektur auf Vier-Bit-Operationen und Untersuchung der implementierten Funktionen.',

  project_optical_alu_8bit_title: 'Optical 8-Bit ALU',
  project_optical_alu_8bit_summary:
    'Optische arithmetische und logische Einheit mit acht Bit.',
  project_optical_alu_8bit_description:
    'Experimentelle Erweiterung der photonischen ALU-Architektur auf Operationen mit acht Bit.',

  project_photonic_register_title: 'Photonisches Register',
  project_photonic_register_summary:
    'Photonisches Register als Komponente einer Prozessorarchitektur.',
  project_photonic_register_description:
    'Entwicklung und Untersuchung eines photonischen Registers mit den Operationen LOAD, HOLD und CLEAR.',

  project_program_counter_title: 'Photonic Program Counter',
  project_program_counter_summary:
    'Program Counter als Komponente der photonischen Prozessorarchitektur.',
  project_program_counter_description:
    'Entwicklung und Untersuchung eines Program Counters als Bestandteil der Photonic-CPU-Architektur.',

  project_instruction_decoder_title: 'Photonic Instruction Decoder',
  project_instruction_decoder_summary:
    'Komponente zur Instruktionsdekodierung für die Photonic CPU.',
  project_instruction_decoder_description:
    'Entwicklung und Untersuchung eines Instruction Decoders als Bestandteil der Photonic-CPU-Architektur.',

  project_photonic_cpu_core_title: 'Photonic CPU Core',
  project_photonic_cpu_core_summary:
    'Integration photonischer Prozessor Komponenten zu einem CPU-Core.',
  project_photonic_cpu_core_description:
    'Integration und Untersuchung photonischer Prozessor-Komponenten einschließlich Register, Program Counter, Instruktionsdekodierung und arithmetischer Logik.',

  project_neoamona_title: 'NeoAMONA',
  project_neoamona_summary:
    'Experimentelles Forschungsprojekt zu einem Algorithmus.',
  project_neoamona_description:
    'Algorithmus-Forschungsprojekt im Rahmen der Arbeiten des Labors an rechnergestützten Algorithmen.',

  project_zetatds_title: 'ZetaTDS-Sieve',
  project_zetatds_summary:
    'Experimentelles Projekt zur Erkennung von Primzahlen.',
  project_zetatds_description:
    'Algorithmusforschung und Experimente zur Primzahlerkennung und rechnerischen Zahlentheorie.',


  projects_status_active: 'Aktiv',
  projects_status_experimental: 'Experimentell',
  projects_status_archived: 'Archiviert',

  
  projects_detail_project: 'Projekt',

  projects_detail_status: 'Status',
  projects_detail_year: 'Jahr',
  projects_detail_category: 'Kategorie',

  projects_detail_overview: 'Projektübersicht',
  projects_detail_focus: 'Forschungsschwerpunkte',

  projects_detail_resources: 'Projektressourcen',
  projects_detail_resources_description:
    'Quellcode und Projektdateien, die diesem Projekt zugeordnet sind.',

  projects_detail_back: 'Zurück zu den Projekten',

  projects_detail_not_found: 'Projekt nicht gefunden',
  projects_detail_not_found_description:
    'Das angeforderte Projekt konnte nicht gefunden werden.',


  projects_category_photonic: 'Photonik',
  projects_category_ai: 'KI',
  projects_category_security: 'Cybersicherheit',
  projects_category_math: 'Mathematik',
  projects_category_it: 'Software / Netzwerk',


  projects_alu_objective_title: 'Forschungsziel',
  projects_alu_objective_text:
    'Das Optical-ALU-Projekt untersucht, wie sich arithmetische und logische Operationen innerhalb einer optischen Verarbeitungsarchitektur organisieren lassen. Der aktuelle Schwerpunkt liegt auf der Entwicklung und Untersuchung der Rechenbausteine, die für einen größeren photonischen Prozessor benötigt werden.',

  projects_alu_architecture_title: 'Architektur',
  projects_alu_architecture_text:
    'Die Optical ALU wird als zentraler Rechenblock innerhalb der übergeordneten Photonic-CPU-Architektur betrachtet. Ihre Entwicklung ist mit den optischen Logikgattern, Addierern, Registern, dem Instruction Decoder und weiteren Prozessorbausteinen verbunden.',

  projects_alu_operations_title: 'Operationen',
  projects_alu_operation_1: 'Arithmetische Operationen',
  projects_alu_operation_2: 'Logische Operationen',
  projects_alu_operation_3: 'Verarbeitung binärer Daten',
  projects_alu_operation_4: 'Integration in den photonischen Datenpfad',

  projects_alu_simulation_title: 'Simulation & Validierung',
  projects_alu_simulation_text:
    'Simulationen werden verwendet, um die vorgeschlagenen optischen Strukturen zu untersuchen, ihr logisches Verhalten zu überprüfen und die Verbindung der arithmetischen und logischen Pfade vor einer weitergehenden Integration in den Prozessor zu untersuchen.',

  projects_alu_scope_title: 'Aktueller Umfang',
  projects_alu_scope_text:
    'Das Projekt wird derzeit als experimentelle Forschungs- und Entwicklungsarbeit behandelt. Die 4-Bit- und 8-Bit-Erweiterungen stellen Entwicklungsstufen der Architektur dar und sollten nicht als Messwerte fertiggestellter physischer Hardware interpretiert werden.',

  projects_alu_architecture_flow_title: 'Rechenpfad',
  projects_alu_flow_input: 'Eingang',
  projects_alu_flow_logic: 'Optische Logik',
  projects_alu_flow_adder: 'Optischer Addierer',
  projects_alu_flow_alu: 'Optical ALU',
  projects_alu_flow_output: 'Ausgang',

  projects_alu_resource_title: 'Projektressourcen',
  projects_alu_resource_description:
    'Quellcode, Simulationsdateien und weitere Projektmaterialien, die über Photonic Labs verfügbar sind.',


  projects_alu_blocks_title:
    'Bausteine der Optical ALU',

  projects_alu_blocks_text:
    'Die Optical ALU besteht aus logischen, arithmetischen und steuernden Teilsystemen zur Erzeugung des optischen Ergebnisses.',

  /* =========================================================
     RESEARCH
  ========================================================= */

  research_badge:
    'Forschung',

  research_title_before:
    'Veröffentlichungen &',

  research_title_highlight:
    'photonische Forschung',

  research_description:
    'Forschungsarbeiten, Preprints, technische Dokumente und weitere Forschungsergebnisse aus dem gesamten photonischen Computing-Stack.',

  research_streams_eyebrow:
    'Zentrale Forschungsbereiche',

  research_streams_title:
    'Vier Bereiche des photonischen Rechnens',

  research_stream_switch_title:
    'Optischer Binärschalter',

  research_stream_switch_description:
    'Forschung zu bistabilem optischem Schalten und optischer Logik für photonische Computersysteme.',

  research_stream_alu_title:
    'Optische ALU',

  research_stream_alu_description:
    'Forschung zu arithmetischen und logischen Operationen mit optischen Verarbeitungselementen.',

  research_stream_memory_title:
    'Konzepte für optischen Speicher',

  research_stream_memory_description:
    'Forschung zu photonischen Speicherkonzepten und optischen Lese-/Schreibmechanismen.',

  research_stream_parallel_title:
    'Parallele Lichtverarbeitung',

  research_stream_parallel_description:
    'Forschung zu wellenlängenbasierter Parallelisierung und gleichzeitigen optischen Rechenströmen.',

  research_filter_all:
    'Alle',

  research_filter_photonic:
    'Photonisch',

  research_filter_ai:
    'KI',

  research_filter_security:
    'Sicherheit',

  research_filter_math:
    'Mathematik',

  research_filter_it:
    'IT',

  research_search_placeholder:
    'Veröffentlichungen filtern...',

  research_no_results:
    'Keine Veröffentlichungen entsprechen dem ausgewählten Filter.',

  research_download_pdf:
    'PDF herunterladen',

  research_close:
    'Schließen',

  research_projects_eyebrow:
  'Aktuelle Forschung',

  research_projects_title:
    'Forschungsprojekte',

  research_projects_description:
    'Aktuelle Forschungs- und Entwicklungsprojekte aus den Bereichen photonisches Computing, Algorithmen und verwandte Computertechnologien.',

  /* =========================================================
     ALGORITHMS
  ========================================================= */

  algorithms_badge:
    'Algorithmen',

  algorithms_title_before:
    'Algorithmen &',

  algorithms_title_highlight:
    'mathematische Modelle',

  algorithms_description:
    'Formale Dokumentation der Algorithmen innerhalb des Forschungs-Stacks einschließlich Komplexitätsmodellen und mathematischer Formulierungen.',

  algorithms_filter_all:
    'Alle',

  algorithms_filter_number_theory:
    'Zahlentheorie',

  algorithms_filter_ai:
    'KI',

  algorithms_filter_mathematical_model:
    'Mathematisches Modell',

  algorithms_filter_cybersecurity:
    'Cybersicherheit',

  algorithms_category_number_theory:
    'Zahlentheorie',

  algorithms_category_ai:
    'Künstliche Intelligenz',

  algorithms_category_mathematical_model:
    'Mathematisches Modell',

  algorithms_category_cybersecurity:
    'Cybersicherheit',

  algorithms_complexity:
    'Komplexität',

  algorithms_overview:
    'Übersicht',

  algorithms_revision:
    'Revision',

  algorithms_formula:
    'Formel',

  algorithms_copy_formula:
    'Formel kopieren',

  algorithms_latex_note:
    'LaTeX-Quelle — zum Rendern im Editor kopieren.',

  algorithms_no_results:
    'Keine Algorithmen entsprechen dem ausgewählten Filter.',

  algorithms_reference_title:
    'Referenzimplementierungen',

  algorithms_reference_description:
    'Der Quellcode dieser Algorithmen ist im Download-Bereich verfügbar.',

  algorithms_browse_source:
    'Quellcode öffnen',

  /* =========================================================
     DOWNLOADS
  ========================================================= */

  downloads_badge:
    'Downloads',

  downloads_title_before:
    'Papers, Quellcode,',

  downloads_title_highlight:
    'Dokumentation',

  downloads_description:
    'Offene Forschungsartefakte — PDF-Arbeiten, Quellcode, technische Dokumentation und Projektarchive aus dem Labor.',

  downloads_filter_all:
    'Alle',

  downloads_filter_photonic:
    'Photonisch',

  downloads_filter_security:
    'Sicherheit',

  downloads_filter_math:
    'Mathematik',

  downloads_type_all:
    'Alle',

  downloads_type_pdf:
    'PDF',

  downloads_type_source:
    'Quellcode',

  downloads_type_docs:
    'Dokumentation',

  downloads_type_dataset:
    'Datensatz',

  downloads_type_zip:
    'ZIP',

  downloads_search_placeholder:
    'Downloads durchsuchen...',

  downloads_no_results:
    'Keine Downloads entsprechen den ausgewählten Filtern.',

  downloads_updated:
    'Aktualisiert',

  downloads_download:
    'Herunterladen',

  /* =========================================================
     Contact
  ========================================================= */

  contact_badge: 'Kontakt',
  contact_title_before: 'Lassen Sie uns',
  contact_title_highlight: 'die optische Zukunft gestalten',
  contact_description:
    'Für Forschungskooperationen, technische Partnerschaften oder allgemeine Anfragen — kontaktieren Sie uns über das untenstehende Formular oder über unsere direkten Kanäle.',

  contact_form_title: 'Nachricht senden',
  contact_form_response_time: 'Wir antworten in der Regel innerhalb von 48 Stunden.',

  contact_success_title: 'Nachricht erhalten',
  contact_success_description:
    'Vielen Dank für Ihre Nachricht. Wir werden uns bald bei Ihnen melden.',
  contact_send_another: 'Weitere Nachricht senden',

  contact_name: 'Name',
  contact_name_placeholder: 'Ihr vollständiger Name',

  contact_email: 'E-Mail',
  contact_email_placeholder: 'you@example.com',

  contact_subject: 'Betreff',
  contact_subject_placeholder: 'Worum geht es?',

  contact_message: 'Nachricht',
  contact_message_placeholder:
    'Erzählen Sie uns von Ihrem Projekt, Ihrer Frage oder Ihrer Idee für eine Zusammenarbeit…',

  contact_sending: 'Wird gesendet…',
  contact_send_message: 'Nachricht senden',

  contact_direct_channels: 'Direkte Kontaktkanäle',

  contact_laboratory_title: 'Labor',
  contact_laboratory_description:
    'Photonic Labs ist ein unabhängiges Forschungslabor. Wir unterhalten kein öffentliches Büro; alle Kooperationen werden remote mit Partnereinrichtungen durchgeführt.',

  contact_response: 'Antwortzeit',
  contact_status: 'Status',
  contact_open: 'Geöffnet',

  contact_general_inquiry: 'Allgemeine Anfrage',

  contact_toast_success_title: 'Nachricht gesendet',
  contact_toast_success_description: 'Wir melden uns in Kürze bei Ihnen.',

  contact_toast_error_title: 'Etwas ist schiefgelaufen',
  contact_toast_error_description: 'Bitte versuchen Sie es später erneut.',

/* =========================================================
     Blog
  ========================================================= */

  blog_badge: 'Blog',
  blog_title_before: 'Technische Artikel &',
  blog_title_highlight: 'Einblicke',
  blog_description:
    'Neuigkeiten aus dem Bereich Photonic Computing, vertiefende Beiträge zu KI und Einblicke in die Cybersicherheit aus unserem Labor.',

  blog_category_all: 'Alle',
  blog_category_photonic: 'Photonik',
  blog_category_ai: 'KI',
  blog_category_security: 'Cybersicherheit',
  blog_category_math: 'Mathematik',
  blog_category_it: 'IT',

  blog_search_placeholder: 'Artikel suchen...',

  blog_back_to_articles: 'Zurück zu allen Artikeln',
  blog_article_preview: 'Artikelvorschau',
  blog_pdf_viewer: 'PDF-Viewer',

  blog_share_prompt: 'Hat Ihnen dieser Beitrag gefallen? Teilen Sie ihn mit Ihren Kollegen.',
  blog_share: 'Teilen',

  blog_read: 'Lesen',
  blog_no_results: 'Keine Artikel gefunden.',
 
};

/* =========================================================
   DICTIONARIES
========================================================= */

const dicts: Record<Locale, Dict> = {
  en,
  ar,
  de,
};

/* =========================================================
   CONTEXT
========================================================= */

type Ctx = {
  locale: Locale;
  dir: 'ltr' | 'rtl';
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<Ctx>({
  locale: 'en',
  dir: 'ltr',
  setLocale: () => {},
  t: (key) => en[key] ?? key,
});

/* =========================================================
   PROVIDER
========================================================= */

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    setDir(newLocale === 'ar' ? 'rtl' : 'ltr');
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const t = useCallback(
    (key: string) =>
      dicts[locale][key] ??
      en[key] ??
      key,
    [locale],
  );

  return (
    <LanguageContext.Provider
      value={{
        locale,
        dir,
        setLocale,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

/* =========================================================
   HOOK
========================================================= */

export const useLanguage = () => useContext(LanguageContext);