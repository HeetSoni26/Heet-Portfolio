import { projects as workProjects } from '@/components/sections/Work/work.data';

// Chatbot Knowledge Base - Comprehensive information about Heet Soni

export const CHATBOT_CONTEXT = {
  // Personal Information
  personal: {
    name: "Heet Soni",
    firstName: "Heet",
    lastName: "Soni",
    nickname: "Heet",
    jobTitle: "AI Engineer and Full-Stack Software Developer",
    tagline: "Building intelligent software powered by Machine Learning, Computer Vision, LLMs, and modern web technologies",
    email: "heetks2607@gmail.com",
    phone: "+91 99093 42367",
    location: "Anand, Gujarat, India",
    timezone: "IST (UTC+5:30)",
    languages: ["English", "Hindi", "Gujarati"],
    bio: "Heet specializes in Artificial Intelligence, Machine Learning, Computer Vision, LLM-powered applications, backend engineering, and modern full-stack development. He builds intelligent software ranging from AI assistants and automation systems to scalable web applications and Android apps.",
    shortBio: "AI Engineer & Full-Stack Software Developer.",
    currentStatus: "Pursuing a B.Tech in Artificial Intelligence & Data Science at CVM University (Expected 2027) while preparing for a research-focused Master's in Computer Science.",
    projectsBuilt: "14+",
    technologiesUsed: "35+",
    availableForWork: true,
    workPreference: ["Remote", "Freelance", "Contract", "Full-time"],
    responseTime: "Usually within 24 hours",
  },

  // Detailed Skills
  skills: {
    frontend: {
      languages: ["JavaScript", "TypeScript", "HTML5", "CSS3"],
      frameworks: ["React", "Next.js", "Vue.js"],
      styling: ["Tailwind CSS", "Styled Components", "SCSS", "CSS Modules"],
      animation: ["Framer Motion", "GSAP", "Lottie", "CSS Animations"],
      stateManagement: ["Redux", "Zustand", "React Context", "Jotai"],
      testing: ["Jest", "React Testing Library", "Cypress"],
      tools: ["Webpack", "Vite", "ESLint", "Prettier"],
    },
    backend: {
      languages: ["Node.js", "Python", "Java"],
      frameworks: ["Express.js", "FastAPI", "NestJS"],
      apis: ["REST APIs", "GraphQL", "WebSockets", "gRPC"],
      authentication: ["JWT", "OAuth 2.0", "Auth0", "NextAuth.js"],
      caching: ["Redis", "Memcached"],
    },
    databases: {
      sql: ["PostgreSQL", "MySQL", "SQLite"],
      nosql: ["MongoDB", "Firebase Firestore", "DynamoDB"],
      orm: ["Prisma", "Mongoose", "TypeORM", "Drizzle"],
      cloud: ["Supabase", "PlanetScale", "Neon"],
    },
    ai_ml: {
      frameworks: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras"],
      nlp: ["NLTK", "spaCy", "Hugging Face Transformers", "LangChain"],
      tools: ["Pandas", "NumPy", "Matplotlib", "Jupyter"],
      apis: ["OpenAI API", "Claude API", "Google AI", "Replicate"],
      specializations: ["Text Classification", "Sentiment Analysis", "Chatbots", "Recommendation Systems"],
    },
    devops: {
      cloud: ["AWS", "Google Cloud", "Vercel", "Netlify", "Railway"],
      containers: ["Docker", "Docker Compose"],
      ci_cd: ["GitHub Actions", "GitLab CI", "Vercel CI"],
      monitoring: ["Sentry", "LogRocket", "Google Analytics"],
    },
    mobile: {
      native: ["Kotlin", "Android Studio"],
      cross_platform: ["React Native", "Tauri", "Electron"],
    },
    tools: {
      ide: ["VS Code", "WebStorm", "Android Studio"],
      design: ["Figma", "Adobe XD", "Canva"],
      api: ["Postman", "Insomnia", "Thunder Client"],
      version_control: ["Git", "GitHub", "GitLab"],
      productivity: ["Notion", "Linear", "Slack"],
    },
    other: ["Stripe Integration", "Payment Gateways", "SEO Optimization", "Performance Optimization", "System Design", "Microservices", "Serverless Architecture", "Web Security"],
  },

  // Detailed Projects
  projects: workProjects.map(p => ({
    name: p.title,
    type: p.category,
    description: p.description,
    longDescription: p.longDescription,
    techStack: p.techStack,
    features: p.features || [],
    status: "Completed",
    link: p.liveUrl || '',
    github: p.githubUrl || ''
  })),

  featuredProjects: ["Developer Portfolio", "Novabridge"],

  // Journey/Timeline with more details
  journey: [
    {
      year: "2022",
      title: "The Curiosity Phase",
      description: "Discovered the world of web development. Started with HTML, CSS, and JavaScript fundamentals. Built my first static websites and fell in love with creating things for the web.",
      achievements: ["Completed first web project", "Learned Git basics", "Built 5+ static websites"],
      skills_learned: ["HTML5", "CSS3", "JavaScript", "Git"],
    },
    {
      year: "2023",
      title: "Deep Dive",
      description: "Expanded into React ecosystem and backend development. Started understanding databases and APIs.",
      achievements: ["First React project", "Learned Node.js", "Built first full-stack app"],
      skills_learned: ["React", "Node.js", "MongoDB", "REST APIs"],
    },
    {
      year: "2024",
      title: "Engineering Foundation",
      description: "Started B.Tech in Information Technology. Diving deep into data structures, algorithms, and software engineering principles. Building full-stack applications with React, Node.js, and databases.",
      achievements: ["Started B.Tech", "Built multiple production apps", "Won first hackathon"],
      skills_learned: ["DSA", "System Design", "TypeScript", "PostgreSQL"],
    },
    {
      year: "2025",
      title: "Product Builder",
      description: "Launched ThinkVerse - a SaaS platform for structured idea management. Learned product development, user experience design, and the importance of shipping real products to real users.",
      achievements: ["Launched ThinkVerse", "First paying customers", "Learned product management"],
      skills_learned: ["Product Development", "UX Design", "SaaS Architecture", "Marketing"],
    },
    {
      year: "2026",
      title: "AI Development",
      description: "Currently building Devory, an AI-driven platform helping students showcase and manage their projects. Exploring machine learning, natural language processing, and intelligent automation.",
      achievements: ["Building Devory", "AI/ML integration expertise", "Growing developer community"],
      skills_learned: ["OpenAI API", "LangChain", "ML Systems", "AI Integration"],
      isCurrent: true,
    },
    {
      year: "2027",
      title: "Scaling Vision",
      description: "Aiming to master advanced AI/ML systems and production-grade engineering. Goal: Build technology that impacts millions and contribute to open-source communities.",
      achievements: ["Goals: Scale Devory", "Open source contributions", "Tech leadership"],
      skills_learned: ["System Architecture", "Team Leadership", "Open Source"],
    },
  ],

  // Detailed Services
  services: [
    {
      name: "Full Stack Web Development",
      description: "End-to-end web application development from concept to deployment",
      includes: ["Custom web applications", "SaaS platforms", "E-commerce solutions", "Admin dashboards"],
      technologies: ["React", "Next.js", "Node.js", "PostgreSQL"],
    },
    {
      name: "AI/ML Integration",
      description: "Integrate AI capabilities into your existing applications",
      includes: ["Chatbots", "Recommendation systems", "Text analysis", "Image processing"],
      technologies: ["OpenAI", "LangChain", "Python", "TensorFlow"],
    },
    {
      name: "SaaS Platform Development",
      description: "Build scalable software-as-a-service products",
      includes: ["Multi-tenant architecture", "Subscription billing", "User management", "Analytics"],
      technologies: ["Next.js", "Stripe", "PostgreSQL", "Vercel"],
    },
    {
      name: "API Design & Development",
      description: "Design and build robust, scalable APIs",
      includes: ["REST APIs", "GraphQL APIs", "API documentation", "Third-party integrations"],
      technologies: ["Node.js", "Express", "GraphQL", "Swagger"],
    },
    {
      name: "Database Design & Optimization",
      description: "Design efficient database schemas and optimize performance",
      includes: ["Schema design", "Query optimization", "Migration strategies", "Backup solutions"],
      technologies: ["PostgreSQL", "MongoDB", "Prisma", "Redis"],
    },
    {
      name: "Performance Optimization",
      description: "Make your applications faster and more efficient",
      includes: ["Load time optimization", "Code splitting", "Caching strategies", "SEO improvements"],
      technologies: ["Lighthouse", "WebPageTest", "Chrome DevTools"],
    },
    {
      name: "UI/UX Development",
      description: "Create beautiful, intuitive user interfaces",
      includes: ["Responsive design", "Animations", "Accessibility", "Design systems"],
      technologies: ["Tailwind CSS", "Framer Motion", "Figma"],
    },
    {
      name: "Consultation",
      description: "Technical consultation for your projects",
      includes: ["Architecture review", "Tech stack selection", "Code review", "Best practices"],
    },
  ],

  // Social Links
  social: {
    github: "https://github.com/HeetSoni26",
    linkedin: "https://www.linkedin.com/in/heet-soni-8a9082273/",
    twitter: "https://twitter.com/heetsoni__",
    portfolio: "https://heetportfolio.vercel.app",
    email: "heetks2607@gmail.com",
  },

  // Fun facts and personality
  funFacts: [
    "I started coding in 2022 and fell in love with creating things for the web.",
    "I've built 10+ production-level projects.",
    "I'm passionate about AI and its potential to transform education.",
    "I love building SaaS products that solve real problems.",
    "I'm based in India and available for remote work worldwide.",
    "I drink way too much coffee while coding.",
    "I believe in learning by building, not just tutorials.",
    "I contribute to open source when I can.",
    "My favorite stack is Next.js + TypeScript + Tailwind.",
    "I'm always excited to learn new technologies.",
  ],

  // Interests and Hobbies
  interests: [
    "Building SaaS products",
    "AI/ML and its applications",
    "Open source contribution",
    "Reading tech blogs",
    "Learning new frameworks",
    "Solving algorithmic problems",
    "UI/UX design patterns",
    "System design",
  ],

  // Testimonials/Achievements
  achievements: [
    "Built and launched multiple production applications",
    "Hackathon winner with Safecoast project",
    "3+ years of development experience",
    "Successfully delivered projects for clients",
    "Growing expertise in AI/ML integration",
  ],

  // FAQ
  faq: [
    {
      question: "What is your hourly rate?",
      answer: "My rates vary based on project complexity and scope. Contact me for a custom quote tailored to your needs.",
    },
    {
      question: "Do you work remotely?",
      answer: "Yes! I work remotely with clients worldwide. I'm flexible with timezones and communication tools.",
    },
    {
      question: "What's your availability?",
      answer: "I'm currently available for freelance projects and full-time opportunities. Reach out to discuss your timeline.",
    },
    {
      question: "Do you provide maintenance after project completion?",
      answer: "Yes, I offer ongoing maintenance and support packages for all projects I deliver.",
    },
    {
      question: "What's your preferred tech stack?",
      answer: "I love working with Next.js, TypeScript, Tailwind CSS, and PostgreSQL. But I'm flexible based on project needs.",
    },
    {
      question: "Can you work with my existing codebase?",
      answer: "Absolutely! I'm experienced in jumping into existing codebases, understanding architecture, and making improvements.",
    },
  ],

  // Pricing tiers (general)
  pricing: {
    consultation: "Free initial consultation",
    hourlyRange: "$30-80/hour based on complexity",
    projectBased: "Custom quotes for project-based work",
    retainer: "Monthly retainer packages available",
  },

  // Work process
  workProcess: [
    { step: 1, title: "Discovery", description: "Understanding your requirements, goals, and vision" },
    { step: 2, title: "Planning", description: "Creating a detailed roadmap and technical specification" },
    { step: 3, title: "Development", description: "Building with regular updates and feedback loops" },
    { step: 4, title: "Testing", description: "Thorough testing to ensure quality and performance" },
    { step: 5, title: "Launch", description: "Deploying to production with monitoring" },
    { step: 6, title: "Support", description: "Ongoing maintenance and improvements" },
  ],

  // Portfolio Section Links for navigation
  sections: {
    hero: { name: "Home", link: "#hero", description: "Welcome section with introduction" },
    about: { name: "About Me", link: "#about", description: "Learn more about Heet" },
    skills: { name: "Skills", link: "#skills", description: "Technologies and expertise" },
    projects: { name: "Projects", link: "#projects", description: "Portfolio of work" },
    journey: { name: "My Journey", link: "#journey", description: "Career timeline and experience" },
    services: { name: "Services", link: "#services", description: "What Heet offers" },
    contact: { name: "Contact", link: "#contact", description: "Get in touch" },
  },
};

