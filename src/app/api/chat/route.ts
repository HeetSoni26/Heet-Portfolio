import { NextRequest, NextResponse } from 'next/server';
import {
  CHATBOT_CONTEXT,
  RESPONSE_TEMPLATES,
  INTENT_KEYWORDS,
  QUICK_RESPONSES,
  SUGGESTION_CHAINS,
} from '@/lib/chatbot-data';

// Map quick response keys to their intent categories for suggestions
const QUICK_RESPONSE_INTENTS: Record<string, string> = {
  // Greetings
  'hi': 'greeting', 'hello': 'greeting', 'hey': 'greeting',
  'good morning': 'greeting', 'good afternoon': 'greeting', 'good evening': 'greeting',

  // About
  'name': 'identity', 'your name': 'identity', 'what is your name': 'identity',
  'who am i talking to': 'identity',
  'who are you': 'about', 'who is Heet': 'about', 'tell me about yourself': 'about',
  'tell me about Heet': 'about', 'introduce yourself': 'about', 'what do you do': 'about',

  // Contact
  'email': 'contact', 'phone': 'contact', 'phone number': 'contact', 'contact': 'contact',
  'how can i contact you': 'contact', 'how to reach you': 'contact',

  // Location
  'location': 'location', 'where are you from': 'location', 'where do you live': 'location',
  'where are you located': 'location', 'which country': 'location', 'timezone': 'location',

  // Availability & Hiring
  'available': 'availability', 'are you available': 'availability',
  'can i hire you': 'hire', 'how can i hire you': 'hire', 'hire': 'hire',
  'looking for developer': 'hire', 'need a developer': 'hire',

  // Skills
  'what are your skills': 'skills', 'tech stack': 'skills', 'what technologies do you use': 'skills',
  'favorite stack': 'favorite', 'what is your favorite technology': 'favorite',
  'best at': 'skills', 'what are you best at': 'skills',

  // Projects
  'show me your projects': 'projects', 'what projects have you built': 'projects',
  'your work': 'projects', 'portfolio': 'projects', 'what have you built': 'projects',
  'tell me about devory': 'devory', 'what is devory': 'devory',
  'tell me about safecoast': 'safecoast', 'tell me about thinkverse': 'thinkverse',

  // Services
  'what services do you offer': 'services', 'services': 'services',
  'what can you do for me': 'services', 'can you build a website': 'services',
  'can you build an app': 'services', 'do you do freelance': 'services',

  // Experience
  'experience': 'experience', 'how much experience': 'experience',
  'years of experience': 'experience', 'your journey': 'experience',
  'how did you start coding': 'experience',

  // Education
  'education': 'education', 'where did you study': 'education', 'your qualification': 'education',

  // Pricing
  'pricing': 'pricing', 'how much do you charge': 'pricing', 'rates': 'pricing', 'your rate': 'pricing',

  // Social
  'github': 'social', 'linkedin': 'social', 'twitter': 'social', 'social links': 'social',

  // Navigation
  'show all sections': 'navigation', 'sections': 'navigation', 'navigate': 'navigation',
  'go to projects': 'navigation', 'go to contact': 'navigation',
  'go to skills': 'navigation', 'go to about': 'navigation',

  // Process
  'how do you work': 'process', 'your process': 'process', 'work process': 'process',

  // Fun
  'fun fact': 'fun', 'tell me something interesting': 'fun', 'hobbies': 'fun',

  // Common
  'why should i hire you': 'hire', 'what makes you different': 'about',
  'do you work remotely': 'location', 'languages you speak': 'about',
};

