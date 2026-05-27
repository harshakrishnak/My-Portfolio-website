import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Cpu, Activity, Video, CheckCircle, 
  Mail, Calendar, Download, ChevronRight, 
  Menu, X, Server, Database, Code, TrendingUp, Sun, Moon, Workflow, 
  Eye, RefreshCw, Play, Pause, Send, Briefcase, GraduationCap
} from 'lucide-react';

const LinkedInIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="1" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Types
interface Project {
  title: string;
  role: string;
  description: string;
  bullets: string[];
  tech: string[];
  metrics: string;
}

interface Job {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  tech: string[];
  achievements: string[];
}

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || 'cyber-dark';
  });

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // VMS Dashboard simulation states
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedCamera, setSelectedCamera] = useState('CAM-01 (Kasaragod-HQ)');
  const [aiAnalysisActive, setAiAnalysisActive] = useState(true);
  const [processedFrames, setProcessedFrames] = useState(482019);
  const [anomalyCounter, setAnomalyCounter] = useState(14);

  // Skill matrix active filter
  const [skillCategory, setSkillCategory] = useState<'all' | 'languages' | 'backend' | 'frontend' | 'infrastructure'>('all');

  // Contact form submission states
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formTerminalLogs, setFormTerminalLogs] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // Refs for scroll target
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Apply theme class to HTML root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    // Also update meta theme-color matching the background
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      if (theme === 'cyber-dark') metaThemeColor.setAttribute('content', '#030712');
      else if (theme === 'light-glass') metaThemeColor.setAttribute('content', '#f8fafc');
      else if (theme === 'matrix-green') metaThemeColor.setAttribute('content', '#020402');
      else if (theme === 'neon-synth') metaThemeColor.setAttribute('content', '#0a0118');
    }
  }, [theme]);

  // Real-time telemetry generator
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      // Increment frames
      setProcessedFrames(prev => prev + Math.floor(Math.random() * 15) + 10);

      // Occasional anomalies
      if (Math.random() > 0.85) {
        setAnomalyCounter(prev => prev + 1);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isPlaying, aiAnalysisActive]);

  // Handle mock form submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    setFormTerminalLogs([
      'INITIATING SECURE TCP SOCKET...',
      'ESTABLISHING RESOLUTION ON PORT 443...',
      'VERIFYING SMTP PAYLOAD VALIDITY...',
    ]);

    setTimeout(() => {
      setFormTerminalLogs(prev => [
        ...prev,
        'DATA COMPACTED: application/json',
        'DISPATCHING INGESTION TRIGGER TO AWS GATEWAY...',
      ]);
    }, 800);

    setTimeout(() => {
      setFormTerminalLogs(prev => [
        ...prev,
        'HTTP/2 200 OK: PAYLOAD RECEIVED',
        'WEBHOOK DISPATCHED: Success.',
      ]);
      setSubmitting(false);
      setFormSubmitted(true);
    }, 1800);
  };

  // Switch Themes List
  const themes = [
    { name: 'cyber-dark', label: 'Cyber Dark', icon: <Moon className="w-4 h-4" /> },
    { name: 'light-glass', label: 'Light Glass', icon: <Sun className="w-4 h-4" /> },
    { name: 'matrix-green', label: 'Matrix Terminal', icon: <Terminal className="w-4 h-4" /> },
    { name: 'neon-synth', label: 'Neon Synth', icon: <Activity className="w-4 h-4" /> }
  ];

  // Projects list
  const projects: Project[] = [
    {
      title: 'Milestone XProtect VMS Plugin',
      role: 'Lead Architect (Conexao)',
      metrics: 'Tight integration overlaying AI insights onto live feeds with 0.1s latency',
      description: 'An advanced, on-premise camera analytics integration with Milestone XProtect VMS. Built for secure, real-time metadata analytics overlay at scale.',
      bullets: [
        'Designed custom C# Smart Client overlays and backend services to process high-throughput live feed telemetry.',
        'Integrated a Python AI module processing metadata for 1000+ IP cameras concurrently.',
        'Optimized system memory footprint and reduced network overhead by 42% through binary serialization and custom caching.'
      ],
      tech: ['React.js', 'Node.js', 'C#', 'Milestone SDK', 'Python', 'MongoDB', 'On-Prem Infrastructure']
    },
    {
      title: 'Camera Anomaly & Health Monitor',
      role: 'Principal Engineer',
      metrics: 'Proactive detection of blur, obstruction, and video signal loss',
      description: 'A neural video intelligence platform analyzing camera feeds to detect environmental issues (occlusions, lenses blur, network drops) and dispatching automatic alerts.',
      bullets: [
        'Built dynamic visualization charts and event logging screens using React/TypeScript.',
        'Implemented computer vision pipelines leveraging lightweight NLP metadata classification in Python.',
        'Structured event trigger pipelines processing up to 50 alerts per second with high availability.'
      ],
      tech: ['TypeScript', 'React.js', 'Node.js', 'Python (NLP)', 'MongoDB', 'Docker', 'WebSockets']
    },
    {
      title: 'HealthFeed Cloud Platform',
      role: 'Senior Fullstack Engineer (Velocitos)',
      metrics: 'Cloud-native & HIPAA-compliant, servicing 100+ US healthcare clients',
      description: 'A highly secure, patient-engagement platform processing medical communications with strict security and data redundancy audits on AWS.',
      bullets: [
        'Built Angular interfaces and scalable Java Spring Boot microservices for patient interaction.',
        'Enforced HIPAA compliance reviews on AWS (EC2, S3, RDS, Lambda) using encryption at rest/transit.',
        'Configured MongoDB replication matrices to satisfy healthcare high-availability and failover requirements.'
      ],
      tech: ['Angular', 'Spring Boot', 'Java', 'MongoDB', 'AWS (S3/Lambda/EC2)', 'HIPAA Compliance', 'REST APIs']
    },
    {
      title: '4Money B2B Recharge System',
      role: 'Co-Founder & Fullstack Developer (Hashcoder)',
      metrics: 'Processed millions in monthly transactions across India',
      description: 'A multi-agent, highly secure mobile recharge and fintech platform supporting secure payment gateways and API routing.',
      bullets: [
        'Developed native Android application and back-end integration layer processing transactions in <1.5 seconds.',
        'Created a robust multi-agent transaction management system mapping client queries to dynamic provider APIs.',
        'Built custom admin dashboard in PHP/AngularJS with robust ledger and audit checks.'
      ],
      tech: ['PHP', 'AngularJS', 'Android', 'Java', 'MySQL', 'Firebase', 'Secure Gateways']
    }
  ];

  // Professional Job experience timeline
  const jobs: Job[] = [
    {
      id: 'conexao',
      company: 'Conexao Technology Solutions',
      role: 'Principal Engineer',
      period: 'November 2021 - Present (4 yrs 7 mos)',
      location: 'Panaji, Goa, India',
      tech: ['React.js', 'TypeScript', 'Node.js', 'C#', 'Python', 'MongoDB', 'Milestone SDK'],
      achievements: [
        'Lead architectural decisions and direct a team of 4 engineers to develop on-premise camera analytics plugins.',
        'Designed core C# services, Node.js API routers, and MongoDB backend pipelines.',
        'Configured Python-based AI parsing layer for metadata intelligence across 1000+ camera networks.',
        'Significantly enhanced app modularity, security, and developer pipeline efficiency.'
      ]
    },
    {
      id: 'velocitos',
      company: 'Velocitos',
      role: 'Senior Fullstack Engineer',
      period: 'January 2019 - July 2022 (3 yrs 7 mos)',
      location: 'Remote (US Healthcare Sector)',
      tech: ['Angular', 'Spring Boot', 'Java', 'MongoDB', 'AWS', 'HIPAA Security Standards'],
      achievements: [
        'Created modules for HealthFeed, a secure patient engagement software handling data pipelines.',
        'Engineered Spring Boot microservices and structured robust RESTful system interfaces.',
        'Configured secure storage schemas and data backups on AWS infrastructure.',
        'Guided the system through rigorous clinical auditing, passing with zero high-risk compliance findings.'
      ]
    },
    {
      id: 'hashcoder',
      company: 'Hashcoder Technologies LLP',
      role: 'Co-Founder & Fullstack Developer',
      period: 'January 2016 - Present (10 yrs 5 mos)',
      location: 'Kasaragod, Kerala, India',
      tech: ['PHP', 'AngularJS', 'Android', 'Java', 'Unity', 'MySQL', 'MSSQL', 'Firebase'],
      achievements: [
        'Co-founded, scaled, and managed a B2B product house, successfully shipping 20+ applications.',
        'Built 4Money recharge system managing dynamic payment pathways and webhook routing.',
        'Mentored 8+ developer recruits, introducing Agile practices and clean code guidelines.',
        'Delivered customized retail and fintech solutions using diverse software stacks.'
      ]
    },
    {
      id: 'imaps',
      company: 'IMapsTechnologies',
      role: 'Co-Founder',
      period: 'January 2014 - Present (12 yrs 5 mos)',
      location: 'Kasaragod, Kerala, India',
      tech: ['Full-stack Engineering', 'B2B Solutions', 'Mobile App Development'],
      achievements: [
        'Pioneered local B2B technology consulting, servicing local government and retail ventures.',
        'Designed spatial tracking algorithms and integrated early mobile mapping services.'
      ]
    }
  ];

  // Core Skills
  const skills = [
    { name: 'C# / .NET', level: 92, category: 'backend' },
    { name: 'Node.js', level: 95, category: 'backend' },
    { name: 'Java / Spring Boot', level: 88, category: 'backend' },
    { name: 'Python (NLP / AI)', level: 85, category: 'backend' },
    { name: 'PHP', level: 90, category: 'backend' },
    { name: 'React / TypeScript', level: 94, category: 'frontend' },
    { name: 'Angular / AngularJS', level: 89, category: 'frontend' },
    { name: 'Android SDK (Java)', level: 90, category: 'frontend' },
    { name: 'HTML5 / CSS3 / Tailwind v4', level: 95, category: 'frontend' },
    { name: 'Milestone VMS SDK', level: 92, category: 'infrastructure' },
    { name: 'MongoDB', level: 91, category: 'infrastructure' },
    { name: 'MySQL / MSSQL', level: 90, category: 'infrastructure' },
    { name: 'AWS (S3, EC2, Lambda)', level: 88, category: 'infrastructure' },
    { name: 'Docker & Containers', level: 86, category: 'infrastructure' },
    { name: 'Distributed Systems', level: 93, category: 'languages' },
    { name: 'HIPAA & Compliance', level: 90, category: 'languages' },
    { name: 'Team Management & Agile', level: 95, category: 'languages' }
  ];

  const filteredSkills = skillCategory === 'all' 
    ? skills 
    : skills.filter(s => s.category === skillCategory);

  const scrollIntoView = (elementRef: React.RefObject<HTMLDivElement | null>) => {
    elementRef.current?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-theme-primary flex flex-col font-sans transition-colors duration-300">
      
      {/* Dynamic scanline overlay for retro matrix terminal and neon synth theme */}
      {(theme === 'matrix-green' || theme === 'neon-synth') && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          <div className="w-full h-1 bg-accent-theme-primary/10 opacity-30 shadow-[0_0_10px_rgba(34,197,94,0.3)]"
               style={{ animation: 'scanline 8s linear infinite' }} />
        </div>
      )}

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-border-theme bg-bg-primary/85 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-accent-theme-primary/10 border border-border-theme flex items-center justify-center font-display font-bold text-lg text-accent-theme-primary tracking-tighter text-glow">
              HK
            </div>
            <div>
              <span className="font-display font-bold text-text-theme-primary tracking-tight hidden sm:inline-block">
                Harsha Krishna K
              </span>
              <span className="text-xs text-text-theme-secondary block sm:hidden font-mono text-glow">
                [PRINCIPAL_ENGINEER]
              </span>
              <span className="text-[10px] text-text-theme-muted block sm:block font-mono tracking-widest uppercase ml-0.5 mt-[-2px] hidden">
                System Architect
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-text-theme-secondary hover:text-accent-theme-primary transition-colors cursor-pointer">About</button>
            <a href="#dashboard" className="text-text-theme-secondary hover:text-accent-theme-primary transition-colors">Telemetry</a>
            <a href="#architecture" className="text-text-theme-secondary hover:text-accent-theme-primary transition-colors">Architecture</a>
            <button onClick={() => scrollIntoView(projectsRef)} className="text-text-theme-secondary hover:text-accent-theme-primary transition-colors cursor-pointer">Projects</button>
            <a href="#experience" className="text-text-theme-secondary hover:text-accent-theme-primary transition-colors">Experience</a>
            <button onClick={() => scrollIntoView(contactRef)} className="text-text-theme-secondary hover:text-accent-theme-primary transition-colors cursor-pointer">Contact</button>
          </nav>

          {/* Theme Selector + CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            
            {/* Theme switcher */}
            <div className="flex items-center space-x-1 glass-panel px-2 py-1 rounded-full text-xs">
              {themes.map(t => (
                <button
                  key={t.name}
                  onClick={() => setTheme(t.name)}
                  className={`p-1.5 rounded-full transition-all cursor-pointer ${theme === t.name ? 'bg-accent-theme-primary text-bg-primary font-bold' : 'text-text-theme-secondary hover:text-text-theme-primary'}`}
                  title={t.label}
                >
                  {t.icon}
                </button>
              ))}
            </div>

            {/* Quick Actions */}
            <a 
              href="https://www.linkedin.com/in/harsha-krishna-k-55981b89"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-theme-secondary hover:text-accent-theme-primary transition-colors p-2 glass-panel rounded-lg"
              title="LinkedIn Profile"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>

            <a 
              href="https://github.com/harshakrishnak" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-theme-secondary hover:text-accent-theme-primary transition-colors p-2 glass-panel rounded-lg"
              title="GitHub Profile"
            >
              <GitHubIcon className="w-4 h-4" />
            </a>

            <button 
              onClick={() => scrollIntoView(contactRef)}
              className="px-4 py-2 text-xs font-mono font-bold uppercase border border-accent-theme-primary bg-accent-theme-primary/10 hover:bg-accent-theme-primary hover:text-bg-primary text-accent-theme-primary rounded-lg transition-all text-glow cursor-pointer"
            >
              Book Call
            </button>
          </div>

          {/* Mobile Menu & Theme Button */}
          <div className="flex md:hidden items-center space-x-2">
            
            {/* Quick theme cycle */}
            <button 
              onClick={() => {
                const nextTheme = theme === 'cyber-dark' ? 'light-glass' : theme === 'light-glass' ? 'matrix-green' : theme === 'matrix-green' ? 'neon-synth' : 'cyber-dark';
                setTheme(nextTheme);
              }}
              className="p-2 glass-panel rounded-lg text-accent-theme-primary"
              title="Cycle Theme"
            >
              <RefreshCw className="w-4 h-4 animate-spin-hover" />
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 glass-panel rounded-lg text-text-theme-primary"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel border-x-0 border-b border-border-theme bg-bg-primary/95 absolute left-0 right-0 p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-border-theme">
              {themes.map(t => (
                <button
                  key={t.name}
                  onClick={() => {
                    setTheme(t.name);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 p-2 rounded-lg text-xs font-mono ${theme === t.name ? 'bg-accent-theme-primary text-bg-primary font-bold' : 'text-text-theme-secondary'}`}
                >
                  {t.icon}
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
            <nav className="flex flex-col space-y-2 text-sm font-medium">
              <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }} className="text-left py-2 text-text-theme-secondary hover:text-accent-theme-primary">About</button>
              <a href="#dashboard" onClick={() => setMobileMenuOpen(false)} className="py-2 text-text-theme-secondary hover:text-accent-theme-primary">VMS Telemetry</a>
              <a href="#architecture" onClick={() => setMobileMenuOpen(false)} className="py-2 text-text-theme-secondary hover:text-accent-theme-primary">Pipeline Architecture</a>
              <button onClick={() => scrollIntoView(projectsRef)} className="text-left py-2 text-text-theme-secondary hover:text-accent-theme-primary">Featured Work</button>
              <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="py-2 text-text-theme-secondary hover:text-accent-theme-primary">Experience History</a>
              <button onClick={() => scrollIntoView(contactRef)} className="text-left py-2 text-text-theme-secondary hover:text-accent-theme-primary">Contact & Calendly</button>
            </nav>
            <div className="flex space-x-2 pt-2">
              <a href="https://www.linkedin.com/in/harsha-krishna-k-55981b89" target="_blank" rel="noopener noreferrer" className="flex-1 py-2 rounded-lg border border-border-theme flex items-center justify-center text-xs text-text-theme-secondary">
                <LinkedInIcon className="w-4 h-4 mr-2" /> LinkedIn
              </a>
              <a href="https://github.com/harshakrishnak" target="_blank" rel="noopener noreferrer" className="flex-1 py-2 rounded-lg border border-border-theme flex items-center justify-center text-xs text-text-theme-secondary">
                <GitHubIcon className="w-4 h-4 mr-2" /> GitHub
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Body */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 space-y-24">

        {/* Hero Section */}
        <section className="relative min-h-[75vh] flex flex-col md:flex-row items-center justify-between gap-12 pt-8 md:pt-16">
          
          {/* Ambient Glows */}
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-accent-theme-primary/10 blur-[80px] pointer-events-none animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 rounded-full bg-accent-theme-secondary/10 blur-[100px] pointer-events-none animate-pulse-slow" />

          {/* Left Text */}
          <div className="flex-1 space-y-6 text-left relative z-10">
            
            {/* Tagline */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-border-theme bg-bg-secondary/80 text-xs font-mono text-accent-theme-primary">
              <span className="w-2 h-2 rounded-full bg-accent-theme-primary animate-ping" />
              <span>Available for Architecture & Product Leadership</span>
            </div>

            {/* Name & Title */}
            <div className="space-y-3">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-theme-primary leading-tight">
                Harsha Krishna K
              </h1>
              <p className="font-display text-xl sm:text-2xl font-medium text-text-theme-secondary leading-normal">
                Principal Engineer & Systems Architect
              </p>
            </div>

            {/* Pitch summary */}
            <p className="text-base sm:text-lg text-text-theme-secondary max-w-2xl font-sans leading-relaxed">
              I specialize in building scalable, real-time AI monitoring platforms and high-throughput distributed systems. Over **12+ years**, I've co-founded product companies and designed complex full-stack architectures integrating VMS (Video Management Systems), HIPAA-compliant clouds, and event pipelines.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-4 max-w-2xl">
              <div className="glass-panel p-3 rounded-xl border-l-4 border-l-accent-theme-primary">
                <span className="text-2xl sm:text-3xl font-display font-bold text-text-theme-primary block">12+ Yrs</span>
                <span className="text-xs text-text-theme-secondary font-mono tracking-wider uppercase">Experience</span>
              </div>
              <div className="glass-panel p-3 rounded-xl border-l-4 border-l-accent-theme-secondary">
                <span className="text-2xl sm:text-3xl font-display font-bold text-text-theme-primary block">1000+</span>
                <span className="text-xs text-text-theme-secondary font-mono tracking-wider uppercase">VMS Cameras</span>
              </div>
              <div className="glass-panel p-3 rounded-xl border-l-4 border-l-accent-theme-primary">
                <span className="text-2xl sm:text-3xl font-display font-bold text-text-theme-primary block">20+</span>
                <span className="text-xs text-text-theme-secondary font-mono tracking-wider uppercase">B2B Products</span>
              </div>
              <div className="glass-panel p-3 rounded-xl border-l-4 border-l-accent-theme-secondary">
                <span className="text-2xl sm:text-3xl font-display font-bold text-text-theme-primary block">100+</span>
                <span className="text-xs text-text-theme-secondary font-mono tracking-wider uppercase">Cloud Clients</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button 
                onClick={() => scrollIntoView(projectsRef)}
                className="px-6 py-3 rounded-xl bg-accent-theme-primary hover:bg-accent-theme-primary/95 text-bg-primary font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-accent-theme-primary/20 flex items-center justify-center cursor-pointer"
              >
                <span>View Architecture & Projects</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>

              <button 
                onClick={() => scrollIntoView(contactRef)}
                className="px-6 py-3 rounded-xl border border-border-theme hover:border-border-theme-hover bg-bg-secondary/50 hover:bg-bg-secondary text-text-theme-primary font-medium text-sm flex items-center justify-center transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 mr-2 text-accent-theme-secondary" />
                <span>Book 30m Consultant Call</span>
              </button>

              <a
                href="https://www.linkedin.com/in/harsha-krishna-k-55981b89"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl border border-border-theme hover:border-border-theme-hover bg-bg-secondary/50 hover:bg-bg-secondary text-text-theme-primary font-medium text-sm flex items-center justify-center transition-all"
              >
                <Download className="w-4 h-4 mr-2 text-accent-theme-primary" />
                <span>Get Resume</span>
              </a>
            </div>

          </div>

          {/* Right Visual - Interactive Camera / Core System Node visual */}
          <div className="flex-1 w-full max-w-md lg:max-w-lg relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-theme-primary/10 to-accent-theme-secondary/10 rounded-2xl filter blur-xl opacity-60" />
            <div className="glass-panel p-4 sm:p-6 rounded-2xl relative border border-border-theme">
              
              {/* Box Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border-theme/60 mb-4 text-xs font-mono">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-text-theme-primary font-bold">STREAM_MONITOR_014</span>
                </div>
                <span className="text-text-theme-secondary tracking-widest">FPS: 25.0 // LAG: 84ms</span>
              </div>

              {/* Box Video Monitor Area */}
              <div className="relative aspect-video rounded-lg overflow-hidden bg-bg-primary border border-border-theme flex flex-col justify-between p-3 font-mono">
                
                {/* Simulated CCTV Grid Overlay */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none" />
                
                {/* CCTV Coordinates / Details overlay */}
                <div className="flex justify-between text-[10px] text-text-theme-secondary z-10">
                  <span>REC [●] 2026-05-23</span>
                  <span>1000/1000 CAMERAS ACTIVE</span>
                </div>

                {/* Center graphic: Neural camera frame detection overlay */}
                <div className="flex-grow flex items-center justify-center my-4 relative">
                  {/* Dynamic SVG showing node monitoring */}
                  <svg className="w-32 h-32 text-accent-theme-primary animate-pulse-slow" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" fill="none" className="opacity-40" />
                    <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="1.5" fill="none" className="opacity-60" />
                    {/* Bounding box mock */}
                    <rect x="25" y="25" width="50" height="50" stroke="currentColor" strokeWidth="1" fill="none" className="opacity-30" />
                    
                    {/* Glowing pulse dots */}
                    <circle cx="25" cy="25" r="2.5" fill="currentColor" />
                    <circle cx="75" cy="75" r="2.5" fill="currentColor" />
                    
                    {/* Target crosshairs */}
                    <path d="M 50 10 L 50 20 M 50 80 L 50 90 M 10 50 L 20 50 M 80 50 L 90 50" stroke="currentColor" strokeWidth="1.5" />
                    
                    {/* Center point */}
                    <circle cx="50" cy="50" r="3" fill="var(--accent-secondary)" />
                  </svg>

                  {/* Corner bounds overlay */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-accent-theme-primary" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-accent-theme-primary" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-accent-theme-primary" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-accent-theme-primary" />

                  {/* AI labels */}
                  <div className="absolute top-3 left-8 bg-accent-theme-secondary/20 text-accent-theme-secondary text-[9px] px-1.5 py-0.5 rounded border border-accent-theme-secondary/30">
                    BLUR_RATING: 1.2 (SAFE)
                  </div>
                  <div className="absolute bottom-3 right-8 bg-accent-theme-primary/20 text-accent-theme-primary text-[9px] px-1.5 py-0.5 rounded border border-accent-theme-primary/30">
                    OBSTRUCTION: 0%
                  </div>
                </div>

                {/* Overlay telemetry info */}
                <div className="flex justify-between items-end text-[10px] z-10">
                  <span className="text-accent-theme-primary bg-accent-theme-primary/10 px-1 py-0.5 rounded border border-border-theme">
                    AI RESOLVED
                  </span>
                  <span className="text-text-theme-muted">VMS: Milestone-XProtect</span>
                </div>
              </div>

              {/* Stats panel beneath video */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="glass-panel p-2 rounded-lg bg-bg-primary/50">
                  <span className="text-text-theme-muted block text-[10px] uppercase">Telemetry Ingestion</span>
                  <span className="text-accent-theme-primary font-bold text-glow">99.98%</span>
                </div>
                <div className="glass-panel p-2 rounded-lg bg-bg-primary/50">
                  <span className="text-text-theme-muted block text-[10px] uppercase">NLP Search latency</span>
                  <span className="text-accent-theme-secondary font-bold">14.8ms</span>
                </div>
                <div className="glass-panel p-2 rounded-lg bg-bg-primary/50">
                  <span className="text-text-theme-muted block text-[10px] uppercase">Node Redundancy</span>
                  <span className="text-text-theme-primary font-bold">Active</span>
                </div>
              </div>

            </div>
          </div>

        </section>

        {/* Section B: VMS Camera Intelligence Monitor */}
        <section id="dashboard" className="scroll-mt-20">
          <div className="text-center space-y-3 mb-10">
            <h2 className="font-display text-3xl font-bold tracking-tight text-text-theme-primary">VMS Camera Intelligence Monitor</h2>
            <p className="text-text-theme-secondary max-w-2xl mx-auto text-sm sm:text-base">
              A real-time simulation of the AI camera analytics platform I architect at Conexao — integrated with Milestone XProtect VMS, processing 1000+ live feeds concurrently.
            </p>
          </div>

          {/* Top Bar: System Status */}
          <div className="glass-panel rounded-xl px-4 py-3 mb-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono border border-border-theme">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                <span className="text-green-400 font-bold">VMS ONLINE</span>
              </div>
              <span className="text-text-theme-muted hidden sm:inline">Milestone XProtect Smart Client v23.3</span>
            </div>
            <div className="flex items-center space-x-4 text-text-theme-muted">
              <span>Cameras: <strong className="text-text-theme-primary">1000 / 1000</strong></span>
              <span>Frames: <strong className="text-accent-theme-primary">{processedFrames.toLocaleString()}</strong></span>
              <span>Alerts: <strong className="text-red-400">{anomalyCounter}</strong></span>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center space-x-1 px-2 py-1 rounded border border-border-theme hover:border-border-theme-hover transition-all cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3 h-3 text-yellow-400" /> : <Play className="w-3 h-3 text-green-400" />}
                <span className="text-[10px] font-bold">{isPlaying ? 'PAUSE' : 'RESUME'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

            {/* Camera Grid: 3 cols on left */}
            <div className="lg:col-span-3 space-y-4">

              {/* 3x2 Camera Feed Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {[
                  { id: 'CAM-01', loc: 'Kasaragod HQ — Lobby', status: 'online', blur: 1.2, obstruction: 0, fps: 25, alert: false },
                  { id: 'CAM-02', loc: 'Panaji — Server Room', status: 'online', blur: 0.8, obstruction: 0, fps: 25, alert: false },
                  { id: 'CAM-03', loc: 'Goa — Parking Zone', status: 'alert', blur: 6.4, obstruction: 12, fps: 24, alert: true },
                  { id: 'CAM-04', loc: 'Remote — Gateway Node', status: 'online', blur: 1.1, obstruction: 0, fps: 25, alert: false },
                  { id: 'CAM-05', loc: 'AWS — HealthFeed Edge', status: 'degraded', blur: 3.3, obstruction: 5, fps: 18, alert: false },
                  { id: 'CAM-06', loc: 'Kasaragod — Perimeter', status: 'online', blur: 0.9, obstruction: 0, fps: 25, alert: false },
                ].map((cam) => (
                  <div
                    key={cam.id}
                    onClick={() => setSelectedCamera(cam.id)}
                    className={`relative aspect-video rounded-xl overflow-hidden border cursor-pointer transition-all group ${
                      selectedCamera.startsWith(cam.id)
                        ? 'border-accent-theme-primary shadow-lg scale-[1.02]'
                        : cam.status === 'alert'
                        ? 'border-red-500/60 hover:border-red-500'
                        : cam.status === 'degraded'
                        ? 'border-yellow-500/40 hover:border-yellow-400'
                        : 'border-border-theme hover:border-border-theme-hover'
                    }`}
                    style={{ background: 'var(--bg-primary)' }}
                  >
                    {/* Scanline CRT overlay */}
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.08)_2px,rgba(0,0,0,0.08)_4px)] pointer-events-none z-10" />

                    {/* AI Bounding box */}
                    {cam.status !== 'degraded' && (
                      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none z-20 ${cam.alert ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                        <div className={`relative w-14 h-10 border-2 rounded-sm ${cam.alert ? 'border-red-400' : 'border-accent-theme-primary'} animate-pulse`}>
                          <div className={`absolute -top-0.5 -left-0.5 w-2 h-2 border-t-2 border-l-2 ${cam.alert ? 'border-red-400' : 'border-accent-theme-primary'}`} />
                          <div className={`absolute -top-0.5 -right-0.5 w-2 h-2 border-t-2 border-r-2 ${cam.alert ? 'border-red-400' : 'border-accent-theme-primary'}`} />
                          <div className={`absolute -bottom-0.5 -left-0.5 w-2 h-2 border-b-2 border-l-2 ${cam.alert ? 'border-red-400' : 'border-accent-theme-primary'}`} />
                          <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 border-b-2 border-r-2 ${cam.alert ? 'border-red-400' : 'border-accent-theme-primary'}`} />
                          <span className={`absolute top-full left-1/2 -translate-x-1/2 mt-0.5 text-[7px] font-mono px-1 rounded whitespace-nowrap ${cam.alert ? 'bg-red-500/80 text-white' : 'bg-accent-theme-primary/80 text-bg-primary'}`}>
                            {cam.alert ? 'ANOMALY' : 'TRACKING'}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Top-left: Camera ID + status dot */}
                    <div className="absolute top-1.5 left-1.5 z-30 flex items-center space-x-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${cam.status === 'online' ? 'bg-green-500' : cam.status === 'alert' ? 'bg-red-500 animate-ping' : 'bg-yellow-500'}`} />
                      <span className="text-[9px] font-mono font-bold text-white bg-black/50 px-1 rounded">{cam.id}</span>
                    </div>

                    {/* Top-right: REC */}
                    <div className="absolute top-1.5 right-1.5 z-30">
                      {cam.status !== 'degraded' && (
                        <span className="text-[8px] font-mono text-red-400 bg-black/50 px-1 rounded flex items-center space-x-0.5">
                          <span className="w-1 h-1 rounded-full bg-red-500 animate-ping inline-block" />
                          <span>REC</span>
                        </span>
                      )}
                    </div>

                    {/* Center grid pattern */}
                    <div className="absolute inset-0 flex items-center justify-center z-0">
                      <svg viewBox="0 0 60 40" className={`w-3/4 opacity-10 ${cam.alert ? 'text-red-500' : 'text-accent-theme-primary'}`}>
                        <rect x="5" y="5" width="50" height="30" stroke="currentColor" strokeWidth="0.5" fill="none" />
                        <line x1="5" y1="20" x2="55" y2="20" stroke="currentColor" strokeWidth="0.3" />
                        <line x1="30" y1="5" x2="30" y2="35" stroke="currentColor" strokeWidth="0.3" />
                        <circle cx="30" cy="20" r="8" stroke="currentColor" strokeWidth="0.5" fill="none" />
                      </svg>
                    </div>

                    {/* Bottom: Location + FPS + blur */}
                    <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/70 to-transparent p-1.5">
                      <p className="text-[8px] text-white/80 font-mono leading-tight truncate">{cam.loc}</p>
                      <div className="flex justify-between mt-0.5">
                        <span className="text-[7px] font-mono text-white/60">FPS: {cam.fps}</span>
                        <span className={`text-[7px] font-mono font-bold ${cam.blur > 4 ? 'text-red-400' : cam.blur > 2 ? 'text-yellow-400' : 'text-green-400'}`}>
                          BLUR: {cam.blur}
                        </span>
                      </div>
                    </div>

                    {/* Alert pulse border */}
                    {cam.alert && (
                      <div className="absolute inset-0 border-2 border-red-500 rounded-xl animate-pulse pointer-events-none z-40 opacity-60" />
                    )}
                  </div>
                ))}
              </div>

              {/* Alert Ticker Strip */}
              <div className="glass-panel rounded-xl px-4 py-2.5 border border-border-theme overflow-hidden">
                <div className="flex items-center space-x-3">
                  <span className="text-[10px] font-mono font-bold text-red-400 shrink-0 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    <span>LIVE ALERTS</span>
                  </span>
                  <div className="overflow-hidden flex-grow relative h-4">
                    <div className="flex gap-8 text-[10px] font-mono absolute whitespace-nowrap animate-ticker" style={{ animation: 'ticker 25s linear infinite' }}>
                      {[
                        '⚠ CAM-03: Blur threshold exceeded (6.4) — Goa Parking Zone',
                        '✓ CAM-01: NLP metadata parse complete — 482,031 frames OK',
                        '⚠ CAM-05: Frame rate degraded to 18 FPS — AWS Edge Node',
                        '✓ AI-MODULE: Anomaly scored and logged to MongoDB cluster',
                        '✓ VMS-PLUGIN: Milestone XProtect Smart Client overlay sync OK',
                        '⚠ CAM-03: Partial obstruction detected (12%) — review required',
                        '✓ HIPAA-PIPELINE: HealthFeed redundancy check passed on AWS S3',
                      ].map((msg, i) => (
                        <span key={i} className={msg.startsWith('⚠') ? 'text-yellow-400 animate-pulse' : 'text-green-400'}>
                          {msg}
                        </span>
                      ))}
                      {/* Duplicate for infinite seamless scroll */}
                      {[
                        '⚠ CAM-03: Blur threshold exceeded (6.4) — Goa Parking Zone',
                        '✓ CAM-01: NLP metadata parse complete — 482,031 frames OK',
                        '⚠ CAM-05: Frame rate degraded to 18 FPS — AWS Edge Node',
                        '✓ AI-MODULE: Anomaly scored and logged to MongoDB cluster',
                        '✓ VMS-PLUGIN: Milestone XProtect Smart Client overlay sync OK',
                        '⚠ CAM-03: Partial obstruction detected (12%) — review required',
                        '✓ HIPAA-PIPELINE: HealthFeed redundancy check passed on AWS S3',
                      ].map((msg, i) => (
                        <span key={`dup-${i}`} className={msg.startsWith('⚠') ? 'text-yellow-400 animate-pulse' : 'text-green-400'}>
                          {msg}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar: Camera Health Scores */}
            <div className="glass-panel p-4 rounded-xl flex flex-col gap-4 border border-border-theme">
              <div className="flex items-center space-x-2 pb-2 border-b border-border-theme">
                <Activity className="w-4 h-4 text-accent-theme-primary" />
                <h3 className="font-display font-semibold text-text-theme-primary text-sm">Camera Health</h3>
              </div>

              <div className="space-y-3 font-mono text-xs flex-grow">
                {[
                  { id: 'CAM-01', health: 98 },
                  { id: 'CAM-02', health: 99 },
                  { id: 'CAM-03', health: 43 },
                  { id: 'CAM-04', health: 95 },
                  { id: 'CAM-05', health: 67 },
                  { id: 'CAM-06', health: 97 },
                ].map((cam) => (
                  <div key={cam.id} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-text-theme-secondary">{cam.id}</span>
                      <span className={`text-[10px] font-bold ${cam.health > 90 ? 'text-green-400' : cam.health > 70 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {cam.health}%
                      </span>
                    </div>
                    <div className="w-full bg-bg-primary rounded-full h-1.5 overflow-hidden border border-border-theme/40">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${cam.health > 90 ? 'bg-green-500' : cam.health > 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${cam.health}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-border-theme space-y-2 font-mono text-[10px] text-text-theme-muted">
                <div className="flex justify-between">
                  <span>AI Analysis:</span>
                  <button
                    onClick={() => setAiAnalysisActive(!aiAnalysisActive)}
                    className={`font-bold cursor-pointer transition-colors ${aiAnalysisActive ? 'text-green-400' : 'text-text-theme-muted'}`}
                  >
                    {aiAnalysisActive ? '● ACTIVE' : '○ STANDBY'}
                  </button>
                </div>
                <div className="flex justify-between">
                  <span>VMS Engine:</span>
                  <span className="text-text-theme-primary">XProtect</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Health:</span>
                  <span className="text-accent-theme-primary font-bold">83.2%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section C: System Architecture Pipeline Showcase */}
        <section id="architecture" className="scroll-mt-20">
          <div className="text-center space-y-3 mb-10">
            <h2 className="font-display text-3xl font-bold tracking-tight">AI Metadata Analytics Pipeline</h2>
            <p className="text-text-theme-secondary max-w-2xl mx-auto text-sm sm:text-base">
              A high-level architecture diagram demonstrating how RTSP camera networks route metadata through on-prem VMS systems, filter analytics via Python AI engines, and securely cache to cloud databases.
            </p>
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
            
            {/* Responsive Flow chart diagram in SVG */}
            <div className="w-full relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 py-4">
              
              {/* Box 1: RTSP Camera Nodes */}
              <div className="w-full lg:w-64 glass-panel p-4 rounded-xl bg-bg-secondary/80 border-l-4 border-l-accent-theme-primary flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-accent-theme-primary/10 text-accent-theme-primary">
                  <Video className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-bold text-text-theme-primary">1. RTSP Feeds</h4>
                  <p className="text-[11px] text-text-theme-secondary">1000+ IP Cameras streaming raw video frames.</p>
                </div>
              </div>

              {/* Connecting line arrow */}
              <div className="hidden lg:flex items-center text-accent-theme-primary">
                <Workflow className="w-5 h-5 animate-pulse" />
                <ChevronRight className="w-4 h-4" />
              </div>
              <div className="lg:hidden w-1 h-6 bg-accent-theme-primary/40" />

              {/* Box 2: Milestone SDK & C# plugin */}
              <div className="w-full lg:w-64 glass-panel p-4 rounded-xl bg-bg-secondary/80 border-l-4 border-l-accent-theme-secondary flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-accent-theme-secondary/10 text-accent-theme-secondary">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-bold text-text-theme-primary">2. Milestone SDK Overlay</h4>
                  <p className="text-[11px] text-text-theme-secondary">C# Smart Client plugin ingests raw logs/frames.</p>
                </div>
              </div>

              {/* Connecting line arrow */}
              <div className="hidden lg:flex items-center text-accent-theme-secondary">
                <Workflow className="w-5 h-5 animate-pulse" />
                <ChevronRight className="w-4 h-4" />
              </div>
              <div className="lg:hidden w-1 h-6 bg-accent-theme-secondary/40" />

              {/* Box 3: Node.js Ingestion Gateway */}
              <div className="w-full lg:w-64 glass-panel p-4 rounded-xl bg-bg-secondary/80 border-l-4 border-l-accent-theme-primary flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-accent-theme-primary/10 text-accent-theme-primary">
                  <Server className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-bold text-text-theme-primary">3. Ingestion Gateway</h4>
                  <p className="text-[11px] text-text-theme-secondary">Node.js API validates payloads & formats logs.</p>
                </div>
              </div>

              {/* Connecting line arrow */}
              <div className="hidden lg:flex items-center text-accent-theme-primary">
                <Workflow className="w-5 h-5 animate-pulse" />
                <ChevronRight className="w-4 h-4" />
              </div>
              <div className="lg:hidden w-1 h-6 bg-accent-theme-primary/40" />

              {/* Box 4: Python AI & MongoDB Cache */}
              <div className="w-full lg:w-64 glass-panel p-4 rounded-xl bg-bg-secondary/80 border-l-4 border-l-accent-theme-secondary flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-accent-theme-secondary/10 text-accent-theme-secondary">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-bold text-text-theme-primary">4. AI Parse & Cache</h4>
                  <p className="text-[11px] text-text-theme-secondary">Python NLP parses event metadata. Cached in MongoDB.</p>
                </div>
              </div>

            </div>

            {/* Architecture Explainer text block */}
            <div className="mt-6 pt-6 border-t border-border-theme/60 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-text-theme-secondary leading-relaxed">
              <div className="space-y-2">
                <span className="text-text-theme-primary font-bold uppercase tracking-wider block">🔑 Performance Optimizations</span>
                <p>
                  By utilizing C# on-prem integrations with the Milestone Smart Client SDK, we capture frame overlays directly on the graphics loop. Processed metadata is serialized to Node.js gateways via fast sockets, reducing network package overhead.
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-accent-theme-secondary font-bold uppercase tracking-wider block">🔒 Cloud-Native Redundancy</span>
                <p>
                  For cloud integrations (e.g. HealthFeed), Spring Boot microservices process transactions and cache to MongoDB with configured replica sets. We leverage HIPAA-compliant encryption over AWS VPCs to protect sensitive payloads.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Section D: Featured Projects */}
        <section ref={projectsRef} id="projects" className="scroll-mt-20">
          <div className="text-center space-y-3 mb-10">
            <h2 className="font-display text-3xl font-bold tracking-tight">Key B2B Products & Portfolio Projects</h2>
            <p className="text-text-theme-secondary max-w-2xl mx-auto text-sm sm:text-base">
              A curated showcase of scalable platforms I have architected, built, and launched. Focused on performance, high throughput, and tangible business impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl flex flex-col justify-between gap-6 hover:shadow-xl hover:translate-y-[-2px] transition-all">
                
                <div className="space-y-4">
                  
                  {/* Project Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-lg font-bold text-text-theme-primary group-hover:text-accent-theme-primary transition-colors">
                        {p.title}
                      </h3>
                      <span className="text-xs font-mono text-accent-theme-secondary block mt-0.5">
                        {p.role}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono border border-border-theme bg-bg-secondary px-2.5 py-0.5 rounded text-text-theme-muted">
                      PROD_DEPLOYED
                    </span>
                  </div>

                  {/* Impact badge metrics */}
                  <div className="bg-accent-theme-primary/5 border border-border-theme p-3 rounded-lg flex items-center space-x-2 text-xs font-mono text-accent-theme-primary">
                    <TrendingUp className="w-4 h-4 shrink-0" />
                    <span><strong>Impact:</strong> {p.metrics}</span>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-text-theme-secondary leading-relaxed">
                    {p.description}
                  </p>

                  {/* Bullets details */}
                  <ul className="space-y-1.5 text-xs text-text-theme-secondary list-disc pl-4 leading-relaxed">
                    {p.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>

                </div>

                {/* Tech Pills */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {p.tech.map((t, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-bg-secondary border border-border-theme text-text-theme-primary">
                      {t}
                    </span>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* Section E: Work Experience Timeline */}
        <section id="experience" className="scroll-mt-20">
          <div className="text-center space-y-3 mb-10">
            <h2 className="font-display text-3xl font-bold tracking-tight">Professional Experience History</h2>
            <p className="text-text-theme-secondary max-w-2xl mx-auto text-sm sm:text-base">
              Over a decade of leadership, co-founding successful engineering firms, and delivering client projects globally.
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Timeline Vertical bar */}
            <div className="absolute left-4 sm:left-1/2 top-2 bottom-2 w-0.5 bg-border-theme pointer-events-none" />

            {/* Experience Cards */}
            <div className="space-y-12">
              {jobs.map((job, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <div key={job.id} className={`flex flex-col sm:flex-row items-start relative ${isLeft ? 'sm:flex-row-reverse' : ''}`}>
                    
                    {/* Timeline Node dot */}
                    <div className="absolute left-4 sm:left-1/2 w-3.5 h-3.5 rounded-full bg-accent-theme-primary border-4 border-bg-primary -translate-x-[6.5px] top-1.5 z-10" />

                    {/* Spacer block for alignment */}
                    <div className="hidden sm:block w-1/2" />

                    {/* Job Card block */}
                    <div className="w-full sm:w-[46%] pl-10 sm:pl-0">
                      <div className="glass-panel p-5 rounded-2xl bg-bg-card hover:border-border-theme-hover transition-all space-y-3">
                        
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                          <div>
                            <h3 className="font-display font-bold text-text-theme-primary text-sm sm:text-base flex items-center">
                              <Briefcase className="w-4 h-4 mr-2 text-accent-theme-primary shrink-0" />
                              {job.role}
                            </h3>
                            <span className="text-xs text-accent-theme-secondary font-semibold font-mono block mt-0.5">
                              {job.company}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono bg-bg-primary px-2.5 py-0.5 rounded border border-border-theme text-text-theme-muted shrink-0 w-fit">
                            {job.period.split(' (')[0]}
                          </span>
                        </div>

                        <p className="text-[11px] font-mono text-text-theme-muted">
                          📍 {job.location}
                        </p>

                        <div className="space-y-1.5 text-xs text-text-theme-secondary pl-1 leading-relaxed">
                          {job.achievements.map((ach, achIdx) => (
                            <div key={achIdx} className="flex items-start space-x-1.5">
                              <span className="text-accent-theme-primary mt-1 shrink-0">▪</span>
                              <span>{ach}</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 border-t border-border-theme/40 flex flex-wrap gap-1">
                          {job.tech.map((t, tIdx) => (
                            <span key={tIdx} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-bg-primary border border-border-theme/80 text-text-theme-secondary">
                              {t}
                            </span>
                          ))}
                        </div>

                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section F: Technical Skills Matrix */}
        <section id="skills" className="scroll-mt-20">
          <div className="text-center space-y-3 mb-10">
            <h2 className="font-display text-3xl font-bold tracking-tight">Core Competence Matrix</h2>
            <p className="text-text-theme-secondary max-w-2xl mx-auto text-sm sm:text-base">
              A comprehensive technical skills breakdown categorizing full-stack layers, databases, and special integration frameworks.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Category tabs */}
            <div className="flex flex-wrap justify-center gap-2 p-1 border border-border-theme bg-bg-secondary/40 rounded-xl max-w-lg mx-auto text-xs font-mono">
              {[
                { id: 'all', label: 'All Stack' },
                { id: 'backend', label: 'Backend Architect' },
                { id: 'frontend', label: 'Frontend & Apps' },
                { id: 'infrastructure', label: 'Cloud/DB/VMS' },
                { id: 'languages', label: 'Core / Lead' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSkillCategory(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${skillCategory === tab.id ? 'bg-accent-theme-primary text-bg-primary font-bold' : 'text-text-theme-secondary hover:text-text-theme-primary'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredSkills.map((s, idx) => (
                <div key={idx} className="glass-panel p-4 rounded-xl bg-bg-card flex flex-col justify-between gap-3 text-xs">
                  <div className="flex items-center justify-between font-mono">
                    <span className="font-bold text-text-theme-primary flex items-center">
                      <Code className="w-3.5 h-3.5 mr-1.5 text-accent-theme-primary" />
                      {s.name}
                    </span>
                    <span className="text-accent-theme-secondary font-bold">{s.level}%</span>
                  </div>
                  
                  {/* Skill level progress bar */}
                  <div className="w-full bg-bg-primary rounded-full h-1.5 overflow-hidden border border-border-theme/40">
                    <div 
                      className="bg-gradient-to-r from-accent-theme-primary to-accent-theme-secondary h-full rounded-full transition-all duration-500" 
                      style={{ width: `${s.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Education timeline quick summary */}
            <div className="mt-12 glass-panel p-5 rounded-2xl max-w-2xl mx-auto space-y-4">
              <h3 className="font-display font-semibold text-text-theme-primary text-sm flex items-center pb-2 border-b border-border-theme">
                <GraduationCap className="w-5 h-5 mr-2 text-accent-theme-secondary" />
                Academic Background
              </h3>
              <div className="space-y-3 font-mono text-xs text-text-theme-secondary">
                <div className="flex justify-between items-start">
                  <div>
                    <strong className="text-text-theme-primary">LBS Engineering College Kasaragod</strong>
                    <span className="block text-[11px] text-text-theme-muted">Engineer's Degree, Information Technology</span>
                  </div>
                  <span className="text-[10px] bg-bg-secondary px-2 py-0.5 rounded border border-border-theme">2010 - 2014</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <strong className="text-text-theme-primary">GSS Kumbla</strong>
                    <span className="block text-[11px] text-text-theme-muted">+2, Science (Physics, Chemistry, Maths)</span>
                  </div>
                  <span className="text-[10px] bg-bg-secondary px-2 py-0.5 rounded border border-border-theme">2008 - 2010</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Section G: Contact Section & Calendly CTA */}
        <section ref={contactRef} id="contact" className="scroll-mt-20 max-w-4xl mx-auto">
          <div className="text-center space-y-3 mb-10">
            <h2 className="font-display text-3xl font-bold tracking-tight">Initiate Consultation</h2>
            <p className="text-text-theme-secondary max-w-xl mx-auto text-sm">
              Schedule a 30-minute system architecture review, discuss product integration consulting, or connect regarding software leadership opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left side: Calendly embed option / direct channels */}
            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between gap-6 bg-bg-card">
              
              <div className="space-y-4">
                <h3 className="font-display font-semibold text-text-theme-primary text-base">Direct Channels</h3>
                <p className="text-xs text-text-theme-secondary leading-relaxed">
                  I typically respond to inquiries within 24 hours. Feel free to book a slot directly via Calendly or shoot a message to my secure mailbox.
                </p>

                <div className="space-y-3 font-mono text-xs pt-2">
                  <a href="mailto:harshakrishnak5@gmail.com" className="flex items-center space-x-2.5 p-3 rounded-lg bg-bg-primary/50 hover:bg-bg-primary border border-border-theme hover:border-border-theme-hover text-text-theme-secondary hover:text-text-theme-primary transition-all">
                    <Mail className="w-4 h-4 text-accent-theme-primary shrink-0" />
                    <span>harshakrishnak5@gmail.com</span>
                  </a>

                  <a href="https://calendly.com/harshakrishnak910/30min" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2.5 p-3 rounded-lg bg-bg-primary/50 hover:bg-bg-primary border border-border-theme hover:border-border-theme-hover text-text-theme-secondary hover:text-text-theme-primary transition-all">
                    <Calendar className="w-4 h-4 text-accent-theme-secondary shrink-0" />
                    <span>Schedule Calendar booking (30 Min)</span>
                  </a>

                  <div className="flex items-center space-x-2.5 p-3 rounded-lg bg-bg-primary/50 border border-border-theme text-text-theme-muted">
                    <Eye className="w-4 h-4 shrink-0 text-accent-theme-primary" />
                    <span>Phone: +91 8714418527</span>
                  </div>
                </div>
              </div>

              {/* Calendly Booking Embedded Button Link */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-text-theme-muted uppercase tracking-widest block">Instant Calendly Booking</span>
                <a 
                  href="https://calendly.com/harshakrishnak910/30min" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-accent-theme-primary to-accent-theme-secondary text-bg-primary font-bold text-center block text-sm shadow-md hover:shadow-lg transition-all"
                >
                  Confirm Calendar Appointment
                </a>
              </div>

            </div>

            {/* Right side: Interactive Terminal Contact Form */}
            <div className="glass-panel p-6 rounded-2xl bg-bg-card flex flex-col justify-between gap-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-border-theme">
                <span className="font-mono text-xs text-text-theme-primary font-bold flex items-center">
                  <Terminal className="w-4 h-4 mr-1.5 text-accent-theme-primary" />
                  SECURE_INBOUND_GATEWAY
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>

              {formSubmitted ? (
                <div className="flex-grow flex flex-col items-center justify-center py-8 text-center space-y-4">
                  <CheckCircle className="w-12 h-12 text-green-500 animate-bounce" />
                  <div className="space-y-1.5">
                    <h4 className="font-mono text-sm font-bold text-text-theme-primary">PAYLOAD INGESTED SUCCESSFULLY</h4>
                    <p className="text-xs text-text-theme-secondary max-w-xs mx-auto">
                      Connection parameters registered. I will follow up via the email address provided in your socket block.
                    </p>
                  </div>
                  <button 
                    onClick={() => { setFormSubmitted(false); setFormData({ name: '', email: '', message: '' }); setFormTerminalLogs([]); }}
                    className="px-4 py-2 border border-border-theme hover:border-border-theme-hover rounded-lg text-xs font-mono text-text-theme-secondary hover:text-text-theme-primary cursor-pointer"
                  >
                    Open New Handshake
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    
                    <div className="space-y-1">
                      <label className="font-mono text-[10px] text-text-theme-secondary block uppercase">Name / Organisation</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. John Doe / Conexao Inc" 
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-bg-primary/80 border border-border-theme rounded-lg px-3 py-2 text-xs font-mono focus:border-accent-theme-primary focus:outline-none text-text-theme-primary transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[10px] text-text-theme-secondary block uppercase">Email Address</label>
                      <input 
                        type="email" 
                        required
                        placeholder="e.g. communication@partner.com" 
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-bg-primary/80 border border-border-theme rounded-lg px-3 py-2 text-xs font-mono focus:border-accent-theme-primary focus:outline-none text-text-theme-primary transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[10px] text-text-theme-secondary block uppercase">Message Body</label>
                      <textarea 
                        required
                        rows={3}
                        placeholder="Brief overview of project scope or consultation outline..." 
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-bg-primary/80 border border-border-theme rounded-lg px-3 py-2 text-xs font-mono focus:border-accent-theme-primary focus:outline-none text-text-theme-primary transition-colors resize-none"
                      />
                    </div>

                  </div>

                  {/* Terminal processing log screen when submitting */}
                  {formTerminalLogs.length > 0 && (
                    <div className="p-2.5 bg-bg-primary border border-border-theme/80 rounded-lg font-mono text-[9px] text-text-theme-secondary space-y-1">
                      {formTerminalLogs.map((log, idx) => (
                        <div key={idx} className="flex items-center space-x-1">
                          <span className="text-accent-theme-primary">&gt;</span>
                          <span>{log}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="w-full py-2.5 rounded-lg border border-accent-theme-primary bg-accent-theme-primary/10 hover:bg-accent-theme-primary hover:text-bg-primary text-accent-theme-primary font-mono text-xs font-bold uppercase transition-all flex items-center justify-center space-x-2 text-glow cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? 'PROCESSING...' : 'DISPATCH_INBOUND'}</span>
                  </button>
                </form>
              )}

            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-border-theme bg-bg-secondary/40 py-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-theme-muted">
          <div>
            <span>© 2026 Harsha Krishna K. All rights reserved.</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <span>Powered by React 19 + Tailwind v4</span>
            <a 
              href="https://www.linkedin.com/in/harsha-krishna-k-55981b89"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-theme-primary transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/harshakrishnak" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-accent-theme-primary transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
