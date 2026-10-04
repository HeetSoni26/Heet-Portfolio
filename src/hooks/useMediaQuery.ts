'use client';

import { useState } from 'react';

export function useMediaQuery(_query: string) {
  const [matches] = useState(false);
  
  return matches;
}
