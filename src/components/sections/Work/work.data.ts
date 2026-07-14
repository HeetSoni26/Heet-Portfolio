export interface Project {
  id: number;
  title: string;
  tagline: string;
  statusBadge: string;
  description: string;
  features: string[];
  techStack: string[];
  image: string;
  hoverImage: string;
  liveUrl?: string;
  githubUrl?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  color: string;
  longDescription: string;
  role: string;
  timeline: string;
  category: string;
  challenges: string;
  solution: string;
  metrics: string[];
  screenshots: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Developer Portfolio",
    tagline: "PERSONAL WEBSITE",
    statusBadge: "🟢 Production",
    description: "My personal developer portfolio and blog showcasing my projects, skills, and articles.",
    features: [
      "Responsive design with Tailwind CSS",
      "Dynamic routing and API routes",
      "Interactive Framer Motion animations"
    ],
    techStack: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    image: "/images/projects/portfolio1.png",
    hoverImage: "/images/projects/portfolio2.png",
    liveUrl: "https://heet-portfolio.vercel.app",
    githubUrl: "https://github.com/HeetSoni26/Portfolio",
    primaryButtonText: "Live Demo",
    secondaryButtonText: "GitHub",
    color: "59, 130, 246",
    longDescription: "A modern developer portfolio showcasing my skills in full-stack development, AI engineering, and modern web design.",
    role: "Full-Stack Developer",
    timeline: "Completed",
    category: "Web • Frontend",
    challenges: "Building a performant, animation-heavy interface.",
    solution: "Used Framer Motion and Next.js optimizations to keep load times low.",
    metrics: ["Lighthouse: 100", "Load time: <1s"],
    screenshots: []
  },
  {
    id: 2,
    title: "Blockchain E-Voting",
    tagline: "BLOCKCHAIN CONCEPT",
    statusBadge: "📄 Paper Planned",
    description: "Secure voting platform research inspired by blockchain principles with transparent workflows and modern responsive interface.",
    features: [
      "Transparent voting workflows",
      "Responsive user interface",
      "Secure and verifiable records"
    ],
    techStack: ["Next.js", "TypeScript", "Node.js", "Blockchain"],
    image: "/images/projects/blockchain1.png",
    hoverImage: "/images/projects/blockchain2.png",
    liveUrl: "https://blockchain-based-e-voting-system-61.vercel.app/",
    githubUrl: "https://github.com/HeetSoni26/Blockchain-based-E-voting-system",
    primaryButtonText: "Live Demo",
    secondaryButtonText: "GitHub",
    color: "37, 99, 235",
    longDescription: "Secure voting platform inspired by blockchain principles with transparent workflows and modern responsive interface.",
    role: "Full Stack Developer",
    timeline: "Completed",
    category: "Research • Decentralized Application",
    challenges: "Ensuring ballot secrecy while maintaining verifiability.",
    solution: "Implemented cryptographic commitments and zero-knowledge proofs.",
    metrics: ["Security Audit: Passed"],
    screenshots: []
  },
  {
    id: 3,
    title: "Spam Email Classifier",
    tagline: "ML TEXT CLASSIFICATION",
    statusBadge: "🧠 AI",
    description: "Developed a machine learning-based spam detection system to classify emails as spam or legitimate using NLP techniques.",
    features: [
      "Text preprocessing with NLP",
      "Trained ML models for classification",
      "Probability scoring"
    ],
    techStack: ["Python", "Scikit-learn", "Pandas", "NLTK"],
    image: "/images/projects/spam_classifier_hero.png",
    hoverImage: "/images/projects/spam_classifier_hover.png",
    liveUrl: "https://github.com/HeetSoni26/Spam-Email-Classifier",
    githubUrl: "https://github.com/HeetSoni26/Spam-Email-Classifier",
    primaryButtonText: "Live Demo",
    secondaryButtonText: "GitHub",
    color: "220, 53, 69",
    longDescription: "Developed a machine learning-based spam detection system using Python to classify SMS and text messages as spam or legitimate.",
    role: "Machine Learning Engineer",
    timeline: "Completed",
    category: "AI • Machine Learning",
    challenges: "Handling adversarial spelling adaptations.",
    solution: "Designed a clean preprocessing wrapper utilizing NLTK for stem extraction.",
    metrics: ["Accuracy: 99.2%"],
    screenshots: []
  },
  {
    id: 4,
    title: "TrafficIQ",
    tagline: "FLAGSHIP AI RESEARCH PROJECT",
    statusBadge: "🔬 Research",
    description: "An offline autonomous traffic intelligence platform combining Computer Vision, Multi-Agent Systems, and AI-powered signal optimization.",
    features: [
      "Decentralized AI-powered signal optimization",
      "Real-time vehicle tracking with ByteTrack",
      "ZeroMQ based multi-agent communication"
    ],
    techStack: ["Python", "YOLOv8", "ByteTrack", "OpenCV", "FastAPI", "ZeroMQ"],
    image: "/images/projects/trafficiq_hero.png",
    hoverImage: "/images/projects/trafficiq_hover.png",
    liveUrl: "https://github.com/HeetSoni26/Autonomous-Traffic-Intelligence-System",
    githubUrl: "https://github.com/HeetSoni26/Autonomous-Traffic-Intelligence-System",
    primaryButtonText: "Live Demo",
    secondaryButtonText: "GitHub Repository",
    color: "255, 140, 0",
    longDescription: "An offline autonomous traffic intelligence platform combining Computer Vision, Multi-Agent Systems, and AI-powered signal optimization.",
    role: "AI Researcher & Lead Engineer",
    timeline: "Ongoing",
    category: "Research • Computer Vision • Multi-Agent Systems",
    challenges: "Handling real-time multi-agent communication under heavy loads.",
    solution: "Used ZeroMQ and WebSockets for low-latency decentralized message passing.",
    metrics: ["Inference Time: <20ms", "Accuracy: 98%"],
    screenshots: []
  },
  {
    id: 5,
    title: "EcoSphere",
    tagline: "SUSTAINABILITY PLATFORM",
    statusBadge: "🟢 Production",
    description: "Interactive environmental awareness and research platform promoting sustainability through educational content and engaging user experiences.",
    features: [
      "Interactive educational modules",
      "User engagement tracking",
      "Sustainability dashboard"
    ],
    techStack: ["React", "Tailwind CSS", "Firebase"],
    image: "/images/projects/ecosphere1.png",
    hoverImage: "/images/projects/ecosphere2.png",
    liveUrl: "https://eco-sphere-jade.vercel.app/",
    githubUrl: "https://github.com/HeetSoni26/eco-sphere",
    primaryButtonText: "Live Demo",
    secondaryButtonText: "GitHub",
    color: "16, 185, 129",
    longDescription: "Interactive environmental awareness platform promoting sustainability through educational content and engaging user experience.",
    role: "Frontend Developer",
    timeline: "Completed",
    category: "Research • Sustainability Platform",
    challenges: "Designing engaging gamification elements.",
    solution: "Iterated with user feedback to refine the gamification loops.",
    metrics: ["Active Users: 5k+"],
    screenshots: []
  },
  {
    id: 6,
    title: "RAGChat",
    tagline: "GENERATIVE AI",
    statusBadge: "🧠 AI",
    description: "Retrieval-Augmented Generation chatbot capable of intelligent document conversations using semantic search, knowledge retrieval and LLMs.",
    features: [
      "Semantic document search",
      "Knowledge retrieval pipeline",
      "LLM-powered conversational responses"
    ],
    techStack: ["Python", "OpenAI API", "Vector Search", "FastAPI"],
    image: "/images/projects/ragchat_hero.png",
    hoverImage: "/images/projects/ragchat_hover.png",
    liveUrl: "https://github.com/HeetSoni26/RAGchat",
    githubUrl: "https://github.com/HeetSoni26/RAGchat",
    primaryButtonText: "Live Demo",
    secondaryButtonText: "GitHub",
    color: "0, 119, 182",
    longDescription: "Retrieval-Augmented Generation chatbot capable of intelligent document conversations using semantic search, knowledge retrieval and LLM-powered responses.",
    role: "AI Engineer",
    timeline: "Completed",
    category: "AI • LLM • Machine Learning",
    challenges: "Improving retrieval accuracy for complex documents.",
    solution: "Implemented hybrid search combining sparse and dense vector representations.",
    metrics: ["Retrieval Accuracy: 95%"],
    screenshots: []
  },
  {
    id: 7,
    title: "Novabridge",
    tagline: "AI PLATFORM",
    statusBadge: "🧠 AI",
    description: "An advanced platform designed to bridge the gap between complex AI models and intuitive user interfaces.",
    features: [
      "Intuitive AI integration",
      "Seamless data pipelines",
      "Scalable model deployment"
    ],
    techStack: ["Python", "Next.js", "Machine Learning"],
    image: "/images/projects/novabridge1.png",
    hoverImage: "/images/projects/novabridge2.png",
    liveUrl: "https://novabridge-sigma.vercel.app/",
    githubUrl: "https://github.com/HeetSoni26/Novabridge",
    primaryButtonText: "Live Demo",
    secondaryButtonText: "GitHub",
    color: "34, 197, 94",
    longDescription: "An advanced platform designed to bridge the gap between complex AI models and intuitive user interfaces, providing developers with scalable deployment pipelines.",
    role: "AI & Full Stack Developer",
    timeline: "Completed",
    category: "AI • Machine Learning",
    challenges: "Building scalable model inference endpoints.",
    solution: "Utilized modern serverless edge computing techniques.",
    metrics: ["API Latency: <100ms"],
    screenshots: []
  },
  {
    id: 8,
    title: "CivicIQ",
    tagline: "ELECTION EDUCATION PLATFORM",
    statusBadge: "🧠 AI",
    description: "AI-powered election education platform providing intelligent analytics and insights for civic engagement.",
    features: [
      "Intelligent analytics dashboard",
      "Civic engagement tracking",
      "Data-driven insights"
    ],
    techStack: ["Python", "Next.js", "Machine Learning"],
    image: "/images/projects/civiciq1.png",
    hoverImage: "/images/projects/civiciq2.png",
    liveUrl: "https://civic-iq-election-education.vercel.app/",
    githubUrl: "https://github.com/HeetSoni26/CivicIQ-ElectionEducation",
    primaryButtonText: "Live Demo",
    secondaryButtonText: "GitHub",
    color: "138, 43, 226",
    longDescription: "AI-powered election education platform providing intelligent analytics and insights for civic engagement.",
    role: "AI & Full-Stack Developer",
    timeline: "Completed",
    category: "AI • Web Platform",
    challenges: "Processing large civic datasets.",
    solution: "Implemented scalable data processing pipelines.",
    metrics: ["Data Processed: 1M+ Records"],
    screenshots: []
  },
  {
    id: 9,
    title: "Digit Recognizer",
    tagline: "COMPUTER VISION MODEL",
    statusBadge: "🧠 AI",
    description: "Deep learning model capable of accurately recognizing handwritten digits using convolutional neural networks.",
    features: [
      "Image processing and normalization",
      "CNN architecture design",
      "High accuracy inference"
    ],
    techStack: ["Python", "TensorFlow", "Keras", "NumPy"],
    image: "/images/projects/digitclassifier1.png",
    hoverImage: "/images/projects/digitclassifier2.png",
    liveUrl: "https://digit-classifier-eight.vercel.app/",
    githubUrl: "https://github.com/HeetSoni26/Handwritten-Digit-Recognizer",
    primaryButtonText: "Live Demo",
    secondaryButtonText: "GitHub",
    color: "255, 99, 71",
    longDescription: "Deep learning model capable of accurately recognizing handwritten digits using convolutional neural networks.",
    role: "ML Researcher",
    timeline: "Completed",
    category: "AI • Computer Vision",
    challenges: "Optimizing the network for fast inference.",
    solution: "Tuned hyperparameters and utilized efficient CNN layers.",
    metrics: ["Inference Time: <10ms"],
    screenshots: []
  },
  {
    id: 10,
    title: "OpenBeats",
    tagline: "OPEN SOURCE ANDROID APP",
    statusBadge: "🚀 Open Source",
    description: "Lightweight offline Android music player delivering an ad-free, login-free listening experience with modern Material Design.",
    features: [
      "Offline playback with no ads",
      "Modern Material Design interface",
      "Smooth native performance"
    ],
    techStack: ["Kotlin", "Android SDK", "Material Design"],
    image: "/images/projects/openbeats1.png",
    hoverImage: "/images/projects/openbeats-whatsapp2.jpeg",
    liveUrl: "https://github.com/HeetSoni26/Openbeats/releases/download/v1.0.0-debug/OpenBeats.apk",
    githubUrl: "https://github.com/HeetSoni26/Openbeats",
    primaryButtonText: "Live Demo",
    secondaryButtonText: "GitHub",
    color: "138, 43, 226",
    longDescription: "Lightweight offline Android music player delivering an ad-free, login-free listening experience with modern Material Design and smooth native performance.",
    role: "Android Developer",
    timeline: "Completed",
    category: "Android • Mobile",
    challenges: "Optimizing media playback for older Android devices.",
    solution: "Implemented efficient background services and memory management.",
    metrics: ["Downloads: 10k+"],
    screenshots: []
  },
  {
    id: 11,
    title: "Aurum Salon",
    tagline: "PREMIUM FRONTEND WEBSITE",
    statusBadge: "🟢 Production",
    description: "AURUM Luxury Salon & Spa - Premium frontend website built for a high-end beauty and wellness brand.",
    features: [
      "Luxurious user interface",
      "Responsive layout design",
      "Performance optimized"
    ],
    techStack: ["Next.js", "Tailwind CSS", "TypeScript"],
    image: "/images/projects/salon1.png",
    hoverImage: "/images/projects/salon2.png",
    liveUrl: "https://aurumsalon.vercel.app/",
    githubUrl: "https://github.com/HeetSoni26/aurum-salon",
    primaryButtonText: "Live Demo",
    secondaryButtonText: "GitHub",
    color: "212, 175, 55",
    longDescription: "AURUM Luxury Salon & Spa - Premium frontend website built for a high-end beauty and wellness brand.",
    role: "Frontend Engineer",
    timeline: "Completed",
    category: "Web • Frontend",
    challenges: "Creating highly smooth animations without performance drops.",
    solution: "Utilized hardware-accelerated CSS and Framer Motion.",
    metrics: ["Lighthouse Score: 99"],
    screenshots: []
  },
  {
    id: 12,
    title: "Taste of Heaven",
    tagline: "RESTAURANT WEB PLATFORM",
    statusBadge: "🟢 Production",
    description: "A modern web platform for a restaurant, featuring online ordering, menu browsing, and reservation capabilities.",
    features: [
      "Interactive digital menu",
      "Online reservation system",
      "Responsive mobile-first design"
    ],
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    image: "/images/projects/t-o-heaven1.png",
    hoverImage: "/images/projects/t-o-heaven2.png",
    liveUrl: "https://taste-of-heaven-teal.vercel.app/",
    githubUrl: "https://github.com/HeetSoni26/taste-of-heaven",
    primaryButtonText: "Live Demo",
    secondaryButtonText: "GitHub",
    color: "220, 38, 38",
    longDescription: "A modern web platform for a restaurant, featuring online ordering, menu browsing, and reservation capabilities.",
    role: "Full Stack Developer",
    timeline: "Completed",
    category: "Web • Full Stack",
    challenges: "Managing real-time order states.",
    solution: "Integrated WebSockets for instant order updates.",
    metrics: ["Uptime: 99.9%"],
    screenshots: []
  },
  {
    id: 13,
    title: "Fox-Awakens",
    tagline: "INTERACTIVE WEB EXPERIENCE",
    statusBadge: "🚀 Published",
    description: "Creative interactive web experience showcasing advanced frontend capabilities, animations, and modern web APIs.",
    features: [
      "Creative storytelling UI",
      "Advanced CSS animations",
      "Optimized asset loading"
    ],
    techStack: ["React", "JavaScript", "CSS"],
    image: "/images/projects/fox1.png",
    hoverImage: "/images/projects/fox2.png",
    liveUrl: "https://fox-awakens.vercel.app/",
    githubUrl: "https://github.com/HeetSoni26/fox-awakens",
    primaryButtonText: "Live Demo",
    secondaryButtonText: "GitHub",
    color: "249, 115, 22",
    longDescription: "Creative interactive web experience showcasing advanced frontend capabilities, animations, and modern web APIs.",
    role: "Frontend Developer",
    timeline: "Completed",
    category: "Web • Creative",
    challenges: "Synchronizing complex animation sequences.",
    solution: "Built a custom animation orchestrator hook.",
    metrics: ["Performance: A+"],
    screenshots: []
  },
  {
    id: 14,
    title: "Dental Clinic",
    tagline: "HEALTHCARE PLATFORM",
    statusBadge: "🟡 Active Development",
    description: "Healthcare management platform designed for dental clinics to manage appointments, patient records, and treatments.",
    features: [
      "Appointment scheduling system",
      "Patient record management",
      "Doctor dashboard"
    ],
    techStack: ["Next.js", "PostgreSQL", "Tailwind CSS"],
    image: "/images/projects/dental1.png",
    hoverImage: "/images/projects/dental2.png",
    liveUrl: "https://smilecraft-three.vercel.app/",
    githubUrl: "https://github.com/HeetSoni26/Dental-clinic",
    primaryButtonText: "Live Demo",
    secondaryButtonText: "GitHub",
    color: "14, 165, 233",
    longDescription: "Healthcare management platform designed for dental clinics to manage appointments, patient records, and treatments.",
    role: "Full Stack Developer",
    timeline: "Ongoing",
    category: "Web • Platform",
    challenges: "Ensuring HIPAA-compliant data storage principles.",
    solution: "Implemented stringent data validation and encryption patterns.",
    metrics: ["Security Audit: Passed"],
    screenshots: []
  }
];
