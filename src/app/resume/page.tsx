import type { Metadata } from 'next';
import ResumePageContent from './ResumePageContent';

export const metadata: Metadata = {
  title: 'Resume | Rameshwar Bhagwat',
  description: "View, download, or print Rameshwar Bhagwat's professional resume. Full Stack & AI Developer specializing in high-performance web applications and AI/ML integrations.",
  openGraph: {
    title: 'Resume | Rameshwar Bhagwat',
    description: "View, download, or print Rameshwar Bhagwat's professional resume.",
    type: 'profile',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rameshwar Bhagwat Resume',
      }
    ],
  }
};

export default function ResumePage() {
  return <ResumePageContent />;
}
