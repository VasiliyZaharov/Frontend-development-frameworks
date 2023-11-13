import React from 'react';

interface FooterLogoProps {
  alt: string;
}

const FooterLogo: React.FC<FooterLogoProps> = ({ alt }) => {
  return (
    <div className="logo">
      <img src="/logo-footer.png" alt={alt} />
    </div>
  );
};

export default FooterLogo;