function normalizeMessage(message: string): string {
  return message
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function detectSingleWordIntent(normalized: string): string | null {
  const oneWordMap: Record<string, string> = {
    name: 'identity',
    email: 'contact',
    phone: 'contact',
    contact: 'contact',
    location: 'location',
    projects: 'projects',
    project: 'projects',
    skills: 'skills',
    experience: 'experience',
    github: 'social',
    linkedin: 'social',
  };

  return oneWordMap[normalized] || null;
}

// Check for exact or near-exact matches first (faster responses)
function getQuickResponse(message: string): { response: string; intent: string } | null {
  const normalized = normalizeMessage(message);

  const singleIntent = detectSingleWordIntent(normalized);
  if (singleIntent && SUGGESTION_CHAINS[singleIntent]) {
    const quickKey = normalized;
    if (QUICK_RESPONSES[quickKey]) {
      return {
        response: QUICK_RESPONSES[quickKey],
        intent: QUICK_RESPONSE_INTENTS[quickKey] || singleIntent,
      };
    }
  }

  // Direct match
  if (QUICK_RESPONSES[normalized]) {
    return {
      response: QUICK_RESPONSES[normalized],
      intent: QUICK_RESPONSE_INTENTS[normalized] || 'default'
    };
  }

  // Check for common variations
  for (const [key, response] of Object.entries(QUICK_RESPONSES)) {
    if (normalized.includes(key) && normalized.length < key.length + 10) {
      return {
        response,
        intent: QUICK_RESPONSE_INTENTS[key] || 'default'
      };
    }
  }

  return null;
}

// Detect intents from user message with scoring
function detectIntent(message: string): string[] {
  const lowerMessage = normalizeMessage(message);
  const words = lowerMessage.split(/\s+/);
  const intentScores: Record<string, number> = {};

  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
    let score = 0;

    for (const keyword of keywords) {
      // Exact word match gets higher score
      if (words.includes(keyword)) {
        score += 3;
      }
      // Partial match (keyword is in message)
      else if (lowerMessage.includes(keyword)) {
        score += keyword.split(' ').length > 1 ? 4 : 2; // Multi-word phrases score higher
      }
    }

    if (score > 0) {
      intentScores[intent] = score;
    }
  }

  // Sort by score and return top intents
  const sortedIntents = Object.entries(intentScores)
    .sort((a, b) => b[1] - a[1])
    .map(([intent]) => intent);

  return sortedIntents.length > 0 ? sortedIntents.slice(0, 3) : ['unknown'];
}