// Pre-computed responses for common questions (faster retrieval)
export const QUICK_RESPONSES: Record<string, string> = {
  // Greetings
  'hi': "Hey there! 👋 I'm Heet's AI assistant. How can I help you learn more about him today?",
  'hello': "Hello! Welcome to Heet's portfolio. What would you like to know?",
  'hey': "Hi! I'm here to tell you all about Heet. Ask me anything!",
  'good morning': "Good morning! ☀️ Welcome to Heet's portfolio. How can I assist you today?",
  'good afternoon': "Good afternoon! Welcome! What would you like to know about Heet?",
  'good evening': "Good evening! 🌙 Thanks for visiting. How can I help you?",

  // Identity Questions
  'name': `My name is **${CHATBOT_CONTEXT.personal.name}**. I'm ${CHATBOT_CONTEXT.personal.name}'s AI assistant.`,
  'your name': `My name is **${CHATBOT_CONTEXT.personal.name}**. I'm here to help you learn about ${CHATBOT_CONTEXT.personal.name}'s work.`,
  'what is your name': `I'm **${CHATBOT_CONTEXT.personal.name}'s AI assistant**. ${CHATBOT_CONTEXT.personal.name} is a ${CHATBOT_CONTEXT.personal.jobTitle}.`,

  // About Questions
  'who are you': `I'm an AI assistant for **Heet Soni**, an ${CHATBOT_CONTEXT.personal.jobTitle} based in ${CHATBOT_CONTEXT.personal.location}. I can tell you about his skills, projects, and research ambitions!`,
  'who is Heet': `**Heet Soni** is an ${CHATBOT_CONTEXT.personal.jobTitle}. ${CHATBOT_CONTEXT.personal.bio}`,
  'tell me about yourself': `**Heet Soni** is an ${CHATBOT_CONTEXT.personal.jobTitle} based in ${CHATBOT_CONTEXT.personal.location}.\n\n${CHATBOT_CONTEXT.personal.bio}\n\nHe is ${CHATBOT_CONTEXT.personal.currentStatus}\n\n📊 **Quick Stats:**\n• B.Tech AI & Data Science (Expected 2027)\n• AI-focused portfolio\n• ${CHATBOT_CONTEXT.personal.projectsBuilt} projects\n• ${CHATBOT_CONTEXT.personal.technologiesUsed} technologies`,
  'tell me about Heet': `**Heet Soni** is a passionate ${CHATBOT_CONTEXT.personal.jobTitle} focused on building practical AI products, open-source projects, and intelligent systems with real-world impact.\n\n${CHATBOT_CONTEXT.personal.bio}`,
  'introduce yourself': `Hi! I'm the AI assistant for **Heet Soni**. Heet is an ${CHATBOT_CONTEXT.personal.jobTitle} who specializes in building modern web applications, AI solutions, and intelligent systems. I can help you learn about his skills, projects, and how to work with him!`,
  'what do you do': `Heet is an **${CHATBOT_CONTEXT.personal.jobTitle}** who builds:\n\n• AI-powered applications & intelligent automation systems\n• Computer Vision projects\n• Full-stack SaaS platforms\n• Android applications & backend APIs\n\nHis long-term goal is to pursue a thesis-based Master's in Computer Science and contribute to AI research.`,

  // Contact Questions
  'email': `📧 You can reach Heet at: **${CHATBOT_CONTEXT.personal.email}**`,
  'phone': `📱 Heet's phone number is: **${CHATBOT_CONTEXT.personal.phone}**`,
  'phone number': `📱 Heet's phone number is: **${CHATBOT_CONTEXT.personal.phone}**`,
  'contact': `**Get in Touch:**\n\n📧 Email: ${CHATBOT_CONTEXT.personal.email}\n📱 Phone: ${CHATBOT_CONTEXT.personal.phone}\n\n👉 [Go to Contact Section](#contact)`,
  'how can i contact you': `**Contact Heet:**\n\n📧 Email: ${CHATBOT_CONTEXT.personal.email}\n📱 Phone: ${CHATBOT_CONTEXT.personal.phone}\n💼 LinkedIn: ${CHATBOT_CONTEXT.social.linkedin}\n\n👉 [Go to Contact Section](#contact)`,
  'how to reach you': `**Reach out to Heet:**\n\n📧 Email: ${CHATBOT_CONTEXT.personal.email}\n📱 Phone: ${CHATBOT_CONTEXT.personal.phone}\n\nHe typically responds within ${CHATBOT_CONTEXT.personal.responseTime}!`,

  // Location Questions
  'location': `📍 Heet is based in **${CHATBOT_CONTEXT.personal.location}**, but works remotely with clients worldwide!`,
  'where are you from': `📍 Heet is from **${CHATBOT_CONTEXT.personal.location}**. He's available for remote work globally!`,
  'where do you live': `📍 Heet lives in **${CHATBOT_CONTEXT.personal.location}**. He works remotely with clients from all over the world!`,
  'where are you located': `📍 Heet is located in **${CHATBOT_CONTEXT.personal.location}**.\n\n🌍 Timezone: ${CHATBOT_CONTEXT.personal.timezone}\n🏠 Work Style: Remote-first`,
  'which country': `🇮🇳 Heet is based in **India**, specifically in ${CHATBOT_CONTEXT.personal.location}. He works with clients worldwide!`,

  // Availability & Hiring
  'available': CHATBOT_CONTEXT.personal.availableForWork
    ? "✅ **Yes!** Heet is currently available for freelance, contract, and full-time opportunities. Reach out to discuss your project!"
    : "⏳ Heet is currently busy with existing commitments, but feel free to reach out for future projects.",
  'are you available': CHATBOT_CONTEXT.personal.availableForWork
    ? "✅ **Yes!** Heet is currently available for new projects and opportunities!"
    : "⏳ Currently busy, but open to discussing future opportunities.",
  'can i hire you': `Yes! Heet is ${CHATBOT_CONTEXT.personal.availableForWork ? '**currently available**' : 'open to opportunities'}.\n\n**To hire:**\n1. Go to the Contact Section\n2. Send a message describing your project\n3. He'll respond within ${CHATBOT_CONTEXT.personal.responseTime}\n\n👉 [Go to Contact Section](#contact)`,
  'how can i hire you': `**How to Hire Heet:**\n\n1. 📝 Visit the Contact Section\n2. 💬 Describe your project requirements\n3. 📧 Or email directly: ${CHATBOT_CONTEXT.personal.email}\n\nHe responds within ${CHATBOT_CONTEXT.personal.responseTime}!\n\n👉 [Go to Contact Section](#contact)`,
  'hire': `**Hire Heet:**\n\n✅ Currently available for:\n${CHATBOT_CONTEXT.personal.workPreference.map(w => `• ${w}`).join('\n')}\n\n📧 Email: ${CHATBOT_CONTEXT.personal.email}\n👉 [Go to Contact Section](#contact)`,
  'looking for developer': `**Great!** Heet is a ${CHATBOT_CONTEXT.personal.jobTitle} available for hire!\n\n**Services:**\n• Full Stack Development\n• AI/ML Integration\n• SaaS Development\n• API Development\n\n👉 [Go to Contact Section](#contact)`,
  'need a developer': "**Heet can help!** He's an experienced Full Stack & AI Developer.\n\n👉 [Go to Contact Section](#contact) to discuss your project!",

  // Skills Questions
  'what are your skills': `My expertise spans AI Engineering, Full-Stack Development, Backend Systems, Android Development, and Intelligent Automation.\n\nRather than listing every technology here, I'd recommend checking out the Skills section of my portfolio. It provides a complete breakdown of my technologies, proficiency, and areas of expertise in a much more visual and organized way.\n\n👉 [View All Skills](#skills)`,
  'tech stack': `I work across Artificial Intelligence, Machine Learning, Computer Vision, modern Full-Stack Development, backend engineering, and mobile development.\n\nYou can explore the Skills section for a complete interactive overview of my technologies and expertise.\n\n👉 [View All Skills](#skills)`,
  'what technologies do you use': `My expertise spans AI Engineering, Full-Stack Development, Backend Systems, Android Development, and Intelligent Automation.\n\nRather than listing every technology here, I'd recommend checking out the Skills section of my portfolio. It provides a complete breakdown of my technologies in a visual and organized way.\n\n👉 [View All Skills](#skills)`,
  'favorite stack': "🛠️ Heet's favorite stack heavily features **Python, PyTorch, LangGraph, Next.js, and PostgreSQL**. He loves tools that support both advanced AI research and high-performance web development!",
  'what is your favorite technology': "🛠️ Heet's favorite technologies are **PyTorch** and **LangGraph** for AI, **Next.js** for frontend, and **FastAPI** for backend. He is deeply focused on building AI products and intelligent software.",
  'best at': "Heet excels at **AI Engineering**, **Machine Learning**, **Computer Vision**, and **Full Stack Development**. He builds intelligent software that solves real-world problems!",
  'what are you best at': "Heet is best at:\n\n🥇 **Artificial Intelligence & Machine Learning**\n🥈 **Full-Stack Software Development**\n🥉 **Intelligent Automation & Computer Vision**\n\nHe's shipped 8+ production AI products and web platforms!",

  // Project Questions
  'show me your projects': `**Heet's Projects:**\n\n🎵 **OpenBeats** - Open-source Music Player\n🚗 **TrafficIQ** - Autonomous Traffic Intelligence\n🌍 **EcoSphere** - Environmental Tracking Platform\n🤖 **RAGChat** - AI Document Chat Assistant\n📱 **Spam Email Classifier** - ML Detection System\n\n👉 [View All Projects](#projects)`,
  'what projects have you built': `**Projects Built by Heet:**\n\n1. **OpenBeats** - Open-source Music Player\n2. **TrafficIQ** - Autonomous Traffic Intelligence\n3. **EcoSphere** - Environmental Tracking Platform\n4. **RAGChat** - AI Document Chat Assistant\n5. **Spam Email Classifier** - ML Detection System\n\n👉 [View All Projects](#projects)`,
  'your work': `**Heet's Work:**\n\nHe has built ${CHATBOT_CONTEXT.personal.projectsBuilt} production projects including AI applications and full-stack web products.\n\n**Featured:** OpenBeats, TrafficIQ\n\n👉 [View Projects](#projects)`,
  'portfolio': `**Heet's Portfolio:**\n\nIncludes ${CHATBOT_CONTEXT.personal.projectsBuilt} projects ranging from AI-powered applications to web platforms.\n\n👉 [View All Projects](#projects)`,
  'what have you built': `**What Heet Has Built:**\n\n🎵 Mobile apps (OpenBeats)\n🚗 AI Systems (TrafficIQ)\n🌍 Web platforms (EcoSphere)\n🤖 AI assistants (RAGChat)\n📱 ML models (Spam Email Classifier)\n\n👉 [View Projects](#projects)`,

  // Specific Projects
  'tell me about openbeats': `**🎵 OpenBeats - Open-source Music Player**\n\nA beautiful music player app for Android.\n\n**Tech:** Kotlin, Android SDK\n**Status:** Completed\n\n👉 [View Projects](#projects)`,
  'what is openbeats': `**OpenBeats** is Heet's Android app - a beautiful, open-source music player.\n\n**Features:**\n• Local playback\n• Clean UI\n• Responsive design\n\n👉 [View Projects](#projects)`,
  'tell me about trafficiq': `**🚗 TrafficIQ - Autonomous Traffic Intelligence**\n\nAn AI-powered system that optimizes traffic lights based on real-time vehicle density.\n\n**Tech:** Python, YOLOv8, OpenCV\n**Status:** Completed\n\n👉 [View Projects](#projects)`,
  'tell me about ecosphere': `**🌍 EcoSphere - Environmental Tracking Platform**\n\nA comprehensive platform for tracking and visualizing environmental data and metrics.\n\n**Tech:** React, Tailwind CSS\n**Status:** Launched\n\n👉 [View Projects](#projects)`,

  // Services Questions
  'what services do you offer': `**Services Heet Offers:**\n\n🌐 Full Stack Web Development\n🤖 AI/ML Integration\n📦 SaaS Platform Development\n🔗 API Design & Development\n🗄️ Database Design\n⚡ Performance Optimization\n🎨 UI/UX Development\n💬 Technical Consultation\n\n👉 [View Services](#services)`,
  'services': `**Heet's Services:**\n\n• Full Stack Web Development\n• AI/ML Integration\n• SaaS Development\n• API Development\n• Database Design\n• UI/UX Development\n\n👉 [View Services](#services)`,
  'what can you do for me': `**How Heet Can Help:**\n\n✅ Build custom web applications\n✅ Integrate AI features into your app\n✅ Design scalable databases\n✅ Create beautiful, responsive UIs\n✅ Optimize your application performance\n\n👉 [Contact for details](#contact)`,
  'can you build a website': "**Yes!** Heet builds modern, responsive websites with:\n\n• React/Next.js\n• Custom designs\n• SEO optimization\n• Fast performance\n\n👉 [Go to Contact Section](#contact) to discuss your project!",
  'can you build an app': "**Absolutely!** Heet can build:\n\n• Web applications (React/Next.js)\n• Full-stack apps with databases\n• AI-powered applications\n• SaaS platforms\n\n👉 [Go to Contact Section](#contact)",
  'do you do freelance': `**Yes!** Heet is available for freelance work.\n\n**Work Types:**\n${CHATBOT_CONTEXT.personal.workPreference.map(w => `• ${w}`).join('\n')}\n\n👉 [Contact to discuss](#contact)`,

  // Experience Questions
  'experience': `**Heet's Background:**\n\n🚀 ${CHATBOT_CONTEXT.personal.projectsBuilt} projects shipped\n🤖 Building AI products and intelligent software\n🎓 B.Tech in AI & Data Science (Pursuing)\n\n👉 [View Journey](#journey)`,
  'how much experience': `Heet has built **${CHATBOT_CONTEXT.personal.projectsBuilt} production projects** focusing heavily on full-stack development and AI/ML. He is currently pursuing a B.Tech in Artificial Intelligence & Data Science (Expected 2027).`,
  'years of experience': `Heet has built a strong AI-focused portfolio with **${CHATBOT_CONTEXT.personal.projectsBuilt} production projects** using ${CHATBOT_CONTEXT.personal.technologiesUsed} technologies!`,
  'your journey': `**Heet's Journey:**\n\n2022 - The Curiosity Phase\n2023 - Engineering Foundation (B.Tech AI & Data Science)\n2024 - Full-Stack Developer\n2025 - AI Exploration\n2026 - AI Product Development\n2027 - Research & Graduate Journey`,

  // Education
  'education': `**Education:**\n\n🎓 B.Tech in Artificial Intelligence & Data Science (CVM University, Expected 2027)\n\nHeet is preparing for a research-focused Master's in Computer Science and believes in learning by building impactful AI products!`,
  'where did you study': `🎓 Heet is pursuing a **B.Tech in Artificial Intelligence & Data Science** at CVM University.\n\nHis long-term goal is to pursue a thesis-based Master's in Computer Science!`,
  'your qualification': `**Qualifications:**\n\n🎓 B.Tech in AI & Data Science (Expected 2027)\n🤖 AI-focused portfolio\n🚀 ${CHATBOT_CONTEXT.personal.projectsBuilt} production projects`,

  // Pricing
  'pricing': `**Pricing Information:**\n\n💬 Consultation: Free initial consultation\n⏰ Hourly: $30-80 based on complexity\n📦 Projects: Custom quotes\n🔄 Retainer: Monthly packages available\n\n👉 [Contact for quote](#contact)`,
  'how much do you charge': `**Heet's Rates:**\n\n• **Hourly:** $30-80 (based on complexity)\n• **Projects:** Custom quotes\n• **Consultation:** Free initial call\n\nReach out with your requirements for a specific quote!\n\n👉 [Contact](#contact)`,
  'rates': `**Rates:**\n\nHourly: $30-80 depending on project complexity\nProjects: Custom quotes based on scope\n\n👉 [Get a Quote](#contact)`,
  'your rate': `Heet's hourly rate ranges from **$30-80** depending on project complexity. For fixed-price projects, he provides custom quotes.\n\n👉 [Contact for Quote](#contact)`,

  // Social Links
  'github': `🐙 **GitHub:** ${CHATBOT_CONTEXT.social.github}\n\nCheck out Heet's open source projects and code!`,
  'linkedin': `💼 **LinkedIn:** ${CHATBOT_CONTEXT.social.linkedin}\n\nConnect with Heet professionally!`,
  'twitter': `🐦 **Twitter:** ${CHATBOT_CONTEXT.social.twitter}\n\nFollow for tech insights and updates!`,
  'social links': `**Connect with Heet:**\n\n🐙 GitHub: ${CHATBOT_CONTEXT.social.github}\n💼 LinkedIn: ${CHATBOT_CONTEXT.social.linkedin}\n🐦 Twitter: ${CHATBOT_CONTEXT.social.twitter}\n🌐 Portfolio: ${CHATBOT_CONTEXT.social.portfolio}`,

  // Navigation
  'show all sections': `**📍 Portfolio Sections:**\n\n• [🏠 Home](#hero) - Welcome section\n• [👤 About Me](#about) - Learn about Heet\n• [🛠️ Skills](#skills) - Technologies & expertise\n• [🚀 Projects](#projects) - Portfolio of work\n• [📅 My Journey](#journey) - Career timeline\n• [💼 Services](#services) - What he offers\n• [📧 Contact](#contact) - Get in touch`,
  'sections': `**Portfolio Sections:**\n\n• [Home](#hero)\n• [About](#about)\n• [Skills](#skills)\n• [Projects](#projects)\n• [Journey](#journey)\n• [Services](#services)\n• [Contact](#contact)`,
  'navigate': `**Navigate the Portfolio:**\n\n👉 [About Me](#about)\n👉 [Skills](#skills)\n👉 [Projects](#projects)\n👉 [Services](#services)\n👉 [Contact](#contact)`,
  'go to projects': `👉 Click here to view projects: [View Projects](#projects)`,
  'go to contact': `👉 Click here to contact: [Go to Contact](#contact)`,
  'go to skills': `👉 Click here to view skills: [View Skills](#skills)`,
  'go to about': `👉 Click here to learn more: [About Me](#about)`,

  // Work Process
  'how do you work': `**Heet's Work Process:**\n\n1️⃣ **Discovery** - Understanding requirements\n2️⃣ **Planning** - Creating roadmap\n3️⃣ **Development** - Building with updates\n4️⃣ **Testing** - Ensuring quality\n5️⃣ **Launch** - Deploying to production\n6️⃣ **Support** - Ongoing maintenance`,
  'your process': `**How Heet Works:**\n\n1. Free consultation to understand needs\n2. Detailed proposal & timeline\n3. Development with regular updates\n4. Testing & quality assurance\n5. Launch & deployment\n6. Post-launch support`,
  'work process': `**Development Process:**\n\n• Discovery: Understanding your vision\n• Planning: Technical specifications\n• Development: Iterative building\n• Testing: Quality assurance\n• Launch: Production deployment\n• Support: Ongoing maintenance`,

  // Fun Facts
  'fun fact': CHATBOT_CONTEXT.funFacts[Math.floor(Math.random() * CHATBOT_CONTEXT.funFacts.length)],
  'tell me something interesting': `**Fun Fact:** ${CHATBOT_CONTEXT.funFacts[Math.floor(Math.random() * CHATBOT_CONTEXT.funFacts.length)]}\n\nWant to know more about Heet?`,
  'hobbies': `**Heet's Interests:**\n\n• Building SaaS products\n• AI/ML exploration\n• Open source contribution\n• Learning new technologies\n• System design\n\nCoding is both his work and passion!`,

  // Common Questions
  'why should i hire you': `**Why Hire Heet?**\n\n✅ True AI Engineer + Full-Stack expertise\n✅ ${CHATBOT_CONTEXT.personal.projectsBuilt} production projects\n✅ Focus on intelligent software and research\n✅ Modern tech stack (${CHATBOT_CONTEXT.personal.technologiesUsed} technologies)\n✅ Quality-focused approach & clear communication\n\n👉 [Let's Discuss](#contact)`,
  'what makes you different': `**What Sets Heet Apart:**\n\n🎯 AI-first mindset combined with robust Full-Stack skills\n🚀 Focus on shipping practical AI products and intelligent software\n💡 Strong theoretical foundation in ML/CV with real-world application\n📈 Research-oriented and deeply technical\n\nHe builds intelligent systems that solve real-world problems!`,
  'do you work remotely': `**Yes!** Heet works remotely with clients worldwide.\n\n🌍 Available for global projects\n⏰ Flexible with timezones\n💬 Clear async communication\n\n👉 [Start a Project](#contact)`,
  'timezone': `🕐 Heet's Timezone: **${CHATBOT_CONTEXT.personal.timezone}**\n\nHe's flexible and works with clients across different timezones!`,
  'languages you speak': `**Languages Heet Speaks:**\n\n• English (Professional)\n• Hindi (Native)\n• Marathi (Native)`,
};

