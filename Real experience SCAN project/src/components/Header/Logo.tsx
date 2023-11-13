import React from 'react';

interface LogoProps {
  alt: string;
}

const Logo: React.FC<LogoProps> = ({ alt }) => {
  return (
    <div className="logo">
      <img src="/logo.png" alt={alt} />
    </div>
  );
};

export default Logo;