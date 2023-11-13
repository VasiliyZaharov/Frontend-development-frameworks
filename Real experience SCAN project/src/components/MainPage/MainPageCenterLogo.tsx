import React from 'react';
import '../../styles/MainPage.css';

interface MainPageCenterLogoProps {
  alt: string;
}

const MainPageCenterLogoLogo: React.FC<MainPageCenterLogoProps> = ({ alt }) => {
  return (
    <div className="logo-mid">
      <img src="/Group.png" alt={alt} />
    </div>
  );
};

export default MainPageCenterLogoLogo;