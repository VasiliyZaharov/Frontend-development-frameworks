import React from 'react';

interface AuthPictureProps {
  alt: string;
}

const AuthPicture: React.FC<AuthPictureProps> = ({ alt }) => {
  return (
    <div className="logo">
      <img src="/Characters.png" alt={alt} />
    </div>
  );
};

export default AuthPicture;