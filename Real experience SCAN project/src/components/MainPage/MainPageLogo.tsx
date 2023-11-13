import React from 'react';
import '../../styles/MainPage.css';

interface MainPageLogoProps {
  alt: string;
}

const MainPageLogo: React.FC<MainPageLogoProps> = ({ alt }) => {
  return (
    <div className="logo-main">
      <img src="/2398.png" alt={alt} />
    </div>
  );
};

export default MainPageLogo;