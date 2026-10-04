export const particlesConfig = {
  background: {
    color: {
      value: 'transparent',
    },
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'repulse',
      },
      onHover: {
        enable: true,
        mode: 'connect',
      },
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4,
      },
      connect: {
        distance: 150,
        links: {
          opacity: 0.3,
        },
      },
    },
  },
  particles: {
    color: {
      value: '#FF8C00',
    },
    links: {
      color: '#FF8C00',
      distance: 150,
      enable: true,
      opacity: 0.2,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: 'none',
      random: true,
      straight: false,
      outModes: {
        default: 'bounce',
      },
    },
    number: {
      density: {
        enable: true,
      },
      value: 50,
    },
    opacity: {
      value: 0.2,
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: { min: 1, max: 2 },
    },
  },
  detectRetina: true,
};
