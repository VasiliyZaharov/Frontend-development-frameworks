import React, { useState } from 'react';
import SliderCard from './SliderCard';
import '../../../styles/DataSlider.css';

export interface DataElement {
  histogramType: string;
  data: Array<{ date: string; value: number }>;
}

interface DataSlider2Props {
  items: DataElement[];
}
const DataSlider2: React.FC<DataSlider2Props> = ({ items }) => {
  const totalDocumentsData = items.find(item => item.histogramType === 'totalDocuments')?.data || [];
  const riskFactorsData = items.find(item => item.histogramType === 'riskFactors')?.data || [];


  function formatDate(inputDate: string): string {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const visibleCards = 8;

  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 1, totalDocumentsData.length - visibleCards));
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
      <div className="slider-container">
        <div className="slider-btn_left" onClick={handlePrev}>&lt;</div>
        <div className="data-slider_box">
          <div className="data-slider_left-part">
            <div className="data-slider_titles">
              <span className="titles">Period</span>
              <span className="titles">Total</span>
              <span className="titles">Risks</span>
            </div>
          </div>
          <div className="data-slider_right-part">
            <div className="table">
              <div className="data-slider_cards-row">
                {totalDocumentsData.slice(startIndex, startIndex + visibleCards).map((item, i) => (
                    <SliderCard
                        key={i}
                        date={formatDate(item.date)}
                        total={item.value}
                        risk={riskFactorsData[startIndex + i]?.value}
                    />
                ))}
            </div>
            </div>
          </div>
        </div>
        <div className="slider-btn_right" onClick={handleNext}>&gt;</div>
      </div>
  );
};


export default DataSlider2;