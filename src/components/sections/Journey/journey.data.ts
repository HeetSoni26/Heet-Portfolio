export interface JourneyMilestone {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
  type: 'work' | 'education' | 'achievement';
  skills?: string[];
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: '1',
    year: '2024',
    title: 'Full Stack Developer',
    organization: 'Freelance',
    description: 'Building modern web applications with React, Next.js, and Node.js. Working with clients globally to deliver scalable solutions.',
    type: 'work',
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js'],
  },
  {
    id: '2',
    year: '2023',
    title: 'Frontend Developer',
    organization: 'Tech Startup',
    description: 'Led frontend development for multiple SaaS products. Implemented responsive designs and improved performance metrics.',
    type: 'work',
    skills: ['React', 'Redux', 'Tailwind CSS', 'REST APIs'],
  },
  {
    id: '3',
    year: '2022',
    title: 'Bachelor of Computer Science',
    organization: 'University',
    description: 'Graduated with focus on software engineering and web technologies. Built several academic projects using modern frameworks.',
    type: 'education',
    skills: ['Data Structures', 'Algorithms', 'Web Development'],
  },
  {
    id: '4',
    year: '2021',
    title: 'Web Development Intern',
    organization: 'Software Company',
    description: 'First professional experience in web development. Learned industry best practices and agile methodologies.',
    type: 'work',
    skills: ['JavaScript', 'HTML/CSS', 'Git', 'Agile'],
  },
  {
    id: '5',
    year: '2020',
    title: 'Started Coding Journey',
    organization: 'Self-taught',
    description: 'Began learning programming with Python and JavaScript. Built first personal projects and discovered passion for web development.',
    type: 'achievement',
    skills: ['Python', 'JavaScript', 'Problem Solving'],
  },
];