// Generate response based on intents
function generateResponse(intents: string[], message: string): string {
  const responses: string[] = [];
  const lowerMessage = normalizeMessage(message);

  // Primary intent is the first one (highest score)
  const primaryIntent = intents[0];

  switch (primaryIntent) {
    case 'greeting':
      return RESPONSE_TEMPLATES.greeting[Math.floor(Math.random() * RESPONSE_TEMPLATES.greeting.length)];

    case 'farewell':
      return RESPONSE_TEMPLATES.farewell[Math.floor(Math.random() * RESPONSE_TEMPLATES.farewell.length)];

    case 'thanks':
      return RESPONSE_TEMPLATES.thanks[Math.floor(Math.random() * RESPONSE_TEMPLATES.thanks.length)];

    case 'capabilities':
      return RESPONSE_TEMPLATES.capabilities[0];

    case 'identity': {
      const { personal } = CHATBOT_CONTEXT;
      responses.push(
        `My name is **${personal.name}**. I'm ${personal.name}'s AI assistant.\n\n` +
        `${personal.name} is a **${personal.jobTitle}** based in ${personal.location}.`
      );
      break;
    }

    case 'about': {
      const { personal, sections } = CHATBOT_CONTEXT;
      responses.push(
        `${personal.bio}\n\n` +
        `📊 **Quick Stats:**\n` +
        `• ${personal.currentStatus}\n` +
        `• AI-focused portfolio\n` +
        `• ${personal.projectsBuilt} projects built\n` +
        `• ${personal.technologiesUsed} technologies\n\n` +
        `👉 **Quick Link:** [Learn More About Me](${sections.about.link})`
      );
      break;
    }

    case 'skills': {
      const { sections } = CHATBOT_CONTEXT;
      responses.push(
        `My expertise spans AI Engineering, Full-Stack Development, Backend Systems, Android Development, and Intelligent Automation.\n\n` +
        `Rather than listing every technology here, I'd recommend checking out the Skills section of my portfolio. It provides a complete breakdown of my technologies, proficiency, and areas of expertise in a much more visual and organized way.\n\n` +
        `👉 **Quick Link:** [View All Skills](${sections.skills.link})`
      );
      break;
    }

    case 'frontend': {
      const { frontend } = CHATBOT_CONTEXT.skills;
      responses.push(
        `**Frontend Development Skills:**\n\n` +
        `📝 **Languages:** ${frontend.languages.join(', ')}\n` +
        `⚛️ **Frameworks:** ${frontend.frameworks.join(', ')}\n` +
        `🎨 **Styling:** ${frontend.styling.join(', ')}\n` +
        `✨ **Animation:** ${frontend.animation.join(', ')}\n` +
        `📦 **State Management:** ${frontend.stateManagement.join(', ')}\n\n` +
        `Heet specializes in building responsive, performant, and beautiful user interfaces.`
      );
      break;
    }

    case 'backend': {
      const { backend } = CHATBOT_CONTEXT.skills;
      responses.push(
        `**Backend Development Skills:**\n\n` +
        `💻 **Languages:** ${backend.languages.join(', ')}\n` +
        `🚀 **Frameworks:** ${backend.frameworks.join(', ')}\n` +
        `🔗 **APIs:** ${backend.apis.join(', ')}\n` +
        `🔐 **Auth:** ${backend.authentication.join(', ')}\n\n` +
        `He builds scalable, secure server-side applications and APIs.`
      );
      break;
    }

    case 'database': {
      const { databases } = CHATBOT_CONTEXT.skills;
      responses.push(
        `**Database Expertise:**\n\n` +
        `🗃️ **SQL:** ${databases.sql.join(', ')}\n` +
        `📄 **NoSQL:** ${databases.nosql.join(', ')}\n` +
        `🔧 **ORMs:** ${databases.orm.join(', ')}\n` +
        `☁️ **Cloud DBs:** ${databases.cloud.join(', ')}\n\n` +
        `Heet designs efficient schemas, writes optimized queries, and handles database migrations.`
      );
      break;
    }

    case 'ai': {
      const { ai_ml } = CHATBOT_CONTEXT.skills;
      responses.push(
        `**AI/ML Expertise:**\n\n` +
        `🧠 **Frameworks:** ${ai_ml.frameworks.join(', ')}\n` +
        `💬 **NLP:** ${ai_ml.nlp.join(', ')}\n` +
        `📊 **Tools:** ${ai_ml.tools.join(', ')}\n` +
        `🔌 **APIs:** ${ai_ml.apis.join(', ')}\n\n` +
        `**Specializations:** ${ai_ml.specializations.join(', ')}\n\n` +
        `Heet integrates AI capabilities into production applications, like this very chatbot!`
      );
      break;
    }

    case 'devops': {
      const { devops } = CHATBOT_CONTEXT.skills;
      responses.push(
        `**DevOps & Cloud Skills:**\n\n` +
        `☁️ **Cloud:** ${devops.cloud.join(', ')}\n` +
        `🐳 **Containers:** ${devops.containers.join(', ')}\n` +
        `🔄 **CI/CD:** ${devops.ci_cd.join(', ')}\n` +
        `📊 **Monitoring:** ${devops.monitoring.join(', ')}\n\n` +
        `He ensures smooth deployments and reliable infrastructure.`
      );
      break;
    }

    case 'projects': {
      const { sections } = CHATBOT_CONTEXT;
      const featuredProjects = (CHATBOT_CONTEXT as typeof CHATBOT_CONTEXT & { featuredProjects?: string[] }).featuredProjects || ['OpenBeats', 'TrafficIQ'];
      const featuredSet = new Set(featuredProjects);
      const sortedProjects = [...CHATBOT_CONTEXT.projects].sort((a, b) => {
        const aFeatured = featuredSet.has(a.name) ? 0 : 1;
        const bFeatured = featuredSet.has(b.name) ? 0 : 1;
        if (aFeatured !== bFeatured) return aFeatured - bFeatured;
        return a.name.localeCompare(b.name);
      });

      const projectList = sortedProjects
        .map(p => `• **${p.name}** - ${p.type}: ${p.description.slice(0, 80)}...`)
        .join('\n');

      responses.push(
        `**Heet's Projects:**\n\n${projectList}\n\n` +
        `Ask me about any specific project for more details!\n\n` +
        `👉 **Quick Link:** [View All Projects](${sections.projects.link})`
      );
      break;
    }

    case 'devory': {
      const devory = CHATBOT_CONTEXT.projects.find(p => p.name === 'Devory');
      if (devory) {
        responses.push(
          `**🚀 Devory - AI-Powered Student Project Platform**\n\n` +
          `${devory.longDescription || devory.description}\n\n` +
          `**Tech Stack:** ${devory.techStack.join(', ')}\n\n` +
          `**Key Features:**\n${devory.features.map(f => `• ${f}`).join('\n')}\n\n` +
          `**Status:** ${devory.status}`
        );
      }
      break;
    }

    case 'safecoast': {
      const project = CHATBOT_CONTEXT.projects.find(p => p.name === 'Safecoast');
      if (project) {
        responses.push(
          `**🌊 Safecoast - Coastal Hazard Intelligence Platform**\n\n` +
          `${project.longDescription || project.description}\n\n` +
          `**Tech Stack:** ${project.techStack.join(', ')}\n\n` +
          `**Key Features:**\n${project.features.map(f => `• ${f}`).join('\n')}\n\n` +
          `**Status:** ${project.status}`
        );
      }
      break;
    }

    case 'thinkverse': {
      const project = CHATBOT_CONTEXT.projects.find(p => p.name === 'ThinkVerse');
      if (project) {
        responses.push(
          `**💡 ThinkVerse - Idea Management Platform**\n\n` +
          `${project.longDescription || project.description}\n\n` +
          `**Tech Stack:** ${project.techStack.join(', ')}\n\n` +
          `**Key Features:**\n${project.features.map(f => `• ${f}`).join('\n')}\n\n` +
          `**Status:** ${project.status}`
        );
      }
      break;
    }

    case 'spam': {
      const project = CHATBOT_CONTEXT.projects.find(p => p.name === 'Spam Message Detection');
      if (project) {
        responses.push(
          `**📱 Spam Message Detection - ML Project**\n\n` +
          `${project.longDescription || project.description}\n\n` +
          `**Tech Stack:** ${project.techStack.join(', ')}\n\n` +
          `**Key Features:**\n${project.features.map(f => `• ${f}`).join('\n')}\n\n` +
          `**Status:** ${project.status}`
        );
      }
      break;
    }

    case 'ecommerce': {
      const project = CHATBOT_CONTEXT.projects.find(p => p.name === 'Moungiri Store');
      if (project) {
        responses.push(
          `**🛒 Moungiri Store - E-Commerce Platform**\n\n` +
          `${project.description}\n\n` +
          `**Tech Stack:** ${project.techStack.join(', ')}\n\n` +
          `**Key Features:**\n${project.features.map(f => `• ${f}`).join('\n')}\n\n` +
          `**Status:** ${project.status}`
        );
      }
      break;
    }

    case 'experience': {
      const { journey } = CHATBOT_CONTEXT;
      const journeyText = journey
        .map(j => `**${j.year}** - *${j.title}*\n${j.description}`)
        .join('\n\n');

      responses.push(
        `**Heet's Journey**\n\n` +
        `${journeyText}\n\n` +
        `From curiosity to building intelligent production applications - it's been an exciting ride!`
      );
      break;
    }

    case 'education': {
      responses.push(
        `**Education:**\n\n` +
        `🎓 **B.Tech in Information Technology** (Currently pursuing)\n\n` +
        `Heet started coding in 2022 and has been continuously learning and building since then. ` +
        `He believes in learning by doing - every project teaches something new.\n\n` +
        `**Self-Learning:** Online courses, documentation, open source, and building real projects.`
      );
      break;
    }

    case 'achievements': {
      responses.push(
        `**Key Achievements:**\n\n` +
        CHATBOT_CONTEXT.achievements.map(a => `🏆 ${a}`).join('\n') +
        `\n\nAlways working towards the next milestone!`
      );
      break;
    }

    case 'contact': {
      const { personal, social, sections } = CHATBOT_CONTEXT;
      responses.push(
        `**Get in Touch:**\n\n` +
        `📧 **Email:** ${personal.email}\n` +
        `📱 **Phone:** ${personal.phone}\n` +
        `🌐 **Portfolio:** ${social.portfolio}\n` +
        `💼 **LinkedIn:** ${social.linkedin}\n` +
        `🐙 **GitHub:** ${social.github}\n\n` +
        `⏱️ **Response Time:** ${personal.responseTime}\n\n` +
        `👉 **Quick Link:** [Go to Contact Section](${sections.contact.link})\n\n` +
        `Feel free to reach out anytime!`
      );
      break;
    }

    case 'hire': {
      const { personal, sections } = CHATBOT_CONTEXT;
      const available = personal.availableForWork
        ? "✅ **Yes, Heet is currently available for work!**"
        : "⏳ Heet is currently busy with existing commitments.";

      responses.push(
        `**Hire Heet**\n\n` +
        `${available}\n\n` +
        `**Work Preferences:** ${personal.workPreference.join(', ')}\n\n` +
        `**How to hire:**\n` +
        `1. Go to the **Contact Section** to send a message\n` +
        `2. Or email directly at ${personal.email}\n` +
        `3. Heet responds within ${personal.responseTime}\n\n` +
        `👉 **Quick Link:** [Go to Contact Section](${sections.contact.link})\n\n` +
        `**Explore the Portfolio:**\n` +
        `• [View Projects](${sections.projects.link}) - See his work\n` +
        `• [View Skills](${sections.skills.link}) - Technologies he uses\n` +
        `• [View Services](${sections.services.link}) - What he offers\n\n` +
        `Let's build something amazing together!`
      );
      break;
    }

    case 'navigation': {
      const { sections } = CHATBOT_CONTEXT;
      const sectionLinks = Object.values(sections)
        .map(s => `• **[${s.name}](${s.link})** - ${s.description}`)
        .join('\n');

      responses.push(
        `**📍 Portfolio Sections:**\n\n` +
        `${sectionLinks}\n\n` +
        `Click any link to navigate directly to that section!`
      );
      break;
    }

    case 'pricing': {
      const { pricing } = CHATBOT_CONTEXT;
      responses.push(
        `**Pricing Information:**\n\n` +
        `💬 **Consultation:** ${pricing.consultation}\n` +
        `⏰ **Hourly Rate:** ${pricing.hourlyRange}\n` +
        `📦 **Project-Based:** ${pricing.projectBased}\n` +
        `🔄 **Retainer:** ${pricing.retainer}\n\n` +
        `Rates depend on project complexity, timeline, and scope. ` +
        `Reach out with your requirements for a custom quote!`
      );
      break;
    }

    case 'process': {
      const processText = CHATBOT_CONTEXT.workProcess
        .map(p => `**${p.step}. ${p.title}:** ${p.description}`)
        .join('\n');

      responses.push(
        `**How Heet Works:**\n\n` +
        `${processText}\n\n` +
        `Clear communication and regular updates throughout the process!`
      );
      break;
    }

    case 'services': {
      const { sections } = CHATBOT_CONTEXT;
      const servicesList = CHATBOT_CONTEXT.services
        .slice(0, 6)
        .map(s => `• **${s.name}:** ${s.description}`)
        .join('\n');

      responses.push(
        `**Services Offered:**\n\n` +
        `${servicesList}\n\n` +
        `Each service is tailored to your specific needs.\n\n` +
        `👉 **Quick Links:**\n` +
        `• [View Services](${sections.services.link})\n` +
        `• [Contact for Quote](${sections.contact.link})`
      );
      break;
    }

    case 'location': {
      const { personal } = CHATBOT_CONTEXT;
      responses.push(
        `📍 **Location:** ${personal.location}\n` +
        `🌍 **Timezone:** ${personal.timezone}\n` +
        `🏠 **Work Style:** Remote-first\n\n` +
        `Heet works with clients worldwide and is flexible with timezones!`
      );
      break;
    }

    case 'availability': {
      const { personal } = CHATBOT_CONTEXT;
      responses.push(
        personal.availableForWork
          ? `✅ **Currently Available!**\n\nHeet is open for:\n${personal.workPreference.map(w => `• ${w}`).join('\n')}\n\nReach out at ${personal.email} to discuss your project!`
          : `⏳ Currently busy with existing commitments, but feel free to reach out for future opportunities at ${personal.email}`
      );
      break;
    }

    case 'social': {
      const { social } = CHATBOT_CONTEXT;
      responses.push(
        `**Connect with Heet:**\n\n` +
        `🐙 **GitHub:** ${social.github}\n` +
        `💼 **LinkedIn:** ${social.linkedin}\n` +
        `🐦 **Twitter:** ${social.twitter}\n` +
        `🌐 **Portfolio:** ${social.portfolio}\n` +
        `📧 **Email:** ${social.email}`
      );
      break;
    }

    case 'fun': {
      const facts = CHATBOT_CONTEXT.funFacts;
      const randomFact = facts[Math.floor(Math.random() * facts.length)];
      const interests = CHATBOT_CONTEXT.interests.slice(0, 5).join(', ');

      responses.push(
        `**Fun Fact:** ${randomFact}\n\n` +
        `**Interests:** ${interests}\n\n` +
        `Outside of coding, Heet loves exploring new technologies and building products that solve real problems!`
      );
      break;
    }

    case 'favorite': {
      responses.push(
        `**Heet's Favorites:**\n\n` +
        `🛠️ **Stack:** Next.js + TypeScript + Tailwind CSS + PostgreSQL\n` +
        `⚛️ **Framework:** Next.js (for its DX and performance)\n` +
        `💅 **Styling:** Tailwind CSS (utility-first FTW!)\n` +
        `🗄️ **Database:** PostgreSQL with Prisma\n` +
        `☁️ **Deployment:** Vercel\n` +
        `📝 **Editor:** VS Code\n\n` +
        `He loves tools that boost productivity without sacrificing flexibility!`
      );
      break;
    }

    case 'faq': {
      const faqText = CHATBOT_CONTEXT.faq
        .slice(0, 4)
        .map(f => `**Q: ${f.question}**\nA: ${f.answer}`)
        .join('\n\n');

      responses.push(
        `**Frequently Asked Questions:**\n\n` +
        `${faqText}\n\n` +
        `Have another question? Just ask!`
      );
      break;
    }

    case 'unknown':
    default:
      // Try to give a helpful response even for unknown intents
      if (lowerMessage.includes('?')) {
        return RESPONSE_TEMPLATES.unknown[Math.floor(Math.random() * RESPONSE_TEMPLATES.unknown.length)];
      }
      return "I'm here to help! Try asking about Heet's skills, projects, experience, or how to contact him.";
  }

  return responses.length > 0
    ? responses.join('\n\n')
    : RESPONSE_TEMPLATES.unknown[Math.floor(Math.random() * RESPONSE_TEMPLATES.unknown.length)];
}

// Get contextual suggestions
function getQuickSuggestions(intents: string[]): string[] {
  const primaryIntent = intents[0] || 'default';

  // Check for specific suggestion chains
  if (SUGGESTION_CHAINS[primaryIntent]) {
    return SUGGESTION_CHAINS[primaryIntent];
  }

  // Default suggestions
  return SUGGESTION_CHAINS.default;
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Try quick response first (fastest path)
    const quickResult = getQuickResponse(message);
    if (quickResult) {
      const suggestions = SUGGESTION_CHAINS[quickResult.intent] || SUGGESTION_CHAINS.default;
      return NextResponse.json({
        response: quickResult.response,
        suggestions,
        intents: [quickResult.intent],
      });
    }

    // Detect intents and generate response
    const intents = detectIntent(message);
    const response = generateResponse(intents, message);
    const suggestions = getQuickSuggestions(intents);

    return NextResponse.json({
      response,
      suggestions,
      intents,
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
