import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Cpu, Activity, Video, CheckCircle, 
  Mail, Calendar, Download, ChevronRight, 
  Menu, X, Server, Database, Code, TrendingUp, Sun, Moon, Workflow, 
  Eye, RefreshCw, Play, Pause, Send, Briefcase, GraduationCap, ExternalLink
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

interface GithubProject {
  name: string;
  description: string;
  tech: string[];
  stars: number;
  forks: number;
  url: string;
  demoType: 'modal-mcp' | 'modal-sentiment' | 'scroll' | 'external';
  demoUrl?: string;
  hasDemo: boolean;
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

  // Enterprise Analytics Dashboard States
  const [selectedRegion, setSelectedRegion] = useState<'ALL' | 'IN' | 'US' | 'EU' | 'APAC'>('ALL');
  const [activeMetric, setActiveMetric] = useState<'health' | 'load' | 'loss'>('health');
  const [chartData, setChartData] = useState<number[]>([98, 97, 98, 96, 95, 97, 98, 99, 97, 98, 95, 96, 98, 99]);
  const [activeAlarms, setActiveAlarms] = useState<Array<{ id: string, time: string, site: string, cam: string, type: string, priority: 'CRITICAL' | 'MAJOR' | 'MINOR', status: string }>>([
    { id: '1', time: '20:41:05', site: 'Site-402 (Goa)', cam: 'CAM-8942', type: 'Blur Exception', priority: 'MAJOR', status: 'Active' },
    { id: '2', time: '20:40:52', site: 'Site-109 (Kasaragod)', cam: 'CAM-1204', type: 'Obstruction', priority: 'CRITICAL', status: 'Active' },
    { id: '3', time: '20:39:15', site: 'Site-512 (Panaji)', cam: 'CAM-4029', type: 'Scene Change', priority: 'MINOR', status: 'Resolved' },
    { id: '4', time: '20:38:40', site: 'Site-022 (AWS-Edge)', cam: 'CAM-0592', type: 'Low Light Trigger', priority: 'MINOR', status: 'Active' },
    { id: '5', time: '20:37:12', site: 'Site-331 (US-East)', cam: 'CAM-7721', type: 'Signal Loss', priority: 'CRITICAL', status: 'Active' }
  ]);
  const [outageSimulation, setOutageSimulation] = useState<boolean>(false);
  const [selectedClusterId, setSelectedClusterId] = useState<string>('IN-S1');
  const [activeAIModel, setActiveAIModel] = useState<string>('YOLOv8 Edge');
  const [modelLog, setModelLog] = useState<string>('SYSTEM RUNTIME: NORMAL - METADATA STREAM ACTIVE');

  // Skill matrix active filter
  const [skillCategory, setSkillCategory] = useState<'all' | 'languages' | 'backend' | 'frontend' | 'infrastructure'>('all');