// Response templates for common intents
export const RESPONSE_TEMPLATES = {
  greeting: [
    "Hey there! 👋 I'm Heet's AI assistant. How can I help you learn more about him today?",
    "Hello! Welcome to Heet's portfolio. What would you like to know?",
    "Hi! I'm here to tell you all about Heet. Ask me anything!",
    "Hey! Great to meet you. I can tell you about Heet's skills, projects, experience, and more. What interests you?",
  ],

  farewell: [
    "Thanks for chatting! Feel free to reach out to Heet at heetks2607@gmail.com. Have a great day! 👋",
    "Goodbye! Don't hesitate to contact Heet if you have any opportunities or questions.",
    "Take care! Heet would love to hear from you. Connect on LinkedIn or send an email!",
    "Thanks for visiting! Hope this was helpful. Reach out anytime! 🙌",
  ],

  unknown: [
    "I'm not sure about that specific question. Try asking about:\n\n• Skills & tech stack\n• Projects\n• Services\n• Contact info\n• How to hire\n\nOr reach out to Heet at heetks2607@gmail.com!",
    "That's an interesting question! I can help with questions about Heet's:\n\n• Skills & expertise\n• Projects & portfolio\n• Services & pricing\n• Contact & hiring\n\nWhat would you like to know?",
    "I don't have specific info on that, but try asking about skills, projects, or services! Or contact Heet directly.",
  ],

  thanks: [
    "You're welcome! 😊 Let me know if you have any other questions about Heet.",
    "Happy to help! Feel free to explore more or reach out to Heet directly.",
    "Glad I could help! Is there anything else you'd like to know?",
    "Anytime! 🙌 Feel free to ask more questions or visit the Contact section.",
  ],

  capabilities: [
    "**I can tell you about:**\n\n• 👤 Heet's background & bio\n• 🛠️ Skills and tech stack\n• 🚀 Projects (WebCraft, Safecoast, Devory)\n• 📅 Experience and journey\n• 💼 Services offered\n• 📧 How to contact or hire\n• 🔗 Social links\n\nWhat would you like to know?",
  ],
};

