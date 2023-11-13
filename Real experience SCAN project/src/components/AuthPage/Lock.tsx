import React from 'react';

interface LockProps {
  alt: string;
}

const Lock: React.FC<LockProps> = ({ alt }) => {
  return (
    <div className="logo">
      <img src="/lock.png" alt={alt} />
    </div>
  );
};

export default Lock;