  // Contact form submission states
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formTerminalLogs, setFormTerminalLogs] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // GitHub Projects States
  const [activeGithubDemo, setActiveGithubDemo] = useState<string | null>(null); // 'mcp' | 'sentiment' | null
  
  // Interactive simulator states for Camera-DB-MCP
  const [simMcpQuery, setSimMcpQuery] = useState<string>('get_camera_stats');
  const [simMcpResult, setSimMcpResult] = useState<string>(() => JSON.stringify({
    total_cameras: 10000,
    active_streams: 9842,
    error_states: 158,
    manufacturers: {
      Axis: 4200,
      Hikvision: 3100,
      Hanwha: 1800,
      Dahua: 900
    },
    recording_servers: 24,
    average_fps: 29.8
  }, null, 2));
  const [simMcpLoading, setSimMcpLoading] = useState<boolean>(false);
  const [simMcpLogs, setSimMcpLogs] = useState<string[]>([
    'System: Camera-DB-MCP Server initialized on port 3010.',
    'System: Model Context Protocol (MCP) transport active over stdio.',
    'System: Loaded 10,000 CCTV cameras with full observability schemas.',
    'Ready for queries.'
  ]);

  // Interactive simulator states for sentiment-analizer
  const [simSentimentInput, setSimSentimentInput] = useState<string>(
    'System telemetry is working perfectly! Edge anomaly pipeline running smoothly with zero latency spikes.'
  );
  const [simSentimentResult, setSimSentimentResult] = useState<{
    pos: number;
    neu: number;
    neg: number;
    compound: number;
  }>({ pos: 35, neu: 65, neg: 0, compound: 0.72 });

  // Simple client-side VADER sentiment approximation
  const analyzeSentimentLocal = (text: string) => {
    const t = text.toLowerCase();
    const posWords = ['great', 'excellent', 'fantastic', 'awesome', 'good', 'success', 'healthy', 'stable', 'perfect', 'normal', 'operational', 'up', 'faster', 'optimized', 'resolved', 'recovered', 'online', 'smoothly', 'perfectly', 'satisfied', 'love'];
    const negWords = ['bad', 'error', 'failed', 'outage', 'issue', 'broken', 'slow', 'warning', 'critical', 'danger', 'down', 'exception', 'tamper', 'loss', 'lagging', 'latency', 'high', 'incident', 'unstable', 'offline', 'poor', 'spikes'];
    
    let posCount = 0;
    let negCount = 0;
    
    const words = t.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(/\s+/);
    words.forEach(w => {
      if (posWords.includes(w)) posCount++;
      if (negWords.includes(w)) negCount++;
    });
    
    const total = posCount + negCount;
    if (total === 0) {
      return { pos: 0, neu: 100, neg: 0, compound: 0 };
    }
    
    const rawPos = (posCount / (posCount + negCount)) * 100;
    const rawNeg = (negCount / (posCount + negCount)) * 100;
    
    const posPct = Math.round(rawPos * 0.8);
    const negPct = Math.round(rawNeg * 0.8);
    const neuPct = 100 - posPct - negPct;
    
    let compound = 0;
    if (posCount > negCount) {
      compound = Number((posCount / (posCount + 2)).toFixed(2));
    } else if (negCount > posCount) {
      compound = Number((-negCount / (negCount + 2)).toFixed(2));
    }
    
    return { pos: posPct, neu: neuPct, neg: negPct, compound };
  };

  // Simulated query handler for Camera-DB-MCP
  const runMcpQuery = (queryType: string) => {
    setSimMcpLoading(true);
    setSimMcpQuery(queryType);
    
    const timestamp = new Date().toTimeString().split(' ')[0];
    setSimMcpLogs(prev => [
      ...prev,
      `[${timestamp}] CLI: query_engine run_tool --name camera_db_mcp/${queryType}`
    ].slice(-8));

    setTimeout(() => {
      let result = {};
      if (queryType === 'list_cameras') {
        result = [
          { id: 'cam_0082', name: 'Axis M3007 Dome', location: 'Building A - North Lobby', ip: '10.244.1.82', status: 'active', resolution: '1080p' },
          { id: 'cam_0194', name: 'Axis Q6055 PTZ', location: 'Building A - Perimeter West', ip: '10.244.1.94', status: 'active', resolution: '1080p' }
        ];
      } else if (queryType === 'get_camera_stats') {
        result = {
          total_cameras: 10000,
          online_cameras: 9842,
          offline_cameras: 158,
          critical_alerts: 4,
          network_load: '842 Mbps',
          db_indexing_ms: 1.8
        };
      } else if (queryType === 'search_cameras') {
        result = [
          { id: 'cam_7492', name: 'Hanwha XNP-6400 PTZ', location: 'Gate 4 Entrance', ip: '10.244.12.54', status: 'active', features: ['autotracking', 'license_plate'] }
        ];
      } else {
        result = { error: 'Unknown MCP tool instruction' };
      }

      setSimMcpResult(JSON.stringify(result, null, 2));
      setSimMcpLoading(false);
      
      const finishTimestamp = new Date().toTimeString().split(' ')[0];
      setSimMcpLogs(prev => [
        ...prev,
        `[${finishTimestamp}] MCP: Tool returned 200 OK. Response body: ${JSON.stringify(result).length} bytes`
      ].slice(-8));
    }, 450);
  };

  // Refs for scroll target
  const projectsRef = useRef<HTMLDivElement>(null);
  const githubProjectsRef = useRef<HTMLDivElement>(null);
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
      // Increment processed frames at scale (10,000+ cameras processing ~250k frames per second)
      setProcessedFrames(prev => prev + Math.floor(Math.random() * 450) + 200);

      // Randomly update health/load/loss telemetry graph values
      setChartData(prev => {
        const next = [...prev.slice(1)];
        const lastVal = prev[prev.length - 1];
        
        let minVal = 95;
        let maxVal = 100;
        let step = 0.8;
        
        if (activeMetric === 'load') {
          minVal = 40;
          maxVal = 85;
          step = 3;
        } else if (activeMetric === 'loss') {
          minVal = 0.05;
          maxVal = 1.2;
          step = 0.15;
        }
        
        if (outageSimulation) {
          if (activeMetric === 'health') {
            minVal = 62;
            maxVal = 78;
          } else if (activeMetric === 'load') {
            minVal = 88;
            maxVal = 99;
          } else {
            minVal = 4.5;
            maxVal = 9.8;
          }
        }

        const change = (Math.random() * step * 2) - step;
        let newVal = lastVal + change;
        newVal = Math.max(minVal, Math.min(maxVal, newVal));
        
        next.push(Number(newVal.toFixed(activeMetric === 'loss' ? 2 : 1)));
        return next;
      });

      // Occasional anomalies
      const anomalyChance = outageSimulation ? 0.4 : 0.85;
      if (Math.random() > anomalyChance) {
        setAnomalyCounter(prev => prev + 1);

        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];

        const regionSites = {
          'ALL': ['Site-402 (Goa)', 'Site-109 (Kasaragod)', 'Site-512 (Panaji)', 'Site-331 (US-East)', 'Site-022 (AWS-Edge)'],
          'IN': ['Site-402 (Goa)', 'Site-109 (Kasaragod)', 'Site-512 (Panaji)'],
          'US': ['Site-331 (US-East)', 'Site-124 (US-West)'],
          'EU': ['Site-088 (EU-Central)', 'Site-092 (EU-West)'],
          'APAC': ['Site-210 (APAC-Singapore)', 'Site-212 (APAC-Tokyo)']
        };

        const activeList = regionSites[selectedRegion];
        const site = activeList[Math.floor(Math.random() * activeList.length)];
        const camId = `CAM-${Math.floor(1000 + Math.random() * 8999)}`;

        const alarmTypes = [
          { type: 'Blur Exception', priority: 'MAJOR' as const },
          { type: 'Obstruction Alert', priority: 'CRITICAL' as const },
          { type: 'Scene Change', priority: 'MINOR' as const },
          { type: 'Low Light Trigger', priority: 'MINOR' as const },
          { type: 'Signal Loss', priority: 'CRITICAL' as const }
        ];
        const selectedAlarm = alarmTypes[Math.floor(Math.random() * alarmTypes.length)];

        setActiveAlarms(prev => [
          {
            id: String(Date.now()),
            time: timeStr,
            site,
            cam: camId,
            type: selectedAlarm.type,
            priority: selectedAlarm.priority,
            status: 'Active'
          },
          ...prev.slice(0, 4)
        ]);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isPlaying, activeMetric, selectedRegion, outageSimulation]);



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

  // GitHub Personal Projects list
  const githubProjects: GithubProject[] = [
    {
      name: 'snapscore',
      description: 'Private on-device photo and artwork intelligence platform. Evaluates visual aesthetic quality, ranks duplicate frames, and diagnoses composition details locally on your Apple device.',
      tech: ['Flutter', 'Dart', 'OpenCV', 'iOS Share Extension'],
      stars: 0,
      forks: 0,
      url: 'https://harshakrishnak.com/snapscore-download',
      hasDemo: true,
      demoType: 'external',
      demoUrl: '/snapscore'
    },
    {
      name: 'Camera-DB-MCP',
      description: 'An MCP (Model Context Protocol) server that provides AI assistants with access to a comprehensive CCTV camera database. Includes 10,000 sample cameras with rich metadata, search capabilities, filtering by manufacturer/type/location, and statistical analysis tools.',
      tech: ['Node.js', 'JavaScript', 'MCP', 'JSON Schema'],
      stars: 0,
      forks: 0,
      url: 'https://github.com/harshakrishnak/Camera-DB-MCP',
      hasDemo: true,
      demoType: 'modal-mcp'
    },
    {
      name: 'sentiment-analizer',
      description: 'Full-stack sentiment analysis web application built with React, FastAPI, and VADER. Analyzes text input or logs and outputs compound, positive, negative, and neutral metrics dynamically.',
      tech: ['React', 'FastAPI', 'Python', 'TypeScript', 'VADER'],
      stars: 0,
      forks: 0,
      url: 'https://github.com/harshakrishnak/sentiment-analizer',
      hasDemo: true,
      demoType: 'modal-sentiment',
      demoUrl: 'https://sentiment-analizer-m3pn.onrender.com/'
    },
    {
      name: 'My-Portfolio-website',
      description: 'The source repository of this responsive, high-observability systems engineering developer portfolio. Built using React 19, TypeScript, Tailwind CSS v4, custom theme engines, and simulated live telemetry dashboards.',
      tech: ['React 19', 'TypeScript', 'Tailwind v4', 'Vite'],
      stars: 0,
      forks: 0,
      url: 'https://github.com/harshakrishnak/My-Portfolio-website',
      hasDemo: true,
      demoType: 'scroll',
      demoUrl: '#dashboard'
    },
    {
      name: 'users-node-server',
      description: 'A clean Node.js and Express backend API server template for user directory management, database lookup operations, and endpoint routing protocols.',
      tech: ['Node.js', 'Express', 'JavaScript', 'REST API'],
      stars: 0,
      forks: 0,
      url: 'https://github.com/harshakrishnak/users-node-server',
      hasDemo: false,
      demoType: 'external'
    },
    {
      name: 'users-frontend',
      description: 'A responsive React and TypeScript frontend application providing interactive user directory dashboards, form submission validations, and live list updates.',
      tech: ['React', 'TypeScript', 'Vite', 'CSS'],
      stars: 0,
      forks: 0,
      url: 'https://github.com/harshakrishnak/users-frontend',
      hasDemo: false,
      demoType: 'external'
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
            <button onClick={() => scrollIntoView(projectsRef)} className="text-text-theme-secondary hover:text-accent-theme-primary transition-colors cursor-pointer">B2B Products</button>
            <button onClick={() => scrollIntoView(githubProjectsRef)} className="text-text-theme-secondary hover:text-accent-theme-primary transition-colors cursor-pointer">Open Source</button>
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
              <button onClick={() => { scrollIntoView(projectsRef); setMobileMenuOpen(false); }} className="text-left py-2 text-text-theme-secondary hover:text-accent-theme-primary">B2B Products</button>
              <button onClick={() => { scrollIntoView(githubProjectsRef); setMobileMenuOpen(false); }} className="text-left py-2 text-text-theme-secondary hover:text-accent-theme-primary">Open Source</button>
              <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="py-2 text-text-theme-secondary hover:text-accent-theme-primary">Experience History</a>
              <button onClick={() => { scrollIntoView(contactRef); setMobileMenuOpen(false); }} className="text-left py-2 text-text-theme-secondary hover:text-accent-theme-primary">Contact & Calendly</button>
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
            <h2 className="font-display text-3xl font-bold tracking-tight text-text-theme-primary">Enterprise VMS Observability Terminal</h2>
            <p className="text-text-theme-secondary max-w-2xl mx-auto text-sm sm:text-base">
              Explore aggregated telemetry and real-time AI analytics performance from 10,000+ cameras spanning 500+ remote server sites worldwide.
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {(['ALL', 'IN', 'US', 'EU', 'APAC'] as const).map(reg => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-4 py-2 rounded-lg border text-xs font-mono font-bold transition-all cursor-pointer ${
                  selectedRegion === reg
                    ? 'border-accent-theme-primary bg-accent-theme-primary/10 text-accent-theme-primary'
                    : 'border-border-theme hover:bg-bg-secondary/40 text-text-theme-secondary'
                }`}
              >
                {reg === 'ALL' ? '🌎 ALL SITES' : reg === 'IN' ? '🇮🇳 INDIA' : reg === 'US' ? '🇺🇸 UNITED STATES' : reg === 'EU' ? '🇪🇺 EUROPE' : '🌏 APAC'}
              </button>
            ))}
          </div>

          {/* Stat Cards */}
          {(() => {
            const regionData = {
              ALL: { cameras: 10482, servers: 520, bandwidth: 256.4, health: outageSimulation ? '74.8%' : '98.6%' },
              IN: { cameras: 3420, servers: 170, bandwidth: 82.5, health: outageSimulation ? '78.2%' : '99.1%' },
              US: { cameras: 2850, servers: 140, bandwidth: 71.2, health: outageSimulation ? '71.5%' : '98.2%' },
              EU: { cameras: 2200, servers: 110, bandwidth: 54.8, health: outageSimulation ? '76.4%' : '98.5%' },
              APAC: { cameras: 2012, servers: 100, bandwidth: 47.9, health: outageSimulation ? '73.1%' : '99.3%' }
            }[selectedRegion];

            const currentBw = (regionData.bandwidth + (processedFrames % 15) / 5 - (outageSimulation ? regionData.bandwidth * 0.15 : 0)).toFixed(1);

            return (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="glass-panel p-4 rounded-xl border-l-4 border-l-accent-theme-primary">
                  <span className="text-text-theme-muted font-mono text-[10px] tracking-wider uppercase block">Total Cameras</span>
                  <span className="text-xl sm:text-2xl font-display font-bold text-text-theme-primary block">{regionData.cameras.toLocaleString()}</span>
                  <span className="text-[9px] font-mono text-green-400">● 100% Ingestion Rate</span>
                </div>
                <div className="glass-panel p-4 rounded-xl border-l-4 border-l-accent-theme-secondary">
                  <span className="text-text-theme-muted font-mono text-[10px] tracking-wider uppercase block">Active Sites / Servers</span>
                  <span className="text-xl sm:text-2xl font-display font-bold text-text-theme-primary block">{regionData.servers} Sites</span>
                  <span className="text-[9px] font-mono text-text-theme-muted">Distributed Nodes</span>
                </div>
                <div className="glass-panel p-4 rounded-xl border-l-4 border-l-green-500" style={{ borderLeftColor: outageSimulation ? '#ef4444' : '#22c55e' }}>
                  <span className="text-text-theme-muted font-mono text-[10px] tracking-wider uppercase block">Recording Server Health</span>
                  <span className={`text-xl sm:text-2xl font-display font-bold block ${outageSimulation ? 'text-red-400' : 'text-green-400'}`}>{regionData.health}</span>
                  <span className="text-[9px] font-mono text-text-theme-muted">{outageSimulation ? '⚠ OUTAGE IN REGION' : '✓ Clusters Healthy'}</span>
                </div>
                <div className="glass-panel p-4 rounded-xl border-l-4 border-l-yellow-500">
                  <span className="text-text-theme-muted font-mono text-[10px] tracking-wider uppercase block">Aggregated Bandwidth</span>
                  <span className="text-xl sm:text-2xl font-display font-bold text-text-theme-primary block">{currentBw} Gbps</span>
                  <span className="text-[9px] font-mono text-text-theme-muted">VMS Stream Load</span>
                </div>
              </div>
            );
          })()}

          {/* Widgets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Widget 1: Health Chart (Aggregated Stream Telemetry) */}
            <div className="md:col-span-2 lg:col-span-2 glass-panel p-5 rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border-theme mb-4 gap-3">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-accent-theme-secondary" />
                  <h3 className="font-display font-semibold text-text-theme-primary">Aggregated Stream Telemetry</h3>
                </div>

                {/* Chart Metric Toggle Buttons */}
                <div className="flex bg-bg-primary border border-border-theme rounded-lg p-0.5 self-start">
                  {(['health', 'load', 'loss'] as const).map(met => (
                    <button
                      key={met}
                      onClick={() => setActiveMetric(met)}
                      className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold cursor-pointer transition-colors ${
                        activeMetric === met
                          ? 'bg-accent-theme-primary text-bg-primary font-extrabold'
                          : 'text-text-theme-secondary hover:text-text-theme-primary'
                      }`}
                    >
                      {met === 'health' ? 'HEALTH' : met === 'load' ? 'LOAD' : 'LOSS %'}
                    </button>
                  ))}
                </div>
              </div>

              {/* SVG Area Chart */}
              <div className="relative">
                <div className="flex justify-between text-[10px] font-mono text-text-theme-muted mb-2">
                  <span>Cluster Metric: <strong className="text-text-theme-primary uppercase">{activeMetric}</strong></span>
                  <span className="text-accent-theme-primary font-bold">
                    {activeMetric === 'health' 
                      ? `${chartData[chartData.length - 1]}% Avg Health` 
                      : activeMetric === 'load' 
                      ? `${chartData[chartData.length - 1]}% Server Load` 
                      : `${chartData[chartData.length - 1]}% Packet Loss`}
                  </span>
                </div>

                <div className="bg-bg-primary/40 border border-border-theme/80 rounded-xl p-3 h-52 relative overflow-hidden flex items-end">
                  {/* Graph grid lines */}
                  <div className="absolute inset-0 grid grid-rows-3 grid-cols-10 pointer-events-none opacity-20 border-b border-border-theme">
                    {[...Array(30)].map((_, i) => (
                      <div key={i} className="border-t border-l border-border-theme/40" />
                    ))}
                  </div>

                  <svg className="w-full h-full absolute inset-0 pt-2" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="widgetChartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Convert chart data to SVG points */}
                    {(() => {
                      let maxVal = 100;
                      let minVal = 0;
                      if (activeMetric === 'health') { minVal = 60; maxVal = 100; }
                      else if (activeMetric === 'load') { minVal = 0; maxVal = 100; }
                      else { minVal = 0; maxVal = 10; }

                      const points = chartData.map((val, idx) => {
                        const x = (idx * 400) / (chartData.length - 1);
                        const pct = (val - minVal) / (maxVal - minVal);
                        const y = 100 - (pct * 90); // keep margin top/bottom
                        return { x, y };
                      });

                      const dPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
                      const fillPath = `M 0 100 L ${points.map(p => `${p.x} ${p.y}`).join(' L ')} L 400 100 Z`;

                      return (
                        <>
                          <path d={fillPath} fill="url(#widgetChartGrad)" />
                          <path d={dPath} fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" />
                          {/* Glow point */}
                          <circle cx="400" cy={points[points.length - 1].y} r="4" fill="var(--accent-primary)" className="animate-ping" />
                          <circle cx="400" cy={points[points.length - 1].y} r="3" fill="var(--accent-secondary)" />
                        </>
                      );
                    })()}
                  </svg>
                </div>
              </div>

              {/* Live Diagnostic Sub-Metrics Row to fill space & add realism */}
              <div className="grid grid-cols-3 gap-3 mt-4 border-t border-border-theme/40 pt-4 text-center font-mono text-[10px]">
                <div className="p-2 rounded-lg bg-bg-secondary/40 border border-border-theme/35">
                  <span className="text-text-theme-muted block uppercase text-[8px] tracking-wider mb-0.5">Jitter Latency</span>
                  <span className="text-text-theme-primary font-bold">{(1.1 + (processedFrames % 7) / 10).toFixed(2)} ms</span>
                </div>
                <div className="p-2 rounded-lg bg-bg-secondary/40 border border-border-theme/35">
                  <span className="text-text-theme-muted block uppercase text-[8px] tracking-wider mb-0.5">Packet Overhead</span>
                  <span className="text-text-theme-primary font-bold">{(2.4 + (processedFrames % 5) / 8).toFixed(2)} %</span>
                </div>
                <div className="p-2 rounded-lg bg-bg-secondary/40 border border-border-theme/35">
                  <span className="text-text-theme-muted block uppercase text-[8px] tracking-wider mb-0.5">Frame Ingest Jitter</span>
                  <span className="text-text-theme-primary font-bold">{(8.2 + (processedFrames % 9) / 8).toFixed(1)} ms</span>
                </div>
              </div>
            </div>

            {/* Widget 2: AI Analytics Breakdown */}
            <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-border-theme mb-4">
                  <div className="flex items-center space-x-2">
                    <Video className="w-5 h-5 text-accent-theme-primary" />
                    <h3 className="font-display font-semibold text-text-theme-primary">AI Analytics Breakdown</h3>
                  </div>
                  <span className="font-mono text-[10px] text-text-theme-muted uppercase">Active Filters</span>
                </div>

                <div className="space-y-3">
                  {[
                    { label: 'Blur / Out of Focus', count: outageSimulation ? 485 : 182, total: 10482, color: 'bg-accent-theme-primary' },
                    { label: 'Camera Obstruction / Tampering', count: outageSimulation ? 198 : 44, total: 10482, color: 'bg-accent-theme-secondary' },
                    { label: 'Scene Change / Pan Detection', count: 38, total: 10482, color: 'bg-yellow-500' },
                    { label: 'Low Light / IR Active', count: 2410, total: 10482, color: 'bg-green-500' },
                    { label: 'Signal Loss / Offline State', count: outageSimulation ? 120 : 12, total: 10482, color: 'bg-red-500' }
                  ].map((item, idx) => {
                    const pct = ((item.count / item.total) * 100).toFixed(1);
                    return (
                      <div key={idx} className="space-y-1 p-2 rounded-lg bg-bg-secondary/40 border border-border-theme/40 font-mono text-[11px]">
                        <div className="flex justify-between">
                          <span className="text-text-theme-secondary font-medium">{item.label}</span>
                          <span className="text-text-theme-primary font-bold">{item.count.toLocaleString()} <span className="text-[9px] text-text-theme-muted">({pct}%)</span></span>
                        </div>
                        <div className="w-full bg-bg-primary h-1.5 rounded-full overflow-hidden border border-border-theme/30">
                          <div className={`h-full rounded-full ${item.color}`} style={{ width: `${Math.max(1.5, Number(pct) * 2)}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Widget 3: Recording Server Clusters (Status Grid) */}
            <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 pb-3 border-b border-border-theme mb-3">
                  <Server className="w-5 h-5 text-accent-theme-secondary" />
                  <h3 className="font-display font-semibold text-text-theme-primary text-sm">Recording Clusters</h3>
                </div>
                <p className="text-[11px] text-text-theme-muted font-mono mb-3">
                  Click a node cluster below to view real-time logs:
                </p>

                {/* 24 LED Grid */}
                <div className="grid grid-cols-6 gap-2 mb-4">
                  {[
                    { id: 'IN-S1', label: 'India South 1 (Kasaragod HQ)', reg: 'IN', state: outageSimulation ? 'degraded' : 'healthy' },
                    { id: 'IN-S2', label: 'India South 2 (Kasaragod Perimeter)', reg: 'IN', state: 'healthy' },
                    { id: 'IN-W1', label: 'India West 1 (Goa Site)', reg: 'IN', state: 'healthy' },
                    { id: 'IN-W2', label: 'India West 2 (Panaji Site)', reg: 'IN', state: outageSimulation ? 'critical' : 'healthy' },
                    { id: 'IN-N1', label: 'India North Cluster (Delhi Hub)', reg: 'IN', state: 'healthy' },
                    { id: 'IN-E1', label: 'India East Node (Kolkata Hub)', reg: 'IN', state: 'healthy' },
                    { id: 'US-E1', label: 'US East Server Hub (Virginia)', reg: 'US', state: 'healthy' },
                    { id: 'US-E2', label: 'US East Edge (Boston Hub)', reg: 'US', state: 'healthy' },
                    { id: 'US-W1', label: 'US West Cloud Node (Oregon)', reg: 'US', state: outageSimulation ? 'critical' : 'healthy' },
                    { id: 'US-W2', label: 'US West Edge (California Hub)', reg: 'US', state: 'healthy' },
                    { id: 'US-M1', label: 'US Mid Node (Texas Hub)', reg: 'US', state: 'healthy' },
                    { id: 'US-S1', label: 'US South Node (Miami)', reg: 'US', state: 'healthy' },
                    { id: 'EU-C1', label: 'EU Central Node (Frankfurt)', reg: 'EU', state: 'healthy' },
                    { id: 'EU-C2', label: 'EU Central Backup (Frankfurt)', reg: 'EU', state: 'healthy' },
                    { id: 'EU-W1', label: 'EU West Cloud Ingest (Ireland)', reg: 'EU', state: 'healthy' },
                    { id: 'EU-W2', label: 'EU West Local Node (London)', reg: 'EU', state: outageSimulation ? 'degraded' : 'healthy' },
                    { id: 'EU-S1', label: 'EU South Node (Milan)', reg: 'EU', state: 'healthy' },
                    { id: 'AP-S1', label: 'APAC South Hub (Singapore)', reg: 'APAC', state: 'healthy' },
                    { id: 'AP-S2', label: 'APAC South Edge (Singapore)', reg: 'APAC', state: 'healthy' },
                    { id: 'AP-N1', label: 'APAC North Hub (Tokyo)', reg: 'APAC', state: 'healthy' },
                    { id: 'AP-N2', label: 'APAC North Edge (Seoul)', reg: 'APAC', state: 'healthy' },
                    { id: 'AP-E1', label: 'APAC East Node (Sydney)', reg: 'APAC', state: 'healthy' },
                    { id: 'AP-E2', label: 'APAC East Edge (Sydney)', reg: 'APAC', state: 'healthy' },
                    { id: 'AP-W1', label: 'APAC West Hub (Hong Kong)', reg: 'APAC', state: 'healthy' }
                  ].map(node => (
                    <button
                      key={node.id}
                      title={node.label}
                      onClick={() => setSelectedClusterId(node.id)}
                      className={`aspect-square rounded border cursor-pointer flex items-center justify-center font-mono text-[9px] transition-all relative ${
                        selectedClusterId === node.id
                          ? 'border-accent-theme-primary ring-2 ring-accent-theme-primary/30 scale-105 z-10'
                          : 'border-border-theme'
                      } ${
                        selectedRegion !== 'ALL' && node.reg !== selectedRegion ? 'opacity-35' : ''
                      }`}
                      style={{
                        background: node.state === 'healthy' 
                          ? 'rgba(34, 197, 94, 0.08)' 
                          : node.state === 'degraded' 
                          ? 'rgba(234, 179, 8, 0.12)' 
                          : 'rgba(239, 68, 68, 0.15)'
                      }}
                    >
                      <span className={`w-2 h-2 rounded-full ${
                        node.state === 'healthy' 
                          ? 'bg-green-500' 
                          : node.state === 'degraded' 
                          ? 'bg-yellow-500 animate-pulse' 
                          : 'bg-red-500 animate-ping'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Node details */}
              {(() => {
                const nodeDetails = [
                  { id: 'IN-S1', name: 'India South Node 1', region: 'India', location: 'Kasaragod HQ', health: outageSimulation ? 84 : 98, load: outageSimulation ? 72 : 45, servers: 20, active: outageSimulation ? 18 : 20 },
                  { id: 'IN-S2', name: 'India South Node 2', region: 'India', location: 'Kasaragod Perimeter', health: 96, load: 48, servers: 22, active: 21 },
                  { id: 'IN-W1', name: 'India West Cluster', region: 'India', location: 'Goa Site', health: 99, load: 38, servers: 18, active: 18 },
                  { id: 'IN-W2', name: 'India West Server', region: 'India', location: 'Panaji Server Room', health: outageSimulation ? 32 : 95, load: outageSimulation ? 94 : 52, servers: 15, active: outageSimulation ? 5 : 14 },
                  { id: 'IN-N1', name: 'India North Cluster', region: 'India', location: 'Delhi Hub', health: 94, load: 50, servers: 25, active: 24 },
                  { id: 'EU-C1', name: 'EU Central Main Hub', region: 'Europe', location: 'Frankfurt Node 1', health: 99, load: 35, servers: 40, active: 40 },
                  { id: 'EU-C2', name: 'EU Central Backup Hub', region: 'Europe', location: 'Frankfurt Node 2', health: 98, load: 38, servers: 20, active: 20 },
                  { id: 'EU-W1', name: 'EU West Gateway', region: 'Europe', location: 'Ireland Ingest Hub', health: 96, load: 44, servers: 30, active: 29 },
                  { id: 'EU-W2', name: 'EU West Local Node', region: 'Europe', location: 'London Local Edge', health: outageSimulation ? 76 : 93, load: outageSimulation ? 72 : 58, servers: 20, active: outageSimulation ? 16 : 18 },
                  { id: 'EU-S1', name: 'EU South Node', region: 'Europe', location: 'Milan Local Edge', health: 95, load: 49, servers: 15, active: 14 },
                  { id: 'US-E1', name: 'US East Server Hub', region: 'US', location: 'Virginia S3 Gateway', health: 99, load: 42, servers: 30, active: 30 },
                  { id: 'US-E2', name: 'US East Local Cluster', region: 'US', location: 'Boston Local Edge', health: 97, load: 55, servers: 20, active: 19 },
                  { id: 'US-W1', name: 'US West Cloud Ingest', region: 'US', location: 'Oregon Server Node', health: outageSimulation ? 28 : 98, load: outageSimulation ? 98 : 40, servers: 25, active: outageSimulation ? 6 : 25 },
                  { id: 'US-W2', name: 'US West Local Node', region: 'US', location: 'California Local Edge', health: 95, load: 60, servers: 15, active: 14 },
                  { id: 'US-M1', name: 'US Mid Gateway', region: 'US', location: 'Texas Server Node', health: 98, load: 43, servers: 18, active: 18 },
                  { id: 'US-S1', name: 'US South Local Node', region: 'US', location: 'Miami Local Edge', health: 96, load: 48, servers: 10, active: 10 },
                  { id: 'AP-S1', name: 'APAC South Hub', region: 'APAC', location: 'Singapore Server Node', health: 99, load: 41, servers: 35, active: 35 },
                  { id: 'AP-S2', name: 'APAC South Local', region: 'APAC', location: 'Singapore Local Edge', health: 97, load: 47, servers: 15, active: 15 },
                  { id: 'AP-N1', name: 'APAC North Ingest', region: 'APAC', location: 'Tokyo Hub', health: 98, load: 39, servers: 25, active: 25 },
                  { id: 'AP-N2', name: 'APAC North Local', region: 'APAC', location: 'Seoul Local Edge', health: 94, load: 54, servers: 20, active: 19 },
                  { id: 'AP-E1', name: 'APAC East Node', region: 'APAC', location: 'Sydney Server Node', health: 98, load: 36, servers: 15, active: 15 },
                  { id: 'AP-E2', name: 'APAC East Local', region: 'APAC', location: 'Sydney Local Edge', health: 96, load: 43, servers: 10, active: 10 },
                  { id: 'AP-W1', name: 'APAC West Ingest', region: 'APAC', location: 'Hong Kong Node', health: 97, load: 42, servers: 20, active: 20 },
                  { id: 'IN-E1', name: 'India East Cluster', region: 'India', location: 'Kolkata Node', health: 97, load: 46, servers: 12, active: 12 }
                ].find(n => n.id === selectedClusterId) || {
                  id: selectedClusterId, name: 'Active Cluster Node', region: 'Global', location: 'Remote Edge Location', health: 98, load: 45, servers: 20, active: 20
                };

                return (
                  <div className="bg-bg-primary/70 border border-border-theme p-3 rounded-xl space-y-1.5 font-mono text-[10px] mt-2">
                    <div className="flex justify-between font-bold text-text-theme-primary">
                      <span>Node: {nodeDetails.name} ({nodeDetails.id})</span>
                      <span className={nodeDetails.health > 90 ? 'text-green-400' : nodeDetails.health > 70 ? 'text-yellow-400' : 'text-red-400'}>
                        HEALTH: {nodeDetails.health}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-theme-muted">Location:</span>
                      <span className="text-text-theme-secondary">{nodeDetails.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-theme-muted">Active Servers:</span>
                      <span className="text-text-theme-secondary">{nodeDetails.active} / {nodeDetails.servers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-theme-muted">CPU / System Load:</span>
                      <span className="text-text-theme-secondary">{nodeDetails.load}%</span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Widget 4: Simulation Controls */}
            <div className="glass-panel p-5 rounded-2xl space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 pb-3 border-b border-border-theme mb-3">
                  <Cpu className="w-5 h-5 text-accent-theme-primary" />
                  <h3 className="font-display font-semibold text-text-theme-primary text-sm">Ingestion Control Room</h3>
                </div>

                {/* AI Model selector */}
                <div className="space-y-1.5 font-mono text-xs mb-3">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] text-text-theme-muted uppercase block">AI Model Deployment</label>
                    <button
                      onClick={() => setAiAnalysisActive(!aiAnalysisActive)}
                      className={`text-[9px] font-bold cursor-pointer transition-colors ${aiAnalysisActive ? 'text-green-400' : 'text-text-theme-muted'}`}
                    >
                      {aiAnalysisActive ? '● ACTIVE' : '○ STANDBY'}
                    </button>
                  </div>
                  <select
                    value={activeAIModel}
                    onChange={(e) => {
                      setActiveAIModel(e.target.value);
                      setModelLog(`RECONFIGURING SERVER NODES TO MODEL: ${e.target.value.toUpperCase()}... DEPLOYMENT SUCCESS.`);
                    }}
                    className="w-full bg-bg-primary border border-border-theme rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-accent-theme-primary text-text-theme-primary cursor-pointer"
                  >
                    <option value="YOLOv8 Edge">YOLOv8 Object Detection (Edge Nodes)</option>
                    <option value="ResNet-101 Classifier">ResNet-101 Scene Classifier (VMS Core)</option>
                    <option value="Custom C# VMS Filter">Custom C# VMS Ingestion Filter</option>
                    <option value="Multi-Modal LLM Analyzer">Gemini-powered Multimodal Analyzer</option>
                  </select>
                </div>

                {/* Simulation Logs Console */}
                <div className="bg-bg-primary/90 border border-border-theme rounded-xl p-3 h-14 overflow-hidden font-mono text-[9px] text-text-theme-secondary leading-normal select-none mb-3">
                  <span className="text-accent-theme-primary">&gt;&gt;</span> {modelLog}
                </div>
              </div>

              {/* Outage Simulation Trigger & Play/Pause controls */}
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex-grow py-2 rounded-lg border border-border-theme hover:bg-bg-secondary font-mono text-xs font-bold uppercase transition-all flex items-center justify-center space-x-1.5 cursor-pointer text-text-theme-secondary hover:text-text-theme-primary"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 text-yellow-500" /> : <Play className="w-3.5 h-3.5 text-green-500" />}
                  <span>{isPlaying ? 'PAUSE' : 'RESUME'}</span>
                </button>

                <button
                  onClick={() => {
                    const nextOutage = !outageSimulation;
                    setOutageSimulation(nextOutage);
                    setModelLog(nextOutage 
                      ? 'WARNING: SIMULATING CRITICAL SIGNAL LOSS EXCEPTION ON 3 CLUSTERS!'
                      : 'ALERT CLEARED. RESTORING SERVER REDUNDANCY PIPELINES...' 
                    );
                  }}
                  className={`flex-grow py-2 rounded-lg border font-mono text-xs font-bold uppercase transition-all flex items-center justify-center space-x-1.5 cursor-pointer text-glow ${
                    outageSimulation
                      ? 'bg-green-500/10 border-green-500/35 hover:bg-green-500 hover:text-bg-primary text-green-400'
                      : 'bg-red-500/10 border-red-500/35 hover:bg-red-500 hover:text-bg-primary text-red-400'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>{outageSimulation ? 'CLEAR OUTAGE' : 'TRIGGER OUTAGE'}</span>
                </button>
              </div>
            </div>

            {/* Widget 5: Stream Connectivity & Health */}
            <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 pb-3 border-b border-border-theme mb-3">
                  <CheckCircle className="w-5 h-5 text-green-400 animate-pulse" />
                  <h3 className="font-display font-semibold text-text-theme-primary text-sm">Camera Ingest Health</h3>
                </div>
                <p className="text-[11px] text-text-theme-muted font-mono mb-4">
                  Stream connectivity states for {selectedRegion === 'ALL' ? 'Global' : selectedRegion} cameras:
                </p>

                <div className="space-y-3 font-mono text-[11px]">
                  {/* Online & Streaming */}
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-text-theme-secondary font-medium">Online & Streaming</span>
                      <span className="text-green-400 font-bold">
                        {(outageSimulation ? 9612 : 10388).toLocaleString()} <span className="text-[9px] text-text-theme-muted">({outageSimulation ? '91.7%' : '99.1%'})</span>
                      </span>
                    </div>
                    <div className="w-full bg-bg-primary h-1.5 rounded-full overflow-hidden border border-border-theme/30">
                      <div className="bg-green-500 h-full rounded-full transition-all duration-500" style={{ width: outageSimulation ? '91.7%' : '99.1%' }} />
                    </div>
                  </div>

                  {/* Degraded Streams */}
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-text-theme-secondary font-medium">Degraded Streams</span>
                      <span className="text-yellow-400 font-bold">
                        {(outageSimulation ? 582 + (processedFrames % 15) : 82 + (processedFrames % 5)).toLocaleString()} <span className="text-[9px] text-text-theme-muted">({outageSimulation ? '5.6%' : '0.8%'})</span>
                      </span>
                    </div>
                    <div className="w-full bg-bg-primary h-1.5 rounded-full overflow-hidden border border-border-theme/30">
                      <div className="bg-yellow-500 h-full rounded-full transition-all duration-500" style={{ width: outageSimulation ? '5.6%' : '0.8%' }} />
                    </div>
                  </div>

                  {/* Connection Loss */}
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-text-theme-secondary font-medium">Offline State</span>
                      <span className="text-red-400 font-bold">
                        {(outageSimulation ? 288 : 12).toLocaleString()} <span className="text-[9px] text-text-theme-muted">({outageSimulation ? '2.7%' : '0.1%'})</span>
                      </span>
                    </div>
                    <div className="w-full bg-bg-primary h-1.5 rounded-full overflow-hidden border border-border-theme/30">
                      <div className="bg-red-500 h-full rounded-full transition-all duration-500" style={{ width: outageSimulation ? '2.7%' : '0.1%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom statistics summary */}
              <div className="mt-4 pt-3 border-t border-border-theme/40 flex justify-between items-center text-[10px] font-mono text-text-theme-muted">
                <span>Avg Resolution: <strong className="text-text-theme-secondary">1080p</strong></span>
                <span>Uptime: <strong className="text-green-400">99.98%</strong></span>
              </div>
            </div>

          </div>

          {/* Alarm Stream widget at the bottom */}
          <div className="glass-panel p-5 rounded-2xl mt-6">
            <div className="flex items-center justify-between pb-3 border-b border-border-theme mb-3">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-5 h-5 text-accent-theme-primary" />
                  <h3 className="font-display font-semibold text-text-theme-primary text-sm">Aggregated Active Alarm Stream</h3>
                </div>
                <span className="text-[9px] font-mono bg-accent-theme-primary/10 text-accent-theme-primary px-2.5 py-0.5 rounded border border-accent-theme-primary/20">
                  Total Captured: <strong className="text-text-theme-primary">{anomalyCounter}</strong>
                </span>
                {selectedCamera && (
                  <span className="text-[9px] font-mono bg-green-500/10 text-green-400 px-2.5 py-0.5 rounded border border-green-500/20">
                    Focus: <strong className="text-text-theme-primary">{selectedCamera}</strong>
                  </span>
                )}
              </div>
              <span className="text-[10px] font-mono text-text-theme-muted uppercase hidden sm:inline">Click a row to focus camera feed</span>
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border-theme text-text-theme-muted text-[10px]">
                    <th className="py-2 pr-2">TIMESTAMP</th>
                    <th className="py-2 px-2">SITE LOCATION</th>
                    <th className="py-2 px-2">CAMERA ID</th>
                    <th className="py-2 px-2">ALARM EXCEPTION</th>
                    <th className="py-2 px-2 text-center">PRIORITY</th>
                    <th className="py-2 pl-2 text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {activeAlarms.map((alarm) => (
                    <tr
                      key={alarm.id}
                      onClick={() => {
                        setSelectedCamera(`${alarm.cam} (${alarm.site.split(' ')[0]})`);
                        setAiAnalysisActive(true);
                      }}
                      className={`border-b border-border-theme/40 hover:bg-bg-secondary/20 transition-colors cursor-pointer ${
                        selectedCamera.startsWith(alarm.cam) ? 'bg-accent-theme-primary/10 border-l-2 border-l-accent-theme-primary' : ''
                      }`}
                    >
                      <td className="py-2.5 pr-2 text-text-theme-muted">{alarm.time}</td>
                      <td className="py-2.5 px-2 text-text-theme-secondary">{alarm.site}</td>
                      <td className="py-2.5 px-2 text-text-theme-primary font-bold">{alarm.cam}</td>
                      <td className="py-2.5 px-2 text-text-theme-secondary">{alarm.type}</td>
                      <td className="py-2.5 px-2 text-center">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                          alarm.priority === 'CRITICAL' 
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                            : alarm.priority === 'MAJOR'
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            : 'bg-accent-theme-primary/10 text-accent-theme-primary border border-accent-theme-primary/20'
                        }`}>
                          {alarm.priority}
                        </span>
                      </td>
                      <td className="py-2.5 pl-2 text-right">
                        {alarm.status === 'Active' ? (
                          <span className="inline-flex items-center text-[10px] text-green-400 font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1 animate-ping" />
                            ACTIVE
                          </span>
                        ) : (
                          <span className="text-[10px] text-text-theme-muted">RESOLVED</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

        {/* GitHub Personal Projects Section */}
        <section ref={githubProjectsRef} id="github-projects" className="scroll-mt-20">
          <div className="text-center space-y-3 mb-10">
            <h2 className="font-display text-3xl font-bold tracking-tight text-text-theme-primary">Open Source & Personal GitHub Projects</h2>
            <p className="text-text-theme-secondary max-w-2xl mx-auto text-sm sm:text-base">
              A collection of high-performance developer tools, VMS integration utilities, and microservice frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {githubProjects.map((project, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl flex flex-col justify-between gap-6 hover:shadow-xl hover:translate-y-[-2px] transition-all relative overflow-hidden">
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-lg bg-bg-secondary border border-border-theme text-accent-theme-primary font-mono text-sm">
                        &lt;/&gt;
                      </div>
                      <h3 className="font-display text-base sm:text-lg font-bold text-text-theme-primary tracking-tight">
                        {project.name}
                      </h3>
                    </div>

                    {/* Pulse status badge */}
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wide border ${
                      project.name === 'snapscore'
                        ? 'bg-green-500/10 border-green-500/20 text-green-400'
                        : project.demoType === 'external'
                        ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                        : project.demoType === 'scroll'
                        ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                        : 'bg-green-500/10 border-green-500/20 text-green-400'
                    }`}>
                      <span className={`w-1 h-1 rounded-full mr-1.5 ${
                        project.name === 'snapscore'
                          ? 'bg-green-400 animate-pulse'
                          : project.demoType === 'external'
                          ? 'bg-blue-400'
                          : project.demoType === 'scroll'
                          ? 'bg-yellow-400 animate-pulse'
                          : 'bg-green-500 animate-ping'
                      }`} />
                      {project.name === 'snapscore'
                        ? 'LIVE DEMO'
                        : project.demoType === 'external'
                        ? 'CODE ONLY'
                        : project.demoType === 'scroll'
                        ? 'DASHBOARD DEMO'
                        : 'LIVE SIMULATOR'}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-text-theme-secondary leading-relaxed">
                    {project.description}
                  </p>

                  {/* Github statistics row */}
                  {project.name === 'snapscore' ? (
                    <div className="flex items-center space-x-4 text-[10px] font-mono text-text-theme-muted">
                      <span className="flex items-center">
                        ★ iOS App Store
                      </span>
                      <span className="flex items-center">
                        ● Live Production
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-4 text-[10px] font-mono text-text-theme-muted">
                      <span className="flex items-center">
                        <svg className="w-3.5 h-3.5 mr-1 text-yellow-500 fill-yellow-500" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        {project.stars} Stars
                      </span>
                      <span className="flex items-center">
                        <svg className="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M18 15V9a4 4 0 0 0-4-4h-4M6 9v9"/></svg>
                        {project.forks} Forks
                      </span>
                    </div>
                  )}
                </div>

                {/* Card footer / Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-border-theme/40 gap-3">
                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((t, tIdx) => (
                      <span key={tIdx} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-bg-secondary border border-border-theme/60 text-text-theme-primary">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center space-x-2 shrink-0">
                    {project.name === 'snapscore' ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border border-border-theme hover:border-border-theme-hover bg-bg-secondary/40 rounded-lg text-text-theme-secondary hover:text-text-theme-primary transition-all"
                        title="Download on App Store"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border border-border-theme hover:border-border-theme-hover bg-bg-secondary/40 rounded-lg text-text-theme-secondary hover:text-text-theme-primary transition-all"
                        title="View Repository"
                      >
                        <GitHubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {project.hasDemo && (
                      <button
                        onClick={() => {
                          if (project.demoType === 'modal-mcp') {
                            setActiveGithubDemo('mcp');
                          } else if (project.demoType === 'modal-sentiment') {
                            setActiveGithubDemo('sentiment');
                          } else if (project.demoType === 'scroll') {
                            const dash = document.getElementById('dashboard');
                            dash?.scrollIntoView({ behavior: 'smooth' });
                          } else {
                            window.open(project.demoUrl || project.url, '_blank');
                          }
                        }}
                        className="px-3 py-1.5 bg-accent-theme-primary/10 border border-accent-theme-primary/30 hover:bg-accent-theme-primary hover:text-bg-primary text-accent-theme-primary rounded-lg text-xs font-mono font-bold transition-all cursor-pointer text-glow"
                      >
                        Launch Demo
                      </button>
                    )}
                  </div>
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

      {/* GitHub Demo Modals */}
      {activeGithubDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-primary/80 backdrop-blur-md animate-fade-in">
          
          <div className="glass-panel w-full max-w-2xl rounded-2xl border border-border-theme bg-bg-card p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border-theme mb-4">
              <div className="flex items-center space-x-2 font-mono">
                <Terminal className="w-5 h-5 text-accent-theme-primary" />
                <span className="font-bold text-text-theme-primary text-sm sm:text-base">
                  {activeGithubDemo === 'mcp' ? 'Camera-DB-MCP // Model Context Protocol Client' : 'sentiment-analizer // VADER NLP Simulator'}
                </span>
              </div>
              <button 
                onClick={() => {
                  setActiveGithubDemo(null);
                }}
                className="p-1 rounded-lg border border-border-theme hover:bg-bg-secondary text-text-theme-secondary hover:text-text-theme-primary transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: MCP Camera Database Demo */}
            {activeGithubDemo === 'mcp' && (
              <div className="flex-grow space-y-4 font-mono overflow-y-auto no-scrollbar animate-fade-in">
                <p className="text-xs text-text-theme-secondary leading-relaxed font-sans font-medium">
                  This simulator runs an MCP tool-execution loop. Query a collection of 10,000 CCTV cameras with full metadata indexing by triggering standard MCP client actions below.
                </p>

                {/* Console CLI Screen */}
                <div className="bg-bg-primary border border-border-theme rounded-xl p-4 min-h-48 text-[10px] text-text-theme-secondary leading-relaxed overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center text-accent-theme-primary border-b border-border-theme/40 pb-2 mb-2 text-[9px] uppercase tracking-wider">
                      <span>Server status: active [stdio transport]</span>
                      <span className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5 animate-ping" />
                        mcp_port_3010
                      </span>
                    </div>
                    <div className="space-y-1 select-all font-mono">
                      {simMcpLogs.map((log, idx) => (
                        <div key={idx} className="flex items-start">
                          <span className="text-accent-theme-primary mr-1.5">&gt;</span>
                          <span>{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* JSON Output Display */}
                  <div className="mt-4 pt-3 border-t border-border-theme/30 bg-bg-secondary/40 p-3 rounded-lg max-h-40 overflow-y-auto no-scrollbar font-mono text-[9px] text-text-theme-primary whitespace-pre-wrap">
                    {simMcpLoading ? (
                      <div className="flex items-center space-x-2 text-accent-theme-primary animate-pulse">
                        <span className="w-2.5 h-2.5 border-2 border-accent-theme-primary border-t-transparent rounded-full animate-spin" />
                        <span>Querying SQLite Database indices...</span>
                      </div>
                    ) : (
                      <>
                        <div className="text-[8px] text-text-theme-muted mb-1 font-mono uppercase tracking-wider">Query Result:</div>
                        {simMcpResult}
                      </>
                    )}
                  </div>
                </div>

                {/* MCP Tool query controls */}
                <div className="pt-2 text-xs">
                  <label className="text-[10px] text-text-theme-muted uppercase tracking-wide block mb-2">Execute Database Tool Calls</label>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => runMcpQuery('get_camera_stats')}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all cursor-pointer ${
                        simMcpQuery === 'get_camera_stats' 
                          ? 'border-accent-theme-primary bg-accent-theme-primary/10 text-accent-theme-primary' 
                          : 'border-border-theme hover:bg-bg-secondary text-text-theme-secondary hover:text-text-theme-primary'
                      }`}
                    >
                      get_camera_stats()
                    </button>
                    <button 
                      onClick={() => runMcpQuery('list_cameras')}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all cursor-pointer ${
                        simMcpQuery === 'list_cameras' 
                          ? 'border-accent-theme-primary bg-accent-theme-primary/10 text-accent-theme-primary' 
                          : 'border-border-theme hover:bg-bg-secondary text-text-theme-secondary hover:text-text-theme-primary'
                      }`}
                    >
                      list_cameras(&#123; location: 'Building A' &#125;)
                    </button>
                    <button 
                      onClick={() => runMcpQuery('search_cameras')}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all cursor-pointer ${
                        simMcpQuery === 'search_cameras' 
                          ? 'border-accent-theme-primary bg-accent-theme-primary/10 text-accent-theme-primary' 
                          : 'border-border-theme hover:bg-bg-secondary text-text-theme-secondary hover:text-text-theme-primary'
                      }`}
                    >
                      search_cameras(&#123; query: 'PTZ' &#125;)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Body: VADER Sentiment Analysis Demo */}
            {activeGithubDemo === 'sentiment' && (
              <div className="flex-grow space-y-4 font-mono overflow-y-auto no-scrollbar animate-fade-in">
                <p className="text-xs text-text-theme-secondary leading-relaxed font-sans font-medium">
                  This interactive demo simulates the VADER Python rules-based Lexicon Engine. Write custom system messages, reviews, or logs, and see the compound polarity metrics.
                </p>

                {/* Input Text Box */}
                <div className="space-y-1">
                  <label className="text-[10px] text-text-theme-muted uppercase tracking-wide">Telemetry Log / Comment Input</label>
                  <textarea 
                    value={simSentimentInput}
                    onChange={e => {
                      setSimSentimentInput(e.target.value);
                      const res = analyzeSentimentLocal(e.target.value);
                      setSimSentimentResult(res);
                    }}
                    rows={2}
                    className="w-full bg-bg-primary border border-border-theme rounded-xl p-3 font-mono text-xs text-text-theme-primary focus:outline-none focus:border-accent-theme-primary transition-all resize-none"
                    placeholder="Enter text to analyze sentiment..."
                  />
                </div>

                {/* Interactive Preset Buttons */}
                <div className="space-y-1">
                  <label className="text-[9px] text-text-theme-muted uppercase tracking-wide block mb-1">Preset Logs</label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { text: 'System recovered successfully. Stream feeds stabilized at 30 FPS.', label: 'Positive' },
                      { text: 'CRITICAL WARNING! High packet loss detected on edge nodes. Connection timed out.', label: 'Negative' },
                      { text: 'Checking camera 08 logs. System configuration remains unchanged.', label: 'Neutral' }
                    ].map((preset, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSimSentimentInput(preset.text);
                          const res = analyzeSentimentLocal(preset.text);
                          setSimSentimentResult(res);
                        }}
                        className="text-[9px] font-mono px-2.5 py-1 rounded bg-bg-secondary border border-border-theme/80 text-text-theme-secondary hover:text-text-theme-primary hover:border-border-theme-hover cursor-pointer transition-colors"
                      >
                        {preset.label} Preset
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sentiment Analysis Telemetry Result */}
                <div className="bg-bg-primary border border-border-theme rounded-xl p-4 space-y-4">
                  {/* Compound Score Meter */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[10px] text-text-theme-muted uppercase tracking-wide">VADER Compound Score</span>
                      <span className={`font-bold ${
                        simSentimentResult.compound > 0.1 
                          ? 'text-green-400' 
                          : simSentimentResult.compound < -0.1 
                          ? 'text-red-400' 
                          : 'text-text-theme-secondary'
                      }`}>
                        {simSentimentResult.compound > 0 ? '+' : ''}{simSentimentResult.compound.toFixed(2)}
                      </span>
                    </div>
                    {/* Compound Slide Bar */}
                    <div className="relative h-2.5 bg-bg-secondary rounded-full overflow-hidden border border-border-theme/40">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          simSentimentResult.compound > 0.1 
                            ? 'bg-green-500' 
                            : simSentimentResult.compound < -0.1 
                            ? 'bg-red-500' 
                            : 'bg-gray-400'
                        }`}
                        style={{
                          width: `${((simSentimentResult.compound + 1) / 2) * 100}%`
                        }}
                      />
                      {/* Center indicator */}
                      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-border-theme" />
                    </div>
                    <div className="flex justify-between text-[8px] text-text-theme-muted font-mono">
                      <span>-1.00 (Extremely Negative)</span>
                      <span>0.00 (Neutral)</span>
                      <span>+1.00 (Extremely Positive)</span>
                    </div>
                  </div>

                  {/* Positive, Neutral, Negative Breakdowns */}
                  <div className="grid grid-cols-3 gap-3 pt-1 text-xs">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] text-text-theme-muted font-mono">
                        <span>POSITIVE</span>
                        <span>{simSentimentResult.pos}%</span>
                      </div>
                      <div className="h-1.5 bg-bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-green-400 transition-all duration-300" style={{ width: `${simSentimentResult.pos}%` }} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] text-text-theme-muted font-mono">
                        <span>NEUTRAL</span>
                        <span>{simSentimentResult.neu}%</span>
                      </div>
                      <div className="h-1.5 bg-bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-gray-400 transition-all duration-300" style={{ width: `${simSentimentResult.neu}%` }} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] text-text-theme-muted font-mono">
                        <span>NEGATIVE</span>
                        <span>{simSentimentResult.neg}%</span>
                      </div>
                      <div className="h-1.5 bg-bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-red-400 transition-all duration-300" style={{ width: `${simSentimentResult.neg}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="mt-6 pt-3 border-t border-border-theme flex justify-end gap-2 text-xs">
              {githubProjects.find(p => p.demoType === (activeGithubDemo === 'mcp' ? 'modal-mcp' : 'modal-sentiment'))?.demoUrl && (
                <a 
                  href={githubProjects.find(p => p.demoType === (activeGithubDemo === 'mcp' ? 'modal-mcp' : 'modal-sentiment'))?.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-500/10 border border-green-500/30 hover:bg-green-500 hover:text-bg-primary text-green-400 font-bold rounded-lg transition-all flex items-center cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                  <span>Launch Live App</span>
                </a>
              )}
              <a 
                href={githubProjects.find(p => p.demoType === (activeGithubDemo === 'mcp' ? 'modal-mcp' : 'modal-sentiment'))?.url || "https://github.com/harshakrishnak"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-border-theme hover:border-border-theme-hover bg-bg-secondary/40 rounded-lg text-text-theme-secondary hover:text-text-theme-primary transition-all flex items-center"
              >
                <GitHubIcon className="w-3.5 h-3.5 mr-1.5" />
                <span>Browse Repository</span>
              </a>
              <button 
                onClick={() => {
                  setActiveGithubDemo(null);
                }}
                className="px-4 py-2 bg-accent-theme-primary hover:bg-accent-theme-primary/95 text-bg-primary font-bold rounded-lg transition-all cursor-pointer"
              >
                Close Simulator
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
