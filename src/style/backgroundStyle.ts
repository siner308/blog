import { CSSProperties } from 'react';

export const backgroundStyle: CSSProperties | { [key: string]: string | number } = {
  background: 'rgba( 255, 231, 84, 0.3 )',
  boxShadow: '0 4px 16px 0 rgba( 31, 38, 135, 0.37 )',
  backdropFilter: 'blur( 8px )',
  '-webkit-backdrop-filter': 'blur( 8px )',
  borderRadius: '10px',
};
