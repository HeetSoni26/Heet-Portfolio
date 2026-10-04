export const slideUp = {
  initial: { 
    y: 60,
    opacity: 0 
  },
  animate: { 
    y: 0,
    opacity: 1 
  },
  transition: { 
    duration: 0.6,
    ease: [0.6, -0.05, 0.01, 0.99]
  },
};

export const slideUpStagger = {
  initial: { 
    y: 60,
    opacity: 0 
  },
  animate: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }),
};
