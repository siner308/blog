import React from 'react';
import { Link } from 'gatsby';

const Footer: React.FC = () => {
  const githubUrl = 'https://github.com/siner308';
  const netlifyUrl = 'https://www.netlify.com';
  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        textAlign: 'center',
        margin: '0 auto',
        backgroundColor: 'white',
      }}
    >
      <span style={{ margin: '1rem' }}>
        Deployed by <Link to={netlifyUrl} style={{color: 'black'}}>Netlify</Link>
      </span>
      <span>
        Source code on <Link to={githubUrl} style={{color: 'black'}}>Github</Link>
      </span>
    </div>
  );
};
export default Footer;
