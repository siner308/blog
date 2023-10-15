import { CSSProperties } from 'react';

export const backgroundStyle: CSSProperties | { [key: string]: string | number } = {
  background: 'white',
  boxShadow: '0 8px 8px 0 rgba( 0, 0, 0, 0.1 )',
  backdropFilter: 'blur( 8.5px )',
  '-webkit-backdrop-filter': 'blur( 8.5px )',
  borderRadius: 20,
};