// Enhanced keywords for intent detection (more comprehensive)
export const INTENT_KEYWORDS: Record<string, string[]> = {
  // Greetings
  greeting: ["hi", "hello", "hey", "greetings", "good morning", "good afternoon", "good evening", "howdy", "sup", "yo", "hola", "namaste", "what's up", "wassup"],

  // Farewells
  farewell: ["bye", "goodbye", "see you", "later", "take care", "cya", "gtg", "gotta go", "leaving", "exit"],

  // Thanks
  thanks: ["thanks", "thank you", "thx", "ty", "appreciate", "grateful", "helpful", "great help", "awesome"],

  // What can you do
  capabilities: ["what can you do", "help me", "what do you know", "what can i ask", "how can you help", "capabilities", "what are you"],

  // About/Introduction
  about: ["about", "who", "tell me", "yourself", "Heet", "introduce", "introduction", "what do you do", "describe", "overview", "summary", "bio", "background"],
  identity: ["name", "your name", "what is your name", "who am i talking to"],

  // Skills
  skills: ["skills", "technologies", "tech stack", "stack", "programming", "languages", "know", "expertise", "proficient", "capable", "abilities", "competencies", "tools", "frameworks"],
  frontend: ["frontend", "front-end", "front end", "react", "next.js", "nextjs", "ui", "ux", "user interface", "client side", "css", "tailwind", "styling"],
  backend: ["backend", "back-end", "back end", "node", "express", "server", "api", "apis", "server side", "python"],
  database: ["database", "db", "mongodb", "postgresql", "postgres", "firebase", "supabase", "sql", "nosql", "data storage"],
  ai: ["ai", "machine learning", "ml", "artificial intelligence", "tensorflow", "nlp", "natural language", "deep learning", "neural", "openai", "chatgpt", "gpt", "langchain"],
  devops: ["devops", "deployment", "deploy", "aws", "cloud", "docker", "ci/cd", "hosting", "server management", "vercel", "infrastructure"],

  // Projects
  projects: ["projects", "work", "portfolio", "built", "created", "developed", "apps", "applications", "showcase", "examples", "case studies", "what have you built", "show me"],
  devory: ["devory", "student project platform", "ai platform", "project management"],
  safecoast: ["safecoast", "safe coast", "coastal", "hazard", "hackathon", "weather", "monitoring"],
  thinkverse: ["thinkverse", "think verse", "idea management", "idea platform", "ideas"],
  spam: ["spam", "spam detection", "message detection", "sms", "classification", "ml project"],
  ecommerce: ["ecommerce", "e-commerce", "store", "shop", "moungiri", "online store", "shopping"],

  // Experience
  experience: ["experience", "years", "background", "career", "journey", "history", "timeline", "story", "how long", "worked"],
  education: ["education", "study", "studying", "college", "degree", "university", "btech", "b.tech", "academic", "school", "learning"],
  achievements: ["achievements", "accomplishments", "awards", "recognition", "milestones", "success"],

  // Contact & Hire
  contact: ["contact", "email", "phone", "reach", "get in touch", "connect", "message", "call"],
  hire: ["hire", "hiring", "job", "opportunity", "freelance", "contract", "available", "open to", "work with", "collaborate", "project", "engagement", "work together", "employ"],
  pricing: ["pricing", "price", "cost", "rate", "rates", "charge", "fee", "budget", "how much", "hourly", "quote"],
  process: ["process", "how do you work", "workflow", "methodology", "approach", "stages", "steps"],

  // Location & Availability
  location: ["location", "where", "based", "live", "from", "city", "country", "india", "remote", "timezone"],
  availability: ["availability", "available", "free", "capacity", "timeline", "when", "schedule", "busy"],

  // Services
  services: ["services", "offer", "provide", "specialize", "specialization", "what do you do", "help with"],

  // Social
  social: ["social", "github", "linkedin", "twitter", "links", "profiles", "follow", "connect", "portfolio link"],

  // Fun/Personal
  fun: ["fun", "hobby", "hobbies", "interests", "free time", "personal", "outside work", "fun fact"],
  favorite: ["favorite", "favourite", "prefer", "like best", "love", "best", "top choice"],

  // FAQ
  faq: ["faq", "frequently asked", "common questions", "question", "doubt", "wondering"],

  // Navigation
  navigation: ["navigate", "go to", "take me", "show me", "where is", "sections", "pages", "menu", "scroll to", "jump to", "find section", "all sections", "links"],
};

// Suggestion chains for conversation flow - all suggestions have answers
export const SUGGESTION_CHAINS: Record<string, string[]> = {
  // Initial/greeting suggestions
  greeting: ["Tell me about yourself", "What are your skills?", "Show me your projects"],

  // After about response
  about: ["What are your skills?", "Show me your projects", "How can I hire you?"],
  identity: ["Tell me about yourself", "Show me your projects", "How can I contact you?"],

  // After skills response
  skills: ["Tell me about frontend", "What databases do you use?", "Show me your projects"],

  // After frontend response
  frontend: ["What about backend?", "Do you work with AI?", "Tell me about WebCraft"],

  // After backend response
  backend: ["What databases do you use?", "Show me your projects", "What services do you offer?"],

  // After database response
  database: ["What about DevOps?", "Show me your projects", "How can I hire you?"],

  // After AI/ML response
  ai: ["Tell me about OpenBeats", "Tell me about TrafficIQ", "How can I hire you?"],

  // After DevOps response
  devops: ["Show me your projects", "What services do you offer?", "How can I contact you?"],

  // After projects response
  projects: ["Tell me about OpenBeats", "Tell me about TrafficIQ", "How can I hire you?"],

  // After specific project responses
  openbeats: ["What tech did you use?", "Tell me about TrafficIQ", "How can I hire you?"],
  trafficiq: ["Tell me about OpenBeats", "Tell me about EcoSphere", "What are your skills?"],
  ecosphere: ["Tell me about OpenBeats", "Show me your projects", "How can I hire you?"],
  ragchat: ["What other projects?", "Do you work with AI?", "How can I hire you?"],
  spam: ["What other projects?", "Do you work with AI?", "How can I hire you?"],
  ecommerce: ["Show me your projects", "What services do you offer?", "How can I contact you?"],

  // After experience/journey response
  experience: ["What are your skills?", "Show me your projects", "How can I hire you?"],
  education: ["What are your skills?", "Your experience?", "Show me your projects"],
  achievements: ["Tell me about your projects", "How can I hire you?", "What services do you offer?"],

  // After contact response
  contact: ["What services do you offer?", "What are your rates?", "Show me your projects"],

  // After hire response
  hire: ["What are your rates?", "What's your process?", "Go to Contact section"],

  // After services response
  services: ["What are your rates?", "Show me your projects", "How can I hire you?"],

  // After pricing response
  pricing: ["What's your process?", "How can I contact you?", "Show me your work"],

  // After process response
  process: ["How can I hire you?", "What are your rates?", "Go to Contact section"],

  // After location response
  location: ["Do you work remotely?", "How can I contact you?", "What are your skills?"],
  availability: ["How can I hire you?", "What are your rates?", "Go to Contact section"],

  // After social links response
  social: ["How can I hire you?", "Show me your projects", "What are your skills?"],

  // After fun/hobbies response
  fun: ["Tell me about yourself", "What are your skills?", "Show me your projects"],
  favorite: ["What are your skills?", "Show me your projects", "How can I hire you?"],

  // After FAQ response
  faq: ["How can I hire you?", "What are your rates?", "Go to Contact section"],

  // After navigation response
  navigation: ["Go to Projects", "Go to Contact", "Tell me about yourself"],

  // After thanks response
  thanks: ["Show me your projects", "How can I hire you?", "Go to Contact section"],

  // After capabilities response
  capabilities: ["Tell me about yourself", "What are your skills?", "Show me your projects"],

  // Default suggestions
  default: ["Tell me about yourself", "What are your skills?", "Show all sections"],

  // Unknown response suggestions
  unknown: ["Tell me about yourself", "What are your skills?", "Show me your projects"],
};

