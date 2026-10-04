import Button from '@/components/ui/Button';

export default function HeroButtons() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex gap-4 mt-8">
      <Button variant="primary" size="lg" onClick={() => scrollToSection('contact')}>
        Contact Me
      </Button>
      <Button variant="secondary" size="lg" onClick={() => scrollToSection('work')}>
        View Work
      </Button>
    </div>
  );
}
