'use client';

export default function GradientGlow() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl animate-float"
        style={{
          background: 'radial-gradient(circle, rgba(255,20,147,0.08) 0%, transparent 70%)',
          animationDelay: '0s',
        }}
      />
      <div 
        className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl animate-float"
        style={{
          background: 'radial-gradient(circle, rgba(255,0,0,0.06) 0%, transparent 70%)',
          animationDelay: '7s',
        }}
      />
      <div 
        className="absolute bottom-1/4 left-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl animate-float"
        style={{
          background: 'radial-gradient(circle, rgba(255,140,0,0.05) 0%, transparent 70%)',
          animationDelay: '14s',
        }}
      />
    </div>
  );
}
