import React from 'react';
import '../../../styles/DataSliderCard.css';

interface SliderCardProps {
  date: string;
  total: number;
  risk: number;
}

const SliderCard: React.FC<SliderCardProps> = ({ date, total, risk }) => {
  return (
    <div className="table">
        <div className="table-wrapper">
            <div className="table-tr">
                <div className="table-value">{date}</div>
            </div>
            <div className="table-tr">
                <div className="table-value">{total}</div>
            </div>
            <div className="table-tr">
                <div className="table-value">{risk}</div>
            </div>
        </div>
      <div className="separator_stat">
          <img src="/36.png"/>
      </div>
    </div>
  );
};

export default SliderCard;