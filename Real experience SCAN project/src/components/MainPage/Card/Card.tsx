
import './Card.scss';
import React from 'react';

interface CardProps {
  title: string;
  under_text: string;
  price: string;
  price_before: string;
  info: string;
  label: string;
  li: string;
  li1: string;
  li2: string;
  selected: boolean;
  color: string;
  border_color: string;
  logo: string;
  handleCardClick: () => void;
}

const Card: React.FC<CardProps> = ({
    title,
    under_text,
    price,
    price_before,
    info,
    label,
    li,
    li1,
    li2,
    selected,
    color,
    border_color,
    logo,
    handleCardClick,
  }) => {
    const buttonStyle: React.CSSProperties = selected
      ? { backgroundColor: '#D2D2D2', color: 'black' }
      : {};
    const borderStyle: React.CSSProperties = selected
      ? { border: `2px solid ${border_color}` }
      : {};
    const titleColor: React.CSSProperties = color === 'black'
      ? { color: 'white' }
      : {};

    return (
      <div
        className={`tariff-card ${selected ? 'selected' : ''}`}
        style={borderStyle}
        onClick={handleCardClick}
      >
        <div className="card-wrapper">
          <div className={`card-upper-side ${color}`} style={titleColor}>
            <div className="title-part">
              <p className="card-title" style={titleColor}>{title}</p>
              <p className="card-title_info" style={titleColor}>{under_text}</p>
            </div>
            <div className="card-logo">
              <img src={logo} alt="no picture" />
            </div>
          </div>
          <div className="card-content">
            {selected && (
              <div className="additional-btn">Current rate</div>
            )}
            <div className="card-prices">
              <p className="card-prices_title">
                <span>{price}</span>
                <span id="price-prev">{price_before}</span>
              </p>
              <p className="card-prices_title-info">{info}</p>
            </div>
            <div className="card-list">
              <p>{label}</p>
              <ul>
                <li>{li}</li>
                <li>{li1}</li>
                <li>{li2}</li>
              </ul>
            </div>
            <button
              className="card-btn"
              style={buttonStyle}
              onClick={handleCardClick}
            >
              {selected ? 'Go to your personal account' : 'More details'}
            </button>
          </div>
        </div>
      </div>
    );
};

export default Card